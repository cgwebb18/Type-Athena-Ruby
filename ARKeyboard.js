 $(document).ready(function() {
  $('#keyboard').keyboard({
      layout: 'qwerty',
    //   customLayout: {
    //       'lang' : ['bg'],
  	// 'normal' : [
  	// 	"` \ue100 3 4 5 6 7 8 9 0 - = {bksp}",
  	// 	"{tab} q w e r t y u i o p [ ] \\",
  	// 	"a s d f g h j k l ; ' {enter}",
  	// 	"{shift} z x c v b n m , . / {shift}",
  	// 	"{accept} {alt} {space} {alt} {cancel}"
  	// ],
  	// 'shift' : [
  	// 	'~ ! @ # $ % ^ & * ( ) _ + {bksp}',
  	// 	"{tab} Q W E R T Y U I O P { } |",
  	// 	'A S D F G H J K L : " {enter}',
  	// 	"{shift} Z X C V B N M < > ? {shift}",
  	// 	"{accept} {alt} {space} {alt} {cancel}"
  	// ],
  	// 'alt' : [
  	// 	'` 1 2 3 4 5 6 7 8 9 0 - . {bksp}',
  	// 	"{tab} , \u0443 \u0435 \u0438 \u0448 \u0449 \u043a \u0441 \u0434 \u0437 \u0446 ; (",
  	// 	"\u044c \u044f \u0430 \u043e \u0436 \u0433 \u0442 \u043d \u0432 \u043c \u0447 {enter}",
  	// 	"{shift} \u044e \u0439 \u044a \u044d \u0444 \u0445 \u043f \u0440 \u043b \u0431 {shift}",
  	// 	"{accept} {alt} {space} {alt} {cancel}"
  	// ],
  	// 'alt-shift' : [
  	// 	'~ ! ? + " % = : / _ \u2116 I V {bksp}',
  	// 	"{tab} \u044b \u0423 \u0415 \u0418 \u0428 \u0429 \u041a \u0421 \u0414 \u0417 \u0426 \u00a7 )",
  	// 	"\u042c \u042f \u0410 \u041e \u0416 \u0413 \u0422 \u041d \u0412 \u041c \u0427 {enter}",
  	// 	"{shift} \u042e \u0419 \u042a \u042d \u0424 \u0425 \u041f \u0420 \u041b \u0411 {shift}",
  	// 	"{accept} {alt} {space} {alt} {cancel}"
  	// ]
    //   },
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
  }).addExtender({
      layout: 'numpad',
      showing: false,
      reposition: true
  })

});

$.keyboard.keyaction.enter = function (base) {

  var v = document.getElementById('keyboard');
  v.select()
  document.execCommand('copy');

}
