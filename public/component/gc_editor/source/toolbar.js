GC_Editor.Toolbar=function(editor)
{
	this.editor=editor;
	this.element=null;

	this.buttons={};

}

GC_Editor.Toolbar.prototype.initializeDefaultButtons=function() {

	this.addBoldButton();
	this.addItalicButton();

	this.addLinkButton();
	this.addUnlinkButton();
	this.addSaveAsButton();
	this.addCodeSourceButton();
}

GC_Editor.Toolbar.prototype.addButton=function(button, id) {
	if(typeof(id)=='undefined') {
		id=new Date().getTime()+Math.random();
	}
	this.buttons[id]=button;
	button.render(this.getElement());

}


GC_Editor.Toolbar.prototype.addCodeSourceButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'source_code.png',
		click: function() {
			this.editor.switchSourceEditor();
		}
	});
	button.render(this.getElement());

	this.buttons.addLink=button;
}

GC_Editor.Toolbar.prototype.addLinkButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'link.png',
		click: function() {
			document.execCommand("CreateLink", false, "http://stackoverflow.com/");
		}
	});
	button.render(this.getElement());

	this.buttons.addLink=button;

}

GC_Editor.Toolbar.prototype.addUnlinkButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'link_unchain.png',
		click: function() {
			document.execCommand("unlink", false, "http://stackoverflow.com/");
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}




GC_Editor.Toolbar.prototype.addBoldButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'text_bold.png',
		click: function() {
			document.execCommand("bold", false, false);
			//document.execCommand('formatBlock', false, 'strong');
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}

GC_Editor.Toolbar.prototype.addItalicButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'text_italic.png',
		click: function() {
			//document.execCommand('formatBlock', false, 'em');
			document.execCommand("bold", false, false);
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}


GC_Editor.Toolbar.prototype.addSaveAsButton=function() {
	var button=new GC_Editor.Button(editor,{
		icon: 'save_as.png',
		click: function() {
			consolePanel.value=this.editor.getContent();
		}
	});
	button.render(this.getElement());
	this.buttons.save=button;
}





GC_Editor.Toolbar.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='GC_EditorToolbar';
	}
	return this.element;
}


























