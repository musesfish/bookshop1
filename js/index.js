/*加载滚动楼层导航函数（获取目标元素距页面顶部距离）*/
	function getTotalTop(elem){//获取元素到页面顶部的上边距
		var sum=0;
		do{
			sum+=elem.offsetTop;//获取元素到父元素（包裹着元素）的上边距
			elem=elem.offsetParent;//获取元素的“父元素（包裹着元素）”
		}while(elem);
		return sum;
	}
/*加载轮播信息*/
	(()=>{
		ajax("get","data/index/banners.php","")
			.then(data=>{
				var htmlimgs="",htmlidxs="";
				var i=1;
				for(var p of data){
					htmlimgs+=`
						<li><a href="${p.href}"><img src="${p.img}" title="${p.title}"></a></li>`;
					htmlidxs+=`<li data-value="${p.title}">${i}</li>`;
					i++;
				}
				var banner_img=document.querySelector(".carousel .img");
				banner_img.innerHTML=htmlimgs;
				var banner_dot=document.querySelector(".carousel .dot");
				banner_dot.innerHTML=htmlidxs;
				
				var banner_a1=document.querySelector(".carousel .ck-left");
				var banner_a2=document.querySelector(".carousel .ck-right");
				var li_list=banner_dot.children;
				li_list[0].className="active";
				
				/* 自调匿名函数 轮播图播放 */
				(function(){
					var left=Number(banner_img.style.marginLeft);
					var b=true;
					/*定时器设置*/
					var time1=setInterval(function(){
						if(b){
							left=(parseInt(left));
							if(left==-(979*5)){
								left=0;
							}
							else left-=979;
							left=left+"px";
							banner_img.style.marginLeft=left;
							clear_indicators();
							add_indicators();
						}
					},2000);
					
					/*鼠标移入移出透明度变化*/
					banner_img.onmouseover=function(){
						b=false;
						banner_a1.style.opacity=0.8;
						banner_a2.style.opacity=0.8;
					}
					banner_img.onmouseout=function(){
						b=true;
						banner_a1.style.opacity=0.3;
						banner_a2.style.opacity=0.3;
					}
					/*点击下一张*/
					banner_a2.onclick=function(){
						b=false;
						left=(parseInt(left));
						if(left==-(979*5)){
							left=0;
						}
						else left-=979;
						left=left+"px";
						banner_img.style.marginLeft=left;
						clear_indicators();
						add_indicators();
					}
					/*点击上一张*/
					banner_a1.onclick=function(){
						b=false;
						left=(parseInt(left));
						if(left==0){
							left=-(979*5);
						}
						else left+=979;
						left=left+"px";
						banner_img.style.marginLeft=left;
						clear_indicators();
						add_indicators();
					}
					/*4小点移图*/
					for(var i=0;i<li_list.length;i++){
						li_list[i].onmouseover=function(){
							clear_indicators();
							b=false;
							this.className="active";
							value=this.dataset.value.slice(-1)-1;
							if(value=="0"){
								banner_img.style.marginLeft="0px";
							}else if(value=="1"){
								banner_img.style.marginLeft="-979px";
							}else if(value=="2"){
								banner_img.style.marginLeft=-(979*2)+"px";
							}else if(value=="3"){
								banner_img.style.marginLeft=-(979*3)+"px";
							}else if(value=="4"){
								banner_img.style.marginLeft=-(979*4)+"px";
							}else if(value=="5"){
								banner_img.style.marginLeft=-(979*5)+"px";
							}
						}
					}
					/*去4小点样式*/
					function clear_indicators(){
						for(var i=0;i<li_list.length;i++){
							li_list[i].className="";
						}
					}
					/*加4小点样式*/
					function add_indicators(){
						if(left=="0px"){
							li_list[0].className="active";
						}else if(left=="-979px"){
							li_list[1].className="active";
						}else if(left==-(979*2)+"px"){
							li_list[2].className="active";
						}else if(left==-(979*3)+"px"){
							li_list[3].className="active";
						}else if(left==-(979*4)+"px"){
							li_list[4].className="active";
						}else if(left==-(979*5)+"px"){
							li_list[5].className="active";
						}
					}
				})();
			})
	})();
/*加载楼层信息*/
	(()=>{
		ajax("get","data/index/floors.php","")
		.then(output=>{
			/*分类*/
				var html="";
				var family=output.family;
				for(var i=0;i<family.length;i++){
					html+=`<dd>
										<a href="products.html?fid=${family[i].fid}">${family[i].fname}</a>
										<a href="products.html?fid=${family[i].fid}">${family[i].fnames}</a>
									</dd>`;
				}
				document.querySelector(".classify dl").innerHTML+=html;
			/*自调匿名函数 自动播放*/
				var allpro=output.all;
				html="";
				for(var pro of allpro){
					html+=`<dd>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</dd>`;
				}
				var dl=document.querySelector("#automatic dl");
				dl.innerHTML=html;
				/*定时器设置*/
				(function(){
					/*自动滚动*/
					var ULWIDTH=780;//dl实际一半宽度
					var ulOffsetLeft=94;//dl的左边距
					var halfLeft=ULWIDTH-ulOffsetLeft//滚动一次后左边距
					var timer2;
					timer2=setInterval(autoplay,2000);
					function autoplay(){
						if(dl.offsetLeft==94) {
							dl.style.left=-ULWIDTH+ulOffsetLeft+"px";//第一次
							next.style.backgroundColor="#fff";
							pre.style.backgroundColor="#eaebef";
						}
						else {
							dl.style.left=ulOffsetLeft+"px";//第二次
							pre.style.backgroundColor="#fff";
							next.style.backgroundColor="#eaebef";
							//console.log(dl.offsetLeft);//94 -686
						}
					}
					/*左右按钮*/
					var pre=document.querySelector("#automatic #pre");
					var next=document.querySelector("#automatic #next");
					var automatic=document.getElementById("automatic");
					automatic.onmouseover=function(e){
						clearInterval(timer2);
					}
					pre.onclick=next.onclick=function(e){
						if(e.target.id=="pre"&&dl.style.left!=94){
							dl.style.left=ulOffsetLeft+"px";//上一页
							pre.style.backgroundColor="#fff";
							next.style.backgroundColor="#eaebef";
						}
						else if(e.target.id=="next"&&dl.style.left!=halfLeft){
							dl.style.left=-ULWIDTH+ulOffsetLeft+"px";//下一页
							next.style.backgroundColor="#fff";
							pre.style.backgroundColor="#eaebef";
						}
					}
					automatic.onmouseout=function(e){
						timer2=setInterval(autoplay,2000);
					}
				})();
			/*为您推荐*/
				var recommendDiv=document.getElementById("recommendDiv");
				var p=document.querySelector("#recommend>p");
				var all=output.all;
				var allreverse=output.allreverse;
				addrecommend(all);
				function addrecommend(pros){
					var html=""
						for(var pro of pros){
							html+=`<div>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</div>`;
						}
						recommendDiv.innerHTML=html;
				}
				p.onmouseover=function(e){
					if(e.target.innerHTML=="图书推荐"){
						e.target.className="selected";
						e.target.nextElementSibling.className="";
						addrecommend(all);
					}else if(e.target.innerHTML=="热卖图书"){
						e.target.className="selected";
						e.target.previousElementSibling.className="";
						addrecommend(allreverse);
					}
				}
			/*图书畅销排行榜*/
				var sellingDiv=document.getElementById("sellingDiv");
				var p=document.querySelector("#selling>p");
				var spans=p.getElementsByTagName("span");
				var all=output.all;
				var allreverse=output.allreverse;
				addselling(all);
				function addselling(pros){
					var html=""
						for(var pro of pros){
							html+=`<div>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</div>`;
						}
					sellingDiv.innerHTML=html;
				}
				p.onmouseover=function(e){
					if(e.target.innerHTML=="图书总榜"||e.target.innerHTML=="文学"||e.target.innerHTML=="历史"){
						$(e.target).siblings("span").removeClass();
						e.target.className="selected";
						addselling(all);
					}else if(e.target.innerHTML=="少儿"||e.target.innerHTML=="小说"||e.target.innerHTML=="经济管理"){
						$(e.target).siblings("span").removeClass();
						e.target.className="selected";
						addselling(allreverse);
					}
				}
			/*热门分类*/
				var classDiv=document.querySelector("#hotcategories>div");
				var html="",i=0;
				var family=output.family;
				for(var f of family){
					i++;
					var fnames=f.fnames.split("|");
					html+=`<div>
						<a href="products.html?fid=${f.fid}" class="${f.class}"></a>
						<ul>
							<li><a href="products.html?fid=${f.fid}" class="title">${f.fname}</a></li>
							<li><a href="products.html?fid=${f.fid}">${fnames[0]}</a></li>
							<li><a href="products.html?fid=${f.fid}">${fnames[1]}</a></li>
							<li><a href="products.html?fid=${f.fid}">${fnames[2]}</a></li>
							<li><a href="products.html?fid=${f.fid}">${fnames[3]}</a></li>
							<li><a href="products.html" class="foot">查看所有 &gt;</a></li>
						</ul>
					</div>`;
					if(i==6) break;
				}
				classDiv.innerHTML=html;
			/*图书新品排行榜*/
				var newrankingDiv=document.getElementById("newrankingDiv");
				var p=document.querySelector("#newranking>p");
				var spans=p.getElementsByTagName("span");
				var all=output.all;
				var allreverse=output.allreverse;
				addnewranking(all);
				function addnewranking(pros){
					var html=""
						for(var pro of pros){
							html+=`<div>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</div>`;
						}
					newrankingDiv.innerHTML=html;
				}
				p.onmouseover=function(e){
					if(e.target.innerHTML=="图书总榜"||e.target.innerHTML=="文学"||e.target.innerHTML=="历史"){
						for(var span of spans){
							span.className="";
						}
						e.target.className="selected";
						addnewranking(all);
					}else if(e.target.innerHTML=="少儿"||e.target.innerHTML=="小说"||e.target.innerHTML=="经济管理"){
						for(var span of spans){
							span.className="";
						}
						e.target.className="selected";
						addnewranking(allreverse);
					}
				}
			/*精选图书推荐*/
				var selectedDl=document.getElementById("selectedDl");
				var allpro=output.recommended;
				html="";
				for(var pro of allpro){
					html+=`<dd>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</dd>`;
				}
				selectedDl.innerHTML=html;
			/*今日最好价*/
				var bestDl=document.getElementById("bestDl");
				var allpro=output.top_sale;
				html="";
				for(var pro of allpro){
					html+=`<dd>
								<a href="product_details.html?bid=${pro.pid}"><img src="${pro.pic}"></a>
								<a href="product_details.html?bid=${pro.pid}">${pro.title}</a>
								<span class="author">${pro.author}</span>
								<span class="price">￥${pro.price}</span>
							</dd>`;
				}
				bestDl.innerHTML=html;
			/*侧边导航加滚动监听事件*/
				var lift=document.getElementById("floor");//侧边导航
				window.addEventListener("scroll",()=>{
					var lshowtop=getTotalTop(document.getElementById("recommend"));//第一楼距页面顶部的距离
					var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//目前页面距顶部的滚动距离
					lift.style.display=scrollTop>(lshowtop-300)?"block":"none";//判断导航是否出现
					/*滚动过程侧边导航点灯事件*/
					if(lift.style.display=="block"){
						var fs=document.querySelectorAll("#recommend,#selling,#hotcategories,#newranking,#selectedbooks,#bestprice");
						//获取到各个楼层
						var HEIGHT=600;
						//常规楼层的高度
						for(var i=0;i<fs.length;i++){
							var fsitotalTop=getTotalTop(fs[i]);//获取到楼层距离页面顶部的高度
							var start=fsitotalTop-innerHeight/2;//楼层开始会亮时滚动条的滚动长度
							if(i==fs.length-1||i==fs.length-2){//倒数两个楼层的高度不同
								var end=start+HEIGHT/2;//楼层结束亮时滚动条的滚动长度为start+楼层的本身高度
								if(scrollTop>=start&&scrollTop<end) break;//滚动条在边界条件里滚动时 跳出循环 拿到i给对应的导航名点灯
							}else{
								var end=start+HEIGHT;//常规楼层的结束边界值
								if(scrollTop>=start&&scrollTop<end) break;//同上
							}
						}
						var lio=lift.querySelector("#floor .lift_item_on");//获取到导航中亮着的灯
						if(lio) lio.className="";//存在亮灯关上
						var fli=lift.querySelector(`#floor li:nth-child(${i+1})`);//给楼层对应到的导航名点灯
						if(fli) fli.className="lift_item_on";//灯亮了
					}
				});
			/*绑定侧边导航点击跳转事件*/
				var lis=lift.querySelectorAll("#floor li");//楼层对应的导航名
				var fs=["#recommend","#selling","#hotcategories","#newranking","#selectedbooks","#bestprice"];//楼层的id名
				for(let i=0;i<lis.length;i++){
					lis[i].onclick=()=>{
						var fi=document.querySelector(fs[i]);//获取第i个楼层
						var fitotalTop=getTotalTop(fi);//取得该楼层的距页面顶部距离
						if(i==lis.length-1||i==lis.length-2)
							//window.scrollTo(0,fitotalTop-155);//倒数两个楼层的滚动距离
							$("html,body").stop(true).animate({scrollTop:fitotalTop-155},500);
						else
							//window.scrollTo(0,fitotalTop-125);//其他楼层的滚动的距离
							$("html,body").stop(true).animate({scrollTop:fitotalTop-125},500);
					}
				}
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
		});
	})();