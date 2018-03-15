(()=>{
	ajax("get","header.html","","text")
		.then(html=>{
			/*加载页头*/
			document.getElementById("header").innerHTML=html;
            $.get(
                "data/header/sort.php",
                function(output){
                    //console.log(output[0].fnames.split("|"));
                    //console.log(output);
                    var html="";
                    html+=`
                        <ul id="allsort">
                            <li data-id="educate" id="${output[0].fid}">${output[0].fname}</li>
                            <li data-id="literature" id="${output[1].fid}">${output[1].fname}</li>
                            <li data-id="child" id="${output[2].fid}">${output[2].fname}</li>
                            <li data-id="life" id="${output[3].fid}">${output[3].fname}</li>
                            <li data-id="social" id="${output[4].fid}">${output[4].fname}</li>
                            <li data-id="manage" id="${output[5].fid}">${output[5].fname}</li>
                            <li data-id="science" id="${output[6].fid}">${output[6].fname}</li>
                        </ul>`;
                    var html1="";
                    var educate=output[0].fnames.split("|");
                    for(var val of educate){
                        html1+=`<li>${val}</li>`;
                    }
                    var html2="";
                    var literature=output[1].fnames.split("|");
                    for(var val of literature){
                        html2+=`<li>${val}</li>`;
                    }
                    var html3="";
                    var child=output[2].fnames.split("|");
                    for(var val of child){
                        html3+=`<li>${val}</li>`;
                    }
                    var html4="";
                    var life=output[3].fnames.split("|");
                    for(var val of life){
                        html4+=`<li>${val}</li>`;
                    }
                    var html5="";
                    var social=output[4].fnames.split("|");
                    for(var val of social){
                        html5+=`<li>${val}</li>`;
                    }
                    var html6="";
                    var manage=output[5].fnames.split("|");
                    for(var val of manage){
                        html6+=`<li>${val}</li>`;
                    }
                    var html7="";
                    var science=output[6].fnames.split("|");
                    for(var val of science){
                        html7+=`<li>${val}</li>`;
                    }
                    html+=`
                        <ul id="educate" class="sort" data-id="${output[0].fid}">
                        ${html1}
                        </ul>
                        <ul id="literature" class="sort" data-id="${output[1].fid}">
                        ${html2}
                        </ul>
                        <ul id="child" class="sort" data-id="${output[2].fid}">
                        ${html3}
                        </ul>
                        <ul id="life" class="sort" data-id="${output[3].fid}">
                        ${html4}
                        </ul>
                        <ul id="social" class="sort" data-id="${output[4].fid}">
                        ${html5}
                        </ul>
                        <ul id="manage" class="sort" data-id="${output[5].fid}">
                        ${html6}
                        </ul>
                        <ul id="science" class="sort" data-id="${output[6].fid}">
                        ${html7}
                        </ul>
                  `;
                    $("#fathers").html(html);
                }
            );
			//判断用户是否在线
            if(localStorage.getItem("uname")){
                var postStr="uname="+localStorage.getItem("uname")+"&upwd="+localStorage.getItem("upwd");
                ajax("get","data/login/login.php?"+postStr,"").then(data=>{
                    if (data.code == 1) {
                        $("#fir").hide();
                        $("#username").html(data.uname);
                        $("#wel").show();
                        sessionStorage.setItem("uname", data.uname);
                    }
                })
            }else{
                $.ajax({//页面一加载就判断是否有登录id
                    url: "data/header/isLogin.php",//专门用于验证服务器session中是否有uid的php
                    type: "get"
                }).then(data=> {//根据服务器反馈信息 选择登录状态
                    //console.log(data);
                    if (data.ok == 1) {
                        $("#fir").hide();
                        $("#username").html(data.uname);
                        $("#wel").show();
                        sessionStorage.setItem("uname", data.uname);
                    } else {
                        $("#fir").show();
                        $("#wel").hide();
                        sessionStorage.setItem("uname", "");
                    }
                });
            }
			//注销功能
			$("#clearId").click(()=>{
				$.ajax({
					url:"data/header/logout.php"
				}) .then(()=>{
                    location.reload();
                    localStorage.setItem("upwd","");
                    localStorage.setItem("uname","");
                });
			});
            //头部购物车内数据数量实时更新
            loadCart();
            function loadCart(){
                var $hcount=$("[data-h-count=headCount]");//头部购物车实时显示购物车内数据总数的容器
                $.get("data/cart/list.php")//请求用户的所有购物车内数据
                    .then(data=>{
                        //console.log(data);
                        if(data.hcount==null){
                            $hcount.html(0);
                        }else {
                            $hcount.html(data.hcount);
                        }
                    })
            }
			/*跳转页面*/
            var search=document.getElementById("search");
			var h2=document.querySelector("#bottom .search h2");
			h2.onclick=function(){
				var kw=search.value;
                var i=location.href.lastIndexOf("/");
                var url=location.href.slice(0,i);
				if(kw.trim().length!=0){
					var url=url+"/products.html?kw="+kw;
					location=url;
				}else{
					location=url+"/products.html";
				}
			};
			/*搜索框滚动固定位置*/
			window.addEventListener("scroll",function(){
				var div=document.querySelector("#bottom");//fixed_nav
				var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
				div.className=scrollTop>100?"fixed_nav clear bottom":"bottom clear";
			});
			//搜索帮助
			$("#search").keyup(function(){
				var kw=$(this).val();
				$.get(
					"data/header/search.php",
					{kw},
					function(data){
						//console.log(data);
						var html="";
						$.each(data,function(i,l){
							html+=`
                        <li id="${l.bid}" class="lisear">${l.title}<span>${l.author}</span></li>
                    `;
						});
						if(html!=""){
							$("#searul").css("display","block");
							$("#searul").html(html);
							$("#searul").on("click",".lisear",function(){
                                var val=$(this).html().split("<")[0];
								$("#search").val(val);
                                var i=location.href.lastIndexOf("/");
                                var url=location.href.slice(0,i);
                                setTimeout(function(){
                                    //console.log(url+"/products.html?kw="+val);
                                    location=url+"/products.html?kw="+val;
                                },3000);
							});
						}
					}
				);
			});
	        //分类
            $(".rrside").on("click","#sortspan,#sortb",function(){
               $("#allsort").toggle(500);
            })
            $("#fathers").on("mouseenter","#allsort li,.sort",function(e){
                if(!$(e.target).parent().hasClass("sort")) {
                    $("#allsort li").css({
                        "background": "#fff",
                        "color": "#487a6f"
                    });
                    $(".sort").hide();
                    $(e.target).css({
                        "background": "#fe3227",
                        "color": "white"
                    });
                }
                var id = $(e.target).data("id");
                $("#" + id).show(300);
            });
            $("#fathers").mouseleave(function(){
                $(".sort").hide(500);
                $("#allsort").hide(500);
            });
            $("#fathers").on("click","#allsort li,.sort",function(e){
                if($(e.target).parent().hasClass("sort")){
                    fid=$(e.target).parent().data("id");
                }else{
                    fid=$(e.target).attr("id");
                }
                var i=location.href.lastIndexOf("/");
                var url=location.href.slice(0,i);
                location=url+"/products.html?fid="+fid;
            })
            //$("#top").on("click","#mysoul",function(){
            //    $("#dropdown").toggle(500);
            //});
            var timer;
            $("#mysoul").hover(
                function(){
                    $("#dropdown").show(500);
                },
                function(){
                    timer=setTimeout(function(){$("#dropdown").hide(500)},500);
                }
            );
            $("#dropdown").mouseenter(function(){
                clearTimeout(timer);
                $(this).show();
            });
            $("#dropdown").mouseleave(function(){
                $("#dropdown").hide(500);
            });
            $("#dropdown").on("click","li",function(e){
                var i=location.href.lastIndexOf("/");
                var url=location.href.slice(0,i);
                if($(e.target).data("hid")=="collect"){
                    location=url+"/my_collect.html";
                }else{
                    location=url+"/uc_basic.html?id="+$(e.target).data("hid");
                }
            });
        });
})();