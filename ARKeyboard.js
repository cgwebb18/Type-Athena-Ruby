//The person who maintains this library does two keyboards this way:
//https://jsfiddle.net/Mottie/xkk95vf6/
//I didn't do it this way so that I could take advantage of the previewkeyset func

$(function(){

  // var f_string = '';
  // var remapGreek = {
  //   'a': '\u0391', 'b': '\u0392', 'c': '\u03a8', 'd': '\u0393', 'e': '\u03a1',
  //   'f': '\u03a6', 'g': '\u0393', 'h': '\u0397', 'i': '\u0399', 'j': '\u039e',
  //   'k': '\u039a', 'l': '\u039b', 'm': '\u039c', 'n': '\u039d', 'o': '\u039f',
  //   'p': '\u03a0', 'q': '\u0313', 'r': '\u0395', 's': '\u03a3', 't': '\u03a4',
  //   'u': '\u0398', 'v': '\u03a9', 'w': '\u03da', 'x': '\u03a7', 'y': '\u03a5',
  //   'z': '\u0396'
  // }
  //To Do: Add Greek Alt Keys
  $.extend($.keyboard.altKeys = AR_altKeys);
  //using enter and alt because they are common to both keyboards
  $.extend($.keyboard.keyaction.enter = function(base){
      var t = document.getElementsByClassName('ui-keyboard-preview')[0];
      console.log(t);
      t.focus();
      t.select();
      document.execCommand('copy');
      f_str = '';
  });
  $.extend($.keyboard.keyaction.shift = function(base){
    if(base.options.layout == 'AR_L'){
      base.redraw('AR_G').caret('end');
    }
    else {
      base.redraw('AR_L').caret('end');
    }

  });
  //changing language copies current text into new input and hides old input + kb
  $.keyboard.keyaction.test = function(base){
    console.log(base);
  };

  var kb = $('#l_kb').keyboard({
  	layout: 'AR_L',
    stayOpen: true,
  	repeatRate : 0,
    combos : AR_combos,
    display : {
      'enter' : 'Copy',
      'shift' : 'Greek',
      'extender' : ' :Toggle Pad',
      'test': 'TEST'
    },
    // beforeInsert: function(e, keyboard, el, textToAdd) {
    //   return keyboard.altActive ?
    //     // don't remap if alt is active
    //     textToAdd :
    //     // remap at all other times, but fallback
    //     // for un-remapped values
    //     remapGreek[textToAdd] || textToAdd;
    // }
  }).addTyping({
      showTyping: true,
      delay: 1000,
      hoverDelay: 990
  }).previewKeyset({
    'sets': ['normal', 'alt']
  }).addAltKeyPopup({
  	holdTime : 500,
  	popupVisible : 'popup-visible',
    popupPosition : function(keyboard, data) {
      data.$popup.css('left', data.popupLeft - 200);
    }
  }).addExtender({
    // choose any layout
    layout: 'Extender1',
    // start with extender showing?
    showing: false,
    // reposition keyboard after toggling extender layout
    reposition: true
  });;


});
