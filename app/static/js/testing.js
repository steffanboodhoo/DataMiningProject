function(name,technique,method,normalization,standardization,call_back){
	query_str='name='+name+'&technique='+technique+'&method='+method+'&normalization='+normalization+'&standardization='+standardization
	$.ajax({
		url:'/Mine',
		type:'GET',
		param:query_str,
		success:function(response){
			if(typeof call_back==='function')
				call_back(response)
			else
				console.log(response)
		}
	})
}
//You are allowed to pass nulls for all of these
//Only pass in an actual argument if you want it filtered e.g. (null,null,Mining)
//if you pass null for the call back it will take the data and print it to the console
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

//same rules as the preview but returns full datasets
function filterFullDatasets(name,technique,purpose,call_back){
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
		url:'/dataset/fullData',
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