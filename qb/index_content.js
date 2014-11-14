var profiles;
//接收消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {  
	profiles=request.msg;
	if(profiles==undefined){
		alert("请先设置抢标助手");
	}else if(profiles.isAutoOpen=="yes"){
       autoOpen();
	}
    console.log('收到消息' + request.msg);
}); 

$(document).ready(function(){



});


var autoOpen=function(){
	var urls=$(".rg1");
	if(urls.length>0){
		chrome.extension.sendMessage({msg: "stopAutoRefresh"}, function(response) {
        console.log(response.farewell);
       });
	}
	for(var i=0;i<urls.length;i++){
		window.open(urls[i].href);
	}

}





// var msg = {
// 	type: "msg",
// 	title : "",
// 	postDate : "",
// 	author : "",
// 	url: ""
// };
// chrome.runtime.sendMessage(msg);


