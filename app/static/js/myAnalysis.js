(function(window){
	var canCreate = true;
	var containerCount = 0
	var chartCount = 0
	var technique = {'regr':'REGRESSION','clfy':'CLASSIFICATION'}
	var charts = {'chartA':'CHARTA','chartB':'CHARTB','chartC':'CHARTC','chartD':'CHARTD','chartE':'CHARTE'}
	$(document).ready(function(){
		console.log("im loaded")
		setupTheme();
		setupButtons();
		setupMenu();
		createMethodTab(null)
	});
	function setupButtons(){
		$('#doneCreatingBtn').click(function(){
			var dataCopy = testData
			mineData("weight","regression",createAnalysisView)
				//fetch data and pass them into this function
				//createAnalysisView(dataCopy,testSeries,technique.regr)
		})
		$('#doneTabOption').click(function(){
			displayOptions();
		})
	}
	function setupCloseBtn(closeBtnId,divId){
		$('#'+closeBtnId).click(function(){
			console.log('click')
			$('#'+divId).fadeOut(1000,function(){
				$('#'+divId).remove();
			})
		})
	}
	function deepCopy(data){
		var dataCopy = []
		data.forEach(function(oldObject){
			var newObject = jQuery.extend(true, {}, oldObject);
			dataCopy.push(newObject)
		})
		return dataCopy
	}
	function setupChangeBtn(nextBtnId,chartId,chartCount){
		$('#'+nextBtnId).click(function(){
			$(chartId).empty()
			var val = parseInt($('#'+nextBtnId).val()) + 1
			val = (val)%5
			$('#'+nextBtnId).val(val)
			var dataCopy = deepCopy(testData)
			var categories = testSeries
			console.log(dataCopy)
			if(val===0){
				createChartA(dataCopy,categories,chartId)
			}else if(val===1){
				createChartB(dataCopy,categories,chartId)
			}else if(val===2){
				createChartC(dataCopy,categories,chartId)
			}else if(val===3){
				createChartD(dataCopy,categories,chartId)
			}else if(val===4){
				createChartE(dataCopy,categories,chartId)
			}
		})
	}
	function createMethodTab(type){
		//if(type==='regression'){
			/*<label class="btn btn-default btn-block">
            <input type="radio" name="options" id="option2"> Option 2
        </label>*/
        	$("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions"})).append("Multivariate Linear").appendTo($("#method_options_group"))
        	$("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions"})).append("Ridge").appendTo($("#method_options_group"))
        	$("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions"})).append("Lasso").appendTo($("#method_options_group"))
			
		/*}else if(type==='classification'){

		}*/
	}
	function createPreparationAndDoneTab(){
		///<div class="btn-group btn-group-justified" role="group" aria-label="...">
		//</div>
	}
	function displayOptions(){
		$("#optionsDisplay").empty()
		var method = $('#method_options_group > .btn.active').text();
		$('<h1>').append("Method").appendTo($("#optionsDisplay"))
		$('<p>').append(method).appendTo($("#optionsDisplay"))

		$('<h1>').append("Preparation").appendTo($("#optionsDisplay"))
		$('input[name="dataprepOption"]:checked').each(function() {
		   $('<p>').append(this.value).appendTo($("#optionsDisplay")) 
		});
	}

	function mineData(name,technique,callback){

		var method = $('#method_options_group > .btn.active').text();
		var vals=[],normalization,standardization
		$('input[name="dataprepOption"]:checked').each(function() {
			vals.push(this.value)
			if(this.value==="standardization")
				standardization='yes'
			if(this.value==="normalization")
				normalization='yes'
		});

		if(vals.length==0){
			console.log("nothing selected")
		}else if(method===""){	
			console.log("no method selected")
		}else{

			mine(name,technique,method,normalization,standardization,function(data){
				//createAnalysisView()
				console.log(data)
				//callback	
			})
		}
	}
	function mine(name,technique,method,normalization,standardization,call_back){
		query_str='name='+name+'&technique='+technique+''
		query_str+='&method='+method+'&normalization='+normalization+''
		query_str+='&standardization='+standardization+''
		$.ajax({
			url:'/Mine',
			type:'GET',
			data:query_str,
			success:function(response){
				if(typeof call_back==='function')
					call_back(response)
				else
					console.log(response)
			}
		})
	}


	function createAnalysisView(data,labels,type){
		var divId = 'container'+containerCount //create Unique container ID
		var container = $("<div/>", {id: divId,class:'container-fluid analysis-Container'})//create container for this analysis
		$('#mid_pane').append(container)//append it to the page

		if(type===technique.regr){
			//showing test data for regression
			attachChartWithButtons(data,labels,charts.chartB,divId)
			attachMetrics(null,divId)
			//showing actual prediction for regression
			attachChartWithButtons(data,labels,charts.chartA,divId)
		}else if(type === technique.clfy){
			// attach what you want etc using attachChart
		}
		//moves screen to container
		 $('html, body').animate({'scrollTop': container.offset().top}, 'slow', 'swing');
		//$('html, body').animate({'scrollTop': container.offset().top}, 1000);
		containerCount++;
	}

	function attachChartWithButtons(data,labels,chartType,divId){
		console.log('attach Chart'+chartType)
		var chartId = 'chart'+chartCount //create unique ID for the container
		var row = $("<div/>",{class:'row content-Container'})//creates a row for the chart and buttons
		var col = $("<div/>",{class:'col-md-11'})//creates a column span 11/12 for chart
		$("<div/>", {id: chartId,class:'container-fluid'}).appendTo(col) //create the Container Itself and append it
		col.appendTo(row) 
		attachChartButtons(divId,row,chartCount);
		//create buttons here before attaching
		row.appendTo($('#'+divId))
		if(chartCount%2==0)
			setupCloseBtn("btn_close_"+chartCount,divId)
		setupChangeBtn("btn_next_"+chartCount,'#'+chartId,chartCount)

		if(chartType===charts.chartA)
			createChartA(data,labels,'#'+chartId)
		else if(chartType===charts.chartB)
			createChartB(data, labels, '#'+chartId)
		else if(chartType===charts.chartC)
			createChartC(data, labels, '#'+chartId)
		else if(chartType===charts.chartD)
			createChartD(data, labels, '#'+chartId)
		else if(chartType===charts.chartE)
			createChartE(data, labels, '#'+chartId)
		chartCount++
	}
	function attachChartButtons(divId,row,chartCount){
		var btns_col  = $("<div/>",{class:'col-md-1'})//creates a column span 1/12 for buttons
		var btn_group = $("<div/>",{class:'btn-group-vertial'})
		if(chartCount%2==0){
			$("<button>",{id:"btn_close_"+chartCount,class:'btn btn-default btn-lg '}).append($('<span>',{class:'glyphicon glyphicon-remove-circle'})).appendTo(btn_group)
			$("<button>",{id:'btn_next_'+chartCount,class:'btn btn-default btn-lg',value:1}).append($('<span>',{class:'glyphicon glyphicon-circle-arrow-right'})).appendTo(btn_group)
		}else{
			$("<button>",{id:'btn_next_'+chartCount,class:'btn btn-default btn-lg',value:0}).append($('<span>',{class:'glyphicon glyphicon-circle-arrow-right'})).appendTo(btn_group)
		}
		btn_group.appendTo(btns_col)
		//<div class="btn-group-vertical" role="group" aria-label="...">
		//</div>
		//btnClose.appendTo(btns_col);
		btns_col.appendTo(row);
	}

	function attachMetrics(data,divId){
		var row = $("<div/>",{class:'row content-Container'}).appendTo($('#'+divId))
		var col1 = $("<div/>",{class:'col-md-4'})
		var C1_content = $("<div/>",{class:'container-fluid analysis-text-Container'}).append('<p>Mean Squared Error</p>')
		C1_content.appendTo(col1)
		var col2 = $("<div/>",{class:'col-md-4'})
		var C2_content = $("<div/>",{class:'container-fluid analysis-text-Container'}).append('<p>Mean Squared Error</p>')
		C2_content.appendTo(col2)
		var col3 = $("<div/>",{class:'col-md-4'})
		var C3_content = $("<div/>",{class:'container-fluid analysis-text-Container'}).append('<p>Mean Squared Error</p>')
		C3_content.appendTo(col3)
		row.append(col1)
		row.append(col2)
		row.append(col3)
	}
	function setupMenu(){
		 $(".toggle-btn").click(function(){
        	$("#myCollapsible").collapse('toggle');
    	});
	}
	function openAnalysisMenu(divId){

	}


	function createChartA (data,categories,chartContainer) {
		$(function () {
		    $(chartContainer).highcharts({
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
		        series: testData
		        /* {
		            name: 'New York',
		            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		        }*/
		    });
		});
	}

	function createChartB(data,categories,chartContainer){
		$(function () {
	        $(chartContainer).highcharts({
	            title: {
	                text: 'lk'
	            },

	            subtitle: {
	                text: 'Source: Google Analytics'
	            },

	            xAxis: {
	                 // one week
	                labels: {
	                    align: 'left',
	                    x: 3,
	                    y: -3
	                }
	            },

	            yAxis: [{ // left y axis
	                title: {
	                    text: null
	                },
	                labels: {
	                    align: 'left',
	                    x: 3,
	                    y: 16,
	                    format: '{value:.,0f}'
	                },
	                showFirstLabel: false
	            }, { // right y axis
	                linkedTo: 0,
	                gridLineWidth: 0,
	                opposite: true,
	                title: {
	                    text: null
	                },
	                labels: {
	                    align: 'right',
	                    x: -3,
	                    y: 16,
	                    format: '{value:.,0f}'
	                },
	                showFirstLabel: false
	            }],

	            legend: {
	                align: 'left',
	                verticalAlign: 'top',
	                y: 20,
	                floating: true,
	                borderWidth: 0
	            },

	            tooltip: {
	                shared: true,
	                crosshairs: true
	            },

	            plotOptions: {
	                series: {
	                    cursor: 'pointer',
	                    point: {
	                        events: {
	                            click: function (e) {
	                                hs.htmlExpand(null, {
	                                    pageOrigin: {
	                                        x: e.pageX || e.clientX,
	                                        y: e.pageY || e.clientY
	                                    },
	                                    headingText: this.series.name,
	                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
	                                        this.y + ' visits',
	                                    width: 200
	                                });
	                            }
	                        }
	                    },
	                    marker: {
	                        lineWidth: 1
	                    }
	                }
	            },
	            series:data
	        });
	    });
	}

	function createChartC(data,categories,chartContainer){
		var dataC = data
		dataC.forEach(function(obj){
			obj['type']='area';
		})

		$(function () {
		    $(chartContainer).highcharts({
		        chart: {
		            zoomType: 'x'
		        },
		        title: {
		            text: 'USD to EUR exchange rate from 2006 through 2008'
		        },
		        subtitle: {
		            text: document.ontouchstart === undefined ?
		                    'Click and drag in the plot area to zoom in' :
		                    'Pinch the chart to zoom in'
		        },
		        xAxis: {
		            categories:categories
		        },
		        yAxis: {
		            title: {
		                text: 'Exchange rate'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            area: {
		                fillColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
		                    stops: [
		                        [0, Highcharts.getOptions().colors[0]],
		                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		                    ]
		                },
		                marker: {
		                    radius: 2
		                },
		                lineWidth: 1,
		                states: {
		                    hover: {
		                        lineWidth: 1
		                    }
		                },
		                threshold: null
		            }
		        },
		        series: dataC
		    });
		});
	}
	function createChartD(data,categories,chartContainer){
		$(function () {
		    $(chartContainer).highcharts({
		        chart: {
		            type: 'area'
		        },
		        title: {
		            text: 'US and USSR nuclear stockpiles'
		        },
		        subtitle: {
		            text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
		                'thebulletin.metapress.com</a>'
		        },
		        xAxis: {
		            categories:categories
		        },
		        yAxis: {
		            title: {
		                text: 'Nuclear weapon states'
		            },
		            
		        },
		        tooltip: {
			                shared: true,
			                crosshairs: true
			            },
		        plotOptions: {
		            area: {
		                
		                marker: {
		                    enabled: false,
		                    symbol: 'circle',
		                    radius: 2,
		                    states: {
		                        hover: {
		                            enabled: true
		                        }
		                    }
		                }
		            }
		        },
		        series: data
		    });
		});
	}

	function createChartE(dataa,categories,chartContainer){
		//$("<div/>",{class:'container-fluid',id:'container'}).appendTo(chartContainer)
		//$("<div/>",{class:'container-fluid ',id='master-container'}).appendTo(chartContainer)

		$(function () {
		    var data = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
		        detailChart;

	   

	        // create the detail chart
	        function createDetail(masterChart) {

	            // prepare the detail chart
	            var detailData = [],
	                detailStart = Date.UTC(2008, 7, 1);

	            $.each(masterChart.series[0].data, function () {
	                if (this.x >= detailStart) {
	                    detailData.push(this.y);
	                }
	            });

	            // create a detail chart referenced by a global variable
	            detailChart = $('#detail-container').highcharts({
	                chart: {
	                    marginBottom: 120,
	                    reflow: false,
	                    marginLeft: 50,
	                    marginRight: 20,
	                    style: {
	                        position: 'absolute'
	                    }
	                },
	                credits: {
	                    enabled: false
	                },
	                title: {
	                    text: 'Historical USD to EUR Exchange Rate'
	                },
	                subtitle: {
	                    text: 'Select an area by dragging across the lower chart'
	                },
	                xAxis: {
	                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	                },
	                yAxis: {
	                    title: {
	                        text: null
	                    },
	                    maxZoom: 0.1
	                },
	                tooltip: {
	                    formatter: function () {
	                        var point = this.points[0];
	                        return '<b>' + point.series.name + '</b><br/>' +
	                            Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
	                            '1 USD = ' + Highcharts.numberFormat(point.y, 2) + ' EUR';
	                    },
	                    shared: true
	                },
	                legend: {
	                    enabled: false
	                },
	                plotOptions: {
	                    series: {
	                        marker: {
	                            enabled: false,
	                            states: {
	                                hover: {
	                                    enabled: true,
	                                    radius: 3
	                                }
	                            }
	                        }
	                    }
	                },
	                series: [{
	                    name: 'USD to EUR',
	                    data: detailData
	                }],

	                exporting: {
	                    enabled: false
	                }

	            }).highcharts(); // return chart
	        }

	        // create the master chart
	        function createMaster() {
	            $('#master-container').highcharts({
	                chart: {
	                    reflow: false,
	                    borderWidth: 0,
	                    backgroundColor: null,
	                    marginLeft: 50,
	                    marginRight: 20,
	                    zoomType: 'x',
	                    events: {

	                        // listen to the selection event on the master chart to update the
	                        // extremes of the detail chart
	                        selection: function (event) {
	                            var extremesObject = event.xAxis[0],
	                                min = extremesObject.min,
	                                max = extremesObject.max,
	                                detailData = [],
	                                xAxis = this.xAxis[0];

	                            // reverse engineer the last part of the data
	                            $.each(this.series[0].data, function () {
	                                if (this.x > min && this.x < max) {
	                                    detailData.push([this.x, this.y]);
	                                }
	                            });

	                            // move the plot bands to reflect the new detail span
	                            xAxis.removePlotBand('mask-before');
	                            xAxis.addPlotBand({
	                                id: 'mask-before',
	                                from: Date.UTC(2006, 0, 1),
	                                to: min,
	                                color: 'rgba(0, 0, 0, 0.2)'
	                            });

	                            xAxis.removePlotBand('mask-after');
	                            xAxis.addPlotBand({
	                                id: 'mask-after',
	                                from: max,
	                                to: Date.UTC(2008, 11, 31),
	                                color: 'rgba(0, 0, 0, 0.2)'
	                            });


	                            detailChart.series[0].setData(detailData);

	                            return false;
	                        }
	                    }
	                },
	                title: {
	                    text: null
	                },
	                xAxis: {
	                    
	                    title: {
	                        text: null
	                    }
	                },
	                yAxis: {
	                    gridLineWidth: 0,
	                    labels: {
	                        enabled: false
	                    },
	                    title: {
	                        text: null
	                    },
	                    min: 0.6,
	                    showFirstLabel: false
	                },
	                tooltip: {
	                    formatter: function () {
	                        return false;
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                credits: {
	                    enabled: false
	                },
	                plotOptions: {
	                    series: {
	                        fillColor: {
	                            linearGradient: [0, 0, 0, 70],
	                            stops: [
	                                [0, Highcharts.getOptions().colors[0]],
	                                [1, 'rgba(255,255,255,0)']
	                            ]
	                        },
	                        lineWidth: 1,
	                        marker: {
	                            enabled: false
	                        },
	                        shadow: false,
	                        states: {
	                            hover: {
	                                lineWidth: 1
	                            }
	                        },
	                        enableMouseTracking: false
	                    }
	                },

	                series: [{
	                    type: 'area',
	                    name: 'USD to EUR',
	                    data: data
	                }],

	                exporting: {
	                    enabled: false
	                }

	            }, function (masterChart) {
	                createDetail(masterChart);
	            })
	                .highcharts(); // return chart instance
	        }

	        // make the container smaller and add a second container for the master chart
	        //var $container = $(chartContainer)
	            

	        $('<div id="detail-container">')
	            .appendTo($(chartContainer));

	        $('<div id="master-container">')
	            .appendTo($(chartContainer));

	        // create master and in its callback, create the detail chart
	        createMaster();

		});
	}

	var testData=[{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }];
    var testSeries = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //-------------------------------------------------------------------
    function setupTheme(){
    	/**
		 * Dark theme for Highcharts JS
		 * @author Torstein Honsi
		 */

		// Load the fonts
		Highcharts.createElement('link', {
		   href: '//fonts.googleapis.com/css?family=Unica+One',
		   rel: 'stylesheet',
		   type: 'text/css'
		}, null, document.getElementsByTagName('head')[0]);

		Highcharts.theme = {
		   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		   chart: {
		      backgroundColor: {
		         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
		         stops: [
		            [0, '#2a2a2b'],
		            [1, '#3e3e40']
		         ]
		      },
		      style: {
		         fontFamily: "'Unica One', sans-serif"
		      },
		      plotBorderColor: '#606063'
		   },
		   title: {
		      style: {
		         color: '#E0E0E3',
		         textTransform: 'uppercase',
		         fontSize: '20px'
		      }
		   },
		   subtitle: {
		      style: {
		         color: '#E0E0E3',
		         textTransform: 'uppercase'
		      }
		   },
		   xAxis: {
		      gridLineColor: '#707073',
		      labels: {
		         style: {
		            color: '#E0E0E3'
		         }
		      },
		      lineColor: '#707073',
		      minorGridLineColor: '#505053',
		      tickColor: '#707073',
		      title: {
		         style: {
		            color: '#A0A0A3'

		         }
		      }
		   },
		   yAxis: {
		      gridLineColor: '#707073',
		      labels: {
		         style: {
		            color: '#E0E0E3'
		         }
		      },
		      lineColor: '#707073',
		      minorGridLineColor: '#505053',
		      tickColor: '#707073',
		      tickWidth: 1,
		      title: {
		         style: {
		            color: '#A0A0A3'
		         }
		      }
		   },
		   tooltip: {
		      backgroundColor: 'rgba(0, 0, 0, 0.85)',
		      style: {
		         color: '#F0F0F0'
		      }
		   },
		   plotOptions: {
		      series: {
		         dataLabels: {
		            color: '#B0B0B3'
		         },
		         marker: {
		            lineColor: '#333'
		         }
		      },
		      boxplot: {
		         fillColor: '#505053'
		      },
		      candlestick: {
		         lineColor: 'white'
		      },
		      errorbar: {
		         color: 'white'
		      }
		   },
		   legend: {
		      itemStyle: {
		         color: '#E0E0E3'
		      },
		      itemHoverStyle: {
		         color: '#FFF'
		      },
		      itemHiddenStyle: {
		         color: '#606063'
		      }
		   },
		   credits: {
		      style: {
		         color: '#666'
		      }
		   },
		   labels: {
		      style: {
		         color: '#707073'
		      }
		   },

		   drilldown: {
		      activeAxisLabelStyle: {
		         color: '#F0F0F3'
		      },
		      activeDataLabelStyle: {
		         color: '#F0F0F3'
		      }
		   },

		   navigation: {
		      buttonOptions: {
		         symbolStroke: '#DDDDDD',
		         theme: {
		            fill: '#505053'
		         }
		      }
		   },

		   // scroll charts
		   rangeSelector: {
		      buttonTheme: {
		         fill: '#505053',
		         stroke: '#000000',
		         style: {
		            color: '#CCC'
		         },
		         states: {
		            hover: {
		               fill: '#707073',
		               stroke: '#000000',
		               style: {
		                  color: 'white'
		               }
		            },
		            select: {
		               fill: '#000003',
		               stroke: '#000000',
		               style: {
		                  color: 'white'
		               }
		            }
		         }
		      },
		      inputBoxBorderColor: '#505053',
		      inputStyle: {
		         backgroundColor: '#333',
		         color: 'silver'
		      },
		      labelStyle: {
		         color: 'silver'
		      }
		   },

		   navigator: {
		      handles: {
		         backgroundColor: '#666',
		         borderColor: '#AAA'
		      },
		      outlineColor: '#CCC',
		      maskFill: 'rgba(255,255,255,0.1)',
		      series: {
		         color: '#7798BF',
		         lineColor: '#A6C7ED'
		      },
		      xAxis: {
		         gridLineColor: '#505053'
		      }
		   },

		   scrollbar: {
		      barBackgroundColor: '#808083',
		      barBorderColor: '#808083',
		      buttonArrowColor: '#CCC',
		      buttonBackgroundColor: '#606063',
		      buttonBorderColor: '#606063',
		      rifleColor: '#FFF',
		      trackBackgroundColor: '#404043',
		      trackBorderColor: '#404043'
		   },

		   // special colors for some of the
		   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		   background2: '#505053',
		   dataLabelsColor: '#B0B0B3',
		   textColor: '#C0C0C0',
		   contrastTextColor: '#F0F0F3',
		   maskColor: 'rgba(255,255,255,0.3)'
		};
		// Apply the theme
		Highcharts.setOptions(Highcharts.theme);
    }
}(this));