function GC_Editor_DataGrid(editor, component, data)
{

	this.element=null;
	this.editor=editor;
	this.toolbar=null;

	this.component=component;
	this.data=data;

	//this.data=data;

}

GC_Editor_DataGrid.prototype.getDeleteButton=function() {

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


GC_Editor_DataGrid.prototype.getAddRowButton=function() {
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


GC_Editor_DataGrid.prototype.getToolbar=function() {
	if(!this.toolbar) {
		var toolbar = document.createElement('div');



		var addButton=this.getAddRowButton();
		toolbar.appendChild(addButton);

		var saveButton = document.createElement('button');
		saveButton.innerHTML = 'Insérer';

		var saveCallback=function() {
			var chartData=this.getData();

			//this.createPieChart(chartData);

			this.createLineChart(chartData);

			this.editor.closePopup();
		}

		saveButton.onclick=saveCallback.bind(this);
		toolbar.appendChild(saveButton);

		this.toolbar=toolbar;
	}
	return this.toolbar;
}



GC_Editor_DataGrid.prototype.createLineChart=function(chartData) {
	var chart=new GC_Editor_LineChart(this.editor, this.component, chartData);
	chart.create();
}




GC_Editor_DataGrid.prototype.getData=function() {
	var data=[];
	var rowscount = $(this.element).jqxGrid('getdatainformation').rowscount;


	if(rowscount) {
		var data = $(this.element).jqxGrid('exportdata', 'json');
	}


	var graphData=[];

	var graphData=JSON.parse(data);


	var chartData=[];

	for(var i=0; i<graphData.length; i++) {
		if(graphData[i]['Valeurs X']) {
			var value = parseFloat(graphData[i]['Valeurs Y']);
			var caption = graphData[i]['Valeurs X'];
		}

		chartData.push({
			value: value,
			color:"#F7464A",
			highlight: "#FF5A5E",
			label: caption
		})
	}
	return chartData;
}


GC_Editor_DataGrid.prototype.getDatasource=function() {

	var data=[{},{},{},{},{}];

	if(typeof(this.data)!=='undefined') {
		if (Array.isArray(this.data.data)) {

			var data = [];
			for (var i = 0; i < this.data.data.length; i++) {
				data.push({
					x: this.data.data[i].label,
					y: this.data.data[i].value
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



GC_Editor_DataGrid.prototype.create=function() {


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




GC_Editor_DataGrid.prototype.getElement=function() {
	this.element = document.createElement('div');
	this.element.className = 'gc_editor_datagrid';


	var toolbar = this.getToolbar();

	var container = document.createElement('div');

	container.appendChild(toolbar);
	container.appendChild(this.element);

	this.create();

	return container;
}


//===========================================================================
//===========================================================================

GC_Editor.prototype.openDataGridPopup=function(component, componentData) {


	var datagrid=new GC_Editor_DataGrid(this, component, componentData);

	var datagridElement=datagrid.getElement();

	this.popup.open(datagridElement)


}