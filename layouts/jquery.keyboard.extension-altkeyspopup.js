/*! jQuery UI Virtual Keyboard Alt Key Popup v2.0.0 *//*
 * for Keyboard v1.18+ only (2018-04-19)
 *
 * By Rob Garrison (aka Mottie)
 * Licensed under the MIT License
 *
 * Note: Use of `event.key` requires a modern browser
 * (https://caniuse.com/#feat=keyboardevent-key)
*/
/* jshint browser:true, jquery:true, unused:false */
/* global require:false, define:false, module:false */
;( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery' ], factory );
	} else if (
		typeof module === 'object' &&
		typeof module.exports === 'object'
	) {
		module.exports = factory( require( 'jquery' ) );
	} else {
		factory( jQuery );
	}
}( function( $ ) {
'use strict';

	var $keyboard = $.keyboard;

	$.extend( $keyboard.css, {
		altKeyPopup     : 'ui-keyboard-popup',
		altKeyOverlay   : 'ui-keyboard-overlay',
		altKeyPopupOpen : 'ui-keyboard-popup-open'
	});

	$keyboard.altKeys = $.extend({
		a : '\ue300 \ue301 \ue302 \ue303 \ue304 \ue305'
	}, $keyboard.altKeys );

	$.fn.addAltKeyPopup = function( options ) {
		//Set the default values, use comma to separate the settings, example:
		var defaults = {
			// time to hold down a button in ms to trigger a popup
			holdTime : 500,
			// events triggered when popup is visible & hidden
			popupVisible  : 'popup-visible',
			popupHidden   : 'popup-hidden',
			popupPosition : null
		};
		return this.each( function() {
			// make sure a keyboard is attached
			var base = $( this ).data( 'keyboard' );
			if (!base) { return; }

			// variables
			base.altkeypopup_options = $.extend(
				{},
				defaults,
				base.altkeypopup_options, // restore prev options on layout update
				options
			);

			// already initialized
			if ( base.altkeypopup_namespace ) {
				return base.altkeypopup_setup();
			}

			base.altkeypopup_namespace = base.namespace + 'AltKeyPopup';
			base.extensionNamespace.push( base.altkeypopup_namespace );

			base.altkeypopup_setup = function() {
				var timer,
					start = 'mousedown touchstart '
						.split( ' ' )
						.join( base.altkeypopup_namespace + ' ' ),
					end = 'mouseup touchend touchcancel '
						.split( ' ' )
						.join( base.altkeypopup_namespace + ' ' );

				// force disable repeat keys
				base.options.repeatRate = 0;

				// add hold key functionality for popups
				base
					.unbindButton( base.altkeypopup_namespace )
					.bindButton( start, function() {
						clearTimeout( timer );
						var $key = $( this ),
							key = $key.attr( 'data-value' ) || '',
							delay = base.altkeypopup_options.holdTime;
						if ( key in $keyboard.altKeys ) {
							if (delay) {
								timer = setTimeout( function() {
									base.altKeyPopup_popup( key, $key );
								}, delay );
							} else {
								// holdTime set to zero.. don't use a setTimeout
								base.altKeyPopup_popup( key, $key );
							}
						}
					})
					.bindButton( end, function() {
						clearTimeout( timer );
					});

				base.altkeypopup_blockingFlag = false;
				base.$preview
					.unbind(
						'keypress keydown keyup '
						.split( ' ' )
						.join( base.altkeypopup_namespace + ' ' )
						.trim()
					)
					.bind(
						'keypress keydown keyup '
							.split( ' ' )
							.join( base.altkeypopup_namespace + ' ' ),
						function( event ) {
							if ( event.type === 'keyup' ) {
								clearTimeout( timer );
								base.altkeypopup_blockingFlag = false;
								return event.key !== 'Escape';
							}
							var layout = $keyboard.builtLayouts[ base.layout ],
								$key = $( event.target ),
								origKey = event.key,
								key = event.key;

							if ( event.type === 'keydown' && key in $keyboard.altKeys ) {
								// Compare typed key to prevent blocking issues reported in #664
								if ( base.altkeypopup_blockingFlag === origKey ) {
									return false;
								}
								base.altkeypopup_blockingFlag = origKey;
								// return true on initial keydown or keypress never fires
								// then return false to prevent repeat key
								return true;
							}
							if ( base.altkeypopup_blockingFlag ) {
								// find mapped key, if any
								if (
									layout.hasMappedKeys &&
									layout.mappedKeys.hasOwnProperty( key )
								) {
									key = layout.mappedKeys[ key ];
								}
								if ( key in $keyboard.altKeys ) {
									clearTimeout( timer );
									timer = setTimeout( function() {
										if ( base.altkeypopup_blockingFlag === origKey ) {
											base.altKeyPopup_popup( key, $key );
										}
									}, base.altkeypopup_options.holdTime );
								}
								return true;
							}
						}
					);
			};

			base.altKeyPopup_close = function() {
				base.altkeypopup_blockingFlag = false;
				base.altKeyPopup_$overlay = null;
				setTimeout(function() {
					if (base.$keyboard.length) {
						base.$keyboard.removeClass($keyboard.css.altKeyPopupOpen);
						var $el = base.$keyboard.find( '.' + $keyboard.css.altKeyOverlay );
						if ($el) {
							$el.remove();
						}
					}
				}, 1);
				$( document ).unbind( base.altkeypopup_namespace );
				base.$preview.focus();
				// restore ignoreEsc option
				base.options.ignoreEsc = base.altKeyPopup_savedIgnoreEsc;
				// trigger popup hidden event
				base.$el.trigger( base.altkeypopup_options.popupHidden, [ base ] );
			};

			base.altKeyPopup_popup = function( key, $key ) {
				if ( base.$keyboard.find( '.' + $keyboard.css.altKeyOverlay ).length ) {
					return;
				}
				var keys, $container, $keys, positionHoriz, positionVert, top,
					popupWidth, popupHeight, evts,
					kbcss = $keyboard.css,
					data = {
						$kb      : base.$keyboard,
						kbWidth  : base.$keyboard.outerWidth(),
						kbHeight : base.$keyboard.outerHeight(),
						$key     : $key
					};
				// overlay keyboard
				base.altKeyPopup_$overlay =
					$( '<div class="' + kbcss.altKeyOverlay + '" />' )
					.css({
						width : data.kbWidth,
						height: data.kbHeight
					})
					.appendTo( base.$keyboard )
					.bind( 'click touchstart', function() {
						base.altKeyPopup_close();
					});
				evts = 'inactive hidden '
					.split( ' ' )
					.join( base.altkeypopup_namespace + ' ' );
				base.$keyboard.addClass($keyboard.css.altKeyPopupOpen);
				base.$el.unbind( evts ).bind( evts, function() {
					base.altKeyPopup_close();
				});

				// remove character added when key was initially pressed, unless it
				// was a backspace key
				if ( key !== 'bksp' ) {
					$keyboard.keyaction.bksp( base );
				}

				// make popup; use the same classes as the keyboard container
				$container = $(
					'<div class="' + kbcss.altKeyPopup + ' ' +
					base.options.css.container + '" />'
				);
				keys = $keyboard.altKeys[ key ].split( /\s+/ );
				// make popup keys
				base.buildRow( $container, 0, keys, [] );
				// add popup & add bindings
				$keys = $container
					.appendTo( base.altKeyPopup_$overlay )
					.children()
					.bind( 'mousedown touchstart', function() {
						// action/value now processed by core functions
						base.altKeyPopup_close();
					})
					.bind( 'mouseover mouseleave', function( event ){
						// remove hover from physical keyboard highlighted key
						$keys.removeClass( base.options.css.buttonHover );
						if ( event.type !== 'mouseleave' ) {
							$( this ).addClass( base.options.css.buttonHover );
						}
					});

				// popup opened... add key highlight
				base.altKeyPopup_navigate( true ); // init
				// set ignoreEsc to allow escape to ONLY close the popup
				base.altKeyPopup_savedIgnoreEsc = base.options.ignoreEsc;
				base.options.ignoreEsc = true;
				$( document )
					.unbind( base.altkeypopup_namespace )
					.bind( 'keydown' + base.altkeypopup_namespace, function() {
						// keep home & end from scrolling the page
						return false;
					})
					.bind( 'keyup' + base.altkeypopup_namespace, function( event ) {
						if ( event.key === 'Escape' ) {
							event.which = 0; // prevent escClose from closing the keyboard
							base.altKeyPopup_close();
						} else {
							base.altKeyPopup_navigate( event );
						}
						return false;
					});

				data.$popup = $container;
				popupWidth = $container.outerWidth();

				// position popup within $keyboard container
				positionHoriz = $key.position().left - popupWidth / 2;
				if ( positionHoriz + popupWidth > data.kbWidth ) {
					positionHoriz = data.kbWidth - popupWidth;
					if ( positionHoriz < 0 ) {
						$container.css({
							width : data.kbWidth,
							height : 'auto'
						});
					}
				}
				positionVert = $key.position().top - $key.outerHeight() - 5;
				popupHeight = $container.outerHeight();
				// find top of keyset (don't cover up the preview input)
				top = base.$keyboard.find( '.' + kbcss.keySet ).position().top;
				if ( positionVert + popupHeight > data.kbHeight ) {
					positionVert = data.kbHeight - popupHeight;
					if ( positionVert < top ) {
						$container.css({
							height : data.popupHeight,
							width : 'auto'
						});
					}
				}

				data.popupWidth = $container.outerWidth();
				data.popupHeight = $container.outerHeight();
				data.popupLeft = positionHoriz < 0 ? 0 : positionHoriz;
				data.popupTop = positionVert < top ? top : positionVert;

				$container.css({
					position : 'absolute',
					left : data.popupLeft,
					top : data.popupTop
				});

				// adjust position as needed using popupPosition callback function
				if ( typeof base.altkeypopup_options.popupPosition === 'function' ) {
					base.altkeypopup_options.popupPosition(base, data);
				}

				base.$preview.blur();
				// trigger popup visible event
				base.$el.trigger( base.altkeypopup_options.popupVisible, [ base ] );
			};

			base.altKeyPopup_navigate = function( event ) {
				var indx,
					kbcss = $keyboard.css,
					k = $keyboard.navigationKeys,
					hover = base.options.css.buttonHover,
					$keys = base.$keyboard
						.find( '.' + kbcss.altKeyPopup )
						.find( '.' + kbcss.keyButton ),
					max = $keys.length - 1;
				// popup visible, add key highlight
				if ( event === true ) {
					$keys.eq( 0 ).addClass( hover );
					base.altKeyPopup_currentIndex = 0;
					return;
				}

				indx = base.altKeyPopup_currentIndex;
				if ( event.key === 'Enter' ) {
					base.insertText( $keys.eq( indx ).attr( 'data-value' ) );
					base.altKeyPopup_close();
					return true;
				}

				switch( event.key ) {
					case 'End': indx = max; break;
					case 'Home': indx = 0; break;
					case 'ArrowLeft': indx -= 1; break;
					case 'ArrowRight': indx += 1; break;
				}
				if ( indx < 0 ) { indx = 0; }
				if ( indx > max ) { indx = max; }
				base.altKeyPopup_currentIndex = indx;
				$keys
					.removeClass( hover )
					.eq( indx )
					.addClass( hover );
			};

			// visible event is fired before this extension is initialized, so check!
			if ( base.options.alwaysOpen && base.isVisible() ) {
				base.altkeypopup_setup();
			}
			// setup altkey popup
			base.$el
				.unbind(
					$keyboard.events.kbBeforeVisible + base.altkeypopup_namespace
				)
				.bind(
					$keyboard.events.kbBeforeVisible + base.altkeypopup_namespace,
					function() {
						base.altkeypopup_setup();
					}
				);

		});
	};

}));
