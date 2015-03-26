(function(window){
	"use strict";
	console.log("starter.js Succesfully loaded in browser");

	$(document).ready(function(){
		//perform task when browser window is fully loaded
		console.log('document ready')
		createChart()
	});
	function createChart () {
		var ctx = $("#myChart").get(0).getContext("2d");
	}
	
}(this));
	