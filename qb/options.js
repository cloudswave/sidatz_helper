$(document).ready(function(){
	init();


 	$("#saveSetting").click(function(){
		saveSetting();
	});


})


	var init=function(){
		var profiles=Settings.getObject("profiles");
		if(profiles!=undefined){
			$(':radio[name="isAutoRefash"][value="'+profiles.isAutoRefash+'"]').attr("checked","checked");//设置value=10的单选按钮为选中项
			$(':radio[name="isAutoOpen"][value="'+profiles.isAutoOpen+'"]').attr("checked","checked");//设置value=10的单选按钮为选中项
			$("#pw").val(profiles.pw);
			$("#reflash_time").val(profiles.reflash_time);
		}
	}

	function saveSetting(){
		var pw=$("#pw").val();
		var isAutoRefash= $(':radio[name="isAutoRefash"]:checked').val();
		var profiles={};
		profiles.pw=pw;
		profiles.isAutoRefash=isAutoRefash;
		profiles.isAutoOpen=$(':radio[name="isAutoOpen"]:checked').val();
		profiles.reflash_time=$("#reflash_time").val();
		Settings.setObject("profiles",profiles);
		alert("已经保存");
	}