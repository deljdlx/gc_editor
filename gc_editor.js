function GC_Editor(node)
{
	this.element=node;
	this.bindEvents();
}

GC_Editor.prototype.insertAtCarret=function(element, selectPastedContent) {

	
	if(window.getSelection().rangeCount) {
	
		var selection=this.saveSelection();
		

	
		var range = window.getSelection().getRangeAt(0);
		
		var spacerElement=document.createElement('span');
		spacerElement.innerHTML='&nbsp;';
		
		range.insertNode(spacerElement);
		
		range.insertNode(element);
		
		

		this.element.focus();

		var range = document.createRange();
		
        range.selectNodeContents(spacerElement);
        range.collapse(false);
		
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
		
	}
	return;
	

		
	

    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
			
			//var el = element;
            //el.innerHTML = html;
			el.appendChild(element);
			
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
}




GC_Editor.prototype.getContent=function() {
	return this.element.innerHTML;
}



GC_Editor.prototype.bindEvents=function() {
	var self=this;
	this.element.addEventListener('keyup', function(ev){
		if(ev.keyCode == '13') {
			document.execCommand('formatBlock', false, 'p');
		}
		//console.value=self.element.innerHTML;
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


