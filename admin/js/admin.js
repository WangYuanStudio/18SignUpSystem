var str='<div class="getlist same"><div class="listbar"><span class="padd list_name" id="list_name" style="width:15%">测试用户</span><span class="text-align padd list_id" id="list_id">测试学号</span><span class="text-align padd list_depart" id="list_depart">测试部</span><span class="text-align padd list_zt" id="list_zt" onclick="updateStatus(this)"></span><span id="iconjiantou" class="route" onclick="showandup(this)"><i class="iconfont icon-jiantou1" id="jiantou1"></i></span></div><div class="listbarmore"><div class="col samemore"><div class="lm_con1">性别:<span id="lm_se" class="morelist lm_se">男</span></div><div class="lm_con2">手机号码:<span id="lm_phone" class="morelist lm_phone">13565485418</span></div></div><div class="col samemore"><div class="lm_con1">QQ:<span id="lm_qq" class="morelist lm_qq">123456789</span></div><div class="lm_con2">学院:<span id="lm_college" class="morelist lm_college">物理与机电工程学院</span></div></div><div class="col samemore"><div class="lm_con1">邮箱:<span id="lm_email" class="morelist lm_email">12345678@qq.com</span></div></div><div class="handle"></div></div></div></div>';
//定义准备加载了一次


	//信息展开和收回
	function showandup(obj){
		var moreinfo=$(obj).parent().next();
		if(moreinfo.is(':hidden')&& $(obj).hasClass("route")){
			$(obj).parent().next().slideDown('slow');
			$(obj).removeClass("route");
			$(obj).addClass("route1");
			//$(this).hover();
		}else{
			moreinfo.slideUp('slow');
			$(obj).removeClass("route1");
			$(obj).addClass("route");
		}
	}

//点击总人数 展示男女
function showboysgirls(){
	$(".sumsex").css("display","block");
	$(".sumnum").css("bottom","-30px");
	$("#howmany").hide();

}
function hideboysgirls(){
	$(".sumsex").css("display","none");
	$(".sumnum").css("bottom","12px");
	$("#howmany").show();
}
$("#howmany").click(function(){
	showboysgirls();
})
$(".sumsex").click(function(){
	hideboysgirls();
})

$("#sjb").click(function(){
	
	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind(1,'',"#sjb");
	

})
$("#ymb").click(function(){
	
	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind(2,'',"#ymb");


})
$("#bcb").click(function(){
	
	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind(3,'',"#bcb");
	

})
$("#wmb").click(function(){
	
	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind(4,'',"#wmb");


	

})

$("#yms").click(function(){

	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind('',5,"#yms");
	
	
})
$("#wms").click(function(){
	
	$("#otherdownmore").css("display","block");
	$(this).addClass('On').siblings().removeClass("On");
	$("#listbody").html('');
	getKind('',1,"#wms");
	
	
})
$("#qb").click(function(){

	$("#otherdownmore").css("display","block");

	$(this).addClass('On').siblings().removeClass("On");;
	$("#listbody").html('');
	getKind('','',"#qb");
})


$("#otherdownmore").click(function(){
	var kindbtn=$(this).attr('kind');
	var kindzt=$(this).attr('zt');
	var nextpage=$(this).attr('page');
	//console.log(kindbtn+' '+kindzt+' '+nextpage);
	getKind(kindbtn,kindzt,nextpage);
})
function getKind(kind,zt,page){


	$.ajax({
		type:'GET',
		url:'http://xsbm.wangyuan.info:75/api/public/index.php/admin/user',
		dataType:'JSON',
		data:{
			"department":kind,
			"status":zt,
			"page":page
		},
		success:function(data){
	
			$("#searchnone").css("display","none");
			$(".searchinfo").css("display","none");
			
			if(data.code==200){

				console.log(data);

				var PresentPage=data.data.current_page;//当前第一页
				listinfo(data);
				$("#otherdownmore").attr('kind',kind);
				$("#otherdownmore").attr('zt',zt);		
			}
		},
	})
}



function listinfo(data){
	var datalength=data.data.per_page; //一次请求的长度;
	var haslength=data.data.data.length; //返回数据的长度
	var Sumlength=data.data.total;//总人数
	
	var PresentPage=data.data.current_page;//当前第一页
	//console.log(PresentPage);
	var lastpage=data.data.last_page; //最后一页
	var newdepart = new Array();
	var txtforsex = new Array();


	//列出 男  女 总人数
	$("#howmany").html('共'+Sumlength+'人');
	$("#sexman").html('男 '+data.data.male);
	$("#sexgirl").html('女 '+data.data.female);

	//判断能否继续加载
	if(haslength<datalength){
		$("#otherdownmore").css("display","none");
		$("#bottomword").css("display","block");

	}else{
		$("#otherdownmore").css("display","block");
		$("#bottomword").css("display","none");
	}
	
	

	for(var i=0;i<haslength;i++){

		$(".listbody").append(str); //嵌入;
	}
	//console.log(PresentPage);
	///console.log(PresentPage-1);
	var jianfa=PresentPage-1;
	//console.log(jianfa);
	//console.log('容器数量'+$(".getlist").length);
	var j=datalength*jianfa;
	//console.log(j);
	for(var i=0;i<haslength;i++){
		//把返回数据的1 2 3 4 转换为真实值;
		if(data.data.data[i].department_id == 3){
			newdepart[i]='编程部';
		}
		else if(data.data.data[i].department_id == 2){
			newdepart[i]='页面部';
		}else if(data.data.data[i].department_id == 1 ){
			newdepart[i]='设计部';
		}
		else{
			newdepart[i]='文秘部';
		}

		if(data.data.data[i]["sex"] == 0){
			txtforsex[i]='女';	
			//console.log()	
		}else{
			txtforsex[i]='男';
		}



		$(".list_name").eq(j).text(data.data.data[i]["realname"]);
		$(".list_id").eq(j).html(data.data["data"][i].sid);
		$(".list_depart").eq(j).html(newdepart[i]);
		$(".lm_se").eq(j).html(txtforsex[i]);
		$(".lm_phone").eq(j).html(data.data.data[i]["phone"]);
		$(".lm_qq").eq(j).html(data.data.data[i]["qq"]);
		$(".lm_college").eq(j).html(data.data.data[i]["college"]);
		$(".lm_email").eq(j).html(data.data.data[i]["email"]);
		$(".list_zt").eq(j).attr("signid",data.data.data[i]["id"]);
		$(".list_zt").eq(j).attr("statusnum",data.data.data[i]["status"]);
		

		if(data.data.data[i]["status"] == 5 ){
			$(".list_zt").eq(j).html("已面试");
		}else{
			$(".list_zt").eq(j).html("未面试");
		}
		j++;

		if(j==Sumlength){
			$("#otherdownmore").css("display","none");
			$("#bottomword").css("display","block");
		}
		//console.log(j)
		//console.log(PresentPage);
	}
	if(PresentPage<lastpage){
		$("#otherdownmore").attr('page',PresentPage+1);
	}else{
		$("#otherdownmore").attr('page',lastpage);
	}
}
//页面刚加载
getKind('','',"#qb");



function updateStatus(delebtn){
	//console.log($(delebtn).parent().children().eq(0).text());
	var hisname=$(delebtn).parent().children().eq(0).text();
	var id=$(delebtn).attr('signid');
	var statusNum=$(delebtn).attr('statusnum')
	console.log(id);
	console.log(statusNum);
	var  r=confirm('姓名:'+hisname+','+"确定修改面试状态?");
	if(r==true){
		$.ajax({
			type:'PATCH',
			url:'http://xsbm.wangyuan.info:75/api/public/index.php/admin/user/'+id,
			dataType:'JSON',
			data:{
			},
			success:function(data){
				//console.log(data);
				if(data.code == 200){
					if(statusNum == 1){
						$(delebtn).attr('statusnum','5');
						$(delebtn).parent().children().eq(3).text('已面试');
						//$(delebtn).css("background-color","green");
						alert("修改状态成功");
						//$(delebtn).parent().remove();
					}
					else{
						$(delebtn).attr('statusnum','1');
						$(delebtn).parent().children().eq(3).text('未面试');
						//$(delebtn).css("background-color","#000");			
						alert("修改状态成功");
						///$(delebtn).parent().remove();
					}
				}else{
					alert("修改失败");
				}
			},
			error:function(){

			}
		})
	}else{
		alert("取消这次操作!");
	}
}



//搜索内容
function search(){

	var search_value=$("#search").val();
	$.ajax({
		type:'GET',
		url:'http://xsbm.wangyuan.info:75/api/public/index.php/admin/user',
		dataType:'JSON',
		data:{
			"s":search_value,
		},
		success:function(data){
			console.log(data);
			$(".searchinfo").css("display","block");
			$("#search").val('');
			if(data.code=200){
				var datalength=data.data.per_page; //一次请求的长度;
				var haslength=data.data.data.length; //返回数据的长度
				var Sumlength=data.data.total;//总人数
				
				var PresentPage=data.data.current_page;//当前第一页
				
				var lastpage=data.data.last_page; //最后一页

				var newdepart = new Array();
				var txtforsex = new Array();

				$(".searchreturn").html("搜索内容:"+search_value);
				if(data.data.data.length==0){
					$("#searchnone").css("display","block");
					$("#bottomword").css("display","none");
					$("#otherdownmore").css("display","none");
					$("#howmany").html('共'+Sumlength+'人');
					$("#sexman").html('男 '+data.data.male);
					$("#sexgirl").html('女 '+data.data.female);
				}else{
					
					//alert("yes");
					//列出 男  女 总人数
					$("#howmany").html('共'+Sumlength+'人');
					$("#sexman").html('男 '+data.data.male);
					$("#sexgirl").html('女 '+data.data.female);

					//判断能否继续加载
					if(haslength<datalength){
						$("#otherdownmore").css("display","none");
						$("#bottomword").css("display","block");

					}else{
						$("#otherdownmore").css("display","block");
						$("#bottomword").css("display","none");
					}
					for(var i=0;i<haslength;i++){

						$(".listbody").append(str); //嵌入;
					}

					var jianfa=PresentPage-1;

					var j=datalength*jianfa;
					//console.log(j);
					for(var i=0;i<haslength;i++){
						//把返回数据的1 2 3 4 转换为真实值;
						if(data.data.data[i].department_id == 3){
							newdepart[i]='编程部';
						}
						else if(data.data.data[i].department_id == 2){
							newdepart[i]='页面部';
						}else if(data.data.data[i].department_id == 1 ){
							newdepart[i]='设计部';
						}
						else{
							newdepart[i]='文秘部';
						}

						if(data.data.data[i]["sex"] == 0){
							txtforsex[i]='女';		
						}else{
							txtforsex[i]='男';
						}

						$(".list_name").eq(j).text(data.data.data[i]["realname"]);
						$(".list_id").eq(j).html(data.data["data"][i].sid);
						$(".list_depart").eq(j).html(newdepart[i]);
						$(".lm_se").eq(j).html(txtforsex[i]);
						$(".lm_phone").eq(j).html(data.data.data[i]["phone"]);
						$(".lm_qq").eq(j).html(data.data.data[i]["qq"]);
						$(".lm_college").eq(j).html(data.data.data[i]["college"]);
						$(".lm_email").eq(j).html(data.data.data[i]["email"]);
						$(".list_zt").eq(j).attr("signid",data.data.data[i]["id"]);
						$(".list_zt").eq(j).attr("statusnum",data.data.data[i]["status"]);

						if(data.data.data[i]["status"] == 5 ){
							$(".list_zt").eq(j).html("已面试");
						}else{
							$(".list_zt").eq(j).html("未面试");
						}
						j++;
					}
					if(PresentPage<lastpage){
						$("#otherdownmore").attr('page',PresentPage+1);
					}else{
						$("#otherdownmore").attr('page',lastpage);
					}				
				}
			}else{
				alert("搜索失败");
			}
			
		},
		error:function(jqXHR){

		}
	})
}

$(".icon-sousuo").click(function(){
	$("#listbody").html('');
	$("#qb").addClass('On').siblings().removeClass("On");;
	search();
})


