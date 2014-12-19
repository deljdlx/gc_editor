function GC_EditorObject()
{
	this.element=null;
	this.container=null;
}


GC_EditorObject.prototype.getElement=function() {
	if(!this.container) {
		this.container=document.createElement('div');
		this.container.className='gc_editor_componentcontainer';
			this.element=document.createElement('div');
			this.element.className='gc_editor_component';
			this.element.setAttribute('contenteditable', false);
		this.container.appendChild(this.element);
	}
	return this.container;
}
