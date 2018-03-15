(()=>{
	var bid=location.search.split("=")[1];
	if(bid!=undefined){
		ajax("get","data/product_details/product_details.php?bid="+bid,"")
		.then(data=>{
			//console.log(data);/*导出相应的信息*/
			var book=data.book;//该商品信息
		 /*加载左上角的图片*/
			var middleMask=document.getElementById("middleMask"),//遮罩框
				mask=document.getElementById("mask"),//移动框
				superMask=document.getElementById("superMask"),//放大框
				p=document.querySelector(".preview>p");//放中图框
		  p.innerHTML=`<img src="${book.md}">`;//加载中图
			superMask.style.backgroundImage=`url(${book.lg})`;//加载大图
		 /*鼠标进入中图启用放大镜*/
			var WSIZE=135;//移动框的宽度
			var HSIZE=183;//移动框的高度
			var MDWSIZE=270;//遮罩框的宽度
			var MDHSIZE=366;//遮罩框的高度
			middleMask.onmouseover=function(e){
				superMask.style.display="block";
				mask.style.display="block";
			}
			middleMask.onmousemove=function(e){
				var x=e.offsetX;//鼠标相对于遮罩框左上角的x轴距离
				var y=e.offsetY;//鼠标相对于遮罩框左上角的y轴距离
				var top=y-HSIZE/2;//获取移动框的top
				var left=x-WSIZE/2;//获取移动框的left
				if(top<0) top=0;
				else if(top>MDHSIZE-HSIZE) top=MDHSIZE-HSIZE;//控制移动框不超出遮罩框的高
				if(left<0) left=0;
				else if(left>MDWSIZE-WSIZE) left=MDWSIZE-WSIZE;//控制移动框不超出遮罩框的宽
				mask.style.top=top+"px";//赋值移动框的top
				mask.style.left=left+"px";//赋值移动框的left
			  superMask.style.backgroundPosition=-left*540/270+"px "+(-top*540/270+86)+"px";
			}
			middleMask.onmouseout=function(e){
				superMask.style.display="none";
				mask.style.display="none";
			}
		 /*加载文字信息*/
			var show_details=document.querySelector("div.show_details");
			var html="";
			html=`
				<h2>${book.title}</h2>
				<p class="details">${book.subtitle}</p>
				<div class="price">
					<p>售 价:<span>￥</span><b>${book.price}</b><a href="#read"><i>读书简介</i></a></p>
					<p>定 价：￥<b>${book.fixprice}</b></p>
				</div>
				<p>作者：${book.author}</p>
				<p>出版社：${book.publish}</p>
				<p>出版时间：${book.publish_time}</p>
				<p>字数：${book.word_count}</p>
				<p>所属分类：${book.classification}</p>
				<div class="btn">
					<a href="cart.html?bid=${book.bid}" id="add-cart" data-bid="${book.bid}">加入购物车</a>
					<a href='order_confirm.html?str={"bid":${book.bid},"count":1},'>立即购买</a>
					<a href="#" data-str="${book.bid}__${book.price}__${book.fixprice}__${book.subtitle}__${book.md}" id="collect">收藏</a>
				</div>
			`;
			show_details.innerHTML=html;
            //    读书简介
            $("#content").html(`${book.subtitle}`);
            //   评论
            var comments=data.comments;
            var count=data.commentCount;
            var html="";
            html+=`<p><span>累计评论${count}条</span></p>`;
            for(var c of comments){
                html+=`
                <dl>
                    <dd>
                        <div>
                            <p class="headimg"><img src="${c.avatar}"/></p>
                            <p class="author">${c.user_name}</p>
                        </div>
                        <div>
                            <p class="view">${c.comment}</p>
                        </div>
                    </dd>
                </dl>
                `;
            }
            $(".cumulative_comment").html(html);
            /*加入收藏夹功能*/
            $("#collect")
                .click(function(e){
                    e.preventDefault();
                    if($("#fir").is(":visible")){
                        alert("请先登录！");
                        location="login.html";
                    }else{
                        var str=$(this).data("str");
                        // console.log(str);
                        $.post(
                            "data/collect/update.php",
                            {str}
                        ).then((data)=>{
                                var rs=window.confirm(data+"  是否前往收藏夹查看");
                                if(rs) location.href="my_collect.html";
                            });
                    }
                });
            /*加入购物车功能*/
            $("#add-cart").click(function(e){//给商品列表中的加入购物车绑定事件
                    e.preventDefault();
                    if($("#fir").is(":visible")){//假如登录区为未登录状态
                        alert("请先登录!");//提醒用户先登录
                        location="login.html";
                    }else{
                        var $this=$(this);
                        var bid=$this.data("bid");//自定义属性中绑定着对应商品id号
                        $.post(//点击加入购物车时 把商品id（session中用户id）给到服务器端 进行对应的购物车更新或插入操作
                            "data/cart/add.php",
                            {bid}
                            //{lid:lid,count:count}
                        ).then(()=>{
                                var $hcount=$("[data-h-count=headCount]");//头部购物车实时显示购物车内数据总数的容器
                                $.get("data/cart/list.php")//请求用户的所有购物车内数据
                                    .then(data=>{
										$hcount.html(data.hcount);
										alert("添加成功");
                                    })
                            });//调用加载购物车函数 更新用户的购物车内容
                    }
                })
		 /*分类*/
			var html="";
			var family=data.family;
			for(var i=0;i<family.length;i++){
				html+=`<dd>
									<a href="products.html?fid=${family[i].fid}">${family[i].fname}</a>
									<a href="products.html?fid=${family[i].fid}">${family[i].fnames}</a>
								</dd>`;
			}
			document.querySelector(".classify dl").innerHTML+=html;
		 /*排行版*/
			var ul=document.querySelector(".rank ul");
			var pros=data.all;
			var html="";
			html+=`
				<li class="active">
					<span class="top">01</span>
					<a href="product_details.html?bid=${pros[0].bid}"><img src="${pros[0].md}"></a>
					<div>
						<a href="product_details.html?bid=${pros[0].bid}">${pros[0].title}</a>
						<span>${pros[0].author}</span>
						<b>￥${pros[0].price}</b>
					</div>
				</li>
				<li><span class="top">02</span><a href="product_details.html?bid=${pros[1].bid}">${pros[1].title}</a><span>￥${pros[1].price}</span></li>
				<li><span class="top">03</span><a href="product_details.html?bid=${pros[2].bid}">${pros[2].title}</a><span>￥${pros[2].price}</span></li>	
			`;
			for(var i=3;i<pros.length;i++){
				html+=`
				<li><span>0${i}</span><a href="product_details.html?bid=${pros[i].bid}">${pros[i].title}</a><span>￥${pros[i].price}</span></li>
					
			`;	
			}
			html+=`<li><a href="products.html">查看更多图书 &gt;</a></li>`;
			ul.innerHTML=html;
		 /*为你推荐*/
		  /*定义变量及值*/
			var dl=document.querySelector("#automatic dl");
			var books=data.books;
			var html1="",html2="",html3="";
			for(var i=0;i<4;i++){
				html1+=`<dd>
									<img src="${books[i].md}" title="${books[i].title}">
									<a href="product_details.html?bid=${books[i].bid}">${books[i].title}</a>
									<span class="price">￥${books[i].price}</span>
								</dd>`;
			}
			for(var i=4;i<8;i++){
				html2+=`<dd>
									<img src="${books[i].md}" title="${books[i].title}">
									<a href="product_details.html?bid=${books[i].bid}">${books[i].title}</a>
									<span class="price">￥${books[i].price}</span>
								</dd>`;
			}
			for(var i=8;i<12;i++){
				html3+=`<dd>
									<img src="${books[i].md}" title="${books[i].title}">
									<a href="product_details.html?bid=${books[i].bid}">${books[i].title}</a>
									<span class="price">￥${books[i].price}</span>
								</dd>`;
			}
			/*容器初始化加载内容*/
			var lis=document.getElementById("ul").getElementsByTagName("li");
			addhtml(lis[0],html1);
			/*根据容器下面li来判断dl加载什么内容*/
			for(var li of lis){
				li.onmouseover=function(e){
					var acli=document.getElementById("ul").querySelector("li.active");
					if(acli) acli.className="";
					addhtml(e.target,eval(e.target.dataset.val));
				}
			}
			/*容器赋值的函数*/
			function addhtml(li,dd){
				li.className="active";
				var html="";
				html+=`
					<dt>
						<span id="pre"></span>
					</dt>
					${dd}
					<dt>
						<span id="next"></span>
					</dt>	
				`;
				dl.innerHTML=html;
				/*根据点击左右按钮来自调用addhtml函数*/
				var pre=document.getElementById("pre");
				var next=document.getElementById("next");
				/*向前按钮*/
				pre.onclick=next.onclick=function(e){
					var acli=document.getElementById("ul").querySelector("li.active");//目前被点击的li
					acli.className="";//被点击的样式去掉
					var val=acli.dataset.val;//取得被点击的li的val值 html1
					var num=val.split("l")[1];//取得val值中的数字 1
					if(e.target.id=="pre"){
						if(val=="html1") {val="html3";num=2;}//如果li是第一个 那么val值应为第三个
						else {val="html"+(num-1);num=num-2;}//否则val值减1 num比val值再减1 
					}else{
						if(val=="html3") {val="html1";num=0;}//如果li是第一个 那么val值应为第三个
						else {val="html"+(parseInt(num)+1);}//否则val值加1 num比val值再减1 
					}
					addhtml(lis[num],eval(val));
				}
			}
		});
		/*侧边返回顶部加滚动监听事件*/
		var totop=document.getElementById("totop");//侧边返回顶部
		window.addEventListener("scroll",()=>{
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//目前页面距顶部的滚动距离
			totop.style.visibility=scrollTop>innerHeight/2?"visible":"hidden";//判断返回顶部是否出现
		});
		totop.onclick=function(){
			//window.scrollTo(0,0);//返回顶部
			$("html,body").stop(true).animate({scrollTop:0},500);
		}
     //   发表评论
        $("#public").click(function(e){
            e.preventDefault();
            if(!sessionStorage["uname"]){
                alert("请先登录！");
                location.href="login.html";
            }else{
                var comment=$("#mycomment").val();
                if(comment){
                    console.log(comment,bid);
                    $.get(
                        "data/product_details/add_comment.php",
                        {comment,bid},
                        function(data){
                            console.log(data);
                            if(data.code){
                                alert(data.msg);
                                location.reload();
                            }else{
                                alert(data.msg);
                            }
                        }
                    );
                }
            }
        });
	}
})();