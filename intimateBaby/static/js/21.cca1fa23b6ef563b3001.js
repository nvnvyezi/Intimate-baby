webpackJsonp([21],{iWr9:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("P9l9"),a={name:"bookSeniorityHome",data:function(){return{listName:"排行",data:[]}},created:function(){var t=this;Object(s.u)(function(e){e.forEach(function(e,i){if(i%2==0){var s={};s.title=e.content.title,s.text=e.content.desc,s.type=e.content.url.replace("#!/cid/","")[0],t.data.push(s)}})})},methods:{back:function(){this.$router.go(-1)},changeProp:function(t){var e=t.currentTarget.getAttribute("type"),i=t.currentTarget.getAttribute("data-title");this.$store.dispatch({type:"triggerType",typ:e}),this.$store.commit({type:"changeMoreBookTitle",moreBookTitle:i}),localStorage.setItem("seniorityType",e),localStorage.setItem("MoreBookTitle",i)}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"seniority"},[i("nav",{staticClass:"seniority--nav"},[i("div",{staticClass:"seniority--nav--header"},[i("div",{staticClass:"header-iconL",on:{click:t.back}}),t._v(" "),i("div",[i("span",[t._v(t._s(t.listName))])]),t._v(" "),i("router-link",{staticClass:"header-iconR",attrs:{to:"/",tag:"div"}})],1)]),t._v(" "),i("div",{staticClass:"seniority__list"},[i("ul",{staticClass:"seniority__list__ul"},t._l(t.data,function(e,s){return i("router-link",{key:s,staticClass:"seniority__list__ul__li",attrs:{to:"senioritylist",tag:"li","data-title":e.title,type:e.type},nativeOn:{click:function(e){return t.changeProp(e)}}},[i("i"),t._v(" "),i("div",{staticClass:"seniority__list--section"},[i("h3",{staticClass:"seniority__list--section--h3"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"seniority__list--section--p"},[t._v(t._s(e.text))])])])}))])])},staticRenderFns:[]};var r=i("VU/8")(a,n,!1,function(t){i("lRyU")},"data-v-048d726c",null);e.default=r.exports},lRyU:function(t,e){}});
//# sourceMappingURL=21.cca1fa23b6ef563b3001.js.map