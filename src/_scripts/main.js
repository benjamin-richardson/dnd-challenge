// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';

import 'hammerjs';
import 'materialize-css/dist/js/materialize.js';
import emitter from 'tiny-emitter/instance';

import GameController from './_game-controller';
// import Card from 'card/card';

$(() => {

  // Expose loading functions for callback
  window.dnd = {};
  window.dnd.emitter = emitter;

  // Initialise in controller
  // new Card();

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

      // window.dnd.emitter.emit('dnd-game-start');
      window.dnd.emitter.emit('dnd-game-start-choice');
    }, 500);

  });

  $('.game-classes').on('click', '.game-classes__item', function(item){
    let $gameClasses = $('.game-classes'),
      $gameLoader = $('.game-loader');

    $gameLoader.css('opacity', '1');
    $gameClasses.addClass('fadeUp');

    setTimeout(function(){
      $gameClasses.hide();

      $gameLoader.show();
      $gameLoader.addClass('fadeIn');

      window.dnd.emitter.emit('dnd-choice-made', $(item.currentTarget).data('api-endpoint'));
    }, 500);
  });

});
