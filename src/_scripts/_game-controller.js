'use strict';

import $ from 'jquery';
import List from 'list.js';
import doT from 'doT';

export default class GameController {
  constructor() {

    this.API_ENDPOINT = $('.js-api').data('api-endpoint');

    if(this.API_ENDPOINT === undefined) {
      console.error('Error: API endpoint not defined');
      return;
    }

    const API_START = 'classes';

    // Set random class
    const TOTAL_DND_CLASSES = 12; // Just going to code this value as it donesnt change much
    this.classNumber = this.getRandomInt(1, TOTAL_DND_CLASSES);

    window.AD.emitter.on('dnd-game-start', function(){

      // Transition in game containers

      // Call API for class content

      // Set up containers requiring additional API calls first

      // Display first round of content

      // Call off for additional second level items

      // Display second round content

    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  getSettings(subChannel) {
    return {
      url: this.API_ENDPOINT,
      type: 'GET',
      cache: true,
      timeout: 10000,
      dataType: 'json'
    };
  }
}
