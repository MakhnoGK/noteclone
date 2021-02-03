(this["webpackJsonpclient-typescript-redux"]=this["webpackJsonpclient-typescript-redux"]||[]).push([[0],{134:function(e){e.exports=JSON.parse('{"title":"Untitled note","text":"Type your text here"}')},146:function(e,t,n){},152:function(e,t,n){},190:function(e,t){},219:function(e,t){},322:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(1),s=n.n(a),c=n(37),u=n.n(c),i=(n(146),n(25)),o=n(7),l=n(22),d=n(9),p=n(16),f=n(5),j=n(3),b=n.n(j),h=n(6),m=n(12),O=function(){var e=Object(h.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/auth/signin",{method:"post",credentials:"include",mode:"cors",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/auth/authenticated",{method:"get",credentials:"include",mode:"cors"});case 2:if(401!==(t=e.sent).status){e.next=7;break}return e.abrupt("return",Promise.resolve(null));case 7:return e.next=9,t.json();case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/auth/signout",{credentials:"include",mode:"cors"});case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(h.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/auth/signup",{method:"post",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=Object(m.b)("register",function(){var e=Object(h.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),y=Object(m.b)("login",function(){var e=Object(h.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",O(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_=Object(m.b)("checkAuth",Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",x());case 1:case"end":return e.stop()}}),e)})))),N=Object(m.b)("logout",Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",v());case 1:case"end":return e.stop()}}),e)})))),k=Object(m.c)({name:"users",initialState:{user:null,isAuthenticated:!1,loginRequest:"idle",registerRequest:"idle",logoutRequest:"idle",requestError:null},reducers:{clearError:function(e,t){e.requestError=null}},extraReducers:function(e){e.addCase(w.pending,(function(e,t){e.registerRequest="pending"})),e.addCase(w.fulfilled,(function(e,t){e.registerRequest="fulfilled",t.payload.error&&(e.requestError=t.payload.error)})),e.addCase(_.fulfilled,(function(e,t){t.payload&&(e.user=t.payload.user,e.isAuthenticated=!0)})),e.addCase(y.fulfilled,(function(e,t){t.payload.error?e.requestError=t.payload.error:(e.user=t.payload.user,e.isAuthenticated=!0)})),e.addCase(N.fulfilled,(function(e,t){e.user=null,e.isAuthenticated=!1}))}}),S=k.actions.clearError,C=k.reducer,E=n(140),q=n(133),R=function(e){return Object(r.jsx)("span",Object(d.a)(Object(d.a)({},e),{},{style:{display:"flex",alignItems:"center"},children:Object(r.jsx)(q.a,{size:e.size})}))},A=function(e){var t=["button"];return e.active&&t.push("button--busy"),e.rounded&&t.push("button--round"),e.variant&&t.push("button--".concat(e.variant)),e.className&&t.push.apply(t,Object(E.a)(e.className.split(" "))),Object(r.jsx)("button",Object(d.a)(Object(d.a)({},e),{},{className:t.join(" "),children:e.active?Object(r.jsx)(R,{className:"button__spinner"}):e.children}))},T=function(){var e=Object(f.c)((function(e){return e.users})).requestError;return Object(r.jsx)("div",{className:"form-error",children:e})},J=(n(152),function(){var e=Object(o.f)(),t=Object(f.b)(),n=Object(f.c)((function(e){return e.users})),s=n.isAuthenticated,c=n.loginRequest,u=Object(a.useState)({username:null,password:null,errors:{username:"",password:""}}),j=Object(p.a)(u,2),b=j[0],h=j[1];Object(a.useEffect)((function(){t(S(null))}),[t]),Object(a.useEffect)((function(){s&&e.push("/")}),[s,e]);var m=function(e){var t=e.target,n=t.value,r=t.name,a=b.errors;switch(r){case"username":a.username=n.length<3?"Username is required and must be at least 3 characters long.":"";break;case"password":a.password=n.length<3?"Password is required and must be at least 3 characters long.":""}h((function(e){var t;return Object(d.a)(Object(d.a)({},e),{},(t={},Object(l.a)(t,r,n),Object(l.a)(t,"errors",a),t))}))};return Object(r.jsx)("div",{className:"auth-container__outer",children:Object(r.jsxs)("div",{className:"auth-container",children:[Object(r.jsx)("h1",{className:"auth-container__title",children:"Welcome to Noteclone!"}),Object(r.jsx)("p",{className:"auth-container__subtitle",children:"Please login or register to open editor"}),Object(r.jsxs)("form",{className:"auth-form",onSubmit:function(e){e.preventDefault(),function(){var e=!0;return Object.values(b.errors).forEach((function(t){return t.length>0&&(e=!1)})),null===b.username&&(e=!1),null===b.password&&(e=!1),e}()&&t(y({username:b.username,password:b.password}))},children:[Object(r.jsx)("input",{className:"auth-form__input ".concat(b.errors.username.length>0?"auth-form__input--error":null),type:"text",placeholder:"Username",name:"username",onChange:m}),b.errors.username.length>0&&Object(r.jsx)("div",{className:"auth-form__error",children:b.errors.username}),Object(r.jsx)("input",{className:"auth-form__input ".concat(b.errors.password.length>0?"auth-form__input--error":null),type:"password",placeholder:"Password",name:"password",onChange:m}),b.errors.password.length>0&&Object(r.jsx)("div",{className:"auth-form__error",children:b.errors.password}),Object(r.jsx)(T,{}),Object(r.jsxs)("div",{className:"auth-form__action",children:[Object(r.jsx)(A,{active:"pending"===c,variant:"primary",type:"submit",children:"Login"}),Object(r.jsx)("span",{children:"or"}),Object(r.jsx)(i.b,{to:"/register",className:"link link--primary",children:"Create new account"})]})]})]})})}),P=n(134),U=function(){var e=Object(h.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/notes",{credentials:"include"});case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/notes",{method:"post",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(P)});case 3:return t=e.sent,e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 9:throw e.prev=9,e.t0=e.catch(0),new Error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(h.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/notes/".concat(t.id),{method:"put",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t.text})});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(h.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/notes/".concat(t),{method:"delete",credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=Object(m.b)("notes/fetch",Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),B=Object(m.b)("notes/add",Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),M=Object(m.b)("notes/delete",function(){var e=Object(h.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),W=Object(m.b)("notes/save",function(){var e=Object(h.a)(b.a.mark((function e(t,n){var r,a,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.getState,a=r(),s=a.notes.selected,e.next=4,D(Object(d.a)({id:s},t));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),F=Object(m.c)({name:"notes",initialState:{notes:[],selected:0,loadState:"idle",deleteState:"idle",updateState:"idle",saveState:"idle"},reducers:{noteSelected:function(e,t){e.selected=t.payload},noteUpdated:function(e,t){var n=e.notes,r=e.selected,a=n.find((function(e){return e.id===r}));a&&(n[n.indexOf(a)].title=t.payload.title,n[n.indexOf(a)].text=t.payload.text)}},extraReducers:function(e){e.addCase(L.pending,(function(e){e.loadState="pending"})),e.addCase(L.fulfilled,(function(e,t){var n=t.payload;e.loadState="fulfilled",n.length>0&&(e.notes=n,e.selected=e.notes[0].id)})),e.addCase(B.pending,(function(e){e.saveState="pending"})),e.addCase(B.fulfilled,(function(e,t){var n=t.payload;e.saveState="fulfilled",e.notes.unshift(n),e.selected=n.id})),e.addCase(M.pending,(function(e){e.deleteState="pending"})),e.addCase(M.fulfilled,(function(e,t){var n,r=t.payload;e.deleteState="fulfilled";var a,s=r.id,c=e.notes.findIndex((function(e){return e.id===s}));c!==e.notes.length-1?e.selected=null===(n=e.notes[c+1])||void 0===n?void 0:n.id:e.selected=null===(a=e.notes[c-1])||void 0===a?void 0:a.id;e.notes=e.notes.filter((function(e){return e.id!==s}))}))}}),H=F.reducer,V=F.actions,Y=V.noteSelected,G=V.noteUpdated,K=function(e){return e.notes.notes.find((function(t){return t.id===e.notes.selected}))},Q=function(){var e=Object(a.useState)({username:null,password:null,fullname:null,errors:{username:"",password:""}}),t=Object(p.a)(e,2),n=t[0],s=t[1],c=Object(f.c)((function(e){return e.users})).registerRequest,u=Object(o.f)(),j=Object(f.b)(),m=function(){var e=!0;return Object.values(n.errors).forEach((function(t){return t.length>0&&(e=!1)})),null===n.username&&(e=!1),null===n.password&&(e=!1),e},O=function(){var e=Object(h.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),m()&&j(w({username:n.username,password:n.password,fullname:n.fullname}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(e){var t=e.target,r=t.value,a=t.name,c=n.errors;switch(a){case"username":c.username=r.length<3?"Username is required and must be at least 3 characters long.":"";break;case"password":c.password=r.length<3?"Password is required and must be at least 3 characters long.":""}s((function(e){var t;return Object(d.a)(Object(d.a)({},e),{},(t={},Object(l.a)(t,a,r),Object(l.a)(t,"errors",c),t))}))};return Object(a.useEffect)((function(){}),[c,u]),Object(r.jsx)("div",{className:"auth-container__outer",children:Object(r.jsxs)("div",{className:"auth-container",children:[Object(r.jsx)("h1",{className:"auth-container__title",children:"Welcome to Noteclone!"}),Object(r.jsx)("p",{className:"auth-container__subtitle",children:"Please login or register to open editor"}),Object(r.jsxs)("form",{className:"auth-form",onSubmit:O,children:[Object(r.jsx)("input",{className:"auth-form__input ".concat(n.errors.username.length>0?"auth-form__input--error":null),type:"text",placeholder:"Username",name:"username",onChange:x}),n.errors.username.length>0&&Object(r.jsx)("div",{className:"auth-form__error",children:n.errors.username}),Object(r.jsx)("input",{className:"auth-form__input ".concat(n.errors.password.length>0?"auth-form__input--error":null),type:"password",placeholder:"Password",name:"password",onChange:x}),n.errors.password.length>0&&Object(r.jsx)("div",{className:"auth-form__error",children:n.errors.password}),Object(r.jsx)("input",{className:"auth-form__input",type:"text",placeholder:"Display name",name:"fullname",onChange:x}),Object(r.jsx)(T,{}),Object(r.jsxs)("div",{className:"auth-form__action",children:[Object(r.jsx)(A,{active:"pending"===c,variant:"primary",children:"Register"}),Object(r.jsx)("span",{children:"or"}),Object(r.jsx)(i.b,{to:"/login",className:"link link--primary",children:"Login"})]})]})]})})},X=n(139),Z=n(138),$=n(135),ee=n(136),te=n.n(ee),ne=function(){var e=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.notes}));return[t.notes,t.selected,function(t){e(Y(t))}]}(),t=Object(p.a)(e,3),n=t[0],a=t[1],s=t[2];return n.length>0?Object(r.jsx)($.Scrollbars,{className:"note-list",renderThumbVertical:function(e){return Object(r.jsx)("div",Object(d.a)(Object(d.a)({},e),{},{className:"note-list__thumb-vertical"}))},children:n.map((function(e){var t=te()(e.text,{allowedTags:["p","ul","ol","li"]});return Object(r.jsxs)("div",{className:"note ".concat(e.id===a?"note--active":""),onClick:function(){return s(e.id)},children:[Object(r.jsx)("div",{className:"note__title",children:Object(r.jsx)("h2",{children:e.title})}),t.length>0&&Object(r.jsx)("div",{className:"note__content",dangerouslySetInnerHTML:{__html:t}})]},e.id)}))}):Object(r.jsx)("span",{className:"note-list__message",children:"You don't create any notes so far"})},re=n(137),ae=n.n(re),se=n.p+"static/media/blank-document.a2c3b89e.svg",ce=(n(321),function(){var e=Object(f.c)(K),t=Object(f.b)(),n=function(){var e=Object(f.c)((function(e){return e.notes})),t=e.selected,n=e.notes,r=Object(f.b)(),s=Object(a.useState)(""),c=Object(p.a)(s,2),u=c[0],i=c[1],o=Object(a.useState)(""),l=Object(p.a)(o,2),d=l[0],j=l[1];return Object(a.useMemo)((function(){var e=n.find((function(e){return e.id===t}));e&&(i(e.text),j(e.title))}),[t,n]),Object(a.useEffect)((function(){r(G({title:d,text:u}))}),[u,d,r]),[u,i,d,j]}(),s=Object(p.a)(n,4),c=s[0],u=s[1],i=s[2],o=s[3];return e?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("input",{type:"text",value:i,onChange:function(e){return o(e.target.value)},onBlur:function(){t(W({title:i,text:c}))},className:"editor-content__title"}),Object(r.jsx)(ae.a,{value:c,onChange:function(e){return u(e)},onBlur:function(){return t(W({title:i,text:c}))},style:{flex:1}})]}):Object(r.jsx)("div",{className:"editor-placeholder",children:Object(r.jsx)("img",{src:se,alt:"Editor placeholder"})})}),ue=function(){var e=Object(f.c)((function(e){return e.users})),t=e.isAuthenticated,n=e.user,s=Object(f.c)((function(e){return e.notes})),c=s.selected,u=s.saveState,i=s.deleteState,l=Object(f.c)(K),d=Object(f.b)(),p=Object(o.f)();return Object(a.useEffect)((function(){t||p.push("/login")}),[t,p]),Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{className:"editor-container",children:[Object(r.jsxs)("header",{className:"editor-header",children:[Object(r.jsx)("div",{className:"note-actions",children:l&&Object(r.jsx)(A,{active:"pending"===i,rounded:!0,variant:"danger",onClick:function(){return d(M(c))},children:Object(r.jsx)(Z.a,{size:20})})}),Object(r.jsxs)("div",{className:"user",children:[Object(r.jsxs)("p",{className:"user__greeting",children:["Welcome, ",Object(r.jsx)("strong",{children:null===n||void 0===n?void 0:n.fullname}),"!"]}),Object(r.jsx)("a",{href:"/",className:"user__action link link--primary",onClick:function(e){e.preventDefault(),d(N())},children:"Logout"})]})]}),Object(r.jsx)("nav",{className:"editor-nav",children:Object(r.jsx)(A,{active:"pending"===u,rounded:!0,variant:"primary",onClick:function(){return d(B())},children:Object(r.jsx)(X.a,{size:20})})}),Object(r.jsx)("aside",{className:"editor-list",children:Object(r.jsx)(ne,{})}),Object(r.jsx)("main",{className:"editor-content",children:Object(r.jsx)(ce,{})})]})})};var ie=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.users})).isAuthenticated;return Object(a.useEffect)((function(){e(_())}),[e]),Object(a.useEffect)((function(){t&&e(L())}),[e,t]),Object(r.jsx)(i.a,{children:Object(r.jsx)("div",{className:"app",children:Object(r.jsxs)(o.c,{children:[Object(r.jsx)(o.a,{path:"/login",component:J}),Object(r.jsx)(o.a,{path:"/register",component:Q}),Object(r.jsx)(o.a,{path:"/",component:ue})]})})})},oe=Object(m.a)({reducer:{notes:H,users:C}});u.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(f.a,{store:oe,children:Object(r.jsx)(ie,{})})}),document.getElementById("root"))},98:function(e,t){}},[[322,1,2]]]);
//# sourceMappingURL=main.85080292.chunk.js.map