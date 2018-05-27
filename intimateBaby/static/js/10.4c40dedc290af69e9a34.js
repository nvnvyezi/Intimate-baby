webpackJsonp([10],{"XwO+":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("P9l9"),o=s("n5eY"),i={name:"bookInformation",data:function(){return{bookData:{},commentData:[],result1:[],arrResult:[],refreshJudge:!0,user_id:8e6,encryptKey:"37e81a9d8f02596e1b895d07c171d5c9"}},computed:{bookId:{get:function(){var t=this.$store.state.bookInfo.bookId;return t||(t=localStorage.getItem("bookId")),t},set:function(t){this.$store.dispatch({type:"triggerBookId",id:t}),localStorage.setItem("bookId",t),document.documentElement.scrollTop=0,this.getBookInfo()}},bookName:function(){var t=this.$store.state.bookInfo.bookName;return t||(t=localStorage.getItem("bookName")),t},authorId:{get:function(){var t=this.$store.state.bookInfo.authorId;return t||(t=localStorage.getItem("authorId")),t}},authorName:{get:function(){var t=this.$store.state.bookInfo.authorName;return t||(t=localStorage.getItem("authorName")),t}},timestamp:function(){return Date.now()}},methods:{propCatelog:function(){this.$store.dispatch({type:"triggerBookId",id:this.bookId})},changeInfoBook:function(t){var a=t.currentTarget.getAttribute("bid");this.bookId=a,localStorage.setItem("bookId",a)},showP:function(t){t.currentTarget.parentNode.parentNode.firstChild.classList.toggle("poff"),t.currentTarget.parentNode.parentNode.firstChild.classList.toggle("pshow"),t.target.classList.toggle("ir"),t.target.classList.toggle("il")},getBookInfo:function(){var t=this;if(window.fetch){var a=Object(o.a)(this.bookId+""+this.timestamp+this.user_id+this.encryptKey);Object(e.c)(this.bookId,this.user_id,a,this.timestamp,function(a){var s={};s.imgUrl=a.imgUrl,s.title=a.bookName,s.author=a.authorName,s.authorId=a.authorId,s.category=a.className,s.words=a.wordCount+"万字",s.chapterId=a.firstChapter.chapterId,s.status=a.state,s.info=a.desc,s.lastet_chapter=a.lastChapter.chapterName,localStorage.setItem("authorId",a.authorId),localStorage.setItem("authorName",a.authorName),localStorage.setItem("bookName",a.bookName),t.$store.dispatch({type:"triggerAuthor",id:a.authorId,name:a.authorName}),t.$store.dispatch({type:"triggerBookName",name:a.bookName}),t.bookData=s,t.getComments(),t.getRecom(),t.getData()})}},getComments:function(){var t=this;this.commentData=[],Object(e.b)(this.authorId,this.bookId,function(a){a.forEach(function(a){var s={};s.userPhoto=a.userPhoto,s.nickName=a.nickName,s.text=a.text,t.commentData.push(s)})})},addrefresh:function(){var t=this;if(this.refreshJudge){this.refreshJudge=!1,this.judge=!1,this.getRecom(function(){t.judge=!0});var a=document.getElementsByClassName("refresh__box--icon");a[0].classList.add("refreshing"),setTimeout(function(){t.refreshJudge=!0,a[0].classList.remove("refreshing")},1e3)}},getRecom:function(){var t=this;this.result1=[],window.fetch&&Object(e.d)(this.bookName,this.authorName,function(a){a.forEach(function(a){var s={};s.bid=a.id,s.imgUrl=a.cover,s.linkText=a.bookname.length>3?a.bookname.slice(0,3)+"...":a.bookname,t.result1.push(s)})})},getData:function(){var t=this;this.arrResult=[],Object(e.r)(this.authorId,function(a){a.forEach(function(a){var s={};s.imgUrl=a.cover,s.title=a.title,s.author=a.author,s.bid=a.bid,s.status=a.status,s.words=(a.words/1e4).toFixed(1)+"万字",s.tags=a.category,t.arrResult.push(s)})})}},mounted:function(){this.getBookInfo()}},r={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"box"},[s("section",{staticClass:"cover--header"},[s("div",{staticClass:"cover--header--img"},[s("img",{directives:[{name:"lazyLoad",rawName:"v-lazyLoad",value:t.bookData.imgUrl,expression:"bookData.imgUrl"}],staticClass:"cover--header--img--photo",attrs:{src:"",alt:""}})]),t._v(" "),s("div",{staticClass:"cover--header--info"},[s("h1",{staticClass:"cover--header--info--title"},[t._v(t._s(t.bookData.title))]),t._v(" "),s("router-link",{staticClass:"cover--header--info--author",attrs:{to:""}},[t._v(t._s(t.bookData.author))]),t._v(" "),s("p",{staticClass:"cover--header--info--tags"},[s("span",[t._v(t._s(t.bookData.category))]),s("span",[t._v(t._s(t.bookData.words))])]),t._v(" "),1==t.bookData.status?s("p",{staticClass:"cover--header--info--stat"},[t._v("已完结")]):s("p",{staticClass:"cover--header--info--stat"},[t._v("连载中")])],1)]),t._v(" "),s("section",{staticClass:"cover--buttons"},[s("router-link",{staticClass:"cover--buttons--button",attrs:{to:"bookChapter",tag:"button"}},[t._v("开始阅读")]),t._v(" "),s("button",{staticClass:"cover--buttons--button"},[t._v("加书架")]),t._v(" "),s("button",{staticClass:"cover--buttons--button"},[t._v("离线下载")])],1),t._v(" "),s("section",{staticClass:"cover--info"},[s("div",{staticClass:"cover--info--text"},[s("p",{staticClass:"cover--info--text--p poff"},[t._v(t._s(t.bookData.info))]),t._v(" "),s("span",{staticClass:"cover--info--text--icon"},[s("i",{staticClass:"ir",on:{click:t.showP}})])]),t._v(" "),s("router-link",{staticClass:"cover--info--text--new",attrs:{to:"",tag:"div"}},[s("i",{staticClass:"li"}),s("span",{staticClass:"ltext"},[t._v("最新")]),s("span",{staticClass:"ctext"},[t._v(t._s(t.bookData.lastet_chapter))]),s("i",{staticClass:"ri"})]),t._v(" "),s("router-link",{staticClass:"cover--info--text--new",attrs:{to:"bookinformatecatelog",tag:"div"},nativeOn:{click:function(a){return t.propCatelog(a)}}},[s("i",{staticClass:"li2"}),s("span",{staticClass:"ltext"},[t._v("目录")]),s("span",{staticClass:"ctext"},[t._v("点一下")]),s("i",{staticClass:"ri"})])],1),t._v(" "),s("section",{staticClass:"comments"},[s("h3",{staticClass:"comments--header"},[t._v("精华评论")]),t._v(" "),s("ul",{staticClass:"comments--ul"},t._l(t.commentData,function(a,e){return s("li",{key:e,staticClass:"comments--ul__li"},[s("div",[s("div",{staticClass:"comments--ul__li--header"},[s("img",{directives:[{name:"lazyLoad",rawName:"v-lazyLoad",value:a.userPhoto,expression:"item.userPhoto"}],staticClass:"comments--ul__li--header--photo",attrs:{src:"",alt:""}}),t._v(" "),s("span",{staticClass:"comments--ul__li--header--name"},[t._v(t._s(a.nickName))])]),t._v(" "),s("div",{staticClass:"comments--ul__li--text"},[t._v("\n            "+t._s(a.text)+"\n          ")])])])}))]),t._v(" "),s("section",{staticClass:"bookBox"},[s("div",{staticClass:"book-box"},[s("h3",[t._v("看过这本书的人还在看")]),t._v(" "),s("div",{staticClass:"li__box"},[s("div",{staticClass:"li__box--ul"},[s("ul",t._l(t.result1,function(a,e){return s("li",{key:e,attrs:{bid:a.bid},on:{click:t.changeInfoBook}},[s("img",{directives:[{name:"lazyLoad",rawName:"v-lazyLoad",value:a.imgUrl,expression:"item.imgUrl"}],attrs:{src:"",alt:a.linkText}}),t._v(" "),s("span",[t._v(t._s(a.linkText))])])}))])]),t._v(" "),s("div",{staticClass:"refresh__box",on:{click:t.addrefresh}},[s("span",{staticClass:"refresh__box--text"},[t._v("换一换")]),t._v(" "),s("span",{staticClass:"refresh__box--icon"})])])]),t._v(" "),s("section",{staticClass:"otherBooks"},[s("h3",[t._v("作者的所有作品")]),t._v(" "),s("ul",{staticClass:"box__ul"},t._l(t.arrResult,function(a,e){return s("router-link",{key:e,staticClass:"box__ul__li",attrs:{to:"bookinformation",tag:"li"}},[s("div",{staticClass:"box__ul__li--imgBox"},[s("img",{directives:[{name:"lazyLoad",rawName:"v-lazyLoad",value:a.imgUrl,expression:"item.imgUrl"}],staticClass:"box__ul__li--imgBox--img",attrs:{src:"",alt:a.author}})]),t._v(" "),s("div",{staticClass:"box__ul__li--right"},[s("div",{staticClass:"box__ul__li--right--title"},[s("h3",{staticClass:"box__ul__li--right--title--h3"},[t._v(t._s(a.title))])]),t._v(" "),s("div",{staticClass:"box__ul__li--right--author"},[s("p",{staticClass:"box__ul__li--right--author--author"},[t._v(t._s(a.author))])]),t._v(" "),s("div",{staticClass:"box__ul__li--right--tags"},[1==a.status?s("span",{staticClass:"statNameblue"},[t._v("连载")]):s("span",{staticClass:"statNamered"},[t._v("完结")]),t._v(" "),s("span",{staticClass:"box__ul__li--right--tags--words"},[t._v(t._s(a.words))]),t._v(" "),s("span",{staticClass:"box__ul__li--right--tags--one"},[t._v(t._s(a.tags))])])])])}))])])},staticRenderFns:[]};var c=s("VU/8")(i,r,!1,function(t){s("fls1")},"data-v-582846ec",null);a.default=c.exports},fls1:function(t,a){}});
//# sourceMappingURL=10.4c40dedc290af69e9a34.js.map