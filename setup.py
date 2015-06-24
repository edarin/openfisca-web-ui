#! /usr/bin/env python
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


"""Web user interface for OpenFisca -- a versatile microsimulation free software"""


from setuptools import setup, find_packages


classifiers = """\
Development Status :: 4 - Beta
Environment :: Web Environment
License :: OSI Approved :: GNU Affero General Public License v3
Operating System :: POSIX
Programming Language :: Python
Topic :: Scientific/Engineering :: Information Analysis
Topic :: Internet :: WWW/HTTP :: WSGI :: Server
"""

doc_lines = __doc__.split('\n')


setup(
    name = 'OpenFisca-Web-UI',
    version = '0.2.dev0',

    author = 'OpenFisca Team',
    author_email = 'contact@openfisca.fr',
    classifiers = [classifier for classifier in classifiers.split('\n') if classifier],
    description = doc_lines[0],
    keywords = 'benefit interface microsimulation server social tax user web',
    license = 'http://www.fsf.org/licensing/licenses/agpl-3.0.html',
    long_description = '\n'.join(doc_lines[2:]),
    url = 'https://github.com/openfisca',

    data_files = [
        ('share/locale/fr/LC_MESSAGES', ['openfisca_web_ui/i18n/fr/LC_MESSAGES/openfisca-web-ui.mo']),
        ],
    entry_points = {
        'paste.app_factory': 'main = openfisca_web_ui.application:make_app',
        },
    extras_require = {
        'tests': ['PasteDeploy'],
        },
    include_package_data = True,
    install_requires = [
        'Babel >= 0.9.4',
        'Biryani[bsonconv,datetimeconv] >= 0.10.1',
        # 'bleach >= 1.2',  # Used in texthelpers.
        'Mako >= 0.7',
        'pymongo >= 2.2',  # Comment if installed from Debian because not exposed in pyshared.
        'requests >= 1.0',
        'WebError >= 0.10',
        'WebOb >= 1.1',
        ],
    message_extractors = {'openfisca_web_ui': [
        ('**.py', 'python', None),
        ('templates/**.mako', 'mako', {'input_encoding': 'utf-8'}),
        ('static/**', 'ignore', None)]},
    packages = find_packages(),
    test_suite = 'nose.collector',
    zip_safe = False,
    )
