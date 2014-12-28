GC_Editor.LineChart=function(editor)
{
	this.editor=editor;
	this.chart=null;
	this.element=null;

}


GC_Editor.LineChart.prototype.prepareChartData=function() {


	var labels=[];
	var values=[];

	for(var i=0; i<this.componentData.length; i++) {
		labels.push(this.componentData[i].label);
		values.push(this.componentData[i].value);
	}


	var chartData = {
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

	console.debug(chartData);

	return chartData;

}



GC_Editor.LineChart.prototype.getChartType=function() {
	return 'Line';
}



GC_Editor.LineChart.prototype.getComponentDescriptor=function() {
	return componentData= {
		type: 'datagrid',
		graphType: 'graphline',
		data: this.componentData,
		method: 'openDataGridPopup',
		builder: 'LineChart'
	};
}








GC_Editor.inherit(GC_Editor.LineChart, GC_Editor.Chart);
























