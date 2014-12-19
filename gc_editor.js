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

/*
    this.contentElement=document.createElement('div');
    this.contentElement.className='gc_editor_content';

    this.endElement=document.createElement('div');
    this.endElement.className='gc_editor_end';
    this.endElement.innerHTML='END';

    this.startElement=document.createElement('div');
    this.startElement.className='gc_editor_start';
    this.startElement.innerHTML='START';

    
    this.element.appendChild(this.contentElement);
    this.element.appendChild(this.startElement);
    this.element.appendChild(this.endElement);
*/

	this.bindEvents();
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


