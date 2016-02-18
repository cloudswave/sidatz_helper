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
       interV=setInterval("unlockTime()",500);
	}
    console.log('收到消息' + request.msg);
}); 
//var Settings = extension.Settings;

$(".backgroundred").after("<input type='button' id='to_submit' value='一键提交'/>");
$("#chosehb").click();//打开选红包
// $("#fast").after("<input type='button' id='to_submit' value='一键提交'/>"
// +"<script>"
// 	+"$('#to_submit').click(function(){"
// +"document.getElementById('fast').click();"
// +" $('#tpwd').val('05170621');"
// +" document.getElementById('buybt').click();"
// +"});"
// +"</script>");
// if(profiles.isAutoRefash=="yes")
//    setInterval("to_submit()",1000);
// $("head").append("<script>"
// 	+"$('#to_submit').click(function(){"
// 	+"alert('okkkk');"
// +"	  $('#buytxt').val('1');"
// +" $('#tpwd').val('05170621');"
// +" document.getElementById('buybt').click();"
// +"});"
// +"</script>");
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
  $(".BuyTarGet").click();
}