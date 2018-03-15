/*onload 页面包含图片等文件在内的所有元素都加载完成 就操作Dom*/
window.onload=function(){
	/*匿名 使用后可自动释放 节约内存 划分临时作用域（回调/自调）*/

	/*匿名自调函数 定义后立即调用 避免全局污染 实现注册验证功能*/
	(function(){
		/*抓取Dom节点*/
		var oDiv=document.getElementById("container");
		var oIpt=oDiv.getElementsByTagName("input");

		/*定义两个数组保存相关验证提示信息及正则*/
		var arrfoc=["3-6个字符，由字母、数字、_组成","密码长度为6-12位","请再次输入密码","请输入合法邮箱","请输入合法手机号"];
		var arrblu=[[/^\w{3,6}$/,"用户名不为空"],[/^.{6,12}$/,"密码不为空"],[/^.{6,12}$/,"密码长度不为空"],[/^[/\w-]+@([/\w-])+(.[/\w-])+$/,"邮箱不为空"],[/^1[34578]\d{9}$/,"手机号不为空"]];
		
		/*在input后追加span元素并设置隐藏*/
		for(var i=1;i<oIpt.length-1;i++){
			var span=document.createElement("span");
			oIpt[i].parentNode.appendChild(span);
			oIpt[i].nextSibling.style.visibility="hidden";
		}

		/*多次调用创建多个闭包 闭包间互不影响 一focus就显示#999的span提示*/
		for(var i=0;i<oIpt.length-1;i++){
			//调用闭包valifocus 保护重用变量this 
			oIpt[i].onfocus=valiEvent(focMsg=arrfoc[i]);
			//利用重载 减少API的数量 减轻调用者负担 根据参数不同执行不同的语句
			oIpt[i].onblur=valiEvent(bluMsg=arrblu[i]);
		}
		
		/*利用闭包机制 创建聚焦失焦验证函数 子函数返回验证结果*/
		function valiEvent(msg){
			/*聚焦提示*/
			if(msg==focMsg){
				return function(){
					this.nextSibling.style.visibility="visible";
					this.nextSibling.style.backgroundColor="#999";
					this.nextSibling.innerHTML=msg;
				}
			}else if(msg==bluMsg){/*失焦提示*/
				return function(){
					this.nextSibling.style.backgroundColor="red";
					/*为空提示*/
					if(this.value==""){
						this.nextSibling.innerHTML=msg[1];
					}else{
						/*正则正确时 给出提示*/
						if(msg[0].test(this.value)){
							this.nextSibling.style.backgroundColor="green";
							this.nextSibling.innerHTML="输入正确";
							/*用户名在格式正确下进行 重复验证*/
							if(this.name=="uname"&&this.nextSibling.innerHTML=="输入正确"){
								ajax("get","data/register/register.php?uname="+this.value,"","text")
									.then(function(data){
										var tip=data.split(",");
										if(tip[0]){//用户名可以使用
											oIpt[0].nextSibling.style.backgroundColor="green";
											oIpt[0].nextSibling.innerHTML=tip[1];
										}else{//用户名重复
											oIpt[0].nextSibling.innerHTML=tip[1];
										}
									})
							}
						}else{
							this.nextSibling.innerHTML="格式错误";
						}
						/*不管格式正确与否 确认密码是否一样验证*/
						if(this.name=="upwds"){
							if(this.value!=oIpt[1].value){
								this.nextSibling.style.backgroundColor="red";
								this.nextSibling.innerHTML="两次密码输入不一致";
							}
						}
					}
				}
			}
		}

		/*提交注册按钮 匿名回调函数*/
		oIpt[oIpt.length-1].onclick=function(){
			var b=true;
			for(var i=1;i<oIpt.length-1;i++){
				if(oIpt[i].nextSibling.innerHTML!="输入正确"){
					b=false;
					break;
				}
			}
			if(oIpt[0].nextSibling.innerHTML!="用户名可以使用！"&&b){
				var postStr="uname="+oIpt[0].value+"&upwd="+oIpt[1].value+"&email="+oIpt[3].value+"&phone="+oIpt[4].value;
				ajax("post","data/register/register.php",postStr,"text")
					.then(function(data){
                        var tip=data.split(",");
                        sessionStorage.setItem("uid",tip[0]);
                        sessionStorage.setItem("uname",tip[1]);
                        sessionStorage.setItem("upwd",tip[2]);
                        location.href = "login.html";
						//console.log(data);
						//eval(data);
					})
			}
			return false;
		}
	})()
}
