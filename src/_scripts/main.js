// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';

import 'hammerjs';
import 'materialize-css/dist/js/materialize.js';

import Card from 'card/card';

$(() => {

  new Card();

});
