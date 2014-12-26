GC_Editor.Chart=function(editor)
{
	this.editor=editor;
	this.chart=null;
	this.element=null;
}


GC_Editor.Chart.prototype.setComponentContainer=function(componentContainer) {
	this.componentContainer=componentContainer;
}



GC_Editor.Chart.prototype.onResize=function(width, height) {
	this.create();
	return;
}

GC_Editor.Chart.prototype.loadFromComponent=function() {
	this.create();
}



GC_Editor.Chart.prototype.loadData=function(data) {

}






GC_Editor.Chart.prototype.initializeElement=function(componentData) {
	if(typeof(this.componentContainer)=='undefined') {

		this.element=document.createElement('div');
		this.canvas=document.createElement('canvas');
		this.element.appendChild(this.canvas);

		this.componentContainer= new GC_Editor.ComponentContainer(this.editor, this.element, componentData);
		this.componentContainer.component=this;
		
		var container = this.componentContainer.getElement();
		this.editor.insertNodeAtCaret(container);
	}
	else {
		var oldcanvas=this.componentContainer.element.querySelectorAll('canvas')[0];
		this.canvas=document.createElement('canvas');
		var parentNode=oldcanvas.parentNode
		parentNode.removeChild(oldcanvas);
		parentNode.appendChild(this.canvas);

		this.element=parentNode;

		this.componentContainer.updateData(componentData);
	}	
}



GC_Editor.Chart.prototype.create=function() {


	this.initializeElement(this.getComponentData());


	var ctx = this.canvas.getContext("2d");


	this.chart=new Chart(ctx)[this.getChartType()](this.chartData, {
		animation:false,
		responsive: true,
		maintainAspectRatio: true
	});
}




GC_Editor.Chart.prototype.chartDefaultOption={
	animation:false,
	responsive: true,
	maintainAspectRatio: true
}























