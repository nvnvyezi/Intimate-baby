webpackJsonp([12],{GiJC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("P9l9"),o={name:"bookChapter",props:{color:{type:String,required:!0,default:"#D5EFD2"},sizeFont:{type:Number,required:!0,default:2}},data:function(){return{chapterName:"",startX:0,startY:0,flag:500,clickJudge:!1,p:0}},computed:{bookName:function(){var t=this.$store.state.bookInfo.bookName;return t||(t=localStorage.getItem("bookName")),t},authorName:function(){var t=this.$store.state.bookInfo.authorName;return t||(t=localStorage.getItem("authorName")),t}},mounted:function(){localStorage.historybookName!=this.bookName||localStorage.historyauthorName!=this.authorName?(this.changePage(0),this.getChapter(0)):this.getChapter(localStorage.chapterPage)},methods:{changePage:function(t){this.$store.dispatch({type:"triggerPage",page:t}),localStorage.chapterPage=t},test:function(t){if(!this.clickJudge){t.stopPropagation();try{var e=document.documentElement.offsetWidth,a=localStorage.chapterPage,r=t.clientX;t.target===t.currentTarget.firstChild&&r<=100?a>0?(this.clickJudge=!0,--a,this.changePage(a),this.getChapter(a)):(this.$emit("showWrong","当前已经是第一章"),thi.changePage(0)):t.target!=t.currentTarget.firstChild&&r<=100&&(t.target.nextSibling&&t.target.nextSibling.nextSibling&&(t.target.nextSibling.nextSibling.style.display="none"),t.target.previousSibling.style.transform="translate(0px, 0px)",t.target.previousSibling.style.display="block"),t.target===t.currentTarget.lastChild&&r>=e/2+60?(console.log("别了准备下一张"),a<localStorage.getItem("chapterSize")-1?(this.clickJudge=!0,++a,this.changePage(a),this.getChapter(a)):(this.$emit("showWrong","当前已经是最后一章"),this.changePage(localStorage.getItem("chapterSize")-1))):t.target!=t.currentTarget.lastChild&&r>=e/2+60&&(t.target.previousSibling&&t.target.previousSibling.previousSibling&&(t.target.previousSibling.previousSibling.style.display="none"),t.target.style.transform="translate("+-e+"px, 0px)",t.target.nextSibling.style.display="block")}catch(t){this.$emit("showWrong","获取出错")}}},getChapter:function(t){var e=this;document.getElementsByClassName("chapter")[0].innerHTML='<div class="chapter--content" style="position: absolute;width: 95vw;left: 50%;margin-left: -47.5vw;ransition: transform .5s ease;"></div>',this.$emit("showWrong","正在获取"),Object(r.j)(this.bookName,this.authorName,t,function(t){t.err?e.$emit("showWrong",t.data):(e.chapterName=t.chapter,e.$emit("changeCatelog",e.chapterName),e.handleText(t.text),e.clickJudge=!1,e.$emit("reduction"))})},handleText:function(t){var e=document.getElementsByClassName("chapter")[0],a=document.getElementsByClassName("chapter--content")[0],r=document.createElement("div"),o=document.documentElement.offsetHeight||document.body.offsetHeight;a.style.zIndex=this.flag,a.style.backgroundColor="#"+this.color,this.flag--,e.appendChild(r);for(var i=0,s=t.length;i<s;i++){if(r.innerHTML=t.substring(0,i),!(r.offsetHeight<=o-50)){e.removeChild(r),this.handleTextOver(t,i-1,s,o);break}a.innerHTML=t.substring(0,i),i==s-1&&e.removeChild(r)}},handleTextOver:function(t,e,a,r){var o=document.createElement("div"),i=document.getElementsByClassName("chapter")[0];o.setAttribute("data-flag",this.flag),o.style.zIndex=this.flag,o.style.position="absolute",o.style.width="95vw",o.style.left="50%",o.style.marginLeft="-47.5vw",o.style.backgroundColor="#"+this.color,o.style.transition="transform .5s ease",o.className="chapter--content",this.flag--,i.appendChild(o);for(var s=e;s<a;s++){if(o.innerHTML=t.substring(e,s),!(o.offsetHeight<=r-10)){o.innerHTML=t.substring(e,s-1),o.style.height=r+"px",this.handleTextOver(t,s-1,a,r);break}s==a-1&&(o.style.height=r+"px")}}},watch:{color:function(t){var e=document.getElementsByClassName("chapter"),a=document.getElementsByClassName("chapter--content");e[0].style.backgroundColor="#"+this.color;for(var r=0;r<a.length;r++)a[r].style.backgroundColor="#"+this.color}},beforeDestroy:function(){localStorage.setItem("historybookName",this.bookName),localStorage.setItem("historyauthorName",this.authorName)}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chapterBox",style:{fontSize:this.sizeFont+"rem"}},[e("div",{staticClass:"chapter",on:{click:this.test}})])},staticRenderFns:[]};var s=a("VU/8")(o,i,!1,function(t){a("Yvk+")},"data-v-1d90ecbd",null);e.default=s.exports},"Yvk+":function(t,e){}});
//# sourceMappingURL=12.00668685b7dd138de491.js.map