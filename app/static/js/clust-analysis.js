(function(window){
    var dataset_name = JSON.parse(localStorage.getItem('dataset_name'));
    var dataset_method = JSON.parse(localStorage.getItem('dataset_method'));

    console.log(dataset_name);
    console.log(dataset_method);
    console.log(window.location);

    var chartData=[];//
    var tableCount=0;
    var containerCount = 0
    var chartCount = 0
    var chartAmount = 2
    var technique = {'regr':'REGRESSION','clfy':'CLASSIFICATION','clstr':'CLUSTERING'}
    var charts = {'chart0':'CHART0','chartA':'CHARTA','chartB':'CHARTB','chartC':'CHARTC','chartD':'CHARTD','chartE':'CHARTE'}
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
            mineData("weight","clustering",createAnalysisView)
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
        var dataCopy;
        if(data instanceof Array){
            dataCopy = []
            data.forEach(function(oldObject){
                var newObject = jQuery.extend(true, {}, oldObject);
                dataCopy.push(newObject)
            })
        }else{
            dataCopy = {}
            for(var key in data){    
                var variable = data[key]
                var newProp;
                if(variable instanceof Array)
                    newProp = variable.slice();
                else
                    newProp = jQuery.extend(true, {}, variable)
                dataCopy[key]=newProp;
            }
            console.log(dataCopy)
        }
        return dataCopy
    }
    function setupChangeBtn(nextBtnId,chartId,chartCount){
        $('#'+nextBtnId).click(function(){
            $(chartId).empty()
            var val = parseInt($('#'+nextBtnId).val()) + 1
            val = (val)%chartAmount
            $('#'+nextBtnId).val(val)
            console.log(chartData[chartCount])
            console.log('-----')
            var dataCopy = deepCopy(chartData[chartCount])
            //var categories = range(1,dataCopy[0].data.length)
            console.log(dataCopy)
            if(val===0)
                createChartA(dataCopy,null,chartId)
            else if(val===1)
                createChartB(dataCopy,null,chartId)
           /* }else if(val===2){
                createChartC(dataCopy,categories,chartId)
            }else if(val===3){
                createChartD(dataCopy,categories,chartId)
            }else if(val===4){
                createChartE(dataCopy,categories,chartId)
            }*/
        })
    }
    function createMethodTab(type){
        //if(type==='regression'){
            /*<label class="btn btn-default btn-block">
            <input type="radio" name="options" id="option2"> Option 2
        </label>*/
            $("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions",value:"kmeans"})).append("K-means").appendTo($("#method_options_group"))
            $("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions",value:"meanShift"})).append("Mean Shift").appendTo($("#method_options_group"))
            $("<label>",{class:"btn btn-default btn-block"}).append($("<input>",{type:"radio",name:"methodOptions",value:"heiarchical"})).append("Heiarchical").appendTo($("#method_options_group"))
        /*}else if(type==='classification'){

        }*/
    }
    function createPreparationAndDoneTab(){
        ///<div class="btn-group btn-group-justified" role="group" aria-label="...">
        //</div>
    }
    function displayOptions(){
        $("#optionsDisplay").empty()
        var method = $('#method_options_group > .btn.active').find('input').attr('value');
        $('<h1>').append("Method").appendTo($("#optionsDisplay"))
        $('<p>').append(method).appendTo($("#optionsDisplay"))

        $('<h1>').append("Preparation").appendTo($("#optionsDisplay"))
        $('input[name="dataprepOption"]:checked').each(function() {
           $('<p>').append(this.value).appendTo($("#optionsDisplay")) 
        });
    }

    function mineData(name,technique,callback){

        var method = $('#method_options_group > .btn.active').find('input').attr('value');
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
                callback(data,null,'CLUSTERING')
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
                    call_back(JSON.parse(response))
                else
                    console.log(response)
            }
        })
    }


    function createAnalysisView(data,labels,type){
        var divId = 'container'+containerCount //create Unique container ID
        var container = $("<div/>", {id: divId,class:'container-fluid analysis-Container'})//create container for this analysis
        $('#mid_pane').append(container)//append it to the page
        console.log('in call before IF')
        console.log(data)
        if(type===technique.regr){
            console.log('i am here');
            var testData=[{'name':'actual_test','data':data['testY']},{'name':'predicted_test','data':data['testPredY']}]
            var predictData = [{'name':'predicted','data':data['actual_pred']}]
            //showing test data for regression
            attachChartWithButtons(testData,range(1,data['testY'].length),charts.chartB,divId)
            attachMetrics(null,divId)
            //showing actual prediction for regression
            attachChartWithButtons(predictData,range(1,data['actual_pred'].length),charts.chartA,divId)

        }else if(type === technique.clfy){
            // attach what you want etc using attachChart
        }else if(type ==technique.clstr){
            var  labels = data['labels'];
            if(labels===undefined || labels===null){
                labels = [];
                var mineData = data['mine']
                l = mineData[0].length
                for(i = 0; i<l; i++)
                    labels.push('attribute-'+i);
            }
            //chart 0 is special
            attachChartWithButtons(data,labels,charts.chart0,divId)
            //console.log(fixedAggregates)
            attachChartWithButtons(data,labels,charts.chartB,divId)
        }
        //moves screen to container
         $('html, body').animate({'scrollTop': container.offset().top}, 'slow', 'swing');
        //$('html, body').animate({'scrollTop': container.offset().top}, 1000);
        containerCount++;
    }

    function attachChartWithButtons(data,labels,chartType,divId){
        chartData.push(data)
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
        if(chartType!=charts.chart0)
            setupChangeBtn("btn_next_"+chartCount,'#'+chartId,chartCount)

        if(chartType===charts.chartA)
            createChartA(data,labels,'#'+chartId)
        else if(chartType===charts.chartB)
            createChartB(data, labels, '#'+chartId)
        else if(chartType===charts.chart0)
            createChart0(data, labels, '#'+chartId)
        chartCount++
    }


    function attachChartButtons(divId,row,chartCount){
        var btns_col  = $("<div/>",{class:'col-md-1'})//creates a column span 1/12 for buttons
        var btn_group = $("<div/>",{class:'btn-group-vertial'})
        if(chartCount%2==0){
            $("<button>",{id:"btn_close_"+chartCount,class:'btn btn-default btn-lg '}).append($('<span>',{class:'glyphicon glyphicon-remove-circle'})).appendTo(btn_group)
            //$("<button>",{id:'btn_next_'+chartCount,class:'btn btn-default btn-lg',value:1}).append($('<span>',{class:'glyphicon glyphicon-circle-arrow-right'})).appendTo(btn_group)
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

    function range(start, end, step) {
        var range = [];
        var typeofStart = typeof start;
        var typeofEnd = typeof end;

        if (step === 0) {
            throw TypeError("Step cannot be zero.");
        }

        if (typeofStart == "undefined" || typeofEnd == "undefined") {
            throw TypeError("Must pass start and end arguments.");
        } else if (typeofStart != typeofEnd) {
            throw TypeError("Start and end arguments must be of same type.");
        }

        typeof step == "undefined" && (step = 1);

        if (end < start) {
            step = -step;
        }

        if (typeofStart == "number") {

            while (step > 0 ? end >= start : end <= start) {
                range.push(start);
                start += step;
            }

        } else if (typeofStart == "string") {

            if (start.length != 1 || end.length != 1) {
                throw TypeError("Only strings with one character are supported.");
            }

            start = start.charCodeAt(0);
            end = end.charCodeAt(0);

            while (step > 0 ? end >= start : end <= start) {
                range.push(String.fromCharCode(start));
                start += step;
            }

        } else {
            throw TypeError("Only string and number types are supported");
        }

        return range;

    }
    /*function createChartA (data,categories,chartContainer) {
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
                series: data
            });
        });
    }*/
    function createChart0(data, categories, chartContainer){
        console.log("Creating table")
        console.log(chartContainer)
        var tableId = 'table'+tableCount
        var table = $("<table/>", {id: tableId, class:'table table-striped'})
        //HEAD
        var thead = $("<thead/>")
        var labels = categories
        var tr = $("<tr/>")
        labels.forEach(function(el){
            $("<th/>").append(el).appendTo(tr)
        })
        $("<th/>").append("predicted").appendTo(tr)
        tr.appendTo(thead)
        thead.appendTo(table)

        //BODY
        var tbody = $("<tbody/>")
        var records = data['mine']
        var predicted = data['clusters']
        console.log(records)
        records.forEach(function(rec,index){
            var tr = $("<tr/>")
            rec.forEach(function(el){
                $("<td/>").append(el).appendTo(tr)
            })
            $("<td/>").append(predicted[index]).appendTo(tr)
            tr.appendTo(tbody)
        })
        tbody.appendTo(table)
        table.appendTo($(chartContainer))
        $(chartContainer).attr({backgroundColor:'#fff'})
        $('#'+tableId).DataTable()
        tableCount++;
        var bttn = $("<button/>",{class: 'btn btn-warning btn-sm dropdown-toggle', 'data-toggle':'dropdown'}).append($('<i/>',{class:'fa fa-bars', text:'Export Table Data'}))
        var opts = $("<ul/>",{class:'dropdown-menu', role:'menu'});
        var li1 = $("<li/>");
        var opt1 = $('<a>',{
            text: 'JSON',
            href: '#',
            onClick: "console.log($('#"+tableId+"'));$('#"+tableId+"').tableExport({type:'json',escape:'false'});"
        }).appendTo(li1);

        li1.appendTo(opts);
        $(chartContainer).append(bttn);
        $(chartContainer).append(opts);        
    }

    function createChartA(dataObj,categories,chartContainer){
        var aggregates = dataObj['aggregate'];
        var data=[];
        for(var key in aggregates)
            data.push(['cluster'+key,aggregates[key]])

        console.log(data)
        console.log(chartContainer)
        $(function () {
            // Radialize the colors
        
            // Build the chart
            $(chartContainer).highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Browser market shares at a specific website, 2014'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            connectorColor: 'silver'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: data
                }]
            });
        });
    } 
    //Data accepts an array of objects in our case an array of one object
    //the fields of this object would be name data 
    function createChartB(respObj, categories, chartContainer){
        var obj={};
        obj['data']=[]
        categories = []
        for(var key in respObj['aggregate']){
            categories.push('cluster'+key)
            obj['data'].push(respObj['aggregate'][key])
        }
        if(respObj['labels']!=undefined)
            categories=data['labels']
        console.log(categories)
        obj['name']='clusters';
        obj['pointPlacement']='on';
        var data =[obj]
        console.log(data)
        
        $(function () {
            $(chartContainer).highcharts({

                chart: {
                    polar: true,
                    type: 'line'
                },

                title: {
                    text: 'Classified Data',
                    x: -80
                },

                pane: {
                    size: '80%'
                },

                xAxis: {
                    categories: categories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 70,
                    layout: 'vertical'
                },
                series: data
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

         Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });
    }
}(this));