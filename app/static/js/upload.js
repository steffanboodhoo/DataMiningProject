var inputType = "string";
var stepped = 0, rowCount = 0, errorCount = 0, firstError;
var start, end;
var firstRun = true;
var maxUnparseLength = 10000;

function validate(){
    if ($('#dataset_name').val().length   >   0   &&
        $('#dataset_subject').val().length  >   0   &&
        ($('#regression').prop('checked') == true || $('#classification').prop('checked') == true)
        ) {
        $("#submit").prop("disabled", false);
    }
    else {
        $("#submit").prop("disabled", true);
    }
}

$(function()
{
	 validate();
    $('#dataset_name, #dataset_subject, #regression').change(validate);

	// Tabs
	$('#tab-string').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('.input-area').hide();
		$('#input-string').show();
		$('#submit').text("Upload");
		inputType = "string";
	});

	$('#tab-local').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('.input-area').hide();
		$('#input-local').show();
		$('#submit').text("Upload");
		inputType = "local";
	});

	$('#tab-remote').click(function()
	{
		$('.tab').removeClass('active');
		$(this).addClass('active');
		$('.input-area').hide();
		$('#input-remote').show();
		$('#submit').text("Upload");
		inputType = "remote";
	});

	// Upload invoked
	$('#submit').click(function()
	{
		if ($(this).prop('disabled') == "true")
			return;

		stepped = 0;
		rowCount = 0;
		errorCount = 0;
		firstError = undefined;

		var config = buildConfig();
		var input = $('#input').val();

		if (inputType == "remote")
			input = $('#url').val();

		// Allow only one upload at a time
		$(this).prop('disabled', true);

		if (!firstRun)
			console.log("--------------------------------------------------");
		else
			firstRun = false;



		if (inputType == "local")
		{
			if (!$('#files')[0].files.length)
			{
				alert("Please select at least one file to upload.");
				return enableButton();
			}
			
			$('#files').parse({
				config: config,
				before: function(file, inputElem)
				{
					start = now();
					console.log("Uploading file...", file);
				},
				error: function(err, file)
				{
					console.log("ERROR:", err, file);
					firstError = firstError || err;
					errorCount++;
				},
				complete: function()
				{
					end = now();
					printStats("Done with all files");
				}
			});
		}
		else if (inputType == "remote" && !input)
		{
			alert("Please enter the URL of a file to download and parse.");
			return enableButton();
		}
		else
		{
			start = now();
			var results = Papa.parse(input, config);
			console.log("Synchronous results:", results);
			if (config.worker || config.download)
				console.log("Running...");
		}
	});
});

function printStats(msg)
{
	if (msg)
		console.log(msg);
	console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
	console.log("  Row count:", rowCount);
	if (stepped)
		console.log("    Stepped:", stepped);
	console.log("     Errors:", errorCount);
	if (errorCount)
		console.log("First error:", firstError);
}



function buildConfig()
{
	return {
		delimiter: $('#delimiter').val(),
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn,
		download: inputType == "remote"
	};
}

function stepFn(results, parser)
{
	stepped++;
	if (results)
	{
		if (results.data)
			rowCount += results.data.length;
		if (results.errors)
		{
			errorCount += results.errors.length;
			firstError = firstError || results.errors[0];
		}
	}
}

function completeFn(results)
{
	end = now();

	if (results && results.errors)
	{
		if (results.errors)
		{
			errorCount = results.errors.length;
			firstError = results.errors[0];
		}
		if (results.data && results.data.length > 0)
			rowCount = results.data.length;
	}

	var analysis_type = "";
	var dataset_name = $('#dataset_name').val();
	var dataset_subject = $('#dataset_subject').val();



	var regr = $('#regression').prop('checked');
	var classi = $('#classification').prop('checked');
	var clust = $('#clustering').prop('checked');
	var purpose = $('input:radio[name=dataset_purpose]:checked').val();

	if(regr == true || classi == true || clust == true) {
		if(regr) {
			analysis_type += "regression";
		}
		if(classi) {
			analysis_type += ",classification";
		}
		if(clust) {
			analysis_type += ",clustering";
		}
	}
	
	printStats("Parse complete");

	console.log("Serving file");
	// Send data to backend
	var parsed = results;
	delete parsed.errors;
    delete parsed.meta;
    
    parsed['Type'] = analysis_type;
	parsed['Name'] = dataset_name;
	parsed['Subject'] = dataset_subject;
	parsed['Purpose'] = purpose;

	$.ajax({
	    type: 'POST',
	    url: "/upload_success",
	    data: JSON.stringify(parsed),
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8'
	});


 //    console.log(JSON.stringify(parsed));
	// $.getJSON($SCRIPT_ROOT + '/upload_success', {
 //        dataset: JSON.stringify(parsed)
 //    }, function(data){
 //        $( "#result" ).text(data.result);
 //    });

	// icky hack
	setTimeout(enableButton, 100);
}
function errorFn(err, file)
{
	end = now();
	console.log("ERROR:", err, file);
	enableButton();
}

function enableButton()
{
	$('#submit').prop('disabled', false);
}

function now()
{
	return typeof window.performance !== 'undefined'
			? window.performance.now()
			: 0;
}