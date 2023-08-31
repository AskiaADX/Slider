{% 
Dim i 
Dim inputName
Dim ar = CurrentQuestion.AvailableResponses

For i = 1 To ar.Count 
	inputName = CurrentQuestion.InputName() 
	%}
{element : $('#{%=inputName %}'), value : {%= ar[i].inputValue()%}, caption : "{%= ar[i].Caption %}"}{%= On(i < ar.Count, ",", "") %}
{% Next %}