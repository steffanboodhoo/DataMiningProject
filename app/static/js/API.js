var Api=(function(){
  console.log('i am being called')
	function getHash(hash,unwanted,filerBySentiment,sentiment, success, failure){
		var data={ "hash":hash,"unwanted":unwanted,"filerBySentiment":filerBySentiment,"sentiment":sentiment};
		_get('/index/hash/',data,success,failure);
	}

	// function subscribe(hash,callback){
	// 	$.get('',function)
	// }

	function _post (loc, param, success_callback, error_callback){    

      $.ajax({
        type    :   'post',
        url     :   loc,
        data    :   param,
        success :   function(response){
          if (typeof success_callback === 'function')
            success_callback(response);
        },
        error :   function(response){
          if (typeof error_callback === 'function')
            error_callback(response);
          else
            console.log(response.responseText);
        }
      });
    }

    function _get(loc, success_callback,error_callback){          

      $.ajax({
        type  :   'get',
        url   :   loc,        
        success :   function(response){
          if (typeof success_callback === 'function'){
            success_callback(response);
          }
        },
        error :   function(response){
          if (typeof error_callback === 'function'){
            error_callback(response);
          }else{
            console.log(response);
          }
        }
      });
    }


    var api={};
    api.get=_get;
    api.post=_post;

    api.getRegressionTest=(function (url){
      _get(url,
        function(response){
          console.log("success"+response)
        },
        function(){
          console.log(response)
        });
    });

    return api;
})();