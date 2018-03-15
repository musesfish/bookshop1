(()=>{
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }
    var str=location.search.split("=")[1].split("_");
    var aid=str[0];
    var updateOrder=3;
    $.get("data/order/update_order.php",{updateOrder,aid},function(data){
        alert(data.msg);
    });
    $("#main").html(`
        <section>
                <h2>订单支付成功 !</h2>
                <p>订单号：<span>${str[0]}</span>支付金额：<b>${str[1]}</b></p>
                <p><a href="myorder.html">查看订单</a><a href="index.html">继续购物</a></p>
        </section>
    `);
})()
