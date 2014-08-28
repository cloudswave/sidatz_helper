chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(getDomainFromUrl(tab.url).toLowerCase()=="www.sidatz.com"){
	chrome.tabs.sendMessage(tabId,
	                        {  
	                           'msg': Settings.getObject("profiles") 
	                        }, 
	                        function(response) {  
	                            //回传函数    
	                        }); 
	   }
 
	}
);


function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}





   chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("Request comes from content script " + sender.tab.url);
        var resOK = {
            farewell: "extension send response back..."
        };

        var resError = {
            farewell: "extension hasError!"
        };
        if (request.msg === "stopAutoRefresh"){
        	stopAutoRefresh();
            sendResponse(resOK);
        }else{
            sendResponse(resError);
        }
    });




var articleData = {};
	articleData.content = "获取中...";

// $.get("http://xlanlab.com/index.php?app=sidatz&mod=Index&act=checkNewTarget",
//    function(data){
//      alert(data); // John
//    }, "json");


var run_task=0;


var i=1;
var mill;
var TimerID;
function startTask()
{

	mill=Settings.getObject("profiles").reflash_time;
	TimerID=setInterval(function(){
			getData();

	},mill);
	run_task=1;
}

getData();
function getData(){
	$.ajax({
				url: "http://xlanlab.com/index.php?app=sidatz&mod=Index&act=checkNewTarget",
				type: "get",
				dataType: "json"
			}).done(function(msg) {
				if(!msg.status){
					articleData.content = msg.info+"（第"+i+"次刷新)";
					i++;


				} else {
					articleData.content = msg.data.content;
					var notification = webkitNotifications.createNotification(
					  'icons/icon_48.png',  // 图标URL，可以是相对路径
					  '有新标啦!',  // 通知标题
					  '快去四达投资抢标吧！'  // 通知正文文本
					);

				    // 然后显示通知。
				    notification.show();

				}
			}).fail(function(jqXHR, textStatus) {
				articleData.content = textStatus;
			});
}

function stopTask()
{
	clearInterval(TimerID);
	run_task=0;

}




var TimerID_AutoRefresh;
function startAutoRefresh(tab,mill2){
    TimerID_AutoRefresh=setInterval(function(){
			onRefresh(tab);

	},mill2);
}

function stopAutoRefresh(){
	clearInterval(TimerID_AutoRefresh);
}


function onRefresh(tab) {

		// The chrome web store can not be scripted. So use this method to reload instead. Only drawback is scroll position is lost, at least extension doesn't look broken.
		chrome.tabs.update(tab.id, {url: tab.url});
	
}


// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	if(request.type!=="msg")
// 		return;
// 	articleData = request;
// 	articleData.content = "获取中...";

// 		$.ajax({
// 			url: "http://xlanlab.com/index.php?app=sidatz&mod=Index&act=checkNewTarget",
// 			cache: false,
// 			type: "get",
// 			data: "",
// 			dataType: "json"
// 		}).done(function(msg) {
// 			if(!msg.status){
// 				articleData.content = msg.info;
// 			} else {
// 				articleData.content = msg.data.content;
// 			}
// 		}).fail(function(jqXHR, textStatus) {
// 			articleData.content = textStatus;
// 		});
// });


// function checkForValidUrl(tabId, changeInfo, tab) {
// 	if(getDomainFromUrl(tab.url).toLowerCase()=="www.cnblogs.com"){
// 		chrome.pageAction.show(tabId);
// 	}
// };

// chrome.tabs.onUpdated.addListener(checkForValidUrl);

// var articleData = {};
// articleData.error = "加载中...";
// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	if(request.type!=="cnblog-article-information")
// 		return;
// 	articleData = request;
// 	articleData.firstAccess = "获取中...";
// 	if(!articleData.error){
// 		$.ajax({
// 			url: "http://xlantek.com/apps/test/highlight.php",
// 			cache: false,
// 			type: "POST",
// 			data: JSON.stringify({url:articleData.url}),
// 			dataType: "json"
// 		}).done(function(msg) {
// 			if(msg.error){
// 				articleData.firstAccess = msg.error;
// 			} else {
// 				articleData.firstAccess = msg.firstAccess;
// 			}
// 		}).fail(function(jqXHR, textStatus) {
// 			articleData.firstAccess = textStatus;
// 		});
// 	}
// });
