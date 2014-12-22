function GC_EditorPopup(editor)
{
	this.editor=editor;
}


GC_EditorPopup.prototype.open=function(content) {
	$(content).modal();
}


GC_EditorPopup.prototype.close=function() {
	$.modal.close();
}


GC_EditorPopup.prototype.openComponent=function(component) {
	eval('var dataComponent='+component.element.getAttribute('data-component'));

	var popupMethod=dataComponent.method;

	this.editor[popupMethod](component, dataComponent);

	//alert(popupMethod);

}

GC_EditorPopup.prototype.openDatagrid=function(component) {

}




GC_EditorPopup.prototype.openAttribute=function(descriptor, callbackOk, callbackNok) {


	var container=document.createElement('div');
	container.className='gc_editor_attribute_container';


	container.editor=this;


	for(var attribute in descriptor) {
		var inputContainer=document.createElement('div');
		inputContainer.className='gc_editor_attribute';


		var label=document.createElement('label');
		label.innerHTML=descriptor[attribute].caption;
		inputContainer.appendChild(label);


		if(Array.isArray(descriptor[attribute].values)) {
			var select=document.createElement('select');
			select.setAttribute('name', attribute);
			select.className='gc_editor_attribute_value';

			for(var i=0; i<descriptor[attribute].values.length; i++) {
				var option=document.createElement('option');
				option.innerHTML=descriptor[attribute].values[i].caption;
				option.value=descriptor[attribute].values[i].value;
				select.appendChild(option);
			}
			inputContainer.appendChild(select);
		}
		else {
			var input=document.createElement('input');
			input.setAttribute('name', attribute);
			input.className='gc_editor_attribute_value';
			inputContainer.appendChild(input);

		}
		container.appendChild(inputContainer);
	}

	var buttonContainer=document.createElement('div');
	buttonContainer.className='gc_editor_button_container';

	var okButton=document.createElement('button');
	okButton.innerHTML='Valider';

	var cancelButton=document.createElement('button');
	cancelButton.innerHTML='Annuler';



	var self=this;
	var clickEvent=function(event) {

		var valueElements=this.querySelectorAll('.gc_editor_attribute_value');
		var values={};

		for(var i=0; i<valueElements.length; i++) {
			var name=valueElements[i].getAttribute('name');
			values[name]=valueElements[i].value;
		}
		callbackOk(values, self.editor);

	}


	okButton.onclick=clickEvent.bind(container);
	cancelButton.onclick=callbackNok.bind(container);



	buttonContainer.appendChild(cancelButton);

	buttonContainer.appendChild(okButton);

	container.appendChild(buttonContainer);

	this.open(container);

}