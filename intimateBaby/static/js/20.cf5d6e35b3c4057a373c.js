webpackJsonp([20],{W7Ut:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"swipe",data:function(){return{time:2e3,sh:200,move:200,flag:0,endJudge:!0,lrJudge:!0,imgU:[],test:this.swipeData}},props:{swipeData:{type:Array,required:!0}},created:function(){console.log(this.swipeData,this.swipeData[0]);var t=this.swipeData[0];console.log(t),this.imgU=t},updated:function(){console.log(this.swipeData[0],this.test,this.test[0])},mounted:function(){console.log(this.swipeData[0],this.test,this.test[0]);var t=document.getElementById("sw"),e=document.getElementsByClassName("sc-img");t.setAttribute("style","height: "+this.sh+"px; width: "+100*(this.swipeData.length+2)+"%;");for(var s=0,a=e.length;s<a;s++)e[s].setAttribute("width","100%")},methods:{next:function(){var t=this;if(this.lrJudge){this.lrJudge=!1,this.move+=this.sw,this.flag++;var e=document.getElementById("sw");document.getElementsByClassName("sc-img")[0];e.style.transform="translate("+-this.move+"px)",e.style.transition="all 2s ease",this.endJudge&&(this.endJudge=!1,e.addEventListener("transitionend",function(){t.lrJudge=!0,t.flag==t.swipeData.length&&(t.flag=0,t.move=t.sw,e.style.transition="all 0s ease",e.style.transform="translate("+-t.move+"px)"),-1==t.flag&&(t.flag=t.swipeData.length,t.move=(t.swipeData+1)*t.sw,e.style.transition="all 0s ease",e.style.transform="translate("+-t.move+"px)")}))}},previous:function(){var t=this;if(this.lrJudge){this.lrJudge=!1,this.move-=this.sw,this.flag--;var e=document.getElementById("sw");document.getElementsByClassName("sc-img")[0];e.style.transform="translate("+-this.move+"px)",e.style.transition="all 2s ease",this.endJudge&&(this.endJudge=!1,e.addEventListener("transitionend",function(){t.lrJudge=!0,t.flag==t.swipeData.length&&(t.flag=0,t.move=t.sw,e.style.transition="all 0s ease",e.style.transform="translate("+-t.move+"px)"),-1==t.flag&&(t.flag=t.swipeData.length,t.move=t.swipeData.length*t.sw,e.style.transition="all 0s ease",e.style.transform="translate("+-t.move+"px)")}))}}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swipe",attrs:{id:"s"}},[s("div",{staticClass:"swipe-container",attrs:{id:"sw"}},t._l(t.swipeData,function(t,e){return s("section",{key:e,staticClass:"sc-img"},[s("img",{staticClass:"img",attrs:{src:t.imgUrl,alt:t.linkText}})])})),t._v(" "),s("button",{on:{click:t.previous}},[t._v("L")]),t._v(" "),s("button",{on:{click:t.next}},[t._v("R")])])},staticRenderFns:[]};var n=s("VU/8")(a,i,!1,function(t){s("rLnq")},"data-v-52166d48",null);e.default=n.exports},rLnq:function(t,e){}});
//# sourceMappingURL=20.cf5d6e35b3c4057a373c.js.map