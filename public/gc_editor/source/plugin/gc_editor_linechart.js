function GC_Editor_LineChart(editor, component, data)
{
	this.editor=editor;
	this.data=data;

	this.component=component;


	var labels=[];
	var values=[];

	for(var i=0; i<data.length; i++) {
		labels.push(data[i].label);
		values.push(data[i].value);
	}

	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

	this.chartData = {
		labels : labels,
		datasets : [
			{
				label: "My First dataset",
				fillColor : "rgba(220,220,220,0.2)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : values
			}
		]
	}
}


GC_Editor_LineChart.prototype.loadFromComponent=function() {
	this.create();
}


GC_Editor_LineChart.prototype.create=function() {


	var componentData= {
		type: 'datagrid',
		graphType: 'graphline',
		data: this.data,
		method: 'openDataGridPopup',
		builder: 'GC_Editor_LineChart'
	};



	if(typeof(this.component)=='undefined') {
		var element=document.createElement('div');
		var canvas=document.createElement('canvas');
		element.appendChild(canvas);

		var object = new GC_EditorObject(this.editor, element, componentData);
		var container = object.getElement();
		this.editor.insertNodeAtCaret(container);
	}
	else {
		var oldcanvas=this.component.element.querySelectorAll('canvas')[0];
		var canvas=document.createElement('canvas');
		var parentNode=oldcanvas.parentNode
		parentNode.removeChild(oldcanvas);
		parentNode.appendChild(canvas);

		this.component.updateData(componentData);
	}



	var ctx = canvas.getContext("2d");


	new Chart(ctx).Line(this.chartData, {
		responsive: true
	});
}