 $(document).ready(function() {
  $('#main_keyboard').keyboard({
      layout: 'AR-Latin',
      usePreview: false,
      acceptValid: true,
      validate: function (kb, val) {
          return val.length > 3;
      }
  })
  // activate the typing extension
  .addTyping({
      showTyping: true,
      delay: 250
  }).previewKeyset({
    'sets': ['normal', 'shift']
  }).addAltKeyPopup({
    // time to hold down a button in milliseconds to trigger a popup
    holdTime : 500,
    // events triggered when popup is visible & hidden
    popupVisible  : 'popup-visible',
    popupHidden   : 'popup-hidden',
    // optional reposition popup callback function
    popupPosition : function(keyboard, data) {
      console.log(data);
      /*
      {
        $kb         : Keyboard element (jQuery object),
        $key        : Clicked key element (jQuery object),
        $popup      : Popup container (jQuery object),
        kbHeight    : Keyboard element outer height,
        kbWidth     : Keyboard element outer width,
        popupHeight : Popup container height,
        popupWidth  : Popup container width,
        popupLeft   : Popup container left position,
        popupTop    : Popup container top position
      }
      example (shift popup left 100px):
      data.$popup.css('left', data.popupLeft - 100);
      */
    }
  });

  console.log($.keyboard.altKeys)
});



$.keyboard.keyaction.enter = function (base) {
  console.log(base.el.value)
  var v = document.getElementById('main_keyboard');
  v.select()
  document.execCommand('copy');

}
