function ajax(method,url,postStr,dataType="json",trues=true){
	return new Promise((resolve,reject)=>{
		var xhr=(function(){
			if(window.XMLHttpRequest)
				return new XMLHttpRequest;
			else
				return new ActiveXObject("Microsoft.XMLHttp");
		})()
		xhr.open(method,url,trues);
		if(method=="post"){
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(url.indexOf(".php")!=-1&&dataType.toLowerCase()=="json"){
						//console.log(xhr.responseText);
						resolve(JSON.parse(xhr.responseText));
					}else{
					//	console.log(xhr.responseText);
						resolve(xhr.responseText);
					}
				}else{
					reject("ajax出错了"+xhr.status);
				}
			}
		}
		xhr.send(postStr);
	})
}