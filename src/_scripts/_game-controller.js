'use strict';

import $ from 'jquery';
import List from 'list.js';
import doT from 'doT';

import Card from 'card/card';

export default class GameController {
  constructor() {
    let _self = this;
    const API_START = 'classes';

    this.cardClass = new Card();
    this.getTemplates();

    window.dnd.emitter.on('dnd-game-start', function(){
      // Set random class
      const TOTAL_DND_CLASSES = 12; // Just going to code this value as it donesnt change much
      const CLASS_NUMBER = _self.getRandomInt(1, TOTAL_DND_CLASSES);

      let randomClassUrl = `${_self.API_ENDPOINT}${API_START}/${CLASS_NUMBER}`;
      _self.getShowClass(randomClassUrl);

    });

    window.dnd.emitter.on('dnd-game-start-choice', function(){
      // Show all classes

      let allClassUrl = `${_self.API_ENDPOINT}${API_START}`;
      _self.getShowAllClasses(allClassUrl);

    });

    window.dnd.emitter.on('dnd-choice-made', function(choiceId){

      let dndClassUrl = `${_self.API_ENDPOINT}${API_START}/${choiceId}`;
      _self.getShowClass(dndClassUrl);

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

  getTemplates() {
    // Card template
    this.classCardTemplate;

    if(document.getElementById('class-card-template') !== null) {
      this.classCardTemplate = doT.template(document.getElementById('class-card-template').innerHTML.trim());
    } else {
      console.log('Error: Class card template missing');
    }

    // Card select template
    this.classCardSelectTemplate;

    if(document.getElementById('class-card-select-template') !== null) {
      this.classCardSelectTemplate = doT.template(document.getElementById('class-card-select-template').innerHTML.trim());
    } else {
      console.log('Error: Class card select template missing');
    }

    this.API_ENDPOINT = $('.js-api').data('api-endpoint');

    if(this.API_ENDPOINT === undefined) {
      console.error('Error: API endpoint not defined');
      return;
    }
  }

  getShowAllClasses(classUrl) {
    let _self = this;

    $.ajax(_self.getSettings(classUrl)).done((data) => {
      console.log(data);

      // Transition in game containers
      $('.game-classes').show();
      $('.game-classes__instructions').fadeIn('800');

      let dndClassChoiceHtml = '';

      data.results.forEach(function(dndClass){
        dndClassChoiceHtml += `<a class="chip" data-api-endpoint="${dndClass.url}">${dndClass.name}</a>`;
      });

      let $gameContainer = $('.game-classes__container');
      $gameContainer.html(dndClassChoiceHtml);
      $gameContainer.fadeIn();
      $('.game-loader').css('opacity', '0');

    });
  }

  getShowClass(classUrl) {
    let _self = this;
    // Call API for class content
    $.ajax(_self.getSettings(classUrl)).done((data) => {
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
        console.log('subclassApi', data);

        $('.subclass').text(data.desc[0]);
      });

      let startingEquipmentApi = $('.starting-equipment').data('api-endpoint') || '';
      $.ajax(_self.getSettings(startingEquipmentApi)).done((data) => {
        // Display second round content
        console.log('startingEquipmentApi', data);

        // Add in default starting items
        let defaultStartingEquipmentHtml = '';
        data.starting_equipment.forEach(element => {
          defaultStartingEquipmentHtml += `<div class="chip">${element.item.name} x ${element.quantity}</div>`;
        });

        $('.starting-equipment').prepend(defaultStartingEquipmentHtml);


        let startingEquipmentChoices = '',
          choiceInitValues = [],
          dropDownData = [];

        // Add in choices
        for(let i = 0; i <= data.choices_to_make; i++) {
          let indexString = String(i+1);
          if(data[`choice_${indexString}`] !== undefined) {
            startingEquipmentChoices += _self.classCardSelectTemplate({'index': indexString});

            dropDownData = data[`choice_${indexString}`].reduce(function(concatArrays, choices) {
              return choices.from.concat(concatArrays);
            },[]);
          }

          choiceInitValues.push(dropDownData);
        }

        // Set up select and initialise
        $('.starting-equipment .starting-equipment__selects').html(startingEquipmentChoices);
        choiceInitValues.forEach(function(equipment, index) {
          let dropDownDataFormatted = {};

          equipment.forEach(function(item){
            dropDownDataFormatted[item.item.name] = null;
          });

          _self.cardClass.initialiseInput($('#starting-item-input-' + (index + 1)), dropDownDataFormatted);
        });

      });

    });
  }
}
