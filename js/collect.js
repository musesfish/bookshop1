(()=>{
    if(!sessionStorage["uname"]){
        alert("请先登录！");
        location="login.html";
    }else {
        $.ajax({
            type: "GET",
            url: "data/collect/list.php",
            success: function (data) {
                //console.log(data);
                var html = "";
                $.each(data.data, function (i, l) {
                    html += `
           <div id="${l.lid}" class="clleo">
                <a href="product_details.html?bid=${l.product_id}" title="查看详情"><img src="${l.md}"/></a>
                <div>
                    <a class="title" href="product_details.html?bid=${l.product_id}" title="查看详情">${l.subtitle}</a>
                    <p class="price"><span>${l.price}</span>定价<span>${l.fixprice}</span></p>
                </div>
                <div data-id="mask" id="${l.lid}"></div>
            </div>
            `;
                });
                $(".prolis").html(html);
                $("#total").html(data.count);
                $("#main").on("click", "#manageA,.clleo", function (e) {
                    //e.preventDefault();
                    if ($(e.target).data("num") == "0") {
                        $(e.target).css({"background": "red", "color": "white"});
                        $(e.target).html("退出管理");
                        $("#delete").css("display", "block");
                        $("[data-id=mask]").addClass("mask");
                        $("#manageA").data("num", "1");
                        return;
                    }
                    if ($(e.target).data("num") == "1") {
                        $(e.target).css({"background": "#fff", "color": "#636363"});
                        $(e.target).html("批量管理");
                        $("#delete").css("display", "none");
                        $("[data-id=mask]").removeClass("mask");
                        $("#manageA").data("num", "0");
                        $(".clleo").css("border", "1px solid silver");
                    }
                    if (e.target.className == "mask selected") {
                        $(e.target).removeClass("selected");
                        $(e.target).parent().css("border", "1px solid silver");
                        return;
                    }
                    if (e.target.className == "mask") {
                        $(e.target).addClass("selected");
                        $(e.target).parent().css("border", "1px solid red");
                        $("#delete.php").css({"border": "1px solid red", "color": "red"});
                    }
                });
                $("#delete").click(function () {
                    var $masks = $(".prolis .mask.selected");
                    var ids = [];
                    $.each($masks, function (i, l) {
                        ids.push(l.id.toString());
                    });
                    ids = JSON.stringify(ids).slice(1, -1);
                    var rs = window.confirm("您确定删除选中的收藏商品吗？");
                    if (rs) {
                        $.post(
                            "data/collect/delete.php",
                            {ids},
                            function (data) {
                                alert(data.msg);
                                location.reload();
                            }
                        );
                    }
                });
            }
        });
    }
})();
