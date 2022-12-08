/* standard_single_loop.js */
{%
Dim i
Dim j
Dim inputName
Dim ar = CurrentQuestion.ParentLoop.AvailableAnswers
Dim avR = CurrentQuestion.AvailableResponses
Dim allValues = avR[1].inputValue()
Dim allCaptions = avR[1].Caption
Dim elemid = ""

For j = 2 to avR.Count
	allValues = allValues + "," + avR[j].inputValue()
	allCaptions = allCaptions + ",,,," + avR[j].Caption
Next

For i = 1 To ar.Count
	inputName = CurrentQuestion.Iteration(ar[i].Index).InputName()
	IF inputName <> "" THEN
		elemid = "#"+inputName
	ENDIF
	%}
	//{element : $('#{%= inputName%}'), value :  avR[i].inputValue(), allValues : "{%= allValues%}", caption : "{%= ar[i].Caption %}"}{%= On(i < ar.Count, ",", "") %}
	{element : $("{%= elemid %}"), value : 0, allValues : "{%= allValues%}", allCaptions : "{%=allCaptions %}", caption : "{%= ar[i].Caption %}"}{%= On(i < ar.Count, ",", "") %}

{% Next %}
