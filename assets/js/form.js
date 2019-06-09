/**
 * 初始状态
 * @apiHostUrl [请求api目录]
 */

var apiHostUrl='http://xsbm.wangyuan.info:75/api/public/index.php';

$("#checkbox_boy").addClass('danxuan_select');
$("#checkbox_boy").attr('checked','checked');
loadvcode();//加载验证码

/**
 * 选择性别                                                                                                                                                                                      [description]
 */
$("#checkbox_boy").click(function(){
	$(this).attr('checked','checked');
	$(this).addClass('danxuan_select');
	$("#checkbox_girl").removeClass('danxuan_select');
	$("#checkbox_girl").removeAttr('checked','checked');
})
$("#checkbox_girl").click(function(){
	$(this).attr('checked','checked');
	$(this).addClass('danxuan_select');
	$("#checkbox_boy").removeAttr('checked','checked');
	$("#checkbox_boy").removeClass('danxuan_select');
})


/**
 * 输入框 
 * 触动变样式上滑动和下滑动
 * [封装]                                                                                                                                                                                            [description]
 */
function inputClassChange_Focus(e){
	$(e).prev().animate({bottom:"20%"},600);
	$(e).prev().css("color","#000");
	$(e).parent().css("border-color","#000");
	$(".footer").css("display","none"); //这一步是 逼不得已的骚操作 0.0
}

function inputClassChange_Blur(e){
	$(e).prev().css("color","#c8c8c8");
	$(e).parent().css("border-color","#d2d2d2");
	goStep1();
	canclick1();
}

/**
 * @ #name[姓名] StuId[学号] Stuqq[Q号] Stuemail[邮箱] Stuphone[手机]
 */ 
$("#name").focus(function(){
	inputClassChange_Focus(this);
})
$("#name").blur(function(){
	inputClassChange_Blur(this);
})
$("#StuId").focus(function(){
	inputClassChange_Focus(this);
})
$("#StuId").blur(function(){
	inputClassChange_Blur(this);
	$("#p_err").hide(600);
})
$("#Stuqq").focus(function(){
	inputClassChange_Focus(this);
})
$("#Stuqq").blur(function(){
	inputClassChange_Blur(this);
	if($(this).val()==0){
		$("#Stuemail").val('');
	}else{
		$("#Stuemail").val($(this).val()+'@qq.com');
	}
})
$("#Stuemail").focus(function(){
	inputClassChange_Focus(this);
})
$("#Stuemail").blur(function(){
	inputClassChange_Blur(this);
})
$("#Stuphone").focus(function(){
	inputClassChange_Focus(this);
	isusedphone(); //是否被注册过

})
$("#Stuphone").blur(function(){
	inputClassChange_Blur(this);
	goStep1();
	canclick1();
	isusedphone();//是否被注册过
})

/**
 * 选择学院
 */
$("#collegeChose").click(function(){
	$(this).css("color","#000");
	xueyuan(); //
	goStep1();
	canclick1();
	$(".footer").css("display","none");
})
$("#collegeChose").blur(function(){
	$(this).css("color","#000");
	goStep1();
	canclick1();
})




var name=$("#name").val();
var StuId=$("#StuId").val();
var Stuqq=$("#Stuqq").val();
var Stuemail=$("#Stuemail").val();
var Stuphone=$("Stuphone").val();
var sex=$('input:radio:checked').val(); //获取选择的性别的值;
var collegeChose=$("#collegeChose").val();

//验证手机是否被注册	
function isusedphone(){
	var phone=$("#Stuphone").val();
	$.ajax({
		type:'get',
		url:apiHostUrl+'/'+phone,
		dataType:'JSON',
		data:{},
		success:function(data){
			//console.log(data);
			userPhone('#Stuphone','#p_errPhone'); //验证手机的
			if(data.code==10002){
				$("#p_errPhone").text("电话号码已经报名过!");
				$("#Stuphone").attr('yesCan','405');
			}else{
				$("#Stuphone").attr('yesCan','200');
			}
		}
	})
}


//验证手机号码;
function isPhone(phone){
	var pattern = /^1[34578]\d{9}$/;
	return pattern.test(phone);
}
//验证姓名;
function isChinaName(name){
	var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
	return pattern.test(name);
}
//验证qq;
function isQQ(qq){
	var pattern = /^[1-9][0-9]{4,14}$/;
	return pattern.test(qq);
}
function isEmail(email){
	var pattern = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
	return pattern.test(email);
}
function isId(stu_id){
	var pattern = /^1(7|8)\d{9}$/;
	return pattern.test(stu_id);
}
//验证学号
function userId(inputkind,pshowid){
	$(inputkind).blur(function(){
		if($.trim($(inputkind).val()).length == 0 ){
			$(pshowid).text("学号不能为空哦");
			$(inputkind).prev().animate({bottom:"-13px"},600);
			$(inputkind).prev().css("color","#d40c0c");
			$(inputkind).parent().css("border-color","#d40c0c");
		}else{
			if(isId($.trim($(inputkind).val())) == false){
				$(pshowid).text("请输入有效的学号");
				$(inputkind).prev().css("color","#d40c0c");
				$(inputkind).parent().css("border-color","#d40c0c");
				//console.log($(inputkind).val());
				var tsecond=$(inputkind).val()[1];
				//console.log(tsecond);
				if(tsecond < 7){
					$(pshowid).text("抱歉,只面向17,18届");
				}				
			}
		}
	});
	$(inputkind).focus(function(){
		$(pshowid).text("");
	})
}
userId('#StuId','#p_errId'); //调用函数

/**
 * 验证封装
 * userName[姓名] userPhone[手机] userEmail[邮箱] userQQ[qq验证]
 * @inputkind输入框 
 * @pshowid输入框对应的错误提示文字 
 * @yanzhenFun对应验证函数
 * @tipsTxt [xx]文字
 */
function common_check(inputkind,pshowid,yanzhenFun,tipsTxt){
	
	$(inputkind).blur(function(){	
		if($.trim($(inputkind).val()).length == 0 ){
			$(pshowid).text(tipsTxt+"不能为空哦");
			$(inputkind).prev().animate({bottom:"-13px"},600);
			$(inputkind).prev().css("color","#d40c0c");
			$(inputkind).parent().css("border-color","#d40c0c");
		}else{
			if(yanzhenFun($.trim($(inputkind).val())) == false){
				$(pshowid).text("请输入有效的"+tipsTxt);
				$(inputkind).prev().css("color","#d40c0c");
				$(inputkind).parent().css("border-color","#d40c0c");
			}
		}
	});
	$(inputkind).focus(function(){
		$(pshowid).text("");
	})
}
//验证姓名
common_check('#name','#p_errName',isChinaName,'姓名');
//验证手机号
common_check('#Stuphone','#p_errPhone',isPhone,'手机号');
//验证邮箱
common_check('#Stuemail','#p_errEmail',isEmail,'邮箱号');
//验证qq
common_check('#Stuqq','#p_errQQ',isQQ,'QQ号');


/**
 * 验证码功能
 * 
 * 	---加载验证码loadvcode
 * 	---切换验证码
 * 	---验证验证码checkvcode  --后端返回key
 * 	---验证验证码usercode  	--用户填的验证码
 */
//加载验证码
function loadvcode(){
	$.ajax({
		type:'get',
		url:apiHostUrl+'/vcode',
		dataType:'JSON',
		data:{},
		success:function(data){
			$("#code_img").attr("src",data.data.img_base64);
			$("#code_img").attr("encrykey",data.data.encrykey);
		}
	})
}
//切换验证码
$("#qiehuancode").click(function(){
	//防止抖动加载验证码
	// setTimeout(function(){
	// 	loadvcode();
	// 	$("#vcode").val("");
	// 	$("#p_errvcode").text("");
	// },500) 
	loadvcode();
	$("#vcode").val("");
	$("#p_errvcode").text("");
})

//验证二维码
function checkvcode(){
	vcode=$("#vcode").val();
	$.ajax({
		type:'post',
		url:'http://xsbm.wangyuan.info:75/api/public/index.php/check/vcode',
		dataType:'JSON',
		data:{
			"vcode":vcode,
			"encrykey":$("#code_img").attr("encrykey")
		},
		success:function(data){
			console.log(data);
			usercode('#vcode','#p_errvcode');
			if(data.code==200){
				$("#vcode").attr("ckcodes","100");				
			}
			if(data.code==10005){
				$("#p_errvcode").text("验证码错误!");
				$("#vcode").attr("ckcodes","202");
			}
		}
	})
}
//验证二维码
function usercode(inputkind,pshowid){
	$(inputkind).blur(function(){
		
		if($.trim($(inputkind).val()).length == 0 ){
			$(pshowid).text("验证码不能为空哦");
			$(inputkind).prev().animate({bottom:"-13px"},600);
			$(inputkind).prev().css("color","#d40c0c");
			$(inputkind).parent().css("border-color","#d40c0c");
		}
	});
	$(inputkind).focus(function(){
		$(pshowid).text("");
	})
}

/**
 *	验证码那一块的处理样式
 *	后期+的 没实现整理                                                                                                                                                              [description]
 */
$("#vcode").focus(function(){
	//$(this).prev().animate({bottom:"20%"},600);
	$(this).prev().css("color","#000");
	$(this).parent().css("border-color","#000");
	$(".footer").css("display","none");
	$(this).css("padding-left","2%");
	//usercode('#vcode','#p_errvcode');
})
$("#vcode").blur(function(){
	$(this).prev().css("color","#c8c8c8");
	$(this).parent().css("border-color","#d2d2d2");
	usercode('#vcode','#p_errvcode');	
	checkvcode();
	goStep1();
	canclick1();
})

//全局量化 一个数组 用来放表单内容
var Infoarrys=new Array();

//是否能下一步
//第一个 [下一步] 
function goStep1(){
	var checkNum=$("#vcode").attr("ckcodes");
	var checkPhone=$("#Stuphone").attr("yesCan");
	//console.log(checkvcode_status);
	var name=$("#name").val();
	var StuId=$("#StuId").val();
	var Stuqq=$("#Stuqq").val();
	var Stuemail=$("#Stuemail").val();
	var Stuphone=$("#Stuphone").val();
	var sex=$('input:radio:checked').val(); //获取选择的性别的值;
	var collegeChose=$("#collegeChose").val();

	//备注 纯前端同学去看 就 解掉注释342行 注释343-362行; 与接口挂钩就反着来
	$("#Btn_next").attr('class','btn_next1On');	
	// if(isChinaName(name) && isEmail(Stuemail) && isQQ(Stuqq) && isPhone(Stuphone) && isQQ(StuId) && collegeChose != '' && isId($.trim($("#StuId").val())) != false && checkPhone == 200 && checkNum == 100){	
	// 	$("#Btn_next").attr('class','btn_next1On');		
	// 	$(".footer").css("display","block");
	// 	Infoarrys[0]=$("#name").val();
	// 	Infoarrys[1]=$("#StuId").val();
	// 	Infoarrys[2]=$("#Stuqq").val();
	// 	Infoarrys[3]=$("#Stuemail").val();
	// 	Infoarrys[4]=$("#Stuphone").val();
	// 	Infoarrys[5]=$('input:radio:checked').val();
	// 	Infoarrys[6]=$("#collegeChose").val();
	// 	Infoarrys[7]=$('input:radio:checked').attr('num');
	// 	Infoarrys[8]=$("#vcode").val();
	// 	Infoarrys[9]=$("#code_img").attr('encrykey');
	// 	console.log(Infoarrys);
	// }
	// else{
	// 	$("#Btn_next").removeAttr('class','btn_next1On');
	// }
}
goStep1();


/**
 * 这是处理 当选择学院 判断信息是否未合格 才能下一步的 定时器 {建议去优化}
 */
var interval=setInterval(function(){
	xueyuan();
	goStep1();
	if($("#Btn_next").hasClass('btn_next1On')==true){
		$('#Btn_next').attr("disabled",false);
	}
},100);

/**
 * 学院样式处理
 */
function xueyuan(){

	if($("#collegeChose").val()!=''){
		$("#collegeChose").css("color","#000");
		goStep1();
	}else{
		$("#collegeChose").css("color","#ccc");
	}

}

	
//所有信息准确 才可以 下一步点击
function canclick1(){
	if($("#Btn_next").hasClass("btn_next1On")){
		$('#Btn_next').attr("disabled",false)
	}else{
		$('#Btn_next').attr("disabled",true);
	}
}
canclick1();

$('#Btn_next2').attr("disabled",true);


//去选择部门的按钮
//第二个 [下一步]
$("#Btn_next").click(function(){
	clearInterval(interval);
	goStep1();
	$(".info").fadeOut(500);
	$(".choseDepartment").fadeIn(2000);
	$("#colorTxt2").animate({width:'100%'},1200);
	$(".header .statueTxt").eq(0).css("font-weight","normal");
	$(".header .statueTxt").eq(1).css("font-weight","bold");
})

//返回填信息上一步
$("#returnFont_btn").click(function(){
	$(".choseDepartment").fadeOut(300);
	setTimeout(function(){
		$(".info").fadeIn(1000);
	},300);	
	$("#colorTxt2").animate({width:'0%'},1200);
	$(".header .statueTxt").eq(0).css("font-weight","bold");
	$(".header .statueTxt").eq(1).css("font-weight","normal");
})


//去完成报名的按钮
////最后一个 [下一步] --》完成报名
$("#Btn_next2").click(function(){
	$(".choseDepartment").fadeOut(500);
	$(".finish").fadeIn("slow");
	$("#colorTxt3").animate({width:'100%'},1200);
	$(".header .statueTxt").eq(2).css("font-weight","bold");
	$(".header .statueTxt").eq(1).css("font-weight","normal");
	listOnload();//完成报名页面的加载信息
})

//返回选择部门上一步
$("#returnFont_btn1").click(function(){
	$(".finish").fadeOut(300);
	$(".choseDepartment").fadeIn(300);
	$("#colorTxt3").animate({width:'0%'},1200);
	$(".header .statueTxt").eq(1).css("font-weight","bold");
	$(".header .statueTxt").eq(2).css("font-weight","normal");
})



//完成报名页面的加载信息
function listOnload(){
	goStep1();
	$("#list_name").text(Infoarrys[0]);
	$("#list_stuid").text(Infoarrys[1]);
	$("#list_qq").text(Infoarrys[2]);
	$("#list_email").text(Infoarrys[3]);
	$("#list_phone").text(Infoarrys[4]);
	$("#list_sex").text(Infoarrys[5]);
	$("#list_college").text(Infoarrys[6]);
}

//提交信息
function postinfo(){
	listOnload();
	$.ajax({
		type:'POST',
		url:apiHostUrl+'/user',
		dataType:'JSON',
		data:{
			"realname":Infoarrys[0],
			"sid":Infoarrys[1],
			"qq":Infoarrys[2],
			"email":Infoarrys[3],
			"phone":Infoarrys[4],
			"college":Infoarrys[6],
			"sex":Infoarrys[7],
			"vcode":Infoarrys[8],
			"encrykey":Infoarrys[9],
			"department_id":$("#Btn_next2").attr('bumen')
		},
		success:function(data){
			if(data.code == 200){
				clearInfoAll();
				xueyuan();
				location.href="finish.html"; //相当于刷新页面
			}else if(data.code == 10002){
				//alert("此电话号码已经报名过!请返回上一步修改基本信息.")
			}		
		}
	})
}

//点击完成报名
$("#goOKay").click(function(){
	postinfo();
})

//报名成功清空信息
function clearInfoAll(){
	$("#name").val('');
	$("#StuId").val('');
	$("#Stuqq").val('');
	$("#Stuemail").val('');
	$("#Stuphone").val('');
	$("#collegeChose").val('');
	$("#vcode").val('');
	$("#checkbox_boy").attr('checked','checked');
	xueyuan();
}
	
//点击选择部门 展开介绍
//数字对应部门
//0设计部 1页面部 2编程部 3文秘部
$(".circle").eq(0).click(function(){
	$("#part0").css("display","block");
	$("#part1").css("display","none");
	$("#part2").css("display","none");
	$("#part3").css("display","none");
})
$(".circle").eq(1).click(function(){
	$("#part0").css("display","none");
	$("#part1").css("display","block");
	$("#part2").css("display","none");
	$("#part3").css("display","none");
})
$(".circle").eq(2).click(function(){
	$("#part0").css("display","none");
	$("#part1").css("display","none");
	$("#part2").css("display","block");
	$("#part3").css("display","none");
})
$(".circle").eq(3).click(function(){
	$("#part0").css("display","none");
	$("#part1").css("display","none");
	$("#part2").css("display","none");
	$("#part3").css("display","block");
})



function IntroShow(obj1,obj2,index){
	var whichbumen=$(obj1).eq(index).text();	
	var bumenarry=new Array()
		bumenarry[0]='设计部'
		bumenarry[1]='页面部'
		bumenarry[2]='编程部'
		bumenarry[3]='文秘部'
	// var mydepart=new Array()
	// 	mydepart[0]='iconfont icon-huahuabitongxuexi'
	// 	mydepart[1]='iconfont icon-daima'
	// 	mydepart[2]='iconfont icon-diannao'
	// 	mydepart[3]='iconfont icon-wendang'

	// var mydepartTxt = new Array()
	// 	mydepartTxt[1]='主要进行web前端开发，包括但不限于pc端和页面端页面、微信小程序。学习响应式布局。玩转vue，react，webpack等框架和工具。通过学习HTML，CSS，以及JavaScript语言编写web程序。'
	// 	mydepartTxt[0]='设计主要是网页设计,即通过学习并使用Photoshop(PS),Illustrator(AI)等绘图工具完成网页设计、UI设计等。'						
	// 	mydepartTxt[2]='主要学习net、PHP等后端编程语言，以及MSSQL和MySQL等数据库设计，接触Linux服务器运维、微信公众号服务以及微信小程序开发。'
	// 	mydepartTxt[3]='主要学习office系列办公软件的应用、PS的相关操作以及公众号推文的编写等，除此，视情况还会在学习中接触一些拓展性技能如视频剪辑等。本部主要工作为负责工作室的正常运营，包括打理工作室日常事务、活动策划、公众平台运营、财务管理等。'

	$(".hascdwrapper").show();
	$(".row .cdwrapper").hide();
	$(".choseDepartment .ifchose").hide();
	
	$(".choseDepartment .haschosen").show();

	$("#xzdepart").text(whichbumen);
	$(obj2).text('/'+' '+'已 选 '+whichbumen+' /');

	if(whichbumen.length != 0){
		$("#Btn_next2").attr('class','btn_next1On');
		$("#Btn_next2").attr('bumen',parseInt(index)+1);
	}else{
		$("#Btn_next2").removeAttr('class','btn_next1On');
	}

	$(".finish_title").text(bumenarry[index]+'预备成员');

	 canclick2();
}
//切换部门
function reChoice(){
	$(".hascdwrapper").hide();
	$(".row .cdwrapper").show();
	$(".haschosen").hide();
	$(".choseDepartment .ifchose").show();
	canclick2();
}
$(".switch_circle").click(function(){
	$("#Btn_next2").removeAttr('class','btn_next1On');
	reChoice();
	$("#Btn_next2").attr('bumen','');
})

//选择部门后 点击
function canclick2(){
	if($("#Btn_next2").hasClass("btn_next1On")){
		$('#Btn_next2').attr("disabled",false)
	}else{
		$('#Btn_next2').attr("disabled",true);
	}
}

	





