$("#start").click(function(){
	chrome.extension.getBackgroundPage().startTask();
});
$("#stop").click(function(){
	chrome.extension.getBackgroundPage().stopTask();
});

$("#page_refresh").click(function(){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.extension.getBackgroundPage().startAutoRefresh(tab,$("#mill2").val());
	});
});

$("#page_refresh_stop").click(function(){
	chrome.extension.getBackgroundPage().stopAutoRefresh();
});

document.addEventListener('DOMContentLoaded', function () {
	var background=chrome.extension.getBackgroundPage();

	var data = background.articleData;
	if(background.run_task){
	  $("#message").text("正在每"+background.mill+"毫秒刷新一次招标信息...");

	}else{
		$("#message").text("已停止自动刷新获取招标信息!");
		background.getData();
	}
	if(data.error){
		$("#message").text(data.error);
		$("#content").hide();
	}else{
		//$("#message").hide();
		$("#content").html(data.content);
	}



});


