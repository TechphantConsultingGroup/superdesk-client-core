import React from 'react';
import PropTypes from 'prop-types';
import {getSpecStyle, getSpecTitle, getSpecValue} from '../helpers';

export function ItemPriority(props) {
    const {metadata, gettextCatalog} = props.svc;

    var priority = props.priority || 3;
    var spec = metadata.priorityByValue(priority);

    if (spec) {
        return React.createElement(
            'span',
            {
                className: 'badge badge--square sd-grid-item__footer-block-item priority-label--' + priority,
                style: getSpecStyle(spec),
                title: getSpecTitle(spec, gettextCatalog.getString('Priority')),
                key: 'priority',
            },
            getSpecValue(spec, priority)
        );
    }

    return React.createElement(
        'span',
        {
            className: 'badge badge--square sd-grid-item__footer-block-item priority-label--' + priority,
            title: gettextCatalog.getString('Priority'),
            key: 'priority',
        },
        priority
    );
}

ItemPriority.propTypes = {
    svc: PropTypes.object.isRequired,
    priority: PropTypes.any,
};
