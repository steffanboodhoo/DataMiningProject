(function(window){
	"use strict";
	console.log("starter.js Succesfully loaded in browser");

	$(document).ready(function(){
		//perform task when browser window is fully loaded
		console.log('document ready')
		var arr=range(1,10)
		console.log(arr)
		setupButtons();
		//createChart()
	});
	function setupButtons(){
		console.log('setting up buttons')
		$("#About_button").click(function(){
			console.log('click')
		});
		$("#home_button").click(function(){
			console.log('click')
		});

	}
	function createChart (series,categories) {
		//var ctx = $("#myChart").get(0).getContext("2d");
		$(function () {
		    $('#myChart').highcharts({
		        title: {
		            text: 'Monthly Average Temperature',
		            x: -20 //center
		        },
		        subtitle: {
		            text: 'Source: WorldClimate.com',
		            x: -20
		        },
		        xAxis: {
		            categories: categories
		        },
		        yAxis: {
		            title: {
		                text: 'Temperature (°C)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '°C'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Predicted',
		            data: data['Predicted']
		        },{
		        	name:'Actual',
		        	data:data['Actual']
		        }
		        /* {
		            name: 'New York',
		            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		        }*/]
		    });
		});
	}
	
	function range(start,end,step){
		if(typeof start === "undefined" || typeof end ==="undefined")
			throw TypeError("Must pass start and end arguments.");
    	else if (typeof start != typeof end)
        	throw TypeError("Start and end arguments must be of same type.");
    	
		if (step === 0)
        	throw new TypeError("Step cannot be zero.");

    	if (end < start)
        	step = -step;

        typeof step == "undefined" && (step = 1);

        if (typeof start == "number") {
        	range=[]
	        while (step > 0 ? end >= start : end <= start) {
	            range.push(start);
	            start += step;
	        }

    	}else if (typeof start == "string") {

	        if (start.length != 1 || end.length != 1) {
	            throw new TypeError("Only strings with one character are supported.");
	        }

	        start = start.charCodeAt(0);
	        end = end.charCodeAt(0);

	        while (step > 0 ? end >= start : end <= start) {
	            range.push(String.fromCharCode(start));
	            start += step;
	        }

    	} else {
        	throw new TypeError("Only string and number types are supported");
    	}
    	return range
	}
}(this));
	