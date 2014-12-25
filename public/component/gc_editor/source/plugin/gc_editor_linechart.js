function GC_Editor_LineChart(editor, component, data)
{
	this.editor=editor;
	this.data=data;

	this.component=component;
	this.chart=null;
	this.element=null;


	var labels=[];
	var values=[];

	for(var i=0; i<data.length; i++) {
		labels.push(data[i].label);
		values.push(data[i].value);
	}

	//var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

	this.chartData = {
		labels : labels,
		datasets : [
			{
				label: "My First dataset",
				fillColor : "rgba(220,220,255,0.2)",
				strokeColor : "rgba(170,170,254,1)",
				pointColor : "rgba(200,200,254,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : values
			}
		]
	}
}

GC_Editor_LineChart.prototype.onResize=function(width, height) {
	//this.element.style.width=width+'px';
	//this.element.style.height=height+'px';

	this.create();
	return;

	//this.canvas.style.width=width+'px';
	//this.canvas.style.height=height+'px';

	//this.canvas.removeAttribute('width');
	//this.canvas.removeAttribute('height');

	//this.chart.resize();
	this.chart.update();
	//this.chart.resize();

	setTimeout(function() {
		jQuery(window).resize();
	}.bind(this), 500);

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
		this.element=document.createElement('div');
		this.canvas=document.createElement('canvas');
		this.element.appendChild(this.canvas);

		var object = new GC_EditorObject(this.editor, this.element, componentData);
		var container = object.getElement();
		this.editor.insertNodeAtCaret(container);
	}
	else {
		var oldcanvas=this.component.element.querySelectorAll('canvas')[0];
		this.canvas=document.createElement('canvas');
		var parentNode=oldcanvas.parentNode
		parentNode.removeChild(oldcanvas);
		parentNode.appendChild(this.canvas);

		this.element=parentNode;

		this.component.updateData(componentData);
	}


	var ctx = this.canvas.getContext("2d");


	this.chart=new Chart(ctx).Line(this.chartData, {
		animation:false,
		responsive: true,
		maintainAspectRatio: true
	});
}