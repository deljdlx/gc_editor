GC_Editor.PieChart=function(editor)
{
	this.editor=editor;
	
	this.chart=null;
	this.element=null;
	this.chartData=[];
}



GC_Editor.PieChart.prototype.loadData=function(data) {

	this.data=data;

	var labels=[];
	var values=[];

	for(var i=0; i<data.length; i++) {
		this.chartData.push({
			value: data[i].value,
			lalbe: data[i].label,
			color:"#F7464A",
			highlight: "#FF5A5E",
		});
	}
}



GC_Editor.PieChart.prototype.getComponentData=function() {
	return {
		type: 'datagrid',
		graphType: 'graphpie',
		data: this.data,
		method: 'openDataGridPopup',
		builder: 'PieChart'
	};
}


GC_Editor.PieChart.prototype.getChartType=function() {
	return 'Pie';
}



GC_Editor.inherit(GC_Editor.PieChart, GC_Editor.Chart);











