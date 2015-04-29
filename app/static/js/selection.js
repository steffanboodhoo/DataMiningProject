// Globals
var dataset_name;
var dataset_method;

$(function(){
	// Pass in chooser function as callback, will wait until populate
	// function is finished to execute
	populate(chooser);
	$('#submit').click(function() {
		if(dataset_method == 'regression') {
			window.location = getRootUrl()+'myAnalysis'
		}
		if(dataset_method == 'classification') {
			window.location = getRootUrl()+'myAnalysis'
		}
	});
	
});

function getRootUrl() {
	return window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
}

function chooser(){
	$('div.dataset-chooser').not('.disabled').find('div.dataset-chooser-item').on('click', function(){
		$(this).parent().parent().find('div.dataset-chooser-item').removeClass('selected');
		$(this).addClass('selected');
		$(this).find('input[type="radio"]').prop("checked", true);
		dataset_name = $('input:radio[name=product]:checked').val();
		dataset_method = $('#'+dataset_name).attr('value');
		console.log(dataset_name);
		console.log(dataset_method);
		localStorage.setItem("dataset_name", JSON.stringify(dataset_name));
		localStorage.setItem("dataset_method", JSON.stringify(dataset_method));
	});
}

function populate(callback){
	// Fetch the list of datasets
	previewDatasets(null,null,'Mining',function(response){
		data = $.parseJSON(response);
		$.each(data,function(index,sublist){
			generateSelection(sublist)
		});
		// Wait until complete to run the function
		callback()
	});
}

function generateSelection(data){
	var divID = 'content';
	var col = $("<div/>",{class:'grid-75'});
	var row = $("<div/>",{class:'dataset-chooser-item'});
	var subrow = $("<div/>",{class:'grid-100'});
	var title = $("<span/>",{class:"title", text:'Title - '+data['name']});
	var operationType = $("<span/>",{id:data['name'], value:data['type'], class:"method", text :'Method - '+data['type']});
	var subject = $("<span/>",{class:"subject", text :'Subject - '+data['subject']});
	var selection = $('<input/>').attr({ type: 'radio', name:'product', value:data['name']});
	var ending = $("<div/>",{class:'clear'});

	// Append created object to HTML page
	title.appendTo(subrow);
	operationType.appendTo(subrow);
	subject.appendTo(subrow);
	selection.appendTo(subrow);
	subrow.appendTo(row);
	ending.appendTo(row);
	row.appendTo(col);
	$('#'+divID).append(col);
}

function previewDatasets(name,technique,purpose,call_back){
	var query_str=''
	if(name != null)
		query_str+='name='+name
	if(technique != null){
		if(query_str!='')
			query_str+='&'
		query_str+='technique='+technique
	}
	if(purpose != null){
		if(query_str!='')
			query_str+='&'
		query_str+='purpose='+purpose
	}
	$.ajax({
		url:'/dataset/previews',
		type: 'GET',
		data: query_str,
		success: function(response){
			var data = JSON.parse(response)
			if(typeof call_back === 'function')
				call_back(data)
			else
				console.log(data)
		}
	})
}
