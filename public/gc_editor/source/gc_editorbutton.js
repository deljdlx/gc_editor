function GC_EditorButton(editor, options)
{
	
	this.editor=editor;
	
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


GC_EditorButton.prototype.bindEvents=function() {

	var callback=this.options.click.bind(this);

	this.element.onclick=callback;
}


GC_EditorButton.prototype.render=function(container) {
	this.element=document.createElement('button');
	
	this.element.style.backgroundImage='url('+this.options.icon+')';
	this.element.className='GC_EditorButton';
	
	this.element.title=this.options.caption;
	container.appendChild(this.element);
	
	this.bindEvents();
}


GC_EditorButton.prototype.defaultOptions={
	icon : 'gc_editor/icon/brick.png',
	caption: 'button',
	click: function(event) {}
}