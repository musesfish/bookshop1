/*加载页尾*/
(()=>{
	ajax("get","footer.html","","text")
		.then(html=>
			document.getElementById("footer").innerHTML=html
		)
})()