'use strict';

import $ from 'jquery';
import List from 'list.js';
import doT from 'doT';

export default class GameController {
  constructor() {
    let _self = this;

    this.API_ENDPOINT = $('.js-api').data('api-endpoint');

    if(this.API_ENDPOINT === undefined) {
      console.error('Error: API endpoint not defined');
      return;
    }

    const API_START = 'classes';

    // Set random class
    const TOTAL_DND_CLASSES = 12; // Just going to code this value as it donesnt change much
    const CLASS_NUMBER = this.getRandomInt(1, TOTAL_DND_CLASSES);

    window.dnd.emitter.on('dnd-game-start', function(){

      let randomClassUrl = `${API_START}/${CLASS_NUMBER}`;

      $.ajax(_self.getSettings(randomClassUrl)).done((data) => {
        console.log(data);

        // Transition in game containers
        $('.game-class').show();


        // Call API for class content

        // Set up containers requiring additional API calls first

        // Display first round of content

        // Call off for additional second level items

        // Display second round content

      });

    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  getSettings(subChannel) {
    return {
      url: this.API_ENDPOINT + subChannel,
      type: 'GET',
      cache: true,
      timeout: 10000,
      dataType: 'json'
    };
  }
}
