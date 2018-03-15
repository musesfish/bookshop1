window.onload=function(){
	function $$(id){
		return document.getElementById(id);
	}
    if(sessionStorage.getItem("uname")){
        $("#uname").val(sessionStorage.getItem("uname"));
        $("#upwd").val(sessionStorage.getItem("upwd"));
    }
    if(localStorage.getItem("uname")){
        var postStr="uname="+localStorage.getItem("uname")+"&upwd="+localStorage.getItem("upwd");
        ajax("get","data/login/login.php?"+postStr,"")
            .then(function(data){
                if(data.code==1){
                    alert(data.msg);
                    location.href = "index.html";
                }
            })
    }
	//密码验证出错的次数
	var vcode_count_fail = sessionStorage.getItem("vcode_count_fail");
	if(vcode_count_fail == null){
		vcode_count_fail = 1;
	}
    //如果用户输入用户名或密码的错误超过4次，显示验证码
    function validatorVcode(){
        sessionStorage.setItem("vcode_count_fail",vcode_count_fail);
        if(vcode_count_fail>4){
            $(".vcodes").removeClass("hidden");
        }
    }
    //防止用户输入错误超过4次刷新页面，“刷新页面立即验证”
    validatorVcode();
    //看不清切换验证码
    if($(".change_vcode")){
        $(".change_vcode").click(function(e){
            e.preventDefault();
            $(".change_img").attr("src","data/login/code_gg.php");
        });
    }
	/*登录名密码失焦验证*/
	$$("uname").onblur=$$("upwd").onblur=function(){
		if(this.value==""){
			this.nextSibling.style.visibility="visible";
		}
	}
	/*登录按钮验证*/
	$$("btnlogin").onclick=function(){
		if($$("uname").value!=""&&$$("upwd").value!=""){
            var v = $("[name='vcode']").val(); //验证码
            var vreg = /^[a-z0-9]{4}$/i;//验证用户输入的数据
            //当登录次数超过4次而且验证码输的不正确才验证
            if(vcode_count_fail>4 && !vreg.test(v)){
                alert("验证码格式不正确: 只能是4 位字母数字");
                return;
            }

			var postStr="uname="+$$("uname").value+"&upwd="+$$("upwd").value;
			ajax("get","data/login/login.php?"+postStr,"")
				.then(function(data){
					if(data.code==1){
                        sessionStorage.setItem("uid",data.uid);
                        sessionStorage.setItem("uname",$$("uname").value);
                        alert(data.msg);
                        if($("#autolg").is(":checked")){
                            localStorage.setItem("upwd",$$("upwd").value);
                            localStorage.setItem("uname",$$("uname").value);
                        }
                        location.href = "index.html";
                        vcode_count_fail=1;
                        validatorVcode();
					}else{
						alert(data.msg);
                        vcode_count_fail++;
                        validatorVcode();
					}
				})
		}else{
			$$("uname").nextSibling.style.visibility="visible";
			$$("upwd").nextSibling.style.visibility="visible";
		}
	}
	   document.onkeydown=function(){
			 if(event.keyCode == 13){
					$$("btnlogin").onclick();
			 }
		}
}