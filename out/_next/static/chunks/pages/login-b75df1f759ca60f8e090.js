(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{7022:function(n,e,r){"use strict";var t,o=r(2209),i=r(5232),s=r(4421).Z.button(t||(t=(0,o.Z)(["\n  background-color: ",";\n  color: ",";\n  border: none;\n\n  padding: 0.5rem 1rem;\n  margin: 1rem "," 1rem 0;\n\n  cursor: pointer;\n\n  &:disabled {\n    background-color: ",";\n    cursor: not-allowed;\n  }\n"])),i.O9.primary,i.O9.primaryContrast,(function(n){return n.marginRight?"1rem":"0"}),i.O9.disabled);e.Z=s},3555:function(n,e,r){"use strict";var t,o=r(2209),i=r(5232),s=r(4421).Z.input(t||(t=(0,o.Z)(["\n  border: #000 1px solid;\n  width: 100%;\n\n  padding: 0.25rem 0.5rem;\n  margin: 0.5rem 0;\n\n  &:read-only {\n    background-color: ",";\n    cursor: not-allowed;\n  }\n"])),i.O9.readOnly);e.Z=s},9853:function(n,e,r){"use strict";var t,o=r(2209),i=r(4421).Z.label(t||(t=(0,o.Z)(["\n  display: block;\n"])));e.Z=i},4836:function(n,e,r){"use strict";r.r(e);var t=r(8715),o=r(5878),i=r(374),s=r(4651),u=r(5073),a=r(7022),c=r(7692),l=r(3555),d=r(9853),h=r(7294),f=r(3552),g=r(1549),m=r(5893);e.default=(0,o.t_)((function(){var n=(0,h.useContext)(o.Il),e=(n.user,n.token,(0,h.useState)("")),r=e[0],p=e[1],Z=(0,h.useState)(""),w=Z[0],k=Z[1],y=(0,i.W)(),x=(0,s.useRouter)();(0,h.useEffect)((function(){y&&x.push("/")}),[y]);return(0,h.useEffect)((function(){x.query.token&&!Array.isArray(x.query.token)&&(localStorage.setItem("auth-token",decodeURIComponent(x.query.token)),x.push("/"))}),[x.query]),(0,m.jsx)(f.Z,{children:(0,m.jsxs)(c.Z,{children:[(0,m.jsxs)(u.Z,{widths:[1,1,.5,.5,.5],marginRight:.5,children:[(0,m.jsx)("h1",{children:"Login"}),(0,m.jsx)(d.Z,{children:"User ID"}),(0,m.jsx)(l.Z,{type:"text",value:r,onChange:function(n){return p(n.target.value)}}),(0,m.jsx)(d.Z,{children:"Password"}),(0,m.jsx)(l.Z,{type:"password",value:w,onChange:function(n){return k(n.target.value)}}),(0,m.jsx)(a.Z,{onClick:function(){(0,g.ZP)(t.eK,{username:r,password:w}).then((function(n){if("message"in n.authenticate)return!1;localStorage.setItem("auth-token",n.authenticate.session_id),x.push("/")}))},children:"Login"})," or"," ",(0,m.jsx)(a.Z,{onClick:function(){window.location.href=g.Cq},children:"Login using Certificate"})]}),(0,m.jsxs)(u.Z,{widths:[1,1,.5,.5,.5],marginLeft:.5,children:[(0,m.jsx)("h1",{children:"Information"}),"You can either log in using your user ID and your password or using a TLS certificate. CA Administrators must always log in using their TLS certificate."]})]})})}))},7237:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return r(4836)}])}},function(n){n.O(0,[481,552,774,888,179],(function(){return e=7237,n(n.s=e);var e}));var e=n.O();_N_E=e}]);