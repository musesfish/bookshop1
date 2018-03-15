(()=>{
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }
    $.get({
        url: "data/cart/list.php"
    }).then(data=>{
        //console.log(data);
        var $cartContent=$("#cartContent");
        var html="";
        var data=data.data;
        for(var p of data){
            html+=`
            <div class="imfor" id="${p.cid}">
						<div class="check">
							<img src="img/cart/product_normal.png" alt="product_normal"  data-check="f" class="cimg" data-id="${p.bid}">
						</div>
						<div class="product">
							<a href="product_details.html?bid=${p.bid}"><img src="${p.md}" title="${p.title}" alt="58a2c667Ne2b5cb73" class="lf"  width="15%"></a>
							<div class="rt">
								<p>${p.subtitle}</p>
								<p>分类：${p.classification}</p>
							</div>
						</div>
						<div class="price">
							<a href="index.html" class="home">心灵驿站</a>
							<span>价格：</span>
							<span class="oprice">${p.price}</span>
						</div>
						<div class="num">
							<p>
								<button class="reduce">-</button>
								<input type="text" value="${p.count}" class="valcount">
								<button class="add">+</button>
							</p>
						</div>
						<div class="total"><span>￥</span><b class="ocprice">${(p.price*p.count).toFixed(2)}</b></div>
						<div class="delete"><a href="#" data-id="${p.cid}" class="deloc">删除</a>
						<a href="#" data-str="${p.bid}__${p.price}__${p.fixprice}__${p.subtitle}__${p.md}" class="collect">移入收藏</a></div>
					</div>
           `;
        }
        $cartContent.html(html);
        /*加入收藏夹功能*/
        $cartContent
            .on("click",".collect",function(e){
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
            })
		/*加入购物车功能*/
        //商品数目输入框失焦事件
        $(".valcount").blur(function(){
            $this=$(this);
            //console.log(123);
            var cid =
                    $this.parents(".imfor").attr("id"),//获取对应购物车id
                count =
                    $this.val();//获得商品数量
            $.post(
                "data/cart/update.php",//将购物车id 商品的数量给到服务器端进行更新操作
                {cid, count}
            ).then(loadCart(cid));//重新加载购物车
        });
		/*加减购物车商品数量功能*/
        $cartContent.on(
            "click", ".reduce,.add", function () {
                var $this = $(this);
                var cid =
                        $this.parents(".imfor").attr("id"),//获取对应购物车id
                    count =
                        $this.siblings("input").val();//获得商品数量
                if ($this.is(".add"))
                    count++;
                else {
                    if(count!=0) {
                        count--;
                    }
                }
                var oprice=parseInt($this.parents(".num").prev().children(".oprice").html());
                $this.parents(".num").next().children("b").html((count*oprice).toFixed(2));
                $this.siblings("input").val(count);
                couApri();
                $.post(
                    "data/cart/update.php",//将购物车id 商品的数量给到服务器端进行更新操作
                    {cid, count}
                ).then(loadCart(cid,count));//重新加载购物车
            })
        //清空购物车
        $("#clearAll").click(e=>{
            e.preventDefault();
            var b = window.confirm("您确认要清空购物车内容吗？");
            if(b){
                $.get(
                    "data/cart/update.php",//将变量clearA给到服务器端进行清空用户数据操作
                    {clearA:1}
                ).then(location.reload());//重新加载购物车
            }
        });
        //购物车单个删除按钮
        $(".deloc").on("click",function(e){
            e.preventDefault();
            cid=$(this).data("id");
            $.get(
                "data/cart/update.php",//将变量clearA给到服务器端进行清空用户数据操作
                {clearO:1,cid}
            ).then(location.reload());//重新加载购物车
        });
        //购物车下方删除按钮
        $("#delSel").on("click",function(e){
            e.preventDefault();
            var ids=[],imgs=$("[data-check]");
            for(var img of imgs){
                if($(img).data("check")=="t"){
                    ids.push($(img).parents(".imfor").attr("id"));
                }
            }
            //console.log(JSON.stringify(ids).slice(1,-1));
            ids=JSON.stringify(ids).slice(1,-1);
            var rs=window.confirm("确定删除选中的商品吗？");
            if(rs) {
                $.get(
                    "data/cart/update.php",//将变量clearA给到服务器端进行清空用户数据操作
                    {clearS:1,arr:ids}
                ).then(location.reload());//重新加载购物车
            }
        });
        //购物车数据实时更新函数
        function loadCart(i,c){
            var $hcount=$("[data-h-count=headCount]");//头部购物车实时显示购物车内数据总数的容器
            $.get("data/cart/list.php")//请求用户的所有购物车内数据
                .then(data=>{
                    if(c==0){
                        $("[id="+i+"]").remove();
                    }
                    if(data.hcount==null){
                        $hcount.html(0);
                    }else {
                        $hcount.html(data.hcount);
                    }
                })
        }
        /*购物车全选功能*/
        //设置全选属性时函数
        function addattr(b){
            if(b){
                $("#TcheckA").data("checkA", "t");
                $("#TcheckA").children("img").attr("src", "img/cart/product_true.png");
                $("#BcheckA").prev().children("img").attr("src", "img/cart/product_true.png");
            }else{
                $("#TcheckA").data("checkA", "f");
                $("#TcheckA").children("img").attr("src", "img/cart/product_normal.png");
                $("#BcheckA").prev().children("img").attr("src", "img/cart/product_normal.png");
            }
        }
        //全选按钮
        $("#TcheckA").data("checkA","f");
        $(".boxfather").on("click","#TcheckA,#BcheckA,.BcheckA",()=>{
            if($("#TcheckA").data("checkA")=="f") {
                addattr(true);
                $(".cimg").attr("src", "img/cart/product_true.png");
                $(".cimg").data("check", "t");
            }else{
                addattr();
                $(".cimg").attr("src", "img/cart/product_normal.png");
                $(".cimg").data("check", "f");
            }
            couApri();
        });
        /*购物车每个选项框功能*/
        $(".boxfather").on("click",".cimg",(e)=>{
            $this=$(e.target);
            if($this.data("check")=="t"){
                $this.attr("src", "img/cart/product_normal.png");
                $this.data("check", "f");
                addattr();
            }else{
                $this.data("check", "t");
                $this.attr("src", "img/cart/product_true.png");
                var imgs=$(".cimg");
                var priceA=0,countA=0;
                for(var img of imgs){
                    if($(img).data("check")=="f"){
                        addattr();
                        break;
                    }else {
                        addattr(true);
                    }
                }
            }
            couApri();
        });
        // 商品总数及总价格
        function couApri(){
            var imgs=$("[data-check]");
            var priceA=0,countA=0;
            for(var img of imgs){
                if($(img).data("check")=="t"){
                    priceA+=parseFloat($(img).parent().siblings(".total").children("b").html());
                    countA+=parseInt($(img).parent().siblings(".num").children().children("input").val());
                }
            }
            $("[data-sel-count=selcount]").html(countA);
            $("[data-all-price=allprice]").html(priceA.toFixed(2));
        }

        //去结算
        $("#order-confirm").click(function(e){
            e.preventDefault();
            //console.log($(e.target).data("id"));
            //console.log($(e.target).parents(".imfor").children(".num").children().children("input").val());
            var str=[];
            var imfor=$(".imfor");
            for(var i=0;i<imfor.length;i++){
                if($(imfor[i]).children(".check").children("img").attr("src")=="img/cart/product_true.png"){
                     //console.log($(imfor[i]).children(".num").children().children("input").val());
                     //console.log($(imfor[i]).children(".check").children("img").data("id"));
                    str+=`{"bid":${$(imfor[i]).children(".check").children("img").data("id")},"count":${$(imfor[i]).children(".num").children().children("input").val()}},`;
                }else{
                    continue;
                }
            }
            if(str.length==0){
                alert("请先选择要结算的商品！");
                return false;
            }else{
                var i=location.href.lastIndexOf("/");
                var url=location.href.slice(0,i);
                location=url+"/order_confirm.html?str="+str.toString();
            }
        });
    });
})();