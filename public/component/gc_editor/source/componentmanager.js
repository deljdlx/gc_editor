GC_Editor.ComponentManager=function(editor) {
	this.editor=editor;

}


GC_Editor.ComponentManager.prototype.getComponentFromElement=function(element) {

	var componentData=this.extractDataFromElement(element);

	var componentInstanceName=componentData.instanceOf;

	var componentInstance=new window['GC_Editor'][componentInstanceName](this.editor);



	componentInstance.loadData(componentData);


	element.innerHTML='';
	componentInstance.setElement(element);

	//componentInstance.initializePollRedraw();


	return componentInstance;


}


GC_Editor.ComponentManager.prototype.extractDataFromElement=function(element) {
	var data=JSON.parse(element.getAttribute('data-component'));
	return data;
}


