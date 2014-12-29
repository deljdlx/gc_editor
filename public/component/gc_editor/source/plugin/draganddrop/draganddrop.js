GC_Editor.DragAndDrop=function(editor)
{
	this.editor=editor;
	this.initialize();
}


GC_Editor.DragAndDrop.prototype.onSuccess=function(data) {

}

GC_Editor.DragAndDrop.prototype.initialize=function() {

	var WorkspaceConfiguration={
		imageUploadURL: './bootstrap.php?action=post'
	}



	var dropZone=this.editor.getElement();
	var uploadURL=WorkspaceConfiguration.imageUploadURL;


	this.manager=new FileDrop(dropZone, uploadURL, {
		success: function(string) {

			var data=JSON.parse(string);

			for(var i=0; i<data.length; i++) {
				var uri=data[i].uri;
				if(typeof(this.onSuccess)!=='undefined') {
					this.onSuccess(data[i]);
				}
				//this.openPopup(uri);
			}
		}.bind(this)
	});

}

GC_Editor.DragAndDrop.prototype.getElementAttributeDescriptor=function() {
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


GC_Editor.DragAndDrop.prototype.openPopup=function(uri) {
	this.editor.openAttributePopup(this.getElementAttributeDescriptor(), function(values, editor) {

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



