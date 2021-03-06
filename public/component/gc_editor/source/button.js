GC_Editor.Button=function(editor, options)
{

	this.editor=editor;
	this.element=null;
	
	if(typeof(options)=='undefined') {
		options={};
	}

	this.options=options;
	
	for(var option in this.defaultOptions) {
		if(typeof(this.options[option])=='undefined') {
			this.options[option]=this.defaultOptions[option];
		}
	}
}





GC_Editor.Button.prototype.bindEvents=function() {
	this.element.onclick=this.options.click.bind(this);
}

GC_Editor.Button.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('button');

		this.element.style.backgroundImage='url('+this.options.iconFilepathRoot+'/'+this.options.icon+')';
		this.element.className='GC_EditorButton';

		this.element.title=this.options.caption;
	}

	return this.element;
}


GC_Editor.Button.prototype.render=function(container) {
	container.appendChild(this.getElement());
	this.bindEvents();
}


GC_Editor.Button.prototype.defaultOptions={
	iconFilepathRoot: 'component/gc_editor/icon',
	icon : 'brick.png',
	caption: 'button',
	click: function(event) {}
}





















