# -*- coding: utf-8 -*-


# OpenFisca -- A versatile microsimulation software
# By: OpenFisca Team <contact@openfisca.fr>
#
# Copyright (C) 2011, 2012, 2013, 2014, 2015 OpenFisca Team
# https://github.com/openfisca
#
# This file is part of OpenFisca.
#
# OpenFisca is free software; you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# OpenFisca is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


"""Template helpers"""


from .. import conf, model, urls


def admin_appconfig(ctx):
    appconfig = base_appconfig(ctx)
    if conf['enabled.auth']:
        # Admin pages should redirect to home page on logout.
        appconfig['enabledModules']['auth']['redirectLocation'] = urls.get_url(ctx)
    return appconfig


def base_appconfig(ctx):
    """Config of JS modules included on each page."""
    req = ctx.req
    session = ctx.session
    user = model.get_user(ctx)
    enabled_modules = {}
    if conf['cookie'] not in req.cookies:
        enabled_modules['acceptCookiesModal'] = {
            'actionUrlPath': urls.get_url(ctx, 'accept-cookies'),
            }
    elif user is not None and user.email is not None and not user.cnil_conditions_accepted:
        enabled_modules['acceptCnilConditionsModal'] = {
            'actionUrlPath': user.get_user_url(ctx, 'accept-cnil-conditions'),
            'privacyPolicyUrlPath': urls.get_url(ctx, 'privacy-policy'),
            }
    if conf['enabled.auth']:
        dummy_emails = (conf['auth.dummy_admin_email'], conf['auth.dummy_user_email'])
        enabled_modules['auth'] = {
            'currentUser': user.email if user is not None else None,
            'isDummy': user is not None and user.email in dummy_emails,
            'logoutUrlPath': urls.get_url(ctx, 'logout'),
            }
    if conf['enabled.disclaimer'] and session is not None and not session.disclaimer_closed:
        enabled_modules['disclaimer'] = {
            'disclaimerClosedUrlPath': urls.get_url(ctx, 'api/1/disclaimer_closed'),
            }
    if conf['enabled.charts.locating']:
        enabled_modules['locatingChart'] = True
    appconfig = {
        'debug': conf['debug'],
        'enabledModules': enabled_modules,
        'i18n': {
            'baseUrlPath': urls.get_url(ctx, 'i18n', static = True),
            'onerrorMessage': ctx._(u'An error has occured in the simulator UI. You may try to reload the page.'),
            'lang': ctx.lang[0],
            },
        }
    return appconfig


def index_appconfig(ctx, alert_on_js_error):
    appconfig = base_appconfig(ctx)
    if conf['base_reforms'] is not None:
        appconfig['base_reforms'] = conf['base_reforms']
    appconfig.update({
        'alertOnJsError': alert_on_js_error,
        'api': {
            'baseUrl': conf['api.base_url'],
            'calculateUrl': conf['api.calculate_url'],
            'entitiesUrl': conf['api.entities_url'],
            'fieldsUrl': conf['api.fields_url'],
            'reformsUrl': conf['api.reforms_url'],
            'repairUrl': conf['api.repair_url'],
            'simulateUrl': conf['api.simulate_url'],
            },
        'constants': {
            'defaultYear': conf['ui.default_year'],
            'maxYear': conf['ui.max_year'],
            'minYear': conf['ui.min_year'],
            },
        'urls.www': conf['urls.www'],
        })
    appconfig['enabledModules'].update({
        'charts': {
            'urlPaths': {
                'testCasesSearch': urls.get_url(ctx, 'api/1/test_cases/search'),
                'testCasesBaseUrl': urls.get_url(ctx, u'test_cases'),
                'visualizationsSearch': urls.get_url(ctx, 'api/1/visualizations/search'),
                },
            },
        'situationForm': {
            'urlPaths': {
                'currentTestCase': urls.get_url(ctx, u'api/1/test_cases/current'),
                },
            },
        })
    return appconfig


def logout_appconfig(ctx):
    appconfig = base_appconfig(ctx)
    appconfig['enabledModules']['auth']['logout'] = True
    return appconfig


def user_view_appconfig(ctx):
    appconfig = base_appconfig(ctx)
    if conf['enabled.auth']:
        appconfig['enabledModules']['auth']['redirectLocation'] = urls.get_url(ctx)
    return appconfig
