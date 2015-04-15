$(function(){
	$('#tab-pattern').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('grid-100').hide();
		$('#analysis_pattern').show();
		$('#analyze').text("Analyze");
	});

	$('#tab-method').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('.grid-100').hide();
		$('#analysis_method').show();
		$('#analyze').text("Analyze");
	});
	
	$('#tab-dataset').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('grid-100').hide();
		$('#analysis_data').show();
		$('#analyze').text("Analyze");
	});

	$('#tab-visualize').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('.grid-100').hide();
		$('#analysis_visualize').show();
		$('#analyze').text("Analyze");
	});


	$('div.dataset-chooser').not('.disabled').find('div.dataset-chooser-item').on('click', function(){
		$(this).parent().parent().find('div.dataset-chooser-item').removeClass('selected');
		$(this).addClass('selected');
		$(this).find('input[type="radio"]').prop("checked", true);
		
	});
});


(function(window){
	var containerCount = 0
	var chartCount = 0
	var technique = {'regr':'REGRESSION','clfy':'CLASSIFICATION'}
	var charts = {'chartA':'CHARTA','chartB':'CHARTB'}
	$(document).ready(function(){
		console.log("im loaded")
		setupTheme();
		setupButtons();
		setupMenu();
	});
	function setupButtons(){
		$('#analyze').click(function(){
			createAnalysisView(testData,testSeries,technique.regr)
		})
	}

	function createAnalysisView(data,labels,type){
		var divId = 'container'+containerCount //create Unique container ID
		var container = $("<div/>", {id: divId,class:'grid-100'})//create container for this analysis
		$('#analysis_visualize').append(container)//append it to the page
		if(type===technique.regr){
			//showing test data for regression
			attachChart(data,labels,charts.chartB,divId)
			attachMetrics(null,divId)
			//showing actual prediction for regression
			attachChart(data,labels,charts.chartA,divId)
		}else if(type === technique.clfy){
			// attach what you want etc using attachChart
		}
		containerCount++;
	}

	function attachChart(data,labels,chartType,divId){
		console.log('attach Chart'+chartType)
		var chartId = 'chart'+chartCount //create unique ID for the container
		var row = $("<div/>",{class:'grid-100'})
		var col = $("<div/>",{class:'grid-container'})
		$("<div/>", {id: chartId,class:'grid-container'}).appendTo(col) //create the Container Itself and append it
		col.appendTo(row)
		row.appendTo($('#'+divId))

		if(chartType===charts.chartA)
			createChartA(data,labels,'#'+chartId)
		else if(chartType===charts.chartB)
			createChartB(data, labels, '#'+chartId)
		chartCount++
	}

	function attachMetrics(data,divId){
		var row = $("<div/>",{class:'grid-container'}).appendTo($('#'+divId))
		var col1 = $("<div/>",{class:'grid-50'})
		var C1_content = $("<div/>",{class:'container-fluid analysis-text-Container'}).append('<p>Mean Squared Error</p>')
		C1_content.appendTo(col1)
		var col2 = $("<div/>",{class:'grid-50'})
		var C2_content = $("<div/>",{class:'container-fluid analysis-text-Container'}).append('<p>Mean Squared Error</p>')
		C2_content.appendTo(col2)
		var col3 = $("<div/>",{class:'grid-50'})
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