$(function(){
	populate();
	$('div.dataset-chooser').not('.disabled').find('div.dataset-chooser-item').on('click', function(){
		$(this).parent().parent().find('div.dataset-chooser-item').removeClass('selected');
		$(this).addClass('selected');
		$(this).find('input[type="radio"]').prop("checked", true);
		
	});
});

function populate(){
	var datasets = [];
	var divID = 'content';
	// Fetch the list of datasets
	previewDatasets(null,null,'Mining',function(response){
		data = $.parseJSON(response);
		$.each(data,function(index,sublist){
			datasets.push(sublist)
		});
	});
	// attachDataset(datasets,divID);
	var row = $("<div/>",{class:'grid-100'});
	var inner = $("<div/>",{class:'dataset-chooser-item'});
	var img = $("<img src='http://renswijnmalen.nl/bootstrap/desktop_mobile.png'>")
	var row2 = $("<div/>",{class:'grid-75'});
	var title = $("<span/>",{class:"title", text:'Mobile and Desktop'});
	var desc = $("<span/>",{class:"description", text : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'});
	var something = $('<input/>').attr({ type: 'radio', name:'product', value:'mobile_desktop'});
	var ending = $("<div/>",{class:'clear'});
	
	img.appendTo(inner);
	title.appendTo(row2);
	desc.appendTo(row2);
	something.appendTo(row2);
	row2.appendTo(inner);
	ending.appendTo(inner);
	inner.appendTo(row);
	// row.appendTo($('#')+divID);
	$('#'+divID).append(row);


	var row2 = $("<div/>",{class:'grid-100'});
	var inner2 = $("<div/>",{class:'dataset-chooser-item'});
	var img2 = $("<img src='http://renswijnmalen.nl/bootstrap/desktop_mobile.png'>")
	var row22 = $("<div/>",{class:'grid-75'});
	var title2 = $("<span/>",{class:"title", text:'Mobile and Desktop'});
	var desc2 = $("<span/>",{class:"description", text : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'});
	var something2 = $('<input/>').attr({ type: 'radio', name:'product', value:'desktop'});
	var ending2 = $("<div/>",{class:'clear'});
	
	img2.appendTo(inner2);
	title2.appendTo(row22);
	desc2.appendTo(row22);
	something2.appendTo(row22);
	row22.appendTo(inner2);
	ending2.appendTo(inner2);
	inner2.appendTo(row2);
	// row.appendTo($('#')+divID);
	$('#'+divID).append(row2);


	// <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
 //    		<div class="product-chooser-item selected">
 //    			<img src="http://renswijnmalen.nl/bootstrap/desktop_mobile.png" class="img-rounded col-xs-4 col-sm-4 col-md-12 col-lg-12" alt="Mobile and Desktop">
 //                <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12">
 //    				<span class="title">Mobile and Desktop</span>
 //    				<span class="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</span>
 //    				<input type="radio" name="product" value="mobile_desktop" checked="checked">
 //    			</div>
 //    			<div class="clear"></div>
 //    		</div>
 //    	</div>
 // <div id="content" class="grid-100 form-group object-chooser">
	
	// <div class="grid-100">
	// 	<div class="dataset-chooser-item">
	// 		<div class="grid-75">
	// 			<span class="title">Mobile and Desktop</span>
	// 			<span class="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</span>
	// 			<input value="mobile_desktop" name="product" type="radio">
	// 			<img scr="http://renswijnmalen.nl/bootstrap/desktop_mobile.png"></div><div class="clear"></div></div></div></div>



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
