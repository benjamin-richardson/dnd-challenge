// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';

import 'hammerjs';
import 'materialize-css/dist/js/materialize.js';
import emitter from 'tiny-emitter/instance';

import GameController from './_game-controller';
import Card from 'card/card';

$(() => {

  // Expose loading functions for callback
  window.dnd = {};
  window.dnd.emitter = emitter;

  new Card();

  if($('.game-class').length) {
    new GameController();
  }

  $('.js-start-game').on('click', function(){
    let $gameIntro = $('.game-intro'),
      $gameLoader = $('.game-loader');

    $gameIntro.addClass('fadeUp');
    setTimeout(function(){
      $gameIntro.hide();

      $gameLoader.show();
      $gameLoader.addClass('fadeIn');
    }, 500);

    window.dnd.emitter.emit('dnd-game-start');
  });

});
