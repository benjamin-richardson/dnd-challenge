'use strict';

import $ from 'jquery';
import List from 'list.js';
import doT from 'doT';

export default class GameController {
  constructor() {
    let _self = this;

    // Summary panel room template
    this.classCardTemplate;

    if(document.getElementById('class-card-template') !== null) {
      this.classCardTemplate = doT.template(document.getElementById('class-card-template').innerHTML.trim());
    } else {
      console.log('Error: Class card template missing');
    }

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

      let randomClassUrl = `${_self.API_ENDPOINT}${API_START}/${CLASS_NUMBER}`;

      // Call API for class content
      $.ajax(_self.getSettings(randomClassUrl)).done((data) => {
        console.log(data);

        // Transition in game containers
        $('.game-class').show();
        $('.game-class__welcome').fadeIn('800');

        // Set up containers requiring additional API calls first
        let classCardHtml = _self.classCardTemplate(data);

        // Display first round of content
        $('.game-class__container').html(classCardHtml);
        $('.game-loader').css('opacity', '0');

        // Call off for additional second level items
        let subclassApi = $('.subclass').data('api-endpoint') || '';
        $.ajax(_self.getSettings(subclassApi)).done((data) => {
          // Display second round content
          $('.subclass').text(data.desc[0]);
        });

        let startingEquipmentApi = $('.starting-equipment').data('api-endpoint') || '';
        $.ajax(_self.getSettings(startingEquipmentApi)).done((data) => {
          // Display second round content
          console.log('startingEquipmentApi', data);

        });

      });

    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  getSettings(apiUrl) {
    return {
      url: apiUrl,
      type: 'GET',
      cache: true,
      timeout: 10000,
      dataType: 'json'
    };
  }
}
