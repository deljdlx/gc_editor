GC_Editor.PieChart=function(editor)
{
	this.editor=editor;
	
	this.chart=null;
	this.element=null;
}


GC_Editor.PieChart.prototype.prepareChartData=function() {
	var labels=[];
	var values=[];

	var formatedData=[];

	for(var i=0; i<this.componentData.length; i++) {
		formatedData.push({
			value: this.componentData[i].value,
			lalbe: this.componentData[i].label,
			color:"#F7464A",
			highlight: "#FF5A5E"
		});
	}

	return formatedData;
}



GC_Editor.PieChart.prototype.getComponentDescriptor=function() {
	return {
		type: 'datagrid',
		graphType: 'graphpie',
		data: this.componentData,
		method: 'openDataGridPopup',
		builder: 'PieChart'
	};
}


GC_Editor.PieChart.prototype.getChartType=function() {
	return 'Pie';
}


GC_Editor.inherit(GC_Editor.PieChart, GC_Editor.Chart);











