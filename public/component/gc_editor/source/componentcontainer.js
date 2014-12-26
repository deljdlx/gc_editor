GC_Editor.ComponentContainer=function(editor, content, data) {
	this.editor=editor;
	
	this.redrawInterval=null;

	this.element=null;
	this.container=null;
	this.content=content;

	this.data=data;
	this.element=content;

	this.component=null;	
}

/*
GC_Editor.ComponentContainer.GC_EditorComponentContainer(editor, content, data)
{
	this.editor=editor;
	
	this.redrawInterval=null;

	this.element=null;
	this.container=null;
	this.content=content;

	this.data=data;
	this.element=content;

	this.component=null;
}
*/


GC_Editor.ComponentContainer.prototype.loadFromNode=function(node) {
	this.container=node;

	this.element=this.container.querySelector('.gc_editor_component');


	this.data=JSON.parse(this.element.getAttribute('data-component'));

	var builderClassName=this.data.builder;


	this.component=new window['GC_Editor'][builderClassName](this.editor);

	this.component.setComponentContainer(this);
	this.component.loadData(this.data.data);

	this.component.loadFromComponent();


	this.initializePollRedraw();

	this.container.onclick=function() {
		this.editor.popup.openComponent(this);
	}.bind(this);

}


GC_Editor.ComponentContainer.prototype.updateData=function(data) {
	this.data=data;
	if(this.element) {
		this.element.setAttribute('data-component', JSON.stringify(this.data));
	}
}

GC_Editor.ComponentContainer.prototype.initializePollRedraw=function() {

	this.lastHeight=this.container.offsetHeight;
	this.lastWidth=this.container.offsetWidth;

	if(!this.redrawInterval) {
		this.redrawInterval = setInterval(function () {

			if(this.lastHeight!=this.container.offsetHeight || this.lastWidth!=this.container.offsetWidth) {
				if(typeof(this.component.onResize)!='undefined') {
					this.component.onResize(
						this.container.offsetWidth,
						this.container.offsetHeight
					);
				}
			}
			this.lastHeight=this.container.offsetHeight;
			this.lastWidth=this.container.offsetWidth;

		}.bind(this), 100);
	}
}


GC_Editor.ComponentContainer.prototype.getElement=function() {
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

	this.initializePollRedraw();

	return this.container;
}
