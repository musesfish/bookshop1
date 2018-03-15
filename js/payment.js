(()=>{
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }
    var str=location.search.split("=")[1].split("_");
    //console.log(str);
    $(".body").before(`
        <div class="head clear">
            <p class="lf">支付金额：<b>${str[1]}元</b></p>
            <p class="rt">订单号：<span>${str[0]} </span> 收款方：心灵驿站商城</p>
        </div>
    `);
    $(".body").after(`
        <div class="foot">
            <a class="rt" href="pay_success.html?str=${str[0]}_${str[1]}">确定付款</a>
        </div>
    `);
})()
