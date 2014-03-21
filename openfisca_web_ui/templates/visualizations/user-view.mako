## -*- coding: utf-8 -*-


## OpenFisca -- A versatile microsimulation software
## By: OpenFisca Team <contact@openfisca.fr>
##
## Copyright (C) 2011, 2012, 2013, 2014 OpenFisca Team
## https://github.com/openfisca
##
## This file is part of OpenFisca.
##
## OpenFisca is free software; you can redistribute it and/or modify
## it under the terms of the GNU Affero General Public License as
## published by the Free Software Foundation, either version 3 of the
## License, or (at your option) any later version.
##
## OpenFisca is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU Affero General Public License for more details.
##
## You should have received a copy of the GNU Affero General Public License
## along with this program.  If not, see <http://www.gnu.org/licenses/>.


<%!
import datetime
import urllib

import babel.dates
from openfisca_web_ui import model, urls
%>


<%inherit file="/site.mako"/>


<%def name="breadcrumb()" filter="trim">
</%def>


<%def name="container_content()" filter="trim">
<%
    user = model.get_user(ctx)
    is_owner = False if user is None else user._id == visualization.author_id
%>\
        <div class="page-header">
            <h1>${_(u'Visualization')} <small>${visualization.get_title(ctx)}</small></h1>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <%self:view_fields/>
    % if visualization.iframe is True:
                <%self:view_content/>
    % endif
            </div>
    % if is_owner:
            <div class="panel-footer">
                <div class="btn-toolbar">
                    <a class="btn btn-default" href="${visualization.get_user_url(ctx, 'edit')}">${_(u'Edit')}</a>
                    <a class="btn btn-danger"  href="${visualization.get_user_url(ctx, 'delete')}">${_(u'Delete')}</a>
                </div>
            </div>
    % endif
        </div>
</%def>


<%def name="title_content()" filter="trim">
${visualization.get_title(ctx)} - ${parent.title_content()}
</%def>


<%def name="view_content()" filter="trim">
<%
    anonymous_token = ctx.session.anonymous_token if ctx.session is not None else ''
    value = visualization.url
    if value is None:
        return ''
    simulate_url = urllib.quote('{}?{}'.format(
        urls.get_full_url(ctx, 'api/1/simulate'),
        urllib.urlencode({'token': anonymous_token}),
        ))
    iframe_src_url = value.format(simulate_url = simulate_url) if '{simulate_url}' in value else None
%>\
    % if iframe_src_url is None:
        <div class="alert alert-danger">
            ${'Visualization URL does not contain "{simulate_url}" pattern.'}
        </div>
    % else:
        <iframe class="visualization-iframe" src="${iframe_src_url}"></iframe>
    % endif
</%def>


<%def name="view_fields()" filter="trim">
        <dl class="dl-horizontal">
<%
    value = visualization.description
%>\
    % if value is not None:
            <dt>${_(u'Description')}</dt>
            <dd>${value}</dd>
    % endif
<%
    anonymous_token = ctx.session.anonymous_token if ctx.session is not None else ''
    simulate_url = urllib.quote('{}?{}'.format(
        urls.get_full_url(ctx, 'api/1/simulate'),
        urllib.urlencode({'token': anonymous_token}),
        ))
    value = visualization.url
%>\
    % if value is not None:
            <dt>${_(u'Visualization URL')}</dt>
            <dd><a href="${value.format(simulate_url = simulate_url)}" target="_blank">${value}</a></dd>
    % endif
<%
    value = visualization.iframe
%>\
    % if value is not None:
            <dt>${_(u'Iframe')}</dt>
            <dd>${_(u'Yes') if value else _(u'No')}</dd>
    % endif
<%
    value = visualization.enabled
%>\
    % if value is not None:
            <dt>${_(u'Enabled')}</dt>
            <dd>${_(u'Yes') if value else _(u'No')}</dd>
    % endif
<%
    value = visualization.featured
%>\
    % if value is not None:
            <dt>${_(u'Featured')}</dt>
            <dd>${_(u'Yes') if value else _(u'No')}</dd>
    % endif
<%
    value = visualization.organization
%>\
    % if value is not None:
            <dt>${_(u'Organization')}</dt>
            <dd>${value}</dd>
    % endif
<%
    value = visualization.updated
%>\
    % if value is not None:
            <dt>${_(u'Updated')}</dt>
            <dd>${babel.dates.format_datetime(value)}</dd>
    % endif
<%
    value = visualization.published
%>\
    % if value is not None:
            <dt>${_(u'Published')}</dt>
            <dd>${babel.dates.format_datetime(value)}</dd>
    % endif
        </dl>
</%def>
