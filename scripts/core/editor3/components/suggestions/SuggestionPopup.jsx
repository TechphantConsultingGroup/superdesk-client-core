import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';
import moment from 'moment';
import ng from 'core/services/ng';
import {Dropdown} from 'core/ui/components';
import {acceptSuggestion, rejectSuggestion} from '../../actions';
import * as Highlights from '../../helpers/highlights';
import {HighlightsPopupPresentation} from '../HighlightsPopupPresentation';
import {UserAvatar} from 'apps/users/components/UserAvatar';

/**
 * @ngdoc React
 * @module superdesk.core.editor3
 * @name SuggestionPopup
 * @param {Object} suggestion SuggestionPopup data.
 * @description Displays author, date and suggestion text. Allows accepting or declining a suggestion.
 */

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: null,
            error: null,
        };

        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
    }

    componentDidMount() {
        var gettextCatalog = ng.get('gettextCatalog');
        const gettext = gettextCatalog.getString.bind(gettextCatalog);

        ng.get('api')('users').getById(this.props.suggestion.author)
            .then((author) => {
                this.setState({author});
            })
            .catch((error) => {
                this.setState({error: gettext('An error occured, please try again.')});
            });
    }

    onAccept() {
        this.props.acceptSuggestion(this.props.suggestion);
    }

    onReject() {
        this.props.rejectSuggestion(this.props.suggestion);
    }

    render() {
        if (this.state.error !== null) {
            return <Dropdown open={true}>{this.state.error}</Dropdown>;
        }
        if (this.state.author === null) {
            return null;
        }

        var gettextCatalog = ng.get('gettextCatalog');
        const gettext = gettextCatalog.getString.bind(gettextCatalog);

        const {author} = this.state;
        const {date} = this.props.suggestion;

        const relativeDateString = moment(date).calendar();
        const absoluteDateString = moment(date).format('MMMM Do YYYY, h:mm:ss a');

        const description = Highlights.getHighlightDescription(this.props.suggestion.type);
        const blockStyleDescription = Highlights.getBlockStylesDescription(this.props.suggestion.blockType);
        const space = blockStyleDescription != '' ? ' ' : '';

        let content;

        switch (this.props.suggestion.type) {
        case 'REPLACE_SUGGESTION':
            content = (
                <div>
                    <div>
                        <strong>{gettext('Replace')}: </strong>
                        {this.props.suggestion.oldText}
                    </div>
                    <div>
                        <strong>{gettext('with')}: </strong>
                        {this.props.suggestion.suggestionText}
                    </div>
                </div>
            );
            break;

        case 'CHANGE_LINK_SUGGESTION':
            content = (
                <div>
                    <div>
                        <strong>{gettext('Replace link')}: </strong>
                        {get(this.props.suggestion, 'from.href', '')}
                    </div>
                    <div>
                        <strong>{gettext('with')}: </strong>
                        {get(this.props.suggestion, 'to.href', '')}
                    </div>
                </div>
            );
            break;

        default:
            content = (
                <div>
                    <strong>{gettext(description) + space + gettext(blockStyleDescription)}: </strong>
                    {this.props.suggestion.suggestionText}
                </div>
            );
        }

        return (
            <HighlightsPopupPresentation
                editorNode={this.props.editorNode}
                isRoot={true}
                header={(
                    <div>
                        <UserAvatar displayName={author.display_name} pictureUrl={author.picture_url} />
                        <p className="editor-popup__author-name">{author.display_name}</p>
                        <time className="editor-popup__time" title={relativeDateString}>{absoluteDateString}</time>
                    </div>
                )}
                availableActions={[]}
                content={null}
                scrollableContent={(
                    <div style={{background: '#fff', padding: '1.6rem', paddingBottom: '1rem'}}>
                        {content}
                    </div>
                )}
                stickyFooter={(
                    <div>
                        <button className="btn btn--small btn--hollow" onClick={this.onAccept}>
                            {gettext('Accept')}
                        </button>
                        <button className="btn btn--small btn--hollow" onClick={this.onReject}>
                            {gettext('Reject')}
                        </button>
                    </div>
                )}
            />
        );
    }
}

Suggestion.propTypes = {
    suggestion: PropTypes.shape({
        author: PropTypes.string,
        date: PropTypes.date,
        suggestionText: PropTypes.string,
        oldText: PropTypes.string,
        type: PropTypes.string,
        blockType: PropTypes.string,
        selection: PropTypes.object,
    }),
    acceptSuggestion: PropTypes.func,
    rejectSuggestion: PropTypes.func,
    editorNode: PropTypes.object,
};

export const SuggestionPopup = connect(null, {
    acceptSuggestion,
    rejectSuggestion,
})(Suggestion);
