(this["webpackJsonpnmr-displayer"]=this["webpackJsonpnmr-displayer"]||[]).push([[6],{101:function(e,t,n){e.exports=n(172)},169:function(e,t,n){},170:function(e,t,n){},171:function(e,t,n){},172:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(2),o=n.n(i),l=n(32),s=n(13);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,701))}));var u=n(46),d=n.n(u),m=n(7),p=n(40),f=n(67),h=n(69),v=n(89),b=n.n(v),y=n(66),g=n(33),j=n(34),E=n(29),O=n(14),x=n(17),w=n(20),k=n(42),C=n(28);function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=t,o=[];for(var l in-1!==a&&i[a]&&(i[a]=r.a.cloneElement(i[a],{},o)),e){if(e[l].children&&Array.isArray(e[l].children)){var s=r.a.createElement(C.b,{key:l+n,title:e[l].groupName});return i.push(s),L(e[l].children,i,n,0)}o.push(r.a.createElement(C.a,Object(m.a)({key:l+n},e[l]),e[l].title))}return i}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[],n=!0,a=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var l=i.value;l.children&&Array.isArray(l.children)?t=t.concat(H([l],[])):t.push(l)}}catch(s){a=!0,r=s}finally{try{n||null==o.return||o.return()}finally{if(a)throw r}}return t}function H(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=t,a=!0,r=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value;if(s.children&&Array.isArray(s.children))return H(s.children,n);t.push(s)}}catch(c){r=!0,i=c}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return n}function N(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=new RegExp(Object(p.a)(/^(.*)\/([\0-\.0-\uFFFF]*)$/g,{path:1,file:2})).exec(e),n="";if(t){var a=t[1].split("/");n=a.length>2?a[a.length-2]+a[a.length-1]:a[a.length-1]}return n+e.replace(/\.|\s|\//g,"")}var R,M,D,U=n(95),P=n.n(U),T=(n(167),n(68)),F=function(e){function t(e){var n;return Object(g.a)(this,t),(n=Object(E.a)(this,Object(O.a)(t).call(this,e))).state={routes:[],isMenuOpen:!0},n.activeRoute.bind(Object(x.a)(n)),n.menuHandler=n.menuHandler.bind(Object(x.a)(n)),n}return Object(w.a)(t,e),Object(j.a)(t,[{key:"activeRoute",value:function(e){return this.props.location.pathname.indexOf(e)>-1?"active":""}},{key:"componentDidMount",value:function(){navigator.platform.indexOf("Win")>-1&&(R=new k.a(this.refs.sidebar,{suppressScrollX:!0,suppressScrollY:!1}));var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[],n=!0,a=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var s=o.value,c=Math.random().toString(36).replace("0.","");s.children&&Array.isArray(s.children)?t.push(L([s],[],c)):t.push(r.a.createElement(C.a,Object(m.a)({key:s.title},s),s.title))}}catch(u){a=!0,i=u}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}return t}(this.props.routes,[]);this.setState((function(t){return Object(m.a)({},t,{routes:e})}))}},{key:"componentWillUnmount",value:function(){navigator.platform.indexOf("Win")>-1&&R.destroy()}},{key:"menuHandler",value:function(e){console.log(this.state);var t=!this.state.isMenuOpen;this.setState((function(e){return Object(m.a)({},e,{isMenuOpen:t})})),this.props.onMenuClose(!t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:this.state.isMenuOpen?"sidebar menu-open":"sidebar menu-close","data-color":this.props.backgroundColor},r.a.createElement("button",{type:"button",className:"menu-bt",onClick:this.menuHandler},r.a.createElement(T.a,null)),r.a.createElement("div",{className:"logo"},r.a.createElement("a",{className:"simple-text logo-mini"},r.a.createElement("div",{className:"logo-img"},r.a.createElement("img",{src:P.a,alt:"react-logo"}))),r.a.createElement("a",{className:"simple-text logo-normal"},"NMRium")),r.a.createElement("div",{className:"sidebar-wrapper",ref:"sidebar"},r.a.createElement(C.c,{onClick:function(t){e.props.history.push("/SamplesDashboard/".concat(Math.random().toString(36).replace("0.",""),"/").concat(N(t.item.props.file)))},mode:"inline"},this.state.routes)))}}]),t}(r.a.Component),W=function(e){function t(e){var n;return Object(g.a)(this,t),(n=Object(E.a)(this,Object(O.a)(t).call(this,e))).state={backgroundColor:"blue",routesList:[],routes:[],isMenuClosed:!1},n.mainPanel=r.a.createRef(),n.menuCloseHandler=function(e){n.setState((function(t){return Object(m.a)({},t,{isMenuClosed:e})}))},n.menuCloseHandler=n.menuCloseHandler.bind(Object(x.a)(n)),n}return Object(w.a)(t,e),Object(j.a)(t,[{key:"componentWillMount",value:function(){D=this.props.routes?this.props.routes:D,this.setState((function(e){return Object(m.a)({},e,{routesList:S(D),routes:D})}))}},{key:"componentDidMount",value:function(){navigator.platform.indexOf("Win")>-1&&(M=new k.a(this.mainPanel.current),document.body.classList.toggle("perfect-scrollbar-on"))}},{key:"componentDidUpdate",value:function(e){"PUSH"===e.history.action&&(this.mainPanel.current.scrollTop=0,document.scrollingElement.scrollTop=0)}},{key:"componentWillUnmount",value:function(){navigator.platform.indexOf("Win")>-1&&(M.destroy(),document.body.classList.toggle("perfect-scrollbar-on"))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"wrapper"},r.a.createElement(F,Object.assign({},this.props,{routes:this.state.routes,backgroundColor:this.state.backgroundColor,onMenuClose:this.menuCloseHandler})),r.a.createElement("div",{className:this.state.isMenuClosed?"main-panel main-panel-when-menu-closed":"main-panel",ref:this.mainPanel},r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},r.a.createElement(s.c,null,this.state.routesList.map((function(t){return r.a.createElement(s.a,{path:"/SamplesDashboard/:id/".concat(N(t.file)),render:function(a){var i=a.match.params.id,o=t.view?t.view:"View",l=r.a.lazy((function(){return n(85)("./".concat(o))}));return r.a.createElement(l,Object.assign({key:i},t,{id:N(t.file),baseURL:e.props.baseURL}))},key:N(t.file)})})),this.state.routesList.length>0&&r.a.createElement(s.a,{path:"/",render:function(){var t=e.state.routesList[0],a=t.view?t.view:"View",i=r.a.lazy((function(){return n(85)("./".concat(a))}));return r.a.createElement(i,t[0])},key:N(this.state.routesList[0].file)})))))}}]),t}(r.a.Component),A={bodyContainer:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",backgroundColor:"#e3e3e3"},container:{width:"30%",height:"40%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",fontSize:"20px",textAlign:"center"},normal:{backgroundColor:"white",color:"black"},error:{backgroundColor:"red",color:"white"},errorHeader:{fontSize:"100px"},normalHeader:{fontSize:"24px"},loadButton:{fontSize:"12px",padding:"12px 40px",borderRadius:"10px",border:"1px solid #c70000",fontWeight:"bold",cursor:"pointer"}};function J(){return(J=Object(h.a)(d.a.mark((function e(t){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.prev=3,z(n),e.next=7,n.json();case 7:return a=e.sent,e.abrupt("return",a);case 11:return e.prev=11,e.t0=e.catch(3),console.log(e.t0),e.abrupt("return",null);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})))).apply(this,arguments)}function z(e){if(!e.ok)throw new Error("HTTP ".concat(e.status," - ").concat(e.statusText));return e}var B=function(e){var t=Object(a.useState)({isLoaded:!1,status:200,routes:[]}),n=Object(f.a)(t,2),i=n[0],o=n[1],l=Object(a.useCallback)((function(){o({isLoaded:!0,status:200,routes:y})}),[]);return Object(a.useEffect)((function(){var t=b.a.parse(e.location.search);t&&t.sampleURL?function(e){return J.apply(this,arguments)}(t.sampleURL).then((function(e){if(e){var n=t.sampleURL.replace(Object(p.a)(/^(.*[\/\\])?(.*?\.[\0-\x2D\/-\uFFFF]*?|)$/g,{url:1,filename:2}),"$1"),a=JSON.parse(JSON.stringify(e).replace(/\.\/+?/g,n));o({isLoaded:!0,status:200,routes:a,baseURL:n})}else o({isLoaded:!1,status:404,routes:[]})})):o({isLoaded:!0,status:200,routes:y,baseURL:"./"})}),[]),i.isLoaded?r.a.createElement(W,Object.assign({},e,{routes:i.routes,baseURL:i.baseURL})):r.a.createElement("div",{style:A.bodyContainer},r.a.createElement("div",{style:Object(m.a)({},A.container,{},200===i.status?A.normal:A.error)},200===i.status?r.a.createElement("div",null,r.a.createElement("p",{style:A.normalHeader},"Please wait"),r.a.createElement("p",null,"We will redirect you in a minute")):r.a.createElement("div",null,r.a.createElement("p",{style:A.errorHeader},"404"),r.a.createElement("p",null,"Resource not found."),r.a.createElement("button",{style:A.loadButton,type:"button",onClick:l},"Load local samples"))))};n(168),n(169),n(170),n(171);o.a.render(r.a.createElement(l.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/",render:function(e){return r.a.createElement(B,e)}}),r.a.createElement(s.a,{path:"/test",component:function(){return r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/test/highlight",component:c}),r.a.createElement(s.a,{render:function(){return r.a.createElement("div",null,"Page not found")}})))}}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},66:function(e){e.exports=JSON.parse('[{"file":"empty","title":"blank"},{"groupName":"General","children":[{"file":"./data/cytisine/1H.json","title":"1H spectrum test"},{"file":"./data/50-78-2/linked-jcamp.json","title":"Linked jcamp"},{"file":"./data/cytisine/1Honly.json","title":"1H only jcamp"},{"file":"./data/cytisine/1D.json","title":"1D spectra test"},{"file":"./data/ethylvinylether/1h.json","title":"1H ethylvinylether"},{"file":"./data/cytisine/13CFID.json","title":"13C Spectrum"},{"file":"./data/cytisine/processed13C.json","title":"Processed 13C Spectrum"},{"file":"./data/cytisine/Big13C.json","title":"Big 13C"},{"file":"./data/xtc/XTC.json","title":"XTC"},{"file":"./data/coffee/Coffee.json","title":"Coffee"},{"file":"./data/108-21-4/CoupledDecoupled13C.json","title":"13C Coupled / Decoupled"},{"file":"./data/cytisine/Dept.json","title":"DEPT"},{"file":"./data/19f/19f.json","title":"19F with baseline problems"}]},{"groupName":"Simulate","children":[{"file":"./data/tests/simulated/d1-2-3-4-5-6-7-8.json","title":"\u03b4=1,2,3,4,5,6,7,8"},{"file":"./data/tests/simulated/d1-2-3-4-5-6-7-8HR.json","title":"\u03b4=1,2,3,4,5,6,7,8 HR"},{"file":"./data/tests/simulated/d1-1.2_j7.json","title":"\u03b4=1,1.2 J=7"},{"file":"./data/tests/simulated/d1-2_j7.json","title":"\u03b4=1,2 J=7"},{"file":"./data/tests/simulated/d1-2-3_j16-10-2.json","title":"\u03b4=1,2,3 J=2,10,16"},{"file":"./data/tests/simulated/d1-7_j7.json","title":"\u03b4=1,7 J=7"},{"file":"./data/tests/triangle/low-res.json","title":"Test low resolution"},{"file":"./data/tests/triangle/high-res.json","title":"Test high resolution"}]},{"groupName":"Exercises","children":[{"file":"./exercises/ethylvinylether/1h.json","title":"Exercise 1","view":"Exercise"},{"file":"./exercises/ethylbenzene/1h.json","title":"Exercise 2","view":"Exercise"}]}]')},85:function(e,t,n){var a={"./Exercise":[98,0,1,2,3],"./Exercise.jsx":[98,0,1,2,3],"./Test":[99,0,1,2,4],"./Test.jsx":[99,0,1,2,4],"./View":[100,0,1,2,5],"./View.jsx":[100,0,1,2,5]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=85,e.exports=r},95:function(e,t,n){e.exports=n.p+"static/media/logo-white.eec7c7f6.svg"}},[[101,7,8]]]);
//# sourceMappingURL=main.15bd0cd6.chunk.js.map