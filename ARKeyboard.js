//The person who maintains this library does two keyboards this way:
//https://jsfiddle.net/Mottie/xkk95vf6/
//I didn't do it this way so that I could take advantage of the previewkeyset func

$(function(){
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
      $('.ui-keyboard-shift').text('Latin');
    }
    else {
      base.redraw('AR_L').caret('end');
      $('.ui-keyboard-shift').text('Greek');
    }

  });

  $.extend($.keyboard.keyaction, {
    diacritic : function(base){
      base.$keyboard.addExtender({
        layout: 'Diacritics'
      }).addAltKeyPopup();
    },
    g_ligatures : function(base){
      base.$keyboard.addExtender({
        layout : 'GreekLigatures'
      });
    },
    l_ligatures : function(base){
      base.$keyboard.addExtender({
        layout : 'LatinLigatures'
      });
    },
    superscripts : function(base){
      base.$keyboard.addExtender({
        layout : 'Superscripts'
      });
    },
    lines : function(base){
      base.$keyboard.addExtender({
        layout : 'Lines'
      });
    },
    dots : function(base){
      base.$keyboard.addExtender({
        layout : 'Dots'
      });
    },
    symbols : function(base){
      base.$keyboard.addExtender({
        layout : 'Symbols'
      });
    }
  });

  var kb = $('#l_kb').keyboard({
  	layout: 'AR_L',
    stayOpen: true,
  	repeatRate : 0,
    display : {
      'enter' : 'Copy',
      'shift' : 'Greek',
      'extender' : ' :Toggle Pad',
      'diacritic': 'dia',
      'g_ligatures' : 'lg1',
      'l_ligatures' : 'lg2',
      'lines' : 'lin',
      'dots' : 'dot',
      'symbols' : 'sym',
      'superscripts' : 'sup'
    }
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
    layout: 'Diacritics',
    // start with extender showing?
    showing: false,
    // reposition keyboard after toggling extender layout
    reposition: true
  });;


});
