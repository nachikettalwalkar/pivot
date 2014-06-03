'use strict';

/** app level module which depends on services and controllers */
angular.module('pivot', ['pivot.services', 'pivot.controllers','pivot.directives','ui.bootstrap', 'google-maps']);

/** services module initialization, allows adding services to module in multiple files */
angular.module('pivot.services', []);