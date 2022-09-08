Version

v1.0.0 -
    v1.0.1 -
    v1.0.2  - removed CSS3 Pie
    v1.0.3  - fixed label width issue
            - fixed storing data problem for single questions in loops
            - fixed gradient direction when selecting slider
    v1.0.4  - fixed chrome bug with label placement
            - inverted direction of gradient for top to bottom and selected top to bottom
            - fixed js error in numeric loops in IE7 and IE8
    v1.0.5  - enabled control to be used in loops
            - fixed issue with label width when using small screen
            - fixed issue with IE7/8 and handle height
    v1.0.6  - fixed issue with DK width
            - added dk position variable
    v1.0.7  - fixed detection for movig labels above when too small
    v1.0.8  - fixed dk single option value
    v1.0.9  - removed gradient from ie7 - ie9 to fix clipping problem
            - fixed handle placement
            - updated slider to latest version
            - updated jquery to 1.11.1
    v1.0.10 - fixed image loading glitch
    v1.0.11 - re-added gradient from ie7 - ie9 at request of JeromeD
    v1.0.12 - added better support for decimal places on handle image
    v1.0.13 - fixed bug with all integers showing as -11
    v1.0.14 - updated slider to latest version
            - updated jquery to 1.11.2
            - handle now contained within base
            - changed handle shadow
            - added showMarkers property
    v1.0.15 - Loop Closed question slider behavior, #18 on github
    v1.0.16 - Not using Value on looped closed, sometimes caused errors
  v1.1.0    - TP - Added the interconnected sliders option
    v1.1.1  - Fixing some bugs on the interconnected sliders
    v1.1.2  - JD - Added slider direction parameter
    v1.1.3  - JD - Added handleText and handleTextPosition parameters
    v1.1.4  - Fixed marker positioning and enable increment according to unitStep value and using keyboard focus
            - Added Decimal Places
            - Added showMarkerText
    v1.1.5  - JD - hide markers if window.width < 400 and horizontal orientation
            - Fixed value shown at start
            - Fixed position of the handle at start
            - Added a new param Slider Handle Start Position
    v1.1.6  - JD - Added intermediateValue parameter
    v1.1.7  - JD - Fixed the problem of jump not applied on the right of the slider
    v1.1.8  - SB - Fixed an issue where "Nan" was showing in the handle of a numeric inside a loop instead of the propoer slider value
    v1.1.9  - PF - Fixed issue when typing into text areas on the same page as slider
    v1.1.10 - JD - Added Slider Connect parameter
    v1.1.11 - JD - Fixed Weird behaviour with DK and Slider Connect parameter
    v1.1.12 - JD - Recalculate the width of the pips
    v1.1.13 - JD - Fixed half start position when unpaired number of values
    v1.1.14 - JD - Fixed right text on pips
    v1.1.15 - JD - Fixed hover style on DK
    v1.1.16 - JD - Fixed selected style applied when digit applied to numerical slider
    v1.1.17 - JD - Fixed coma digit for french intermediate value
    v1.1.18 - SB - removed visibility:hidden on ControlContainer
v2.0.0 - JD - Theme implementation
    v2.0.5  - PF - When using in a loop multiple labels can be used split by "|" (pipe)
            - PF - Added option to hide captions
    v2.0.6  - PF - Fixed issue with single choice displaying incorrect scale in pips
            - PF - Fixed issue with pip and vertical layout
            - PF - Fixed issue with handle position and vertical layout
            - PF - Fixed issue with spacing and multiple sliders in loop
    v2.0.7  - PF - Added tooltips
    v2.0.8  - Added alt attribute to img
    v2.0.9  - Fixed marker stepping by enabling the possibility of give a step value for marker text/in the meantime it will reduce the markers density
    v2.0.10 - Fixed background transparency when handle use image
    v2.0.11 - Fixed handleValue overlapping problem
v3.0.0      - AvailableAnswers
    v3.0.1  - new property for marker and marker-pips color / "sliderMarkerColor"
    v3.0.4  - fixed height label same size
    v3.0.5  - fixed height label same size
v4.0.0      - Non-selectable headers
    v4.0.1  - Header collapsed symbol
  v4.1.0    - Caption Placement for Loop response items
    v4.1.1  - properties mode set to dynamic
    v4.1.2  - sliderBaseGradientDirection = Right to Left
    v4.1.3  - Show response captions for single-coded questions
    v4.1.4  - Multiple exclusive/DK options
    v4.1.5  - isInLoop support for sliders with multiple exclusive options
    v4.1.6  - noUi-handle bug fixed
  v4.2.0    - Semi-opens
    v4.2.1  -
  v4.3.0    - share directory removed
    v4.3.1  - slider pointer on mobile - bug fix
    v4.3.2  - fixed min/max discrepancy crash on numerical questions
  v4.4.0    - Dynamically control a single-closed slider by a numerical input
    v4.4.1  - Fixed - noUi-origin right-margin
    v4.4.2  - Added - Update the number box value when hold + mouse-move on slider.
  v4.5.0    - Update the noUiSlider plugin
            - jQuery update
