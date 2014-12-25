function GC_EditorToolbar(editor)
{
	this.editor=editor;
	this.element=null;

	this.buttons={};

}

GC_EditorToolbar.prototype.initializeDefaultButtons=function() {

	this.addBoldButton();
	this.addItalicButton();

	this.addLinkButton();
	this.addUnlinkButton();
	this.addSaveAsButton();
	this.addCodeSourceButton();
}

GC_EditorToolbar.prototype.addButton=function(button, id) {
	if(typeof(id)=='undefined') {
		id=new Date().getTime()+Math.random();
	}
	this.buttons[id]=button;
	button.render(this.getElement());

}


GC_EditorToolbar.prototype.addCodeSourceButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'source_code.png',
		click: function() {
			this.editor.switchSourceEditor();
		}
	});
	button.render(this.getElement());

	this.buttons.addLink=button;
}

GC_EditorToolbar.prototype.addLinkButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'link.png',
		click: function() {
			document.execCommand("CreateLink", false, "http://stackoverflow.com/");
		}
	});
	button.render(this.getElement());

	this.buttons.addLink=button;

}

GC_EditorToolbar.prototype.addUnlinkButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'link_unchain.png',
		click: function() {
			document.execCommand("unlink", false, "http://stackoverflow.com/");
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}




GC_EditorToolbar.prototype.addBoldButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'text_bold.png',
		click: function() {
			document.execCommand("bold", false, false);
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}

GC_EditorToolbar.prototype.addItalicButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'text_italic.png',
		click: function() {
			document.execCommand("bold", false, false);
		}
	});
	button.render(this.getElement());
	this.buttons.unlink=button;
}


GC_EditorToolbar.prototype.addSaveAsButton=function() {
	var button=new GC_EditorButton(editor,{
		icon: 'save_as.png',
		click: function() {
			consolePanel.value=this.editor.getContent();
		}
	});
	button.render(this.getElement());
	this.buttons.save=button;
}





GC_EditorToolbar.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='GC_EditorToolbar';
	}
	return this.element;
}

