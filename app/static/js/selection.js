// $(function(){
// 	$('div.product-chooser').not('.disabled').find('div.product-chooser-item').on('click', function(){
// 		$(this).parent().parent().find('div.product-chooser-item').removeClass('selected');
// 		$(this).addClass('selected');
// 		$(this).find('input[type="radio"]').prop("checked", true);
		
// 	});
// });

$(function()
{
	populate()
});


function populate(){
	var datasets = [];
	var divID = 'object-chooser';
	// Fetch the list of datasets
	previewDatasets(null,null,'Mining',function(response){
		data = $.parseJSON(response);
		$.each(data,function(index,sublist){
			datasets.push(sublist)
		})
	});
	// attachDataset(datasets,divID);
	var row = $("<div/>",{class:'grid-100'});
	var inner = $("<div/>",{class:'data-chooser-item'});
	var row2 = $("<div/>",{class:'grid-75'})
	var title = $("<span/>",{class:"title", Mobile})
	var desc = $("<span/>",{class:"description"})
	var something = $('<input/>').attr({ type: 'radio', name:'product', value:'mobile'});
	var ending $('<div/>',{class:'clear'});
	
	title.appendTo(row2);
	desc.appendTo(row2);
	something.appendTo(row2);
	row2.appendTo(inner);
	ending.appendTo(inner);
	inner.appendTo(row);
	row.appendTo($('#')+divID);

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
