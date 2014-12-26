GC_Editor.LineChart=function(editor)
{
	this.editor=editor;
	this.chart=null;
	this.element=null;
}


GC_Editor.LineChart.prototype.loadData=function(data) {
	this.data=data;

	var labels=[];
	var values=[];

	for(var i=0; i<this.data.length; i++) {
		labels.push(this.data[i].label);
		values.push(this.data[i].value);
	}

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



GC_Editor.LineChart.prototype.getChartType=function() {
	return 'Line';
}


GC_Editor.LineChart.prototype.getComponentData=function() {
	return componentData= {
		type: 'datagrid',
		graphType: 'graphline',
		data: this.data,
		method: 'openDataGridPopup',
		builder: 'LineChart'
	};
}







GC_Editor.inherit(GC_Editor.LineChart, GC_Editor.Chart);
























