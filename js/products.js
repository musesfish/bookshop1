(()=>{
    var kw,fid;
    var search=location.search.split("=")[1]||"";
    //isNaN(search)?kw=decodeURI(search):fid=search;
    isNaN(search)?kw=search:fid=search;
    loadPage(0,'','',10000,0,'','','','','',kw,fid);
    /*加载商品函数*/
    function loadPage(pno=0,classify="",priced="",hprice=100000,lprice=0,author="",authord="",discount="",discountd="",publicd="",kw="",fid=0){
        $.get(
            "data/products/products.php",
            {pno,classify,priced,hprice,lprice,author,authord,discount,discountd,publicd,kw,fid})
            .then(output=>{
                //console.log(output);
                /*加载商品列表*/
                var data=output["data"];
                var html="";
                for(p of data){
                        html+=`
                    <div>
                        <a class="preview" href="product_details.html?bid=${p.bid}"><img src="${p.md}"></a>
                        <dl class="describe">
                            <dd class="title"><a href="product_details.html?bid=${p.bid}">${p.title}</a><a href="index.html" class="home">心灵驿站</a></dd>
                            <dd class="price"><span>￥${p.price}</span>${p.discount}</dd>
                            <dd class="author">${p.author}</dd>
                            <dd class="comment">${p.publish}&nbsp;&nbsp;<a href="products.html?fid=${p.family_id}">${p.classification}</a></dd>
                            <dd class="details">${p.subtitle}</dd>
                            <dd class="btn">
                                <a href="#" data-bid="${p.bid}" class="add-cart">加入购物车</a>
                                <a href='order_confirm.html?str={"bid":${p.bid},"count":1},'>立即购买</a>
                                <a href="#" data-str="${p.bid}__${p.price}__${p.fixprice}__${p.subtitle}__${p.md}" class="add-collect">收藏</a>
                            </dd>
                        </dl>
                    </div>
                    `;
                    }
                    var proLis=document.getElementById("classification");
                    proLis.innerHTML=html;

                var pageCount=output["pageCount"];//页码数
                var pageNo=output["pageNo"];//当前页码
                var html="";
                html+=`
                当前页码：<span>${parseInt(pageNo)+1}/${pageCount}</span>
            `;
                $("#pages").html(html);
                /*加载页码*/
                var lis="";
                for(var i=0;i<pageCount;i++){
                    lis+=(i==pageNo)?`
					<li class="active">${i+1}</li>`:
                        `<li>${i+1}</li>`;
                }
                var html=`
				<li id="prePage">上一页</li>
				${lis}
				<li id="nextPage">下一页</li>
			`;
                var ul=document.querySelector("#page ul");
                ul.innerHTML=html;
                /*加载页码样式*/
                var prePage=ul.firstElementChild;
                var nextPage=ul.lastElementChild;
                if(pageNo==pageCount-1) nextPage.className="disabled";
                else if(pageNo==0) prePage.className="disabled";
                /*页码绑事件*/
                ul.onclick=function(e){
                    if(e.target.id=="prePage"){
                        if(pageNo!=0) loadPage(pageNo-1);
                    }else if(e.target.id=="nextPage"){
                        if(pageNo!=pageCount-1) loadPage(parseInt(pageNo)+1);
                    }else{
                        loadPage(e.target.innerHTML-1);
                    }
                    e.preventDefault();
                }
            });
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
    /*加入收藏夹功能*/
    $("#classification")
        .on("click",".add-collect",function(e){
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
    $("#classification")//给商品列表中的加入购物车绑定事件
        .on("click",".add-cart",function(e){
            e.preventDefault();
            if($("#fir").is(":visible")){//假如登录区为未登录状态
                alert("请先登录!");//提醒用户先登录
                location="login.html";
            }else{
                var $this=$(this);
                var bid=$this.data("bid");//自定义属性中绑定着对应商品id号
                //console.log(bid);
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
                    });//更新用户的购物车内容
            }
        });
    //分类事件
    $(".classify").on("click","li",function(e){
        var val=e.target.innerHTML;
        loadPage(0,val);
    });
    $(".price").on("click","li",function(e){
        var price=e.target.innerHTML.split("-");
        console.log(price[1],price[0]);
        loadPage(0,"","",price[1],price[0]);
    });
    $(".discount").on("click","li",function(e){
        var val=e.target.innerHTML;
        loadPage(0,"","",100000,0,"","",val);
    });
    $(".score").on("click","li",function(e){
        var val=e.target.innerHTML;
        loadPage(0,"","",100000,0,val);
    });
    //    选项头事件
    var b=true;
    $("[data-id=discount]").click(()=>{
        if(b){
            loadPage(0,"","",100000,0,"","","","d");
            b=false;
        }else{
            loadPage(0,"","",100000,0,"","","","u");
            b=true;
        }
    });
    $("[data-id=price]").click(()=>{
        if(b){
            loadPage(0,"","d");
            b=false;
        }else{
            loadPage(0,"","u");
            b=true;
        }
    });
    $("[data-id=author]").click(()=>{
        if(b){
            loadPage(0,"","",100000,0,"","d");
            b=false;
        }else{
            loadPage(0,"","",100000,0,"","u");
            b=true;
        }
    });
    $("[data-id=publish]").click(()=>{
        if(b){
            loadPage(0,"","",100000,0,"","","","","d");
            b=false;
        }else{
            loadPage(0,"","",100000,0,"","","","","u");
            b=true;
        }
    });
    $("[data-id=allsort]").click(()=>{
        if(b){
            loadPage(0,'',"d");
            b=false;
        }else{
            loadPage(0,"","u");
            b=true;
        }
    });
})();