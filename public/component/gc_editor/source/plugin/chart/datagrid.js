GC_Editor.DataGrid=function(editor)
{
	this.editor=editor;
	this.renderer=null;
}





GC_Editor.DataGrid.prototype.setEditorObject=function(editorObject) {
	this.editorObject=editorObject;
}



GC_Editor.DataGrid.prototype.getDeleteButton=function() {

	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Supprimer les lignes sélectionnées';

	deleteButton.onclick = function () {
		var selectedrows = $(this.element).jqxGrid('getselectedrowindexes');


		var rowscount = $(this.element).jqxGrid('getdatainformation').rowscount;

		for (var i = 0; i < selectedrows.length; i++) {
			var id = $(this.element).jqxGrid('getrowid', i);
			$(this.selector).jqxGrid('deleterow', id);
		}
	}
	toolbar.appendChild(deleteButton);
	return deleteButton;
}


GC_Editor.DataGrid.prototype.getAddRowButton=function() {
	var addButton = document.createElement('button');
	addButton.innerHTML = 'Ajouter une ligne';

	addButton.onclick = function () {
		var datarow = {
			firstname: '',
			productname: '',
			available: '',
			date: ''
		}
		$(this.element).jqxGrid('addrow', null, datarow);
	}.bind(this);
	return addButton;
}


GC_Editor.DataGrid.prototype.getToolbar=function() {
	if(!this.toolbar) {
		var toolbar = document.createElement('div');



		var addButton=this.getAddRowButton();
		toolbar.appendChild(addButton);

		var saveButton = document.createElement('button');
		saveButton.innerHTML = 'Insérer';


		saveButton.onclick=function() {

			//this.createLineChart(chartData);

			this.render();

			this.editor.closePopup();
		}.bind(this);

		toolbar.appendChild(saveButton);

		this.toolbar=toolbar;
	}
	return this.toolbar;
}


GC_Editor.DataGrid.prototype.render=function() {
	if(this.renderer) {
		this.renderer.loadComponentData(this.getComponentData());
		this.renderer.create();
	}
	else {
		this.createPieChart(this.getComponentData());
	}
}


GC_Editor.DataGrid.prototype.createLineChart=function(chartData) {
	var chart=new GC_Editor.LineChart(this.editor);
	chart.setComponentContainer(this.editorObject);
	chart.loadData(chartData);
	chart.create();
}

GC_Editor.DataGrid.prototype.createPieChart=function(chartData) {

	var chart=new GC_Editor.PieChart(this.editor);
	chart.loadComponentData(chartData);

	chart.create();
}






GC_Editor.DataGrid.prototype.getComponentData=function() {
	var data=[];
	var rowscount = $(this.element).jqxGrid('getdatainformation').rowscount;



	if(rowscount) {
		var data = $(this.element).jqxGrid('exportdata', 'json');
	}

	var graphData=[];
	var graphData=JSON.parse(data);


	var data=[];

	for(var i=0; i<graphData.length; i++) {
		if(graphData[i]['Valeurs X']) {
			var value = parseFloat(graphData[i]['Valeurs Y']);
			var caption = graphData[i]['Valeurs X'];

			data.push({
				value: value,
				label: caption
			});
		}
	}
	return data;
}


GC_Editor.DataGrid.prototype.getDatasource=function() {

	var data=[{},{},{},{},{}];



	if(typeof(this.componentData)!=='undefined') {
		if (Array.isArray(this.componentData)) {
			var data = [];
			for (var i = 0; i < this.componentData.length; i++) {
				data.push({
					x: this.componentData[i].label,
					y: this.componentData[i].value
				});
			}
		}
	}


	var editedRows = new Array();

	var source =
	{
		localdata: data,
		datatype: "array",
		updaterow: function (rowid, rowdata, commit) {
			// that function is called after each edit.

		},
		datafields:
			[
				{ name: 'x', type: 'string' },
				{ name: 'y', type: 'string' },
			]
	};



	var dataAdapter = new $.jqx.dataAdapter(source);
	return dataAdapter;
}


GC_Editor.DataGrid.prototype.setRenderer=function(renderingComponent) {
	this.renderer=renderingComponent;
	return this;
}


GC_Editor.DataGrid.prototype.create=function() {


	var editedRows = new Array();
	var cellclass = function (row, datafield, value, rowdata) {
		for (var i = 0; i < editedRows.length; i++) {
			if (editedRows[i].index == row) {
				return "editedRow";
			}
		}
	}


	var dataAdapter=this.getDatasource();

	$(this.element).jqxGrid({
		width: '100%',
		height: 300,
		source: dataAdapter,
		editable: true,
		selectionmode: 'multiplecellsadvanced',
		//selectionmode: 'multiplerows',
		columns: [
			{text: 'Valeurs X', columntype: 'textbox', cellclassname: cellclass, datafield: 'x', width: 120},
			{text: 'Valeurs Y', columntype: /*'dropdownlist'*/ 'textbox', cellclassname: cellclass, datafield: 'y', width: 195},
		]
	});
}





GC_Editor.DataGrid.prototype.getElement=function() {
	this.element = document.createElement('div');
	this.element.className = 'gc_editor_datagrid';


	var toolbar = this.getToolbar();

	var container = document.createElement('div');

	container.appendChild(toolbar);
	container.appendChild(this.element);

	this.create();

	return container;
}


GC.inherit(GC_Editor.DataGrid, GC_Editor.ComponentContainer);


//===========================================================================
//===========================================================================

GC_Editor.prototype.openDataGridPopup=function(component) {


	var datagrid=new GC_Editor.DataGrid(this);
	if(typeof(component)!=='undefined') {
		datagrid.loadComponentData(component.getComponentData());
		datagrid.setRenderer(component);
	}

	var datagridElement=datagrid.getElement();

	this.popup.open(datagridElement)

}
























