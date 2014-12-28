GC_Editor.ComponentContainer=function(editor) {
	this.editor=editor;
	

}

GC_Editor.ComponentContainer.data=null;
GC_Editor.ComponentContainer.componentData=null;
GC_Editor.ComponentContainer.element=null;
GC_Editor.ComponentContainer.redrawInterval=null;

GC_Editor.ComponentContainer.getComponentDescriptor=function() {
	return {};
}


GC_Editor.ComponentContainer.prototype.updateData=function(data) {
	this.data=data;
	if(this.element) {
		this.element.setAttribute('data-component', JSON.stringify(this.data));
	}
}


GC_Editor.ComponentContainer.prototype.loadData=function(data) {
	this.data=data;
	this.loadComponentData(data.data);
}

GC_Editor.ComponentContainer.prototype.loadComponentData=function(data) {
	this.componentData=data;
}

GC_Editor.ComponentContainer.prototype.getData=function() {
	return this.data;
}

GC_Editor.ComponentContainer.prototype.getComponentData=function() {
	return this.componentData;
}




GC_Editor.ComponentContainer.prototype.initializePollRedraw=function() {

	this.lastHeight=this.element.offsetHeight;
	this.lastWidth=this.element.offsetWidth;

	if(!this.redrawInterval) {
		this.redrawInterval = setInterval(function () {

			if(this.lastHeight!=this.element.offsetHeight || this.lastWidth!=this.element.offsetWidth) {
				if(typeof(this.onResize)!='undefined') {

					this.onResize(
						this.element.offsetWidth,
						this.element.offsetHeight
					);
				}
			}
			this.lastHeight=this.element.offsetHeight;
			this.lastWidth=this.element.offsetWidth;

		}.bind(this), 100);
	}
}


GC_Editor.ComponentContainer.prototype.onResize=function() {
	return this;
}


GC_Editor.ComponentContainer.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='gc_editor_componentcontainer';


		this.element.setAttribute('draggable', true);
		this.element.setAttribute('contenteditable', false);

		this.element.setAttribute('data-component', JSON.stringify(this.getComponentDescriptor()));

		this.initializePollRedraw();
	}


	if(!this.element.onClick) {
		this.element.onclick=function() {
			this.editor.popup.openComponent(this);
		}.bind(this);
	}



	return this.element;
}


GC_Editor.ComponentContainer.prototype.getContent=function() {


}

























