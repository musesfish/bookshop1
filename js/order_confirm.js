(()=>{
    sessionStorage.setItem("first","t");
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }
   var str=JSON.parse("["+decodeURI(location.search.split("=")[1].slice(0,-1))+"]");
    console.log(str);
    $.get("data/order/confirm_order.php",{str},function(data){
        if(data.code=="0"){
            alert(data.msg);
            var i=location.href.lastIndexOf("/");
            var url=location.href.slice(0,i);
            location=url+"/uc_basic.html?id=addresses";
        }else{
            //console.log(data);
            var address=data.address;
            var products=data.products;
            //console.log(address);
            // console.log(products);
            var html=`
            <span>${address[0].receiver}</span>
            &nbsp;&nbsp;&nbsp;${address[0].province}
            ${address[0].city} ${address[0].county} ${address[0].address}号&nbsp;&nbsp;
            ${address[0].cellphone}
        `;
            $("#default-adrs").html(html);
            var html="";
            var counts=0,totalprice=0;
            $.each(products,function(i,v){
                counts += parseInt(v.count);
                totalprice += v.price * v.count;
            });
            totalprice=totalprice.toFixed(2);
            for(var i=0;i<products.length;i++){
                var product=products[i];
                // console.log(product);
                html+=`
            <div class="body">
                <div class="information">
                    <a href="product_details.html?bid=${product.bid}">
                        <img src="${product.md}">
                    </a>
                    <div>
                        <p>${product.subtitle}</p>
                    </div>
                </div>
                <div class="price">
                    <a href="index.html" class="home">心灵驿站</a>
                    ￥${product.price}
                </div>
                <div class="number">
                    X${product.count}
                </div>
                <div class="total">
                    ￥${product.count*product.price}
                </div>
            </div>
            `;
            }
            html+=`
            <div class="foot">
                    <a href="cart.html" class="lf"> &lt;&lt;&nbsp;前往购物车 </a>
                    <p class="rt">
                        共<b>${counts}</b>件商品<span>合计(不含运费):</span><b>${totalprice}</b><b>元</b>
                        <a href="payment.html?str=${product.aid}_${totalprice}">付款并确认</a>
                    </p>
                </div>
            `;
            sessionStorage.setItem("first","f");
            $(".head").after(html);
        }
     });
})();
