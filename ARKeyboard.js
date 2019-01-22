

$(function(){
  // $.extend( $.keyboard.altKeys, AR_altKeys);
		$('#main_keyboard').keyboard({
			layout: 'AR-Latin',
			repeatRate : 0,
      combos : AR_combos,
      display : {
        'combo' : 'Combos',
        'meta1' : 'Greek'
      }
		}).addTyping({
        showTyping: true,
        delay: 1000,
        hoverDelay: 990
    }).previewKeyset({
      'sets': ['normal', 'shift']
    }).addAltKeyPopup({
			// time to hold down a button in ms to trigger a popup
			holdTime : 500,
			// event triggered when popup is visible
			// access the overlay from keyboard.altKeyPopup_$overlay
			// or the keys container from keyboard.altKeyPopup_$overlay.find('.ui-keyboard-popup')
			// or the keys from keyboard.altKeyPopup_$overlay.find('.ui-keyboard-button')
			popupVisible : 'popup-visible'
		});
    $.keyboard.altKeys = AR_altKeys;
	});

$.keyboard.keyaction.meta1 = function (base) {
  var keyboard = $('#main_keyboard');
  keyboard.showKeySet('meta1');
};

$.keyboard.keyaction.enter = function (base) {
  console.log(base.el.value)
  var v = document.getElementById('main_keyboard');
  v.select()
  document.execCommand('copy');
};
