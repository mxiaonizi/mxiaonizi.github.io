var btn=document.getElementById("btn");
var text1=document.getElementById("text1");
var result=document.querySelector(".result");
var result_total=document.querySelector(".result_total");
var script=null;
var str="";
var count=10;//每页显示信息的数量
var subtitle="";//副标题
var posY=0;//背景图Y轴的偏移量
var nowPage=1;//当前页码
var pageLen=0;//总页码=Math.ceil(总量/每页显示的个数)
var pageMain=document.getElementById("page");
btn.onclick=function(){
	pageMain.innerHTML="";
	nowPage=1;//每次点击的时候从第一页开始展示
	show();
}
document.onkeydown=function(ev){
	var e=ev||event;
	if(e.keyCode==13){//如果按下的是回车键，并且焦点在搜索框上
		if(document.activeElement.id=="text1"){
			e.preventDefault()
			pageMain.innerHTML="";
			nowPage=1;//每次点击的时候从第一页开始展示
			show();
		}
	}
	
}
function show(){
	script=document.createElement("script");
	script.src="https://api.douban.com/v2/book/search?q="+text1.value+"&callback=fn&start="+(nowPage-1)*count+"&count="+count;
	document.body.appendChild(script);
}
function fn(data){
	console.log(data)
	str="";
	document.body.removeChild(script);
//	求总页数
	pageLen=Math.ceil(data.total/count);
//	查询信息统计
	if(data.total==0){
		result_total.innerHTML="没有查询到结果"
	}else{
		result_total.innerHTML="搜索结果"+(data.start+1)+"-"+(data.start+data.books.length)+"，共"+data.total;
		page({
			id:"page",
			nowNum:nowPage,
			allNum:pageLen
		})//点击搜索的时候调用page函数，生成页码
		createBook(data.books);
	}
}
function createBook(data){
	for(var i=0;i<data.length;i++){
//	标题:判断有没有副标题,有就加上
		data[i].subtitle?subtitle=":"+data[i].subtitle:data[i].subtitle;
//	背景图Y轴的偏移量
		posY=Math.ceil((data[i].rating.average*11-110)/11)*11;
//	根据查询到的数据生成li
		str+='<li class="item clearfix"><a href="javascript:;" class="fl img"><img src='+data[i].image+' /></a><div class="book_info fl"><a href="javascript" class="title">'+data[i].title+subtitle+'</a><p class="au_pre"><span class="author">'+data[i].author[0]+' </span> / <span class="press">'+data[i].publisher+'</span> / <span class="date">'+data[i].pubdate+'</span> / <span class="price">'+data[i].price+'</span></p><p class="comment"><span class="star bg" style="background-position:0px '+posY+'px"></span><span class="score">'+data[i].rating.average+'</span><span class="">('+data[i].rating.numRaters+'人评价)</span></p><a href="javascript:;" class="note">纸质版 70.00 元起</a></div></li>';
	}
	result.innerHTML=str;
}
//	生成页码
function page(opt){
	var obj=document.getElementById(opt.id);
	var nowNum=opt.nowNum||1;
	var allNum=opt.allNum||5;
	var callback=opt.callback||function(){}
	if(nowNum>=4&&allNum>5){//首页
		var a=document.createElement("a");
		a.href="#page"+1;
		a.innerHTML="首页";
		obj.appendChild(a);
	}
	if(nowNum>=2){//上一页
		var a=document.createElement("a");
		a.href="#page"+(nowNum-1);
		a.innerHTML="上一页";
		obj.appendChild(a);
	}
	if(allNum<=5){//总页数小于5
		for(var i=1;i<=allNum;i++){
			var a=document.createElement("a");
			a.href="#page"+i;
			if(nowNum==i){
				a.className="active"
			}
			a.innerHTML=i;
			obj.appendChild(a);
		}
	}else{//总页数大于5
		for(var i=1;i<=5;i++){
			var a=document.createElement("a");
			if(nowNum==1||nowNum==2){//当前页为1、2的时候
				a.href="#page"+i;
				if(nowNum==i){
					a.className="active";
				}
				a.innerHTML=i;
			}else if((allNum-nowNum)==0||(allNum-nowNum)==1){//处理最后两页
				a.href="#page"+(allNum-5+i);
				if(allNum-nowNum==0&&i==5){//最后一页
					a.className="active";
				}else if(allNum-nowNum==1&&i==4){//倒数第二页
					a.className="active";
				}
				a.innerHTML=allNum-5+i;
			}else{
				a.href="#page"+(nowNum-3+i);
				if(i==3){
					a.className="active"
				}
				a.innerHTML=nowNum-3+i;
			}
			obj.appendChild(a);
		}
	}
	if(allNum-nowNum>=1){//下一页
		var a=document.createElement("a");
		a.href="#page"+(nowNum+1);
		a.innerHTML="下一页";
		obj.appendChild(a);
	}
	if(allNum-nowNum>=3&&allNum>5){//尾页
		var a=document.createElement("a");
		a.href="#page"+allNum;
		a.innerHTML="尾页";
		obj.appendChild(a);
	}
//	给所有的a添加点击事件
	var oA=obj.getElementsByTagName("a");
	for(var i=0;i<oA.length;i++){
		oA[i].onclick=function(){
			nowPage=parseInt(this.getAttribute("href").substr(5));
			obj.innerHTML="";
			show();
			return false;
		}
	}
}


