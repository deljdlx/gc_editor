function GC_EditorObject(editor, content, data)
{
	this.editor=editor;

	this.element=null;
	this.container=null;
	this.content=content;

	this.data=data;
}


GC_EditorObject.prototype.loadFromNode=function(node) {
	this.container=node;

	this.element=this.container.querySelector('.gc_editor_component');

	console.debug(this.element);

	this.data=JSON.parse(this.element.getAttribute('data-component'));

	var builderClassName=this.data.builder;
	var builder=new window[builderClassName](this.editor, this, this.data.data);
	builder.loadFromComponent();


	this.container.onclick=function() {
		this.editor.popup.openComponent(this);
	}.bind(this);

}


GC_EditorObject.prototype.updateData=function(data) {
	this.data=data;
	if(this.element) {
		this.element.setAttribute('data-component', JSON.stringify(this.data));
	}
}



GC_EditorObject.prototype.getElement=function() {
	if(!this.container) {
		this.container=document.createElement('div');
		this.container.className='gc_editor_componentcontainer';
			this.element=document.createElement('div');
			this.element.className='gc_editor_component';
			this.element.setAttribute('contenteditable', false);
			this.element.appendChild(this.content);

			this.element.setAttribute('data-component', JSON.stringify(this.data));

		this.container.setAttribute('draggable', true);
		this.container.setAttribute('contenteditable', false);
		this.container.appendChild(this.element);




		this.container.onclick=function() {
			this.editor.popup.openComponent(this);
		}.bind(this);


	}
	return this.container;
}
