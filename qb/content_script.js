// var postInfo = $("div.postDesc");
// if(postInfo.length!=1){
// 	chrome.runtime.sendMessage({type:"cnblog-article-information", error:"获取文章信息失败."});
// }
// else{
// 	var msg = {
// 		type: "cnblog-article-information",
// 		title : $("#cb_post_title_url").text(),
// 		postDate : postInfo.find("#post-date").text(),
// 		author : postInfo.find("a").first().text(),
// 		url: document.URL
// 	};
// 	chrome.runtime.sendMessage(msg);
// }
// 
// 
// 
var profiles;
var interV;
//接收消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {  
	profiles=request.msg;
	if(profiles==undefined){
		alert("请先设置抢标助手");
	}else if(profiles.isAutoRefash=="yes"){
	   to_submit();
	   console.log('提交一次，开始循环监听');
       interV=setInterval("unlockTime()",500);
	}
	$("#chosehb").click();//打开选红包
	console.log('打开红包界面');
    console.log('收到消息' + request.msg);
}); 
//var Settings = extension.Settings;

$(".backgroundred").after("<input type='button' id='to_submit' value='一键提交'/>");
$(".backgroundred").click();
console.log('backgroundred click');


$("#to_submit").click(function(){
	  to_submit();

});


var i=0;
function unlockTime(){
	var unlockTime=$("#PostButtom").text();
	console.log("unlockTime"+unlockTime);
	if(unlockTime=="" && i<=2){
		clearInterval(interV);
    }
	if(unlockTime=="立即购标" && i==0){
		   to_submit();
		   i++;
		
	}

	// if(unlockTime=="立即购标" && i<=2 || unlockTime=="2秒后开放" && i==1 ||unlockTime=="3秒后开放" && i==0){
	// 	//if(i==0){
	// 	   to_submit();
	// 	   i++;
	// 	//}
		
	// }
}


function to_submit(){	
  $(".backgroundred").click();
  $("#TPassword").val(profiles!=undefined?profiles.pw:"88888888");
  console.log("password:"+profiles.pw);
  $(".BuyTarGet").click();
}