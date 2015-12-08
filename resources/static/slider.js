(function ($) {
	"use strict";

	$.fn.adcSlider = function adcSlider(options) {

		(options.width = options.width || 400);
		(options.height = options.height || "auto");
		(options.animate = Boolean(options.animate));
		(options.autoForward = Boolean(options.autoForward));
		(options.minValue = options.minValue || 0);
		(options.maxValue = options.maxValue || 10);
		(options.unitStep = options.unitStep || 1);
		(options.sliderDirection = options.sliderDirection || "ltr");

		// Delegate .transition() calls to .animate() if the browser can't do CSS transitions.
		if (!$.support.transition) $.fn.transition = $.fn.animate;

		var $container = $(this),
			hideHandle = Boolean(options.hideHandle),
			showValue = Boolean(options.showValue),
			isSingle = Boolean(options.isSingle),
			isInLoop = Boolean(options.isInLoop),
			dkSingle = Boolean(options.dkSingle),
			useHandleImage = Boolean(options.useHandleImage),
			handleImagePath = options.handleImagePath,
			handleImageWidth = options.handleImageWidth,
			handleImageHeight = options.handleImageHeight,
			hideHandleBG = Boolean(options.hideHandleBG),
			leftLabelText = Boolean(options.leftLabelText),
			rightLabelText = Boolean(options.rightLabelText),
			displayLabelText = (options.displayLabelText == "block") ? true : false,
			labelPlacement = options.labelPlacement,
			showMarkers = Boolean(options.showMarkers),
			interconnection = Boolean(options.interconnection),
			sliderOrientation = options.sliderOrientation,
			valuesArray = new Array(),
			iteration = 0,
			total_images = $container.find("img").length,
			unitDP = decimalPlaces(options.unitStep),
			images_loaded = 0;


		$(this).css({'max-width':options.maxWidth,'width':options.controlWidth});
		/*if ( isInLoop ) $(this).parents('.controlContainer').css({'width':'100%','overflow':'hidden'});*/

		if ( options.controlAlign === "center" ) {
			$(this).parents('.controlContainer').css({'text-align':'center'});
			$(this).css({'margin':'0px auto'});
		} else if ( options.controlAlign === "right" ) {
			$(this).css({'margin':'0 0 0 auto'});
		}

		// Global variables
		var $container = $(this),
			items = options.items;

		// Check for DK
		var DKID = items[0].element.attr('id').replace(/[^0-9]/g, ''),
			hasDK = ( $('input[name="M' + DKID + ' -1"]').size() > 0 ) ? true : false;
		if ( hasDK ) {
			$('input[name="M' + DKID + ' -1"]').hide().next('span').hide();
			$('#cpt' + DKID + '_-1').hide();
		} else if ( !hasDK && !dkSingle ) $(this).find('.dk').hide();

		if ( isSingle ) {
			if ( isSingle && !isInLoop ) {
				for ( var i=0; i<items.length; i++ ) {
					valuesArray.push(items[i].value);
				}
			} else {
				var allValuesArray = items[0].allValues.split(",");
				for ( var i=0; i<allValuesArray.length; i++ ) {
					valuesArray.push( parseInt( allValuesArray[i] ) );
				}
			}
			//options.minValue = 1,
			//options.maxValue = isInLoop ? parseInt(options.minValue) + (parseInt(options.maxValue) - parseInt(options.minValue)) : parseInt(options.minValue) + (items.length - 1),
			options.maxValue = isInLoop ? parseInt(options.minValue) + (allValuesArray.length - 1) : parseInt(options.minValue) + (items.length - 1),
			options.unitStep = 1;
		}

		if ( isSingle && dkSingle ) {
			options.maxValue = parseInt(options.maxValue) - 1;
			$(this).find('.dk').attr('data-value',valuesArray[valuesArray.length-1]);
		}

		// Check for images and resize
		$container.find('.caption img').each(function forEachImage() {
			var size = {
				width: $(this).width(),
				height: $(this).height()
			};

			if (options.forceImageSize === "height" ) {
				if ( size.height > parseInt(options.maxImageHeight,10) ) {
					var ratio = ( parseInt(options.maxImageHeight,10) / size.height);
					size.height *= ratio,
					size.width  *= ratio;
				}
			} else if (options.forceImageSize === "width" ) {
				if ( size.width > parseInt(options.maxImageWidth,10) ) {
					var ratio = ( parseInt(options.maxImageWidth,10) / size.width);
					size.width  *= ratio,
					size.height *= ratio;
				}

			} else if (options.forceImageSize === "both" ) {
				if ( parseInt(options.maxImageHeight,10) > 0 && size.height > parseInt(options.maxImageHeight,10) ) {
					var ratio = ( parseInt(options.maxImageHeight,10) / size.height);
					size.height *= ratio,
					size.width  *= ratio;
				}

				if ( parseInt(options.maxImageWidth,10) > 0 && size.width > parseInt(options.maxImageWidth,10) ) {
					var ratio = ( parseInt(options.maxImageWidth,10) / size.width);
					size.width  *= ratio,
					size.height *= ratio;
				}

			}
			$(this).css(size);
		});

		// Run noUiSlider
		for ( var i=0; i<(isSingle && !isInLoop ? 1 : items.length); i++ ) {

			var $input = items[i].element,
				handleValue = roundToStep($input.val()) >= 0 ? ( isSingle ? $.inArray(roundToStep($input.val()), valuesArray) + roundToStep(options.minValue) : roundToStep($input.val()) ) : Math.floor((roundToStep(options.minValue) + roundToStep(options.maxValue))/2 );

			if ( isSingle && dkSingle ) {
				if ( ($.inArray(roundToStep($input.val()), valuesArray) + roundToStep(options.minValue)) > options.maxValue ) {
					handleValue = Math.floor((roundToStep(options.minValue) + roundToStep(options.maxValue))/2);
				}
			}
			if(interconnection){
				handleValue = roundToStep($input.val()) >= 0 ? roundToStep($input.val()) : Math.floor(roundToStep(options.minValue));
			}

			$(this).find('.noUiSlider').eq(i).noUiSlider({
				range: {'min':[options.minValue], 'max':[options.maxValue]},
				start: handleValue,
				step: options.unitStep, // step in range fore each point
				behaviour: 'tap-drag',
				orientation: options.sliderOrientation, // or 'vertical'
				direction: options.sliderDirection == 'ltr' ? 'ltr' : 'rtl'
			}).on({
				set : function() {

					if ( isInLoop ) iteration = $(this).parents('.sliderContainer').data('iteration');

					var $container = $(this).parents('.sliderContainer'),
						$input = items[iteration].element;
					if ( isSingle && !isInLoop )
						$input.val( items[ roundToStep( $(this).val() - roundToStep(options.minValue) ) ].value );
					else if ( isSingle && isInLoop )
						$input.val( valuesArray[ ( roundToStep($(this).val()) - roundToStep(options.minValue) ) ] );
					else
						$input.val( roundToStep( $(this).val() ) );

					$('.focused').removeClass('focused');


					if(!interconnection){ // (the interaction is bad with interconnected sliders, the handles will be shown on slide, not on set)
						// make handle visible and add focus
						$(this).parents('.controlContainer').find('.slider').eq(iteration).addClass('focused').find('.noUi-handle').show();


						// set slider base colour once selected
						$container.addClass('selected');
					}

					if (showValue) {
						var element = $(this).parents('.controlContainer'),
							handleValue = isSingle ? $.inArray(roundToStep($input.val()), valuesArray) + roundToStep(options.minValue) : roundToStep($input.val());

						element.find('.handleValue').eq(iteration).css('padding-top', '');
						element.find('.noUi-handle').eq(iteration).html( "<div class='handleValue'>" + handleValue + "</div>" );
						var topAdj = Math.ceil( ( element.find('.noUi-handle').eq(iteration).height() - element.find('.handleValue').eq(iteration).outerHeight() ) * 0.5 );
						element.find('.handleValue').eq(iteration).css('padding-top', topAdj + 'px');
					}

					$(this).parents('.sliderContainer').find('.dk').removeClass('selected');

				},
				slide : function() {
					if ( isInLoop ) iteration = $(this).parents('.sliderContainer').data('iteration');
					if (showValue) {
						var element = $(this).parents('.controlContainer'),
							handleValue = isSingle ?
								( isInLoop ? roundToStep($(this).val()) : $.inArray(roundToStep(items[ roundToStep( $(this).val() - roundToStep(options.minValue) ) ].value), valuesArray) + roundToStep(options.minValue) )
								: roundToStep(roundToStep( $(this).val() ));
							//handleValue = isSingle ? $.inArray(parseInt($(this).val()), valuesArray) + parseInt(options.minValue) : parseInt($(this).val());

						element.find('.handleValue').eq(iteration).css('padding-top', '');
						element.find('.noUi-handle').eq(iteration).html( "<div class='handleValue'>" + handleValue + "</div>" );
						var topAdj = Math.ceil( ( element.find('.noUi-handle').eq(iteration).height() - element.find('.handleValue').eq(iteration).outerHeight() ) * 0.5 );
						element.find('.handleValue').eq(iteration).css('padding-top', topAdj + 'px');
					}

					$(this).parents('.sliderContainer').eq(iteration).find('.dk').removeClass('selected');

					if(interconnection){ // (show the handles on slide, not on set)
						$(this).parents('.controlContainer').find('.slider').eq(iteration).addClass('focused').find('.noUi-handle').show();
					}
				},
				change : function(){
				}
			})

			if ( showMarkers ) {
				$(this).find('.noUiSlider').eq(i).noUiSlider_pips({
					mode: 'steps',
					density: 10
				});
				if ( sliderOrientation == 'horizontal' ) {
					$(this).find('td.sliderDK').css('padding-top','40px');
					var pipsWidth = $(this).find('.noUiSlider').width(),
						pipsMargin = $(this).find('.noUi-handle').width()/2;
					$(this).find('.noUi-pips').css({'width':pipsWidth+'px','left':pipsMargin+'px'});
				} else {
					var pipsWidth = $(this).find('.noUiSlider').height(),
						pipsMargin = $(this).find('.noUi-handle').height()/2;
					$(this).find('.noUi-pips').css({'height':pipsWidth+'px','top':pipsMargin+'px'});
				}
			}

			if ( isSingle && dkSingle ) {
				if ( ($.inArray(parseInt($input.val()), valuesArray) + parseInt(options.minValue)) > options.maxValue ) {
					$(this).find('.sliderContainer').eq(i).find('.noUi-handle').hide();
					$(this).find('.sliderContainer').eq(i).find('.dk').addClass('selected');
					$(this).find('.sliderContainer').eq(i).addClass('selected');
				}
			}

		}

		// use handle for image?
		if ( useHandleImage ) {
			$container.find('.noUi-handle').css({'cssText': 'background-image:url('+options.handleImagePath+') !important', 'background-size':'100% 100%', 'background-position':'center'});
			if ( options.handleImageWidth != '' ) $container.find('.noUi-handle').width(options.handleImageWidth);
			if ( options.handleImageHeight != '' ) {
				$container.find('.noUi-handle').height(options.handleImageHeight);
				var newHeight = (parseInt(options.handleImageHeight))/2 - parseInt($('.noUi-base').height() )/2,
					newWidth  = parseInt(options.handleImageHeight)/2;
				$container.find('.noUi-horizontal .noUi-handle').css({'top': '-' + newHeight + 'px','left': '-' + newWidth + 'px'});
			}
		}

		//*//
		$('.noUi-handle').click(function () { $(this).parents('.slider').addClass('focused'); })
		//$container.delegate('.responseItem', 'click'
		// If showValue then show on handle
		for ( var i=0; i<items.length; i++ ) {

			var $input = items[i].element;

			// If slide has value change base colour by adding class
			if ( roundToStep($input.val()) >= 0 ) $(this).find('.sliderContainer').eq(i).addClass('selected');

			if (showValue) {

				var element = $(this).parents('.controlContainer'),
					handleValue = roundToStep($input.val()) >= 0 ? ( isSingle ? $.inArray(roundToStep($input.val()), valuesArray) + roundToStep(options.minValue) : roundToStep($input.val()) ) : '';

				element.find('.handleValue').eq(i).css('padding-top', '');
				element.find('.noUi-handle').eq(i).html( "<div class='handleValue'>" + ( handleValue >= 0 ? handleValue : '' ) + "</div>" );
				var topAdj = Math.ceil( ( element.find('.noUi-handle').eq(i).height() - element.find('.handleValue').eq(i).outerHeight() ) * 0.5 );
				element.find('.handleValue').eq(i).css('padding-top', topAdj + 'px');
			}

			if ( $input.val() == -1 ) {
				var DKID = items[0].element.attr('id').replace(/[^0-9]/g, '');
				if ( $('input[name="M' + DKID + ' -1"]').prop('checked') ) {
					$(this).find('.sliderContainer').eq(i).find('.noUi-handle').hide();
					$(this).find('.sliderContainer').eq(i).find('.dk').addClass('selected');
				}
			}
		}

		$( window ).resize(function() {
			$('.sliderLabel').outerHeight('');
			layoutAdjust();
		});
		layoutAdjust();

		function adjustLabelHeight(target) {
			var $target = $container.find(target);

			var maxLabelHeight = Math.max.apply( null, $target.map( function () {
				return $( this ).outerHeight();
			}).get() );

			// check each and adjust if smaller
			$container.find(target).each(function(index, element) {
                if ( $(this).outerHeight() < maxLabelHeight ) $(this).outerHeight(maxLabelHeight);
            });

		}

		function layoutAdjust() {
			//if ( $(window).width() < parseInt(options.labelWidth) * 3 && options.sliderOrientation == 'horizontal' ) {

			$('.leftLabel, .rightLabel').width('');
			if ( ($(window).width() < ($('.leftLabel').outerWidth(true) + $('.rightLabel').outerWidth(true)) || $(window).width() < 400) && options.sliderOrientation == 'horizontal' && displayLabelText ) {
				// too small
				// hide labels
				$('.leftLabel, .rightLabel').hide();
				// get control container width
				var widthDiff = $('.leftLabel').outerWidth(true) - $('.leftLabel').innerWidth(),
					availableWidth = ($container.outerWidth() - (widthDiff * 2))/2;

				//alert ( displayLabelText);
				if ( !leftLabelText && !rightLabelText ) colspan = 1;
				else if ( leftLabelText && !rightLabelText ) {
					if ( labelPlacement == "side" ) {
						$('.sliderMiddle td:nth-child(1)').hide();
					}
					$('.sliderMiddle td:nth-child(2)').attr('colspan',2);
					$('.sliderMiddle td:nth-child(1)').hide();
					$('.sliderMiddle td:nth-child(2)').show();
					if ( hasDK ) $('.sliderDK').attr('colspan',2);
				} else if ( !leftLabelText && rightLabelText ) {
					if ( labelPlacement == "side" ) {
						$('.sliderMiddle td:nth-child(2)').hide();
					}
					$('.sliderMiddle td:nth-child(1)').attr('colspan',2);
					$('.sliderMiddle td:nth-child(1)').show();
					$('.sliderMiddle td:nth-child(2)').hide();
					if ( hasDK ) $('.sliderDK').attr('colspan',2);
				} else {
					if ( labelPlacement == "side" ) {
						$('.sliderMiddle td:nth-child(1)').hide();
						$('.sliderMiddle td:nth-child(3)').hide();
					}
					$('.sliderMiddle td:nth-child(2)').attr('colspan',3);
					//$('.sliderMiddle td:nth-child(1)').show();
					//$('.sliderMiddle td:nth-child(3)').show();
					if ( hasDK ) $('.sliderDK').attr('colspan',3);
				}
				$('.sliderTop .leftLabel, .sliderTop .rightLabel').show();


				$('.sliderBottom .leftLabel, .sliderBottom .rightLabel').width(availableWidth + 'px').show();

				//alert( $container.outerWidth() )

				//$('.bottomLabels.left').css('position','');
				//$('.bottomLabels').hide();
				//$('.topLabels').show();
				$('.slider').css({'padding':'0px'});
				$('.noUiSlider').css({'margin':'0px'});

				adjustLabelHeight('.sliderLabel');

			} else if ( displayLabelText && labelPlacement == "side" && options.sliderOrientation == 'horizontal' ) {
				var colspan = 1;
				$('.sliderMiddle td:nth-child(1)').show();
				$('.sliderMiddle td:nth-child(2)').show();
				$('.sliderMiddle td:nth-child(3)').show();
				$('.sliderMiddle td:nth-child(2)').attr('colspan',colspan);
				$('.leftLabel, .rightLabel').hide();
				$('.sliderMiddle .leftLabel, .sliderMiddle .rightLabel').show();
				if ( hasDK ) $('.sliderDK').attr('colspan',colspan);
				// large
				//$('.bottomLabels.left').css('position','relative !important');
				//$('.bottomLabels').show();
				//$('.topLabels').hide();
				$('.slider').css({'padding':''});

				// Centralize slider
				var paddingAdjustmentV = Math.floor(($('.sliderLabel').outerHeight() - $('.noUiSlider').outerHeight() )/2) + 'px';
				var paddingAdjustmentH = Math.floor(($('.sliderLabel').outerWidth() - $('.noUiSlider').outerWidth() )/2) + 'px';
				/*if ( options.sliderOrientation === 'horizontal' ) $('.noUiSlider').css({'margin-top':paddingAdjustmentV,'margin-bottom':paddingAdjustmentV});
				else if ( options.sliderOrientation === 'vertical' ) $('.noUiSlider').css({'margin-left':paddingAdjustmentH,'margin-right':paddingAdjustmentH});*/

				// Find tallest label
			} else {
				// Centralize slider
				var paddingAdjustmentV = Math.floor(($('.sliderLabel').outerHeight() - $('.noUiSlider').outerHeight() )/2) + 'px';
				var paddingAdjustmentH = Math.floor(($('.sliderLabel').outerWidth() - $('.noUiSlider').outerWidth() )/2) + 'px';
				if ( options.sliderOrientation === 'vertical' ) $('.noUiSlider').css({'margin-left':paddingAdjustmentH,'margin-right':paddingAdjustmentH});
			}
		}

		// Adjust control width if using vertical layout
		if ( options.sliderOrientation == 'vertical') {
			var maxLabelWidth = Math.max.apply( null, $container.find('.sliderLabel').map( function () {
				return $( this ).outerWidth();
			}).get() );

			$(this).css({'width':maxLabelWidth});
		}

		// hide handle
		if ( hideHandle && !(roundToStep($input.val()) >= 0) ) $('.noUi-handle').hide();

		// Remove focus when not clicking on slider
		$(document).click(function(e) {

			if ( !($(e.target).hasClass('noUi-base') || $(e.target).hasClass('noUi-origin') || $(e.target).hasClass('noUiSlider') || $(e.target).hasClass('noUi-handle')) ) {

				var element = $('.focused').parents('.controlContainer');
            	$('.focused').removeClass('focused');

				// vertically center number
				for ( var i=0; i<items.length; i++ ) {
					element.find('.handleValue').eq(i).css('padding-top', '');
					var topAdj = Math.ceil( ( element.find('.noUi-handle').eq(i).height() - element.find('.handleValue').eq(i).outerHeight() ) * 0.5);
					element.find('.handleValue').eq(i).css('padding-top', topAdj + 'px');

				}

			}

        });

		function roundToStep(num) {
			/*
			var resto = num%options.unitStep;
			if (resto <= (options.unitStep/2)) {
				return num-resto;
			} else {
				return num+options.unitStep-resto;
			}
			*/
			if(options.unitStep == 1 || unitDP == 0){
				return parseInt(num)
			} else {
				var stepMultiplyer = 1/options.unitStep;
				//console.log("roundToStep" + Math.ceil(num*stepMultiplyer)/stepMultiplyer).toFixed(2)):
				return (Math.ceil(num*stepMultiplyer)/stepMultiplyer).toFixed(unitDP)
			}
		}

		function decimalPlaces(n) {
		  // Make sure it is a number and use the builtin number -> string.
		  var s = "" + (+n);
		  // Pull out the fraction and the exponent.
		  var match = /(?:\.(\d+))?(?:[eE]([+\-]?\d+))?$/.exec(s);
		  // NaN or Infinity or integer.
		  // We arbitrarily decide that Infinity is integral.
		  if (!match) { return 0; }
		  // Count the number of digits in the fraction and subtract the
		  // exponent to simulate moving the decimal point left by exponent places.
		  // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
		  // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
		  return Math.max(
			  0,  // lower limit.
			  (match[1] == '0' ? 0 : (match[1] || '').length)  // fraction length
			  - (match[2] || 0));  // exponent
		}

		// enable keyboard interaction
		$(document).keydown(function( e ) {

			// if focus found
			if ( $('.focused').size() > 0 ) {

				var element = $('.focused').parents('.controlContainer'),
					iteration = isInLoop ? $('.focused').parents('.sliderContainer').data('iteration') : 0,
					slider = $('.focused').parents('.controlContainer').find('.noUiSlider').eq(iteration),
					value = roundToStep( slider.val() ),
					$input = items[iteration].element;

				switch ( e.which ) {
					case 38:
						if ( value < options.maxValue ) value ++;
						slider.val( value );
						break;
					case 40:
						if ( value > options.minValue ) value --;
						slider.val( value );
						break;
				}

				//var handleValue = parseInt(value);
				var handleValue = roundToStep(value);

				if (showValue) {
					element.find('.handleValue').eq(iteration).css('padding-top', '');
					element.find('.noUi-handle').eq(iteration).html( "<div class='handleValue'>" + handleValue + "</div>" );
					var topAdj = Math.ceil( ( element.find('.noUi-handle').eq(iteration).height() - element.find('.handleValue').eq(iteration).outerHeight() ) * 0.5 );
					element.find('.handleValue').eq(iteration).css('padding-top', topAdj + 'px');
				}

				if ( isSingle && !isInLoop ) $input.val( items[ parseInt( value ) - 1  ].value );
				else if ( isSingle && isInLoop ) {
					if ( e.which == 38 ) $input.val( valuesArray[ (value - parseInt(options.minValue) ) ] );
					else if ( e.which == 40 ) $input.val( valuesArray[ (value - parseInt(options.minValue)) ] );
				} else $input.val( roundToStep( value ) );
			}
		});

		function selectDK() {

			var $container = $(this).parents('.controlContainer'),
				$input = isInLoop ? items[$(this).parents('.sliderContainer').data('iteration')].element : items[0].element,
				$target = $(this),
				value = $(this).data('value'),
				slider = $(this).parents('.sliderContainer').find('.noUiSlider'),
				DKID = $input.attr('id').replace(/[^0-9]/g, '');

			// Hide handle
			slider.find('.noUi-handle').hide();

			// Set value to input
			//$input.val(value);

			//$(this).parents('.sliderContainer').find('.noUiSlider').removeClass('selected');
			if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
				$input.val('');
				$('input[name="M' + DKID + ' -1"]').prop('checked', false);
				$(this).parents('.sliderContainer').removeClass('selected');
			} else {
				$(this).addClass('selected');
				$input.val(value);
				$('input[name="M' + DKID + ' -1"]').prop('checked', true);
				$(this).parents('.sliderContainer').addClass('selected');
			}

		}
		$container.on('click', '.dk', selectDK);

		if ( total_images > 0 ) {
			$container.find('img').each(function() {
				var fakeSrc = $(this).attr('src');
				$("<img/>").css('display', 'none').load(function() {
					images_loaded++;
					if (images_loaded >= total_images) {

						// now all images are loaded.
						$container.css('visibility','visible');

					}
				}).attr("src", fakeSrc);
			});
		} else {
			$container.css('visibility','visible');
		}

		// Returns the container
		return this;
	};

} (jQuery));
