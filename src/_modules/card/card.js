'use strict';

export default class Card {
  constructor() {

    // // Initialise Auto Complete
    // $('input.autocomplete').autocomplete({
    //   data: {
    //     'Apple': null,
    //     'Microsoft': null,
    //     'Google': 'https://placehold.it/250x250'
    //   },
    //   limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    //   onAutocomplete: function(val) {
    //     // Callback function when value is autcompleted.
    //   },
    //   minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    // });

  }

  initialiseInput($node, data) {
    // Initialise Auto Complete
    node.autocomplete({
      data: data,
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) {
        // Callback function when value is autcompleted.
      },
      minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
  }
}
