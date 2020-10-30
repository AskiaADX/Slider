/* standard.js */
$(window).load(function() {
	$('#adc_{%= CurrentADC.InstanceId %}').adcSlider({
		target : 'jsObj{%= CurrentADC.InstanceId%}',
		width : 400,
		maxWidth : '{%= CurrentADC.PropValue("maxWidth") %}',
		controlWidth : '{%= CurrentADC.PropValue("controlWidth") %}',
		controlAlign : '{%= CurrentADC.PropValue("controlAlign") %}',
		maxImageWidth : {%= CurrentADC.PropValue("maxImageWidth") %},
		maxImageHeight : {%= CurrentADC.PropValue("maxImageHeight") %},
		forceImageSize : '{%= CurrentADC.PropValue("forceImageSize") %}',
		labelWidth : '{%= CurrentADC.PropValue("labelWidth") %}',
		unitStep : {%= CurrentADC.PropValue("unitStep") %},
		minValue : {%= CurrentADC.PropValue("minValue") %},
		intermediateValue : {% IF (CurrentADC.PropValue("intermediateValue") = "") THEN %}{%= ((CurrentADC.PropValue("minValue").ToNumber() + CurrentADC.PropValue("maxValue").ToNumber()) / 2).ToString().Replace(",",".") %},{% ELSE %}{%= CurrentADC.PropValue("intermediateValue") %},{% ENDIF %}
		maxValue : {%= CurrentADC.PropValue("maxValue") %},
		isInLoop: {%= (CurrentADC.PropValue("isInLoop") = "1") %},
		sliderOrientation : '{%= CurrentADC.PropValue("sliderOrientation") %}',
		{%
			Dim rtlLangArr = {"ARA";"ARG";"ARH";"ARE";"ARI";"ARJ";"ARK";"ARB";"ARL";"ARM";"ARO";"ARQ";"ARS";"ART";"ARU";"ARY";"DIV";"HEB";"URD"}
			IF ((CurrentADC.PropValue("followLanguageDirection") = "1") AND (rtlLangArr.IndexOf(Interview.Language.Abbr) <> DK)) THEN
		%}
			sliderDirection : 'rtl',
		{% Else %}
			sliderDirection : '{%= CurrentADC.PropValue("sliderDirection") %}',
		{% EndIF %}
		followLanguageDirection : {%= (CurrentADC.PropValue("followLanguageDirection") = "1") %},
		sliderHandleStartPosition : '{%= CurrentADC.PropValue("sliderHandleStartPosition") %}',
		hideHandle : {%= (CurrentADC.PropValue("hideHandle") = "1") %},
		showValue : {%= (CurrentADC.PropValue("showValue") = "1") %},
		handleText : '{%:= CurrentADC.PropValue("handleText") %}',
		handleTextPosition : '{%:= CurrentADC.PropValue("handleTextPosition") %}',
		isSingle : {%= (CurrentQuestion.Type = "single") %},
		dkSingle: {%= (CurrentADC.PropValue("dkSingle") = "1") %},
		useHandleImage : {%= (CurrentADC.PropValue("useHandleImage") = "1") %},
		handleImagePath : '{%= CurrentADC.PropValue("handleImagePath") %}',
		handleImageWidth : '{%= CurrentADC.PropValue("handleImageWidth") %}',
		handleImageHeight : '{%= CurrentADC.PropValue("handleImageHeight") %}',
		hideHandleBG : {%= (CurrentADC.PropValue("hideHandleBG") = "1") %},
		leftLabelText : {%= (CurrentADC.PropValue("leftLabelText") <> "") %},
		rightLabelText : {%= (CurrentADC.PropValue("rightLabelText") <> "") %},
		displayLabelText : '{%= CurrentADC.PropValue("displayLabelText") %}',
		labelPlacement : '{%= CurrentADC.PropValue("labelPlacement") %}',
        showTooltips : {%= (CurrentADC.PropValue("showTooltips") = "1") %},
		showMarkers : {%= (CurrentADC.PropValue("showMarkers") = "1") %},
        showMarkerText : {%= (CurrentADC.PropValue("showMarkerText") = "1") %},
		interconnection : {%= (CurrentADC.PropValue("interconnection") = "1") %},
        decimalPlaces : {%= CurrentADC.PropValue("decimalPlaces") %},
      	currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
        connect : '{%= CurrentADC.PropValue("sliderConnect") %}',
				stepMarkerText : {%= CurrentADC.PropValue("stepMarkerText")%},
		items : [
			{% IF CurrentADC.PropValue("isInLoop") = "1" Then %}
				{% IF CurrentQuestion.Type = "single" Then %}
					{%:= CurrentADC.GetContent("dynamic/standard_single_loop.js").ToText()%}
				{% ElseIf CurrentQuestion.Type = "numeric" Then %}
					{%:= CurrentADC.GetContent("dynamic/standard_numeric_loop.js").ToText()%}
				{% EndIF %}
			{% Else %}
				{% IF CurrentQuestion.Type = "single" Then %}
					{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText()%}
				{% ElseIf CurrentQuestion.Type = "numeric" Then %}
					{%:= CurrentADC.GetContent("dynamic/standard_numeric.js").ToText()%}
				{% EndIF %}
			{% EndIF %}
		]
	});
});
