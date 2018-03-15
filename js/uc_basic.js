(()=>{
    //要求用户在线事件
    if(!sessionStorage["uname"]){
        $("#uc_aside").html(`<img src="img/loading.gif" alt="加载中..." >`);
        alert("请先登录！");
        location="login.html";
        return;
    }
    //根据地址栏信息判断页面所处模块
    if(location.search){
        var id=location.search.split("=")[1];
        $("#"+id).children("dt").addClass("hover");
        $("[data-id="+id+"]").css("display","block");
    }else{
        $("#basic").children("dt").addClass("hover");
        $("[data-id=basic]").css("display","block");
    }
    //初始化加载页面信息
    $.get(
        "data/uc_basic/uc_list.php",
        function(output){
            //console.log(output);
            var basic=output.basic[0];
            var html="";
            html+=`
                <p>
						<a href="#" class="active">我的信息</a>
					</p>
					<form id="myform">
						<p>
							<span>我的头像：</span>
							<img src="${basic.avatar}">
							<a href="#" data-action='upload'>更改头像</a>
						</p>
						<p>
							<span>用户名：</span>
							<input type="text" value="${basic.user_name}" name="user_name">
						</p>
						<p class="sex">
							<span>性别：</span>
							<a href="#" id="boy" data-gender="${basic.gender}" class="${basic.gender==1?'select':'un_select'}"></a>男
							<a href="#" id="girl" data-gender="${basic.gender}" class="${basic.gender==0?'select':'un_select'}"></a>女
						</p>
						<p>
							<span>绑定电话：</span>
							<input type="text" value="${basic.phone}" name="phone">
						</p>
						<p>
							<span>绑定邮箱：</span>
							<input type="text" value="${basic.email}" name="email">
						</p>
						<input type="button" value="保存更改" id="btn_save">
					</form>
            `;
            $("[data-id=basic]").html(html);
            html="";
            var address=output.address;
            $.each(address,function(i,a){
                //console.log(a);
                html+=`
              <div>
                <form class="form-adrs" id="${a.aid}">
                <p>
                    收货人姓名：<input type="text" value="${a.receiver}" name="receiver" disabled/>
                    收货人手机：<input name='cellphone' type="text" value="${a.cellphone}" disabled/>
                </p>
                <p>
                    省份：<input type="text" name="province" value="${a.province}" disabled/>
                    市级：<input type="text" name="city" value="${a.city}" disabled/>
                    区域：<input type="text" name="county" value="${a.county}" disabled/>
                    门牌号：<input type="text" name="address" value="${a.address}" disabled/>
                </p>
                <p class="code">
                    邮编：<input type="text" name="postcode" value="${a.postcode}" disabled/>
                    <label for="default" class="address"><input type="checkbox" id="default" ${a.is_default=='1'?'checked':''} disabled />默认地址</label>
                </p>
                <p>
                    <a href="#" data-edit="${a.aid}" class="editadrs">编辑</a>
                    <a href="#" data-del="${a.aid}" class="deladrs">删除</a>

                    <a href="#" data-sure="${a.aid}" class="sure" style="display: none">确定</a>
                    <a href="#" data-cancel="${a.aid}" class="cancel" style="display: none">取消</a>
                </p>
                </form>
            </div>
            `;
            });
            $("#addadrs").before(html);
        }
    );
// 侧边栏点击切换事件
    $("#uc_aside").on("click","b",function(e){
        var tar=$(e.target);
        //console.log(tar);
        $("#box section").css("display","none");
        $("#uc_aside dt.hover").removeClass("hover");
        if(tar.parents("dl").attr("id")=="basic"){
            $("[data-id=basic]").css("display","block");
            tar.parents("dt").addClass("hover");
        }
        if(tar.parents("dl").attr("id")=="discount"){
            $("[data-id=discount]").css("display","block");
            tar.parents("dt").addClass("hover");
        }
        if(tar.parents("dl").attr("id")=="addresses"){
            $("[data-id=addresses]").css("display","block");
            tar.parents("dt").addClass("hover");
        }
        if(tar.parents("dl").attr("id")=="collect"){
            var i=location.href.lastIndexOf("/");
            var url=location.href.slice(0,i);
            location=url+"/my_collect.html";
        }
    });

    // 拖拽移动弹出框
    var L,T,B,_this=$("html");
    $(".drag_upload").mousedown(function(e){
        _this=$(e.target).parents(".drag_upload");
        if(_this.attr("id")=="upload"){
            _this=$("#upload");
        }else{
            _this=$("#add-address");
        }
        var ex=e.clientX,ey=e.clientY;
        var offset=_this.offset();
        var ol=offset.left,ot=offset.top;
        L=ex-ol,T=ey-ot;
        B=true;
    });
    $("body,html").mousemove(function(e){
        if(B){
            var ex=e.clientX,ey=e.clientY;
            var t=ey-T,l=ex-L;
            if(l<0){
                l=0;
            }
            if(l>innerWidth-_this.width()){
                l=innerWidth-_this.width();
            }
            if(t<0){
                t=0;
            }
            _this.offset({top:t,left:l});
        }
    });
    _this.mouseup(function(e){
        B=false;
    })

    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        document.getElementById("freader").innerHTML = "当前浏览器不支持FileReader接口,请尝试拖拽上传";
    }
    //判断浏览器是否支持拖拽上传 DataTransfer
    if (typeof DataTransfer == 'undefined') {
        document.getElementById("drag-img").innerHTML="版本太低，无法拖拽上传";
    }
    //拖拽上传功能
    $(document).on({
        dragleave:function(e){e.preventDefault();},
        drop:function(e){e.preventDefault();},
        dragenter:function(e){e.preventDefault();},
        dragover:function(e){e.preventDefault()}
    });

    //文件上传功能
    $("#main").on("click","[data-action='upload']",function(e){
        $("#bg-mask").height($("html,body").height());
        $("#bg-mask").width(outerWidth);
        $("#bg-mask").show(500);
        $("#upload").show(500);
    });
    //取消上传
    $("#btn_res").click(function(){
        $("#upload").hide(500);
        $("#bg-mask").hide(500);
    });

    var fd=new FormData();

    //表单的file读取文件
    $("#avatar").change(function(){
        var file = $(this).get(0).files[0];
        var reader = new FileReader();
        reader.onloadstart = function (e) {
            console.log("开始读取....");
        }
        reader.onprogress = function (e) {
            console.log("正在读取中....");
        }
        reader.onabort = function (e) {
            console.log("中断读取....");
        }
        reader.onerror = function (e) {
            console.log("读取异常....");
        }
        reader.onload = function (e) {
            console.log("成功读取....");
            $("#drag-img").html(`<img src="${e.target.result}"  width="120"/>`);
        }
        reader.readAsDataURL(file);
        var formElement = document.getElementById("form-avatar");//获取form
        fd = new FormData(formElement);
    });

    //拖拽事件读取文件
    var drag_area=document.querySelector("#drag-img");
    drag_area.ondrop=function(e) {
        e.preventDefault();
        var fileList = e.dataTransfer.files;
        if (fileList.length == 0) {
            alert("没有读取到上传图片");
            return;
        }
        var rs = fileList[0].type.indexOf("image");
        if (rs == -1) {
            alert("只能上传图片格式类型");
            return;
        }
        var size = Math.floor(fileList[0].size / 1024);
        if (size > 512) {
            alert("上传图片太大，不能超过512KB");
            return;
        }
        var img = window.webkitURL.createObjectURL(fileList[0]);
        var fileName = fileList[0].name;
        $("#drag-img").html(`<img src="${img}"  width="120" alt="${fileName}"/>`);
        fd.append("avatar",fileList[0]);
    }

    //点击上传图片至服务端
    $("#btn_sub").click(function(e){
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.status===200&&xhr.readyState===4){
                console.log(xhr.responseText);
                alert(JSON.parse(xhr.responseText).msg);
                if(JSON.parse(xhr.responseText).msg=="上传成功"){
                    location.href="uc_basic.html?id=basic";
                }
            }
        };
        xhr.open("POST", "data/uc_basic/uc_upload.php",true);
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        xhr.send(fd);
    });
    //性别框样式 事件
    $("[data-id=basic]").on("click","#boy,#girl",function(e){
        e.preventDefault();
        if($(e.target).attr("id")=="boy"){
            $("#boy").addClass("select").removeClass("un_select");
            $("#girl").addClass("un_select").removeClass("select");
        }else{
            $("#girl").addClass("select").removeClass("un_select");
            $("#boy").addClass("un_select").removeClass("select");
        }
    });
    //修改用户信息 事件
    $("[data-id=basic]").on("click","#btn_save",function(){
        var str="&gender="+$(".select").data("gender");
        str=$("#myform").serialize()+str+"&update_basic=1";
        $.post(
            "data/uc_basic/uc_list.php",
            str,
            function(data){
                alert(data.msg);
                location.href="uc_basic.html?id=basic";
            }
        );
    });

    //删除地址 删除按钮事件
    $("#address").on("click",".deladrs",function(e){
        e.preventDefault();
        var aid=$(this).data("del");
        $.get(
            "data/uc_basic/uc_list.php",
            {aid,delete_address:1},
            function(data){
                console.log(data);
                alert(data.msg);
                location.href="uc_basic.html?id=addresses";
            }
        );
    });
    //修改地址 编辑按钮事件
    $("#address").on("click",".editadrs",function(e){
        var id=$(e.target).data("edit");
        //console.log($("form#"+id));
        e.preventDefault();
        $("form#"+id+" input").each(function(i,v){
            $(v).removeAttr("disabled");
            $(v).css("border","1px solid #fe3227");
        });
        $("form#"+id+" .editadrs").css("display","none");
        $("form#"+id+" .deladrs").css("display","none");
        $("form#"+id+" .sure").css("display","inline-block");
        $("form#"+id+" .cancel").css("display","inline-block");
    });
    //修改地址 取消按钮事件
    $("#address").on("click",".cancel",function(e){
        e.preventDefault();
        $(".editadrs").css("display","inline-block");
        $(".deladrs").css("display","inline-block");
        $(".sure").css("display","none");
        $(".cancel").css("display","none");
        $("#address input").each(function(i,v){
            $(v).attr("disabled","disabled");
            $(v).css("border","0");
        });
        location.href="uc_basic.html?id=addresses";
    });
    //修改地址 确定按钮事件
    $("#address").on("click",".sure",function(e){
        e.preventDefault();
        var aid=$(this).data("sure");
        if($("input[id=default]").is(":checked")) var is_default=1;
        else var is_default=0;
        str=$(this).parents(".form-adrs").serialize()+"&update_address=1"+"&is_default="+is_default+"&aid="+aid;
        //console.log(str);
        $.post(
            "data/uc_basic/uc_list.php",
            str,
            function(data){
                console.log(data);
                alert(data.msg);
                location.href="uc_basic.html?id=addresses";
            }
        );
    });
    //新增地址事件
    $("#address").on("click","#addadrs",function(e){
        $("#bg-mask").height($("html,body").height());
        $("#bg-mask").width(outerWidth);
        $("#bg-mask").show(500);
        $("#add-address").show(500);
    });
    //添加地址弹出框 取消按钮事件
    $("#btn_res_address").click(function(){
        $("#bg-mask").hide(500);
        $("#add-address").hide(500);
    });
    //添加地址弹出框 提交按钮事件
    $("#form-address").on("click","#btn_sub_address",function(e){
        e.preventDefault();
        if($("input[id=is_default]").is(":checked")) var is_default=1;
        else var is_default=0;
        str=$("#form-address").serialize()+"&insert_address=1"+"&is_default="+is_default;
        //console.log(str);
        $.post(
            "data/uc_basic/uc_list.php",
            str,
            function(data){
                console.log(data);
                alert(data.msg);
                location.href="uc_basic.html?id=addresses";
            }
        );
    });
})();
