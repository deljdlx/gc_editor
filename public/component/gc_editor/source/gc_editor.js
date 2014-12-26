


function GC_Editor(node, options)
{
	this.sourceEditor=null;
	this.topToobars=[];
	this.leftToobars=[];
	this.rightToobars=[];
	this.bottomToobars=[];
	this.containerElement=null;


    if(typeof(options)=='undefined') {
        options={};
    }

    this.options=options;
    
    for(var option in this.defaultOptions) {
        if(typeof(this.options[option])=='undefined') {
            this.options[option]=this.defaultOptions[option];
        }
    }

	this.element=node;

	this.bindEvents();

	this.parseContent();

	this.popup=new GC_Editor.Popup(this);
}



GC_Editor.prototype.createDefaultToolbar=function() {
	var toolbar=new GC_Editor.Toolbar(this)
	toolbar.initializeDefaultButtons();
	this.topToobars.push(toolbar);

	var toolbar=new GC_Editor.Toolbar(this)
	this.bottomToobars.push(toolbar);

	var toolbar=new GC_Editor.Toolbar(this)
	this.leftToobars.push(toolbar);

	var toolbar=new GC_Editor.Toolbar(this)
	this.rightToobars.push(toolbar);

}


GC_Editor.prototype.getLeftToolbar=function(index) {
	if(typeof(index)=='undefined') {
		index=0;
	}
	return this.leftToobars[index];
}


GC_Editor.prototype.create=function() {

	this.containerElement=document.createElement('div');
	this.containerElement.className='GC_Editor';


	this.editorWrapperElement=document.createElement('div');
	this.editorWrapperElement.className='GC_EditorWrapper';



	this.element.parentNode.replaceChild(this.containerElement, this.element);
	this.containerElement.appendChild(this.editorWrapperElement);
	this.editorWrapperElement.appendChild(this.element);


	this.sourceCodeElement=document.createElement('div');
	this.sourceCodeElement.className='GC_EditorSourceCode';
	this.sourceCodeElement.style.display='none';

	this.editorWrapperElement.appendChild(this.sourceCodeElement);

	this.initializeCodeSourceEditor();

	this.element.setAttribute('contenteditable', 'true');


	this.createDefaultToolbar();
	this.createTopToolbar();

	this.createBottomToolbar();
	this.createLeftToolbar();
	this.createRightToolbar();

}



GC_Editor.prototype.initializeCodeSourceEditor=function() {



	var mixedMode = {
		name: "htmlmixed",
		scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
			mode: null},
			{matches: /(text|application)\/(x-)?vb(a|script)/i,
				mode: "vbscript"}]
	};

	this.sourceEditor = CodeMirror(this.getSourceCodeContainer(), {
		value: '',
		lineNumbers: true,
		mode: 'htmlmixed',
		//mode: 'xml',
		//mode: mixedMode,
		//keyMap: "sublime",
		//autoCloseBrackets: true,
		//matchBrackets: true,
		//showCursorWhenSelecting: true,
		theme: "monokai"
	});

	this.setSourceCodeContent(this.getContent());

	this.sourceEditor.setSize('100%', '100%');
}


GC_Editor.prototype.getSourceCodeContent=function() {
	return this.sourceEditor.getValue();
}

GC_Editor.prototype.setSourceCodeContent=function(value) {
	var value =this.formatSource(value);
	this.sourceEditor.setValue(value);
}



GC_Editor.prototype.formatSource=function(value) {
	value=value.replace(/<p>\s*<br>\s*<\/p>/ig, '<br/>');
	value=value.replace(/<br>/gi, '<br/>');
	value=value.replace(/<p><\/p>/gi, '<br/>');
	return style_html(value);
}




GC_Editor.prototype.switchSourceEditor=function() {

	if(this.sourceCodeElement.style.display=='none') {
		this.setSourceCodeContent(this.element.innerHTML);
		this.sourceCodeElement.style.display='block';
		this.sourceEditor.refresh();
		this.sourceEditor.focus();
	}
	else {
		this.element.innerHTML=this.getSourceCodeContent();
		this.parseContent();
		this.sourceCodeElement.style.display='none';
		this.focus();
	}

}

GC_Editor.prototype.focus=function() {
	this.element.focus();
	this.placeCaretAtEnd();
}


GC_Editor.prototype.getSourceCodeContainer=function() {
	return this.sourceCodeElement;
}



GC_Editor.prototype.placeCaretAtEnd=function() {
	var el=this.element;
	el.focus();
	if (typeof window.getSelection != "undefined"
		&& typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}




GC_Editor.prototype.createTopToolbar=function() {
	this.containerTopToolbarElement=document.createElement('div');
	this.containerTopToolbarElement.className='GC_EditorContainerToolbar GC_EditorContainerTopToolbar';

	jQuery(this.containerTopToolbarElement).insertBefore(this.editorWrapperElement);
	for(var i=0; i<this.topToobars.length; i++) {
		var element=this.topToobars[i].getElement();
		this.containerTopToolbarElement.appendChild(element);
	}


}

GC_Editor.prototype.createBottomToolbar=function() {
	this.containerBottomToolbarElement=document.createElement('div');
	this.containerBottomToolbarElement.className='GC_EditorContainerToolbar GC_EditorContainerBottomToolbar';

	jQuery(this.containerBottomToolbarElement).insertAfter(this.editorWrapperElement);

	for(var i=0; i<this.bottomToobars.length; i++) {
		var element=this.bottomToobars[i].getElement();
		this.containerBottomToolbarElement.appendChild(element);
	}
}

GC_Editor.prototype.createLeftToolbar=function() {
	this.containerLeftToolbarElement=document.createElement('div');
	this.containerLeftToolbarElement.className='GC_EditorContainerToolbar GC_EditorContainerLeftToolbar';

	jQuery(this.containerLeftToolbarElement).insertBefore(this.editorWrapperElement);

	for(var i=0; i<this.leftToobars.length; i++) {
		var element=this.leftToobars[i].getElement();
		this.containerLeftToolbarElement.appendChild(element);
	}
}


GC_Editor.prototype.createRightToolbar=function() {
	this.containerRightToolbarElement=document.createElement('div');
	this.containerRightToolbarElement.className='GC_EditorContainerToolbar GC_EditorContainerRightToolbar';

	jQuery(this.containerRightToolbarElement).insertBefore(this.editorWrapperElement);

	for(var i=0; i<this.rightToobars.length; i++) {
		var element=this.rightToobars[i].getElement();
		this.containerRightToolbarElement.appendChild(element);
	}
}










GC_Editor.prototype.parseContent=function() {

	var objects=this.element.querySelectorAll('.gc_editor_componentcontainer');

	for(var i=0; i<objects.length; i++) {
		var object=new GC_Editor.ComponentContainer(this)
		object.loadFromNode(objects[i])
	}
}




GC_Editor.prototype.closeAttributePopup=function() {
	$.modal.close();
}

GC_Editor.prototype.closePopup=function() {
	this.popup.close();
}

GC_Editor.prototype.openPopup=function(content) {
	this.popup.open(content);
}






GC_Editor.prototype.openAttributePopup=function(descriptor, callbackOk, callbackNok) {
	this.popup.openAttribute(descriptor, callbackOk, callbackNok);

}



GC_Editor.prototype.insertNodeAtCaret=function(node) {
    this.element.focus();
    if (typeof window.getSelection != "undefined") {
        var selection = window.getSelection();
        if (selection.rangeCount) {
            var range = selection.getRangeAt(0);
            range.collapse(false);

            var spacer=document.createTextNode('\u00A0');

            range.insertNode(spacer);
            range.insertNode(node);

            range.setStartBefore(spacer);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);

			spacer.parentNode.removeChild(spacer);
        }
    }
}



GC_Editor.prototype.defaultOptions={
    keyup: function(event) {}
}


GC_Editor.prototype.getContent=function() {
    return this.element.innerHTML;
}



GC_Editor.prototype.bindEvents=function() {
	var self=this;
	this.element.addEventListener('keyup', function(event){
		if(event.keyCode == '13') {
			document.execCommand('formatBlock', false, 'p');
		}

        self.options.keyup.bind(self)();

	}, false);
}



GC_Editor.prototype.saveSelection=function() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            var ranges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

GC_Editor.prototype.restoreSelection=function(savedSel) {
    if (savedSel) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}





//=======================================================================================


GC_Editor.inherit=function(child, parentClass) {

	for(var name in parentClass.prototype) {
		if(typeof(child.prototype[name])==='undefined') {
			child.prototype[name]=parentClass.prototype[name];
		}
	}
}



//=======================================================================================


