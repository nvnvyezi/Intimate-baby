webpackJsonp([4],{"67UJ":function(t,e){},VlXw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("n5eY"),o={name:"bookInformationCatelog",data:function(){return{catelogResult:[],user_id:8e6,encryptKey:"37e81a9d8f02596e1b895d07c171d5c9",catelogList:"",cateList:"1~100章",maskJudge:!1,range:0}},computed:{bookId:function(){var t=this.$store.state.bookInfo.bookId;return t||(t=localStorage.getItem("bookId")),t},timestamp:function(){return Date.now()},catelogBox:function(){for(var t=[],e=0,a=this.catelogResult.length/100;e<a;e++)e===a-1?t.push(100*e+1+"~"+this.catelogResult.length+"章"):t.push(100*e+1+"~"+100*(e+1)+"章");return t}},mounted:function(){this.$store.dispatch({type:"hideFalse",bool:!1}),this.getCatelog()},methods:{rangeJudge:function(t){return t>=100*this.range&&t<100*(this.range+1)},show:function(){this.maskJudge=!0},triggerMaskG:function(t){t.target.classList.add("maskG");var e=t.target.parentNode.children;this.cateList=t.currentTarget.innerText;var a=t.currentTarget.getAttribute("index");this.range=Number(a);document.getElementsByClassName("catelogBox--content__list");for(var r=0,o=e.length;r<o;r++)r!=a&&e[r].classList.contains("maskG")&&e[r].classList.remove("maskG");this.maskJudge=!1},getCatelog:function(){var t=this;if(window.fetch){var e=Object(r.a)(this.bookId+""+this.timestamp+this.user_id+this.encryptKey);fetch("http://walden1.shuqireader.com/qswebapi/book/chapterlist?_=1526644058478",{method:"post",mode:"cors",body:"bookId="+this.bookId+"&user_id="+this.user_id+"&sign="+e+"&timestamp="+this.timestamp,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){200===e.status&&e.ok?e.json().then(function(e){Array.prototype.forEach.call(e.data.chapterList,function(e){Array.prototype.forEach.call(e.volumeList,function(e){var a={};a.chapterName=e.chapterName,a.contUrlSuffix=e.contUrlSuffix,t.catelogResult.push(a)})})}):console.error("Error",e)}).catch(function(t){console.error("Error: ",t)})}}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("header",{staticClass:"catelog--header"},[a("div",{staticClass:"catelog--header--list",on:{click:t.show}},[t._v(t._s(t.cateList))]),t._v(" "),a("i",{staticClass:"catelog--header--icon"})]),t._v(" "),a("div",{staticClass:"catelog--list"},[a("ul",{staticClass:"catelog--list__ul"},t._l(t.catelogResult,function(e,r){return t.rangeJudge(r)?a("router-link",{key:r,staticClass:"catelog--list__ul__li",attrs:{to:"bookchapter",tag:"li"}},[t._v(t._s(e.chapterName))]):t._e()}))]),t._v(" "),a("section",{directives:[{name:"show",rawName:"v-show",value:t.maskJudge,expression:"maskJudge"}],staticClass:"catelogBox",attrs:{id:"maskList"}},[a("div",{staticClass:"catelogBox--mask"}),t._v(" "),a("div",{staticClass:"catelogBox--content"},t._l(t.catelogBox,function(e,r){return a("div",{key:r,staticClass:"catelogBox--content__list",attrs:{index:r},on:{click:t.triggerMaskG}},[t._v(t._s(e)),a("i")])}))])])},staticRenderFns:[]};var s=a("VU/8")(o,n,!1,function(t){a("67UJ")},"data-v-3b0ba405",null);e.default=s.exports},n5eY:function(t,e,a){"use strict";e.a=n;var r=0,o=8;function n(t){return f(s(g(t),t.length*o))}function s(t,e){t[e>>5]|=128<<e%32,t[14+(e+64>>>9<<4)]=e;for(var a=1732584193,r=-271733879,o=-1732584194,n=271733878,s=0;s<t.length;s+=16){var i=a,g=r,f=o,m=n;r=d(r=d(r=d(r=d(r=u(r=u(r=u(r=u(r=l(r=l(r=l(r=l(r=c(r=c(r=c(r=c(r,o=c(o,n=c(n,a=c(a,r,o,n,t[s+0],7,-680876936),r,o,t[s+1],12,-389564586),a,r,t[s+2],17,606105819),n,a,t[s+3],22,-1044525330),o=c(o,n=c(n,a=c(a,r,o,n,t[s+4],7,-176418897),r,o,t[s+5],12,1200080426),a,r,t[s+6],17,-1473231341),n,a,t[s+7],22,-45705983),o=c(o,n=c(n,a=c(a,r,o,n,t[s+8],7,1770035416),r,o,t[s+9],12,-1958414417),a,r,t[s+10],17,-42063),n,a,t[s+11],22,-1990404162),o=c(o,n=c(n,a=c(a,r,o,n,t[s+12],7,1804603682),r,o,t[s+13],12,-40341101),a,r,t[s+14],17,-1502002290),n,a,t[s+15],22,1236535329),o=l(o,n=l(n,a=l(a,r,o,n,t[s+1],5,-165796510),r,o,t[s+6],9,-1069501632),a,r,t[s+11],14,643717713),n,a,t[s+0],20,-373897302),o=l(o,n=l(n,a=l(a,r,o,n,t[s+5],5,-701558691),r,o,t[s+10],9,38016083),a,r,t[s+15],14,-660478335),n,a,t[s+4],20,-405537848),o=l(o,n=l(n,a=l(a,r,o,n,t[s+9],5,568446438),r,o,t[s+14],9,-1019803690),a,r,t[s+3],14,-187363961),n,a,t[s+8],20,1163531501),o=l(o,n=l(n,a=l(a,r,o,n,t[s+13],5,-1444681467),r,o,t[s+2],9,-51403784),a,r,t[s+7],14,1735328473),n,a,t[s+12],20,-1926607734),o=u(o,n=u(n,a=u(a,r,o,n,t[s+5],4,-378558),r,o,t[s+8],11,-2022574463),a,r,t[s+11],16,1839030562),n,a,t[s+14],23,-35309556),o=u(o,n=u(n,a=u(a,r,o,n,t[s+1],4,-1530992060),r,o,t[s+4],11,1272893353),a,r,t[s+7],16,-155497632),n,a,t[s+10],23,-1094730640),o=u(o,n=u(n,a=u(a,r,o,n,t[s+13],4,681279174),r,o,t[s+0],11,-358537222),a,r,t[s+3],16,-722521979),n,a,t[s+6],23,76029189),o=u(o,n=u(n,a=u(a,r,o,n,t[s+9],4,-640364487),r,o,t[s+12],11,-421815835),a,r,t[s+15],16,530742520),n,a,t[s+2],23,-995338651),o=d(o,n=d(n,a=d(a,r,o,n,t[s+0],6,-198630844),r,o,t[s+7],10,1126891415),a,r,t[s+14],15,-1416354905),n,a,t[s+5],21,-57434055),o=d(o,n=d(n,a=d(a,r,o,n,t[s+12],6,1700485571),r,o,t[s+3],10,-1894986606),a,r,t[s+10],15,-1051523),n,a,t[s+1],21,-2054922799),o=d(o,n=d(n,a=d(a,r,o,n,t[s+8],6,1873313359),r,o,t[s+15],10,-30611744),a,r,t[s+6],15,-1560198380),n,a,t[s+13],21,1309151649),o=d(o,n=d(n,a=d(a,r,o,n,t[s+4],6,-145523070),r,o,t[s+11],10,-1120210379),a,r,t[s+2],15,718787259),n,a,t[s+9],21,-343485551),a=h(a,i),r=h(r,g),o=h(o,f),n=h(n,m)}return Array(a,r,o,n)}function i(t,e,a,r,o,n){return h((s=h(h(e,t),h(r,n)))<<(i=o)|s>>>32-i,a);var s,i}function c(t,e,a,r,o,n,s){return i(e&a|~e&r,t,e,o,n,s)}function l(t,e,a,r,o,n,s){return i(e&r|a&~r,t,e,o,n,s)}function u(t,e,a,r,o,n,s){return i(e^a^r,t,e,o,n,s)}function d(t,e,a,r,o,n,s){return i(a^(e|~r),t,e,o,n,s)}function h(t,e){var a=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(a>>16)<<16|65535&a}function g(t){for(var e=Array(),a=(1<<o)-1,r=0;r<t.length*o;r+=o)e[r>>5]|=(t.charCodeAt(r/o)&a)<<r%32;return e}function f(t){for(var e=r?"0123456789ABCDEF":"0123456789abcdef",a="",o=0;o<4*t.length;o++)a+=e.charAt(t[o>>2]>>o%4*8+4&15)+e.charAt(t[o>>2]>>o%4*8&15);return a}}});
//# sourceMappingURL=4.a57104f25f10f1584a48.js.map