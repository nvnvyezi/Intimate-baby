webpackJsonp([16],{lBly:function(e,t){},wZIX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("2cSH");var o={name:"category",computed:{listName:{get:function(){return localStorage.getItem("listName")||"分类"},set:function(e){console.log(e)}}},methods:{back:function(){this.$router.go(-1)}},watch:{$route:function(e){"/cate"===e.path&&localStorage.setItem("listName","分类")}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("nav",{staticClass:"box--nav"},[a("div",{staticClass:"box--nav--header"},[a("div",{on:{click:e.back}},[e._v("↤")]),e._v(" "),a("div",[a("span",[e._v(e._s(e.listName))])]),e._v(" "),a("router-link",{attrs:{to:"/",tag:"div"}},[e._v("H")])],1)]),e._v(" "),a("keep-alive",[e.$route.meta.keepAlive?a("router-view"):e._e()],1),e._v(" "),e.$route.meta.keepAlive?e._e():a("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")(o,n,!1,function(e){a("lBly")},"data-v-0c6980f6",null);t.default=i.exports}});
//# sourceMappingURL=16.4a12f36bc62950825bf4.js.map