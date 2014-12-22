function GC_Editor(node, options)
{

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


	this.popup=new GC_EditorPopup(this);

}


GC_Editor.prototype.parseContent=function() {

	var objects=this.element.querySelectorAll('.gc_editor_componentcontainer');

	for(var i=0; i<objects.length; i++) {
		var object=new GC_EditorObject(this)
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


