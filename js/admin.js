//在“页面加载完成后执行的动作”
	function loadPage(){
		/*页面初始化 将一部分内容隐藏 仍旧占据空间*/
		//$("form").style.visibility="hidden";
		$("form").style.display="none";
		//$("section").style.display="none";
		loaduser(1);
	}
/*通用函数及变量*/
	function $(id){
		return document.getElementById(id);
	}
	var uid,totalPage,currentPage;
	var item=document.getElementsByName('item');

/*查——下载用户到初始页上*/
	function loaduser(p){
		/*搜索框的值*/
		var search=$("search").value;
		/*当前每页行数值*/
		var pageSize=$("pageSize").value;
		/*把参数给到当前页码中*/
		currentPage=p;
		/*调用ajax函数下载用户*/
		ajax("get",'data/admin/admin_loaduser.php?pageSize='+pageSize+"&currentPage="+p+"&search="+search,"","",false)
			.then(function(data){
				$("search").value="";
				/*将data的字符串数据转为js数组对象*/
				var list=JSON.parse(data);
				/*得到数组的最后一行数据*/
				var page=JSON.parse(list[list.length-1]);
				/*通过循环往table中添加数据*/
				for(var i=0,html1='',arr=[];i<list.length-1;i++){
					/*把list中第i行数据添加到arr数组里*/
					arr.push(list[i]['uid'],list[i]['avatar'],list[i]['uname'],list[i]['user_name'],list[i]['gender'],list[i]['email'],list[i]['phone'],currentPage);
					/*将arr数组转为string格式 作为参数传递给修改当前行函数*/
					arr=JSON.stringify(arr);
					/*编写table每行的字符串*/
					html1+="<tr>";
						html1+="<td><input type='checkbox' name='item' value='"+list[i]['uid']+"' onclick='checks()'></td>";
						html1+="<td><input type='text' value="+list[i]['uid']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['avatar']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['uname']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['user_name']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['gender']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['email']+" onblur='alterUser(this)'></td>";
						html1+="<td><input type='text' value="+list[i]['phone']+" onblur='alterUser(this)'></td>";
						html1+="<td><a href='javascript:alter("+arr+")'>修改</a>";
						html1+="<a href='javascript:deleteAll("+list[i]['uid']+")'>删除</a></td>";
					html1+="</tr>";
					/*将arr数组清空*/
					arr=[];
				}
				/*把编好字符串给到table*/
				$("body").innerHTML=html1;

				/*编写page容器的字符串*/
				var html2="<dd><a href='javascript:loaduser("+page['prePage']+")' class='first'>上一页</a></dd>";
				/*通过总页码数的不同加载相应的a标签数目*/
				for(var j=1;j<=page['totalPage'];j++){
					html2+="<dd><a href='javascript:loaduser("+j+")'>"+j+"</a></dd>";
				}
				html2+="<dd><a href='javascript:loaduser("+page['nextPage']+")' class='end'>下一页</a></dd>";
				/*将编好字符串给到page容器中*/
				$("page").innerHTML=html2;
				/*通过page容器获取其中的a标签数目*/
				var val=$("page").getElementsByTagName("a");
				/*给每个a设置内容及样式*/
				for(var i=0;i<val.length;i++){
					if(val[i].innerHTML==currentPage){
						//val[i].className='active';
						val[i].setAttribute('class','active');
					}
				}
				/*保存当前每页行数值*/
				pageSize=$("pageSize").value;
				/*保存最新一个用户的id值*/
				uid=page['uid'];
				/*保存总页码数*/
				totalPage=page['totalPage'];
			})
	}
/*table中全选按钮的函数*/
	function checkAll(b){
		if(b==true){
			for(var i=0;i<item.length;i++){
				item[i].checked=true;
			}
		}else{
			for(var i=0;i<item.length;i++){
				item[i].checked=false;
			}
		}
	}
/*table中每个复选框会触发的函数*/
	function checks(){
		if(this.checked==false){
			$("checkall").checked=false;
		}else{
			/*b为全选按钮的checked值*/
			var b=true;
			/*只要一个复选框checked值不为true 全选框checked值为false*/
			for(var i=0;i<item.length;i++){
				if(item[i].checked==false){
					b=false;
					break;
				}
			}
			/*b给全选按钮的checked属性赋值*/
			$("checkall").checked=b;
		}
	}
/*删——删除被选择列的数据的函数 以及删除当前列的函数 参数为当前列用户id*/
	function deleteAll(id){
		/*把全选框属性复原为false*/
		$("checkall").checked=false;
		/*将所选列的复选框的value的值 其实也是该行用户的id值 加入到数组arr中*/
		for(var i=0,arr=[];i<item.length;i++){
			if(item[i].checked==true){
				arr.push(item[i].value);
			}
		}
		if(id){
			arr.push(id);
		}
		/*如果arr不为空*/
		if(arr!=""){
			/*弹出确认框 内容为被删用户id号*/
			var r=confirm("确定删除编号为"+arr+"的用户");
			/*选择确定就执行删除操作*/
			if(r==true){
				/*调用ajax执行操作*/
				ajax("get",'data/admin/admin_delete.php?arr='+arr,"","text")
					.then(function(data){
						/*弹出来自服务端信息*/
						alert(data);
						/*调用用户加载函数 传递参数总页码数作为当前页码*/
						loaduser(totalPage);
					})
			}
		}
		/*arr为空提示用户选择要删除的用户*/
		else alert("请先选中要删除用户");
	}
/*增——添加用户函数*/
	function adduser(){
		/*编写字符串*/
		var html1="";
		html1+="<tr id='add'>";
			html1+="<td><input type='checkbox' name='item'></td>";
			html1+="<td><input type='text' value='"+(uid+1)+"' disabled class='uid'></td>";
			html1+="<td><input type='text' value='img/avatar/default.png'></td>";
			html1+="<td><input type='text' value='susu'></td>";
			html1+="<td><input type='text' value='苏小小'></td>";
			html1+="<td><input type='text' value='0'></td>";
			html1+="<td><input type='email' value='sxx@tedu.cn'></td>";
			html1+="<td><input type='text' value='13765432876'></td>";
			html1+="<td><input type='submit' id='offer' value='提交' onclick='offer("+(uid+1)+","+totalPage+");'></td>";
		html1+="</tr>";
		/*将字符串写入table之中*/
		$("body").innerHTML+=html1;
	}
	/*提交按钮的函数 参数为新增用户的id 及总页码数*/
	function offer(uid,totalPage){
		/*获取到新添加行中的input标签*/
		var val=$("add").getElementsByTagName('input');
		/*将input的值分别付给各自定义的变量*/
		var avatar=val[2].value,
			uname=val[3].value,
			user_name=val[4].value,
			gender=val[5].value,
			email=val[6].value, 
			phone=val[7].value;
		/*调用ajax实现添加用户操作*/
		var postStr="uid="+uid+"&avatar="+avatar+"&uname="+uname+"&user_name="+user_name+"&gender="+gender+"&email="+email+"&phone="+phone;
		ajax("post","data/admin/admin_offer.php",postStr,"text")
			.then(function(data){
					/*清空新增行内容*/
					$("add").innerHTML="";
					/*调用用户加载行数 传递总页码作为参数*/
					loaduser(totalPage);
					/*执行来自服务端的反馈*/
					alert(data);
			})
	}
/*改——每行后的修改按钮 使用form直接往服务端传递数据 进行修改数据操作 参数arr为当前行的用户相关数据 及当前页码*/
	function alter(arr){
		/*将页面的部分内容隐藏 不占据任何空间*/
		$("section").style.display="none";
		/*将一开始隐藏部分显示出来*/
		//$("form").style.visibility="visible";
		$("form").style.display="block";
		/*h1标签获取到要被修改的用户名*/
		$("h1").innerHTML="修改用户<b>"+arr[3]+"</b>的信息";
		/*获取到form容器中所有的input*/
		var inputs=$("form").getElementsByTagName('input');
		/*给每个input赋值 值来自参数*/
		inputs[0].value=arr[1];
		inputs[1].value=arr[2];
		inputs[2].value=arr[3];
		inputs[3].value=arr[4];
		inputs[4].value=arr[5];
		inputs[5].value=arr[6];
		inputs[6].value=arr[0];
		inputs[7].value=arr[7];
	}
/*改——每个input可直接修改数据*/
	function alterUser(id){
		/*通过this的父节点的父节点得到tr*/
		var tr=id.parentNode.parentNode;
		/*通过tr得到input标签*/
		var val=tr.getElementsByTagName('input');
		/*把input的值付给各自变量*/
		var uid=val[1].value,
			avatar=val[2].value,
			uname=val[3].value,
			user_name=val[4].value,
			gender=val[5].value,
			email=val[6].value, 
			phone=val[7].value;
		/*调用ajax执行修改操作*/
		var postStr="uid="+uid+"&avatar="+avatar+"&uname="+uname+"&user_name="+user_name+"&gender="+gender+"&email="+email+"&phone="+phone;
		ajax("post","data/admin/admin_alter.php",postStr,"text")
			.then(function(data){
				//console.log(data);
				eval(data.toString().replace(/^<script>|<\/script>$/g,"").split(";")[0]);
				loaduser(currentPage);
			})
	}
