webpackJsonp([3],{"5aHD":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("P9l9"),o={components:{loading:s("cHIW").a},name:"list",data:function(){return{list:[],nameFrontNode:null,wordsFrontNode:null,sortFrontNode:null,headerList:[],middleList:[{words:"",name:"全部"},{words:"1",name:"20万字"},{words:"2",name:"20-100万字"},{words:"3",name:"100万字以上"}],footList:[{sort:"monthHot",name:"最热"},{sort:"updateTime",name:"最新"},{sort:"",name:"完结"}],page:1,loadJudge:!0,listJudge:!0,flag:0,name:""}},computed:{firstCate:{get:function(){var t=this.$store.state.bookCategory.firstCate;return t||(t=localStorage.getItem("firstCate")),t},set:function(t){this.$store.dispatch({type:"triggerSecond",firstCate:t}),localStorage.firstCate=t}},cid:{get:function(){var t=localStorage.getItem("cid");return t||(t=this.$store.state.bookCategory.cid),t}},secondCate:{get:function(){var t=this.$store.state.bookCategory.secondCate;return t||(t=localStorage.getItem("secondCate")),t},set:function(t){this.$store.dispatch({type:"triggerSecond",secondCate:t}),localStorage.secondCate=t}},words:{get:function(){var t=this.$store.state.bookCategory.words;return t||(t=localStorage.getItem("words")),t},set:function(t){this.$store.dispatch({type:"triggerWords",words:t}),localStorage.words=t}},sort:{get:function(){var t=this.$store.state.bookCategory.sort;return t||(t=localStorage.getItem("sort")),t},set:function(t){this.$store.dispatch({type:"triggerSort",sort:t}),localStorage.sort=t}}},created:function(){localStorage.setItem("secondCate",""),localStorage.setItem("words",""),localStorage.setItem("sort","monthHot");var t=localStorage.getItem("sex");0==t&&(this.firstCate=localStorage.getItem("listName"),this.flag=2),1==t&&(this.secondCate=localStorage.getItem("firstCate"),this.flag=3),this.page=1,this.getHeader(),this.getList()},mounted:function(){document.getElementsByClassName("bookList")[0].addEventListener("touchstart",this.showFooter,!1)},methods:{showFooter:function(){var t=this,e=document.getElementsByTagName("li");e[e.length-1].getBoundingClientRect().bottom-document.documentElement.clientHeight<120&&setTimeout(function(){t.page++,t.getList()},300)},changeInfoBook:function(t){var e=t.currentTarget.children[1].firstChild.getAttribute("bid");this.$store.dispatch({type:"triggerBookId",id:e}),localStorage.setItem("bookId",e)},selectColor:function(t,e){var s=null;switch(t){case 0:s=this.nameFrontNode;break;case 1:s=this.wordsFrontNode;break;case 2:s=this.sortFrontNode}if(null==s)switch(e.target.parentNode.firstChild.classList.remove("hoverG"),e.target.classList.add("hoverG"),t){case 0:this.nameFrontNode=e.target;break;case 1:this.wordsFrontNode=e.target;break;case 2:this.sortFrontNode=e.target}else if(s!=e.target){switch(s.classList.remove("hoverG"),t){case 0:this.nameFrontNode=e.target;break;case 1:this.wordsFrontNode=e.target;break;case 2:this.sortFrontNode=e.target}e.target.classList.add("hoverG")}},changeProp:function(t){this.page=1,this.loadJudge=!0;var e=t.target.getAttribute("name");this.name=e;var s=t.target.getAttribute("words"),a=t.target.getAttribute("sort");this.flag=t.target.getAttribute("tag"),e&&(this.secondCate=e,this.selectColor(0,t)),""==e&&(this.firstCate=localStorage.getItem("listName"),this.flag=2,this.selectColor(0,t)),(s||""==s)&&(this.words=s,this.selectColor(1,t)),(a||""==a)&&(this.sort=a,this.selectColor(2,t)),this.list=[],this.page=1,this.getList(e)},getList:function(){var t=this,e=this.firstCate,s=this.secondCate;1==localStorage.getItem("sex")&&1!=this.flag&&(this.flag=3),Object(a.e)(this.flag,this.page,this.words,e,s,this.name,this.sort,function(e){0!=e.length?Array.prototype.forEach.call(e,function(e){var s={};s.imgUrl=e.cover,s.bid=e.bid,s.bookName=e.title,s.authorName=e.author,s.introduction=e.desc,s.status=e.status,s.size=(e.words/1e3).toFixed(1)+"万字",s.class_name=e.category,t.list.push(s)}):t.loadJudge=!1})},getHeader:function(){var t=this,e=this.cid;Object(a.g)(e,function(e){t.headerList.push({name:"全部",relatedName:""}),e.class.forEach(function(e){var s={};s.id=e.id,s.name=e.name,s.tag=0,s.relatedName=e.relatedName,t.headerList.push(s)}),e.tag.forEach(function(e){var s={};s.id=e.id,s.name=e.name,s.tag=1,s.relatedName=e.relatedName,t.headerList.push(s)})})}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bookList"},[s("header",{staticClass:"header"},[s("section",{staticClass:"header--list"},[s("ul",{staticClass:"header--list__ul"},[t._l(t.headerList,function(e,a){return 0===a?s("li",{key:a,staticClass:"header--list__ul__li hoverG",attrs:{tag:e.tag,name:e.relatedName},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()}),t._v(" "),t._l(t.headerList,function(e,a){return 0!==a?s("li",{key:a,staticClass:"header--list__ul__li",attrs:{tag:e.tag,name:e.relatedName},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()})],2)]),t._v(" "),s("section",{staticClass:"header--list"},[s("ul",{staticClass:"middle--list__ul"},[t._l(t.middleList,function(e,a){return 0===a?s("li",{key:a,staticClass:"middle--list__ul__li hoverG",attrs:{words:e.words},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()}),t._v(" "),t._l(t.middleList,function(e,a){return 0!==a?s("li",{key:a,staticClass:"middle--list__ul__li",attrs:{words:e.words},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()})],2)]),t._v(" "),s("section",{staticClass:"header--list"},[s("ul",{staticClass:"middle--list__ul"},[t._l(t.footList,function(e,a){return 0===a?s("li",{key:a,staticClass:"middle--list__ul__li hoverG",attrs:{sort:e.sort},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()}),t._v(" "),t._l(t.footList,function(e,a){return 0!==a?s("li",{key:a,staticClass:"middle--list__ul__li",attrs:{sort:e.sort},on:{click:t.changeProp}},[t._v(t._s(e.name))]):t._e()})],2)])]),t._v(" "),s("section",{staticClass:"recommend"},[s("div",{staticClass:"recommend--body"},[s("ul",{staticClass:"recommend--body--ul"},t._l(t.list,function(e,a){return s("router-link",{key:a,staticClass:"recommend--body--ul--li ddd",attrs:{to:"bookinformation",tag:"li"},nativeOn:{click:function(e){return t.changeInfoBook(e)}}},[s("div",{staticClass:"recommend--body--ul--li__left"},[s("img",{directives:[{name:"lazyLoad",rawName:"v-lazyLoad",value:e.imgUrl,expression:"item.imgUrl"}],staticClass:"recommend--body--ul--li__left--img",attrs:{src:"",alt:e.bookName}})]),t._v(" "),s("div",{staticClass:"recommend--body--ul--li__right"},[s("h3",{staticClass:"recommend--body--ul--li__right--title",attrs:{bid:e.bid}},[t._v(t._s(e.bookName))]),t._v(" "),s("p",{staticClass:"recommend--body--ul--li__right--author"},[t._v(t._s(e.authorName))]),t._v(" "),s("p",{staticClass:"recommend--body--ul--li__right--info"},[t._v(t._s(e.introduction))]),t._v(" "),s("div",{staticClass:"recommend--body--ul--li__right--tags"},[0==e.status?s("span",{staticClass:"statNameblue"},[t._v("连载")]):s("span",{staticClass:"statNamered"},[t._v("完结")]),t._v(" "),s("span",{staticClass:"recommend--body--ul--li__right--tags--two"},[t._v(t._s(e.size))]),t._v(" "),s("span",{staticClass:"recommend--body--ul--li__right--tags--three"},[t._v(t._s(e.class_name))])])])])}))])]),t._v(" "),s("footer",{staticClass:"bookList--footer"},[t.loadJudge?s("div",{staticClass:"bookList--footer--text"},[t._v("\n      加载更多\n    ")]):s("div",{staticClass:"bookList--footer--textend"},[t._v("\n      没有更多\n    ")])])])},staticRenderFns:[]};var r=s("VU/8")(o,i,!1,function(t){s("yzGM")},"data-v-5b55364d",null);e.default=r.exports},LCHJ:function(t,e){},cHIW:function(t,e,s){"use strict";var a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-box"},[e("img",{attrs:{src:s("eSFX"),alt:""}})])}]};var o=s("VU/8")({name:"loadingImg"},a,!1,function(t){s("LCHJ")},"data-v-5898b249",null);e.a=o.exports},yzGM:function(t,e){}});
//# sourceMappingURL=3.6e68608a5a62a5703866.js.map