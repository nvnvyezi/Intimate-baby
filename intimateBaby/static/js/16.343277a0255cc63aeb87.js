webpackJsonp([16],{VlXw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"bookInformationCatelog",data:function(){return{cateList:"1~100章",maskJudge:!1,range:0,catelogResult:[],catelogResult1:[],len:0}},computed:{bookId:function(){var t=this.$store.state.bookInfo.bookId;return t||(t=localStorage.getItem("bookId")),t},timestamp:function(){return Date.now()},catelogBox:function(){for(var t=[],e=0,a=this.catelogResult.length;e<a;e++)e===a-1?t.push(100*e+1+"~"+(this.len-1)+"章"):t.push(100*e+1+"~"+100*(e+1)+"章");return t}},mounted:function(){var t=JSON.parse(localStorage.bookCatelog);this.len=t.length;for(var e=[],a=0,s=t.length;a<s;a++)0==a||a%100!=0&&a!=s-1||(this.catelogResult.push(e),e=[]),t[a].i=a,e.push(t[a]);this.catelogResult1=this.catelogResult[0]},methods:{reversal:function(){this.catelogResult1.reverse()},showChapter:function(t){var e=parseInt(t.currentTarget.getAttribute("index"));console.log(e),this.$store.dispatch({type:"triggerPage",page:e}),localStorage.setItem("chapterPage",e)},show:function(){this.maskJudge=!0},triggerMaskG:function(t){if("catelogBox--content__list"==t.target.className){t.target.classList.add("maskG");var e=t.target.parentNode.children;this.cateList=t.target.innerText;var a=t.target.getAttribute("index");a=Number(a),this.catelogResult1=this.catelogResult[a];document.getElementsByClassName("catelogBox--content__list");for(var s=0,o=e.length;s<o;s++)s!=a&&e[s].classList.contains("maskG")&&e[s].classList.remove("maskG")}this.maskJudge=!1}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("header",{staticClass:"catelog--header"},[a("div",{staticClass:"catelog--header--list",on:{click:t.show}},[t._v(t._s(t.cateList))]),t._v(" "),a("i",{staticClass:"catelog--header--icon",on:{click:t.reversal}})]),t._v(" "),a("div",{staticClass:"catelog--list"},[a("ul",{staticClass:"catelog--list__ul"},t._l(t.catelogResult1,function(e,s){return a("router-link",{key:s,staticClass:"catelog--list__ul__li",attrs:{to:"bookchapter",tag:"li",index:e.i},nativeOn:{click:function(e){return t.showChapter(e)}}},[t._v(t._s(e.chapterName))])}))]),t._v(" "),a("section",{directives:[{name:"show",rawName:"v-show",value:t.maskJudge,expression:"maskJudge"}],staticClass:"catelogBox",attrs:{id:"maskList"},on:{click:t.triggerMaskG}},[a("div",{staticClass:"catelogBox--mask"}),t._v(" "),a("div",{staticClass:"catelogBox--content"},t._l(t.catelogBox,function(e,s){return a("div",{key:s,staticClass:"catelogBox--content__list",attrs:{index:s}},[t._v(t._s(e)),a("i")])}))])])},staticRenderFns:[]};var i=a("VU/8")(s,o,!1,function(t){a("ZiLi")},"data-v-344ac080",null);e.default=i.exports},ZiLi:function(t,e){}});
//# sourceMappingURL=16.343277a0255cc63aeb87.js.map