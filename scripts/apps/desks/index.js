/**
* This file is part of Superdesk.
*
* Copyright 2013, 2014 Sourcefabric z.u. and contributors.
*
* For the full copyright and license information, please see the
* AUTHORS and LICENSE files distributed with this source code, or
* at https://www.sourcefabric.org/superdesk/license
*/
import './styles/desks.scss';

import * as ctrl from './controllers';
import * as directive from './directives';
import { DesksFactory } from './services';

angular.module('superdesk.apps.desks', [
    'superdesk.core.ui',
    'superdesk.apps.users',
    'superdesk.apps.authoring.widgets',
    'superdesk.apps.aggregate.widgets',
    'superdesk.apps.aggregate'
])
    .factory('desks', DesksFactory)

    .directive('sdStageItems', directive.StageItemListDirective)
    .directive('sdTaskStatusItems', directive.TaskStatusItemsDirective)
    .directive('sdUserRoleItems', directive.UserRoleItemListDirective)
    .directive('sdSluglinesItems', directive.SluglinesItemListDirective)
    .directive('sdDeskConfig', () => ({controller: ctrl.DeskConfigController}))
    .directive('sdDeskConfigModal', directive.DeskConfigModal)
    .directive('sdFocusElement', directive.FocusElement)
    .directive('sdContentExpiry', directive.ContentExpiry)
    .directive('sdDeskeditBasic', directive.DeskeditBasic)
    .directive('sdDeskeditStages', directive.DeskeditStages)
    .directive('sdUserSelectList', directive.UserSelectList)
    .directive('sdDeskeditPeople', directive.DeskeditPeople)
    .directive('sdDeskeditMacros', directive.DeskeditMacros)
    .directive('sdActionPicker', directive.ActionPicker)
    .directive('sdStageHeader', directive.StageHeaderDirective)
    .directive('sdDeskSelect', directive.DeskSelect)
    .directive('sdDeskSelectItem', directive.DeskSelectItem)

    .config(['superdeskProvider', function(superdesk) {
        superdesk
            .activity('/desks/', {
                label: gettext('Master Desk'),
                description: gettext('Navigate through the newsroom'),
                templateUrl: 'scripts/apps/desks/views/main.html',
                sideTemplateUrl: 'scripts/apps/workspace/views/workspace-sidenav.html',
                controller: ctrl.DeskListController,
                priority: -100,
                adminTools: false,
                beta: true,
                category: superdesk.MENU_MAIN,
                privileges: {desks: 1}
            })

            .activity('/settings/desks', {
                label: gettext('Desks'),
                controller: ctrl.DeskSettingsController,
                templateUrl: 'scripts/apps/desks/views/settings.html',
                category: superdesk.MENU_SETTINGS,
                priority: -800,
                privileges: {desks: 1}
            });
    }])

    .config(['apiProvider', function(apiProvider) {
        apiProvider.api('desks', {
            type: 'http',
            backend: {
                rel: 'desks'
            }
        });
    }]);
