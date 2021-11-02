"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[552],{5878:function(n,e,t){t.d(e,{Il:function(){return m},t_:function(){return h}});var r=t(2809),i=t(6311),a=t(8715),o=t(374),s=t(7294),u=t(1549),c=t(2503),d=t(5893);function l(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function f(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?l(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var m=s.createContext({user:null,token:null}),p=function(n){var e=n.children,t=(0,o._)("auth-token"),r=(0,i.Z)(t,2),l=r[0],f=(r[1],(0,c.ZP)(l?a.PB:null,(function(n){return(0,u.ZP)(n)}))),p=f.data,h=f.error;return(0,s.useEffect)((function(){(p&&!("me"in p)||h&&h.toString().includes("Token not valid"))&&localStorage.removeItem("auth-token")}),[p]),(0,d.jsx)(m.Provider,{value:{user:l&&p&&"me"in p?p.me:null,token:l},children:e})},h=function(n){return s.memo((function(e){return(0,d.jsx)(p,{children:(0,d.jsx)(n,f({},e))})}))}},5073:function(n,e,t){var r,i=t(6311),a=t(2209),o=t(5232),s=t(7294),u=t(4421),c=t(5893),d=u.Z.div(r||(r=(0,a.Z)(["\n  position: relative;\n  padding: ",";\n  margin: ",";\n  width: ",";\n  display: ",";\n\n  "," {\n    width: ",";\n  }\n  "," {\n    width: ",";\n  }\n  "," {\n    width: ",";\n  }\n  "," {\n    width: ",";\n  }\n"])),(function(n){return n.padding}),(function(n){return n.margin}),(function(n){var e=n.defaultHidden,t=n.width;return e?"auto":t}),(function(n){return n.defaultHidden?"hidden":"block"}),o.BC.minSmall,(function(n){return n.widthSmall}),o.BC.minMedium,(function(n){return n.widthMedium}),o.BC.minLarge,(function(n){return n.widthLarge}),o.BC.minXLarge,(function(n){return n.widthXLarge})),l=s.memo((function(n){var e=n.widths,t=n.padding,r=n.paddingX,a=n.paddingLeft,o=n.paddingRight,s=n.paddingY,u=n.paddingTop,l=n.paddingBottom,f=n.margin,m=n.marginX,p=n.marginLeft,h=n.marginRight,g=n.marginY,w=n.marginTop,v=n.marginBottom,x=n.onClick,y=n.className,b=n.children,j=e.map((function(n){return"".concat(100*n,"%")})),O=(0,i.Z)(j,5),Z=O[0],k=O[1],P=O[2],S=O[3],C=O[4],L="".concat(u||s||t||0,"rem ").concat(o||r||t||0,"rem ").concat(l||s||t||0,"rem ").concat(a||r||t||0,"rem "),B="".concat(w||g||f||0,"rem ").concat(h||m||f||0,"rem ").concat(v||g||f||0,"rem ").concat(p||m||f||0,"rem ");return(0,c.jsx)(d,{width:Z,widthSmall:k,widthMedium:P,widthLarge:S,widthXLarge:C,padding:L,margin:B,onClick:x,className:y,defaultHidden:e[0]<=0,children:b})}));e.Z=l},7692:function(n,e,t){var r,i=t(2209),a=t(4421);e.Z=a.Z.div(r||(r=(0,i.Z)(["\n  display: flex;\n  flex-wrap: ",";\n  ","\n"])),(function(n){return n.flexWrap||"nowrap"}),(function(n){return n.marginX?"margin-left: -0.5rem !important;margin-right: -0.5rem !important;":""}))},3552:function(n,e,t){t.d(e,{Z:function(){return b}});var r,i,a,o=t(2209),s=t(5232),u=t(4421),c=u.Z.div(r||(r=(0,o.Z)(["\n  position: relative;\n  margin: 0 auto;\n  padding: 0 1rem;\n\n  height: 100%;\n\n  "," {\n    max-width: 576px;\n  }\n  "," {\n    max-width: 720px;\n  }\n  "," {\n    max-width: 940px;\n  }\n  "," {\n    max-width: 1140px;\n  }\n"])),s.BC.minSmall,s.BC.minMedium,s.BC.minLarge,s.BC.minXLarge),d=t(5878),l=t(374),f=t(5073),m=t(7692),p=t(9008),h=t(1664),g=t(7294),w=t(5893),v=u.Z.div(i||(i=(0,o.Z)(["\n  padding: 2rem;\n  margin-bottom: 1rem;\n\n  background-color: ",";\n  color: ",";\n"])),s.O9.primary,s.O9.primaryContrast),x=u.Z.div(a||(a=(0,o.Z)(["\n  display: flex;\n  justify-content: flex-end;\n  a {\n    margin-right: 1rem;\n  }\n"]))),y=function(){var n=(0,g.useContext)(d.Il).user,e=(0,l.W)();return(0,w.jsxs)(v,{children:[(0,w.jsx)(p.default,{children:(0,w.jsx)("title",{children:"iMovies CA"})}),(0,w.jsx)(c,{children:(0,w.jsxs)(m.Z,{children:[(0,w.jsx)(f.Z,{widths:[1/3,1/4,.2,1/6],children:(0,w.jsx)(h.default,{href:"/",children:"iMovies"})}),(0,w.jsx)(f.Z,{widths:[2/3,3/4,.8,5/6],children:(0,w.jsxs)(x,{children:[e&&(0,w.jsx)(h.default,{href:"/",children:"Issue / Revoke Certificate"}),e&&n&&!1,(0,w.jsx)(h.default,{href:"/revocation-list",children:"Revocation List"}),!e&&(0,w.jsx)(h.default,{href:"/login",children:"Login"}),e&&(0,w.jsx)(h.default,{href:"/logout",children:"Logout"})]})})]})})]})},b=function(n){var e=n.children;return(0,w.jsxs)("div",{children:[(0,w.jsx)(y,{}),(0,w.jsx)(c,{children:e})]})}},8715:function(n,e,t){t.d(e,{eK:function(){return r},Nv:function(){return i},PB:function(){return a},LK:function(){return o},D3:function(){return s}});var r="\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password) {\n      ... on Session {\n        session_id\n      }\n      ... on AuthenticationException {\n        message\n      }\n    }\n  }\n",i="\n  mutation Logout {\n    logout\n  }\n",a="\n  query {\n    me {\n      username\n      firstname\n      lastname\n      email\n      certificates {\n        id\n        name\n        certificateFile\n        is_revoked\n        created_at\n        updated_at\n      }\n    }\n  }\n",o="\n  mutation UpdateMe($firstname: String!, $lastname: String!, $email: String!) {\n    updateMe(firstname: $firstname, lastname: $lastname, email: $email) {\n      username\n      firstname\n      lastname\n      email\n      certificates {\n        id\n        name\n        is_revoked\n        created_at\n        updated_at\n      }\n    }\n  }\n",s="\n  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {\n    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n      ... on WrongPasswordException {\n        message\n      }\n      ... on User {\n        username\n      }\n    }\n  }\n"},374:function(n,e,t){t.d(e,{_:function(){return o},W:function(){return s}});var r=t(5878),i=t(2957),a=t(7294),o=function(n){return i.C?[localStorage.getItem(n),function(e){return localStorage.setItem(n,e)}]:[null,function(){}]},s=function(){return!!(0,a.useContext)(r.Il).token}},1549:function(n,e,t){var r=t(219),i=t(266),a=t(8216),o=t(5997),s=t(4695),u=t(1077),c=t(268),d=t(2953),l=t(3207),f=t(2809),m=t(809),p=t.n(m),h=t(2957),g=["headers"],w=["headers"];function v(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function x(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?v(Object(t),!0).forEach((function(e){(0,f.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function y(n){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var t,r=(0,d.Z)(n);if(e){var i=(0,d.Z)(this).constructor;t=Reflect.construct(r,arguments,i)}else t=r.apply(this,arguments);return(0,c.Z)(this,t)}}var b="http://localhost:3000/graphql",j=function(n){(0,u.Z)(t,n);var e=y(t);function t(n,r){var i;(0,a.Z)(this,t);var o="".concat(t.extractMessage(n),": ").concat(JSON.stringify({response:n,request:r}));return i=e.call(this,o),(0,f.Z)((0,s.Z)(i),"response",void 0),(0,f.Z)((0,s.Z)(i),"request",void 0),Object.setPrototypeOf((0,s.Z)(i),t.prototype),i.response=n,i.request=r,"function"===typeof Error.captureStackTrace&&Error.captureStackTrace((0,s.Z)(i),t),i}return(0,o.Z)(t,null,[{key:"extractMessage",value:function(n){try{return n.errors[0].message}catch(e){return"GraphQL Error (Code: ".concat(n.status,")")}}}]),t}((0,l.Z)(Error)),O=function(){function n(e,t){(0,a.Z)(this,n),(0,f.Z)(this,"url",void 0),(0,f.Z)(this,"options",void 0),this.url=e,this.options=t||{}}return(0,o.Z)(n,[{key:"rawRequest",value:function(){var n=(0,i.Z)(p().mark((function n(e,t){var i,a,o,s,u,c,d,l;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=this.options,a=i.headers,o=(0,r.Z)(i,g),s=JSON.stringify({query:e,variables:t||void 0}),n.next=4,fetch(this.url,x({method:"POST",headers:x({"Content-Type":"application/json"},a),body:s},o));case 4:return u=n.sent,n.next=7,k(u);case 7:if(c=n.sent,!u.ok||c.errors||!c.data){n.next=13;break}return d=u.headers,l=u.status,n.abrupt("return",x(x({},c),{},{headers:d,status:l}));case 13:throw new j(x(x({},"string"===typeof c?{error:c}:c),{},{status:u.status,headers:u.headers}),{query:e,variables:t});case 15:case"end":return n.stop()}}),n,this)})));return function(e,t){return n.apply(this,arguments)}}()},{key:"request",value:function(){var n=(0,i.Z)(p().mark((function n(e,t){var i,a,o,s,u,c;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=this.options,a=i.headers,o=(0,r.Z)(i,w),s=JSON.stringify({query:e,variables:t||void 0}),n.next=4,fetch(this.url,x({method:"POST",headers:x({"Content-Type":"application/json"},a),body:s},o));case 4:return u=n.sent,n.next=7,k(u);case 7:if(c=n.sent,!u.ok||c.errors||!c.data){n.next=12;break}return n.abrupt("return",c.data);case 12:throw new j(x(x({},"string"===typeof c?{error:c}:c),{},{status:u.status}),{query:e,variables:t});case 14:case"end":return n.stop()}}),n,this)})));return function(e,t){return n.apply(this,arguments)}}()},{key:"setHeaders",value:function(n){return this.options.headers=n,this}},{key:"setHeader",value:function(n,e){var t=this.options.headers;return t?t[n]=e:this.options.headers=(0,f.Z)({},n,e),this}}]),n}();function Z(){return(Z=(0,i.Z)(p().mark((function n(e,t){var r,i,a,o,s,u;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=h.C?localStorage.getItem("auth-token"):null,i=new O(b,r?{headers:{Authorization:"Bearer ".concat(r)}}:void 0),n.next=4,i.rawRequest(e,t);case 4:if(a=n.sent,o=a.data,s=a.headers,u=a.status,o){n.next=12;break}throw console.error(s),console.error(u),new Error("No data was received!");case 12:return n.abrupt("return",o);case 13:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function k(n){var e=n.headers.get("Content-Type");return e&&e.startsWith("application/json")?n.json():n.text()}e.ZP=function(n,e){return Z.apply(this,arguments)}},2957:function(n,e,t){t.d(e,{C:function(){return r}});var r=window.document&&window.document.createElement},5232:function(n,e,t){t.d(e,{O9:function(){return r},BC:function(){return i}});var r={primary:"#000",primaryContrast:"#FFF",success:"#2ecc71",info:"#3498db",warning:"#FCBF37",danger:"#e74c3c",disabled:"#999999",readOnly:"#ddd"},i={minSmall:"@media (min-width: 576px)",maxSmall:"@media (max-width: 575px)",minMedium:"@media (min-width: 768px)",maxMedium:"@media (max-width: 767px)",minLarge:"@media (min-width: 992px)",maxLarge:"@media (max-width: 991px)",minXLarge:"@media (min-width: 1200px)",maxXLarge:"@media (max-width: 1199px)"}}}]);