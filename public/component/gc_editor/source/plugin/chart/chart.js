GC_Editor.Chart=function(editor)
{
	this.editor=editor;

	this.prototype.chartData=[];
	this.prototype.editor=null;
	this.element=null;
	this.chart=null;

}








GC_Editor.Chart.prototype.onResize=function(width, height) {
	this.create();
	/*
	this.canvas.style.height='100%';
	this.canvas.style.width='100%';
	this.canvas.setAttribute('height', '100%');
	this.canvas.setAttribute('width', '100%');
	*/
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

//================================================


GC.inherit(GC_Editor.Chart, GC_Editor.ComponentContainer);























