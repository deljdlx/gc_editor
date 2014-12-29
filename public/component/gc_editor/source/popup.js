GC_Editor.Popup=function(editor)
{
	this.editor=editor;
}


GC_Editor.Popup.prototype.open=function(content) {
	$(content).modal();
}


GC_Editor.Popup.prototype.close=function() {
	$.modal.close();
}


GC_Editor.Popup.prototype.openComponent=function(component) {

	//console.debug(componentContainer.getData());

	var componentData=component.getComponentDescriptor();

	var popupMethod=componentData.method;

	this.editor[popupMethod](component);


}




GC_Editor.Popup.prototype.openAttribute=function(descriptor, callbackOk, callbackNok) {


	var container=document.createElement('div');
	container.className='gc_editor_attribute_container';


	container.editor=this;

	if(typeof(descriptor.prepend)!='undefined') {
		container.appendChild(descriptor.prepend)
	}



	for(var attribute in descriptor.attributes) {
		var inputContainer=document.createElement('div');
		inputContainer.className='gc_editor_attribute';


		var label=document.createElement('label');
		label.innerHTML=descriptor.attributes[attribute].caption;
		inputContainer.appendChild(label);


		if(Array.isArray(descriptor.attributes[attribute].values)) {
			var select=document.createElement('select');
			select.setAttribute('name', attribute);
			select.className='gc_editor_attribute_value';

			for(var i=0; i<descriptor.attributes[attribute].values.length; i++) {
				var option=document.createElement('option');
				option.innerHTML=descriptor.attributes[attribute].values[i].caption;
				option.value=descriptor.attributes[attribute].values[i].value;
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



	if(typeof(descriptor.append)!='undefined') {
		container.appendChild(descriptor.append)
	}



	buttonContainer.appendChild(cancelButton);
	buttonContainer.appendChild(okButton);
	container.appendChild(buttonContainer);

	this.open(container);

}