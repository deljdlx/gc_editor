GC_Editor.ImageDragAndDrop=function(editor)
{
	this.editor=editor;
	this.initialize();
}


GC_Editor.ImageDragAndDrop.prototype.getElementAttributeDescriptor=function() {
	return {
		align: {
			caption:'Alignement',
			type: 'select',
			values: [
				{caption: 'Aucun', value: ''},
				{caption: 'Gauche', value: 'left'},
				{caption: 'Droite', value: 'right'},
				{caption: 'Base', value: 'baseline'}
			]
		},
		'title': {
			caption: 'Titre',
			type: 'string'
		}
	};
}



GC_Editor.ImageDragAndDrop.prototype.onSuccess=function(data) {

	var uri=data.uri;


	var attributeDescriptor=this.getElementAttributeDescriptor();

	var element=document.createElement('div');
	element.innerHTML='<img src="'+uri+'"/>';
	element.className='GC_Editor_Popup_Image';

	var descriptor={
		prepend: element,
		attributes: attributeDescriptor
	}


	this.editor.openAttributePopup(descriptor, function(values, editor) {
		var image = document.createElement('img');
		image.setAttribute('draggable', 'true');
		image.setAttribute('src', uri);
		image.setAttribute('title', values.title);
		image.setAttribute('align', values.align);
		image.style.resize='both';
		this.editor.insertNodeAtCaret(image)


		this.editor.closeAttributePopup();
	}, function() {
		this.editor.closeAttributePopup();
	});
}


GC.inherit(GC_Editor.ImageDragAndDrop, GC_Editor.DragAndDrop);


