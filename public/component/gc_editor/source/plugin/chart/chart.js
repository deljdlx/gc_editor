GC_Editor.Chart=function(editor)
{
	this.editor=editor;
}

GC_Editor.Chart.prototype.chartData=[];
GC_Editor.Chart.prototype.editor=null;
GC_Editor.Chart.prototype.element=null;
GC_Editor.Chart.prototype.chart=null;



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


GC_Editor.Chart.prototype.prepareDataChart=function() {
	return this;
}


GC_Editor.Chart.prototype.create=function() {

	this.element=this.getElement();


	this.canvas=document.createElement('canvas');


	this.element.innerHTML='';
	this.element.appendChild(this.canvas);


	var ctx = this.canvas.getContext("2d");


	this.element.cssText='border: solid 2px #F00';

	this.canvas.style.height="100%";
	this.canvas.style.width="100%";

	this.editor.insertNodeAtCaret(this.element);



	var chartData=this.prepareChartData();


	this.chart=new Chart(ctx)[this.getChartType()](chartData, {
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




GC_Editor.inherit(GC_Editor.Chart, GC_Editor.ComponentContainer);























