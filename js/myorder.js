(()=>{
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }
    $.get("data/order/order.php",function(data){
        var html="";
        $.each(data,function(i,order){
            //console.log(i,order);
            var aid=`${order[0].aid}`;
            var status=`${order[0].status}`;
            switch(status){
                case "1":status="等待付款";
                        break;
                case "2":status="等待发货";
                        break;
                case "3":status="运输中";
                        break;
                case "4":status="已签收";
                        break;
                case "5":status="已取消";
                        break;
            }
            var receiver=`${order[0].receiver}`;
            var totalprice = 0;
            var html2="";
            var str=[];
            for(var j=0;j<order.length;j++){
              str+=`{"bid":${order[j].bid},"count":${order[j].count}},`;
              totalprice += order[j].price*order[j].count;
              html2+=`
                <div class="lf">
                    <a href="product_details.html?bid=${order[j].bid}">
                    <img src="${order[j].md}" class="lf" width="15%">
                    </a>
                    <p>${order[j].subtitle}</p>
                    <p><i>￥${order[j].price}&nbsp;&nbsp;x${order[j].count}</i></p>
                </div>
              `;
            }
            //console.log(str);
            html+=`
        <div class="imfor" id="${aid}" data-str=${str}>
						<div class="num">
							${aid}
						</div>
						<div class="product">
                            ${html2}
						</div>
						<div class="receiver">
							${receiver}
						</div>
						<div class="price">
							￥${totalprice.toFixed(2)}
						</div>
						<div class="state">
							${status}
						</div>
						<div class="manipulate">
							<a href="#" id="${aid}" data-id="manipulate">
							${order[0].status=="5" || order[0].status=="4"?"删除订单":"取消订单"}
							</a>
							<a href="#" data-id="confirm">
							${order[0].status=="1"?"去付款":"再次购买"}
							</a>
						</div>
					</div>
    `;
        });
        $(".imfor-top").after(html);

        $(".box").on("click","[data-id='manipulate']",function(e){
            e.preventDefault();
            var aid=$(e.target).attr("id");
            if($(e.target).html().trim()=="取消订单"){
                var updateOrder="1";
                var result=window.confirm("确定取消此订单？");
            }else{
                var updateOrder="2";
                var result=window.confirm("确定删除此订单？");
            }
            if(result){
                $.get("data/order/update_order.php",{updateOrder,aid},function(data){
                    alert(data.msg);
                    location.reload();
                });
            }
        });
        $(".box").on("click","[data-id=confirm]",function(e){
            e.preventDefault();
            var str=$(e.target).parents(".imfor").data("str");
            var i=location.href.lastIndexOf("/");
            var url=location.href.slice(0,i);
            location=url+"/order_confirm.html?str="+str.toString();
            if($(e.target).html().trim()=="去付款"){
                var aid=$(e.target).parents(".imfor").attr("id");
                var updateOrder="2";
                $.get("data/order/update_order.php",{updateOrder,aid});
            }
            //str={"bid":5,"count":5}{"bid":6,"count":5}
            //str={"bid":1,"count":4}{"bid":2,"count":1}{"bid":3,"count":1}
        });
    });
})();
