(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{7022:function(n,r,e){"use strict";var t,i=e(2209),o=e(5232),a=e(4421).Z.button(t||(t=(0,i.Z)(["\n  background-color: ",";\n  color: ",";\n  border: none;\n\n  padding: 0.5rem 1rem;\n  margin: 1rem "," 1rem 0;\n\n  cursor: pointer;\n\n  &:disabled {\n    background-color: ",";\n    cursor: not-allowed;\n  }\n"])),o.O9.primary,o.O9.primaryContrast,(function(n){return n.marginRight?"1rem":"0"}),o.O9.disabled);r.Z=a},60:function(n,r,e){"use strict";e.d(r,{rS:function(){return t},Yu:function(){return i},UO:function(){return o}});var t="\n  mutation GenerateCertificate($name: String!, $password: String!) {\n    generateCertificate(name: $name, password: $password) {\n      certificate {\n        id\n        name\n        is_revoked\n      }\n      p12\n    }\n  }\n",i="\n  mutation RevokeCertificate($id: ID!) {\n    revokeCertificate(id: $id) {\n      ... on NotFoundException {\n        message\n      }\n\n      ... on RevokeCertificateSuccess {\n        success\n      }\n    }\n  }\n",o="\n  query {\n    crl\n  }\n"},2795:function(n,r,e){"use strict";e.r(r);var t,i=e(2209),o=e(60),a=e(5878),c=e(5073),s=e(7022),d=e(7692),u=(e(7294),e(3552)),l=e(1549),f=e(4421),m=e(2503),h=e(5893),p=f.Z.textarea(t||(t=(0,i.Z)(["\n  width: 100%;\n  font-family: monospace;\n  padding: 1rem;\n"])));r.default=(0,a.t_)((function(){var n=(0,m.ZP)(o.UO,(function(n){return(0,l.ZP)(n)})),r=n.data,e=n.error;return!r||"error"in r?(0,h.jsx)(u.Z,{children:(0,h.jsxs)(d.Z,{children:[(0,h.jsxs)(c.Z,{widths:[1,1,.5,.5,.5],marginRight:.5,children:[(0,h.jsx)("h1",{children:"Certificate Revocation List"}),"Error when loading: ",JSON.stringify(r||e)]}),(0,h.jsx)(c.Z,{widths:[1,1,.5,.5,.5],marginLeft:.5})]})}):(0,h.jsx)(u.Z,{children:(0,h.jsx)(d.Z,{children:(0,h.jsxs)(c.Z,{widths:[1,1,1,1,1],children:[(0,h.jsx)("h1",{children:"Certificate Revocation List"}),(0,h.jsx)(s.Z,{onClick:function(){return function(n){var r=document.createElement("a");r.href="data:application/octet-stream;base64,"+n,r.download="crl.pem",r.click()}(r.crl)},children:"Download List"}),(0,h.jsx)(p,{readOnly:!0,rows:100,value:atob(r.crl)})]})})})}))},3996:function(n,r,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/revocation-list",function(){return e(2795)}])}},function(n){n.O(0,[481,552,774,888,179],(function(){return r=3996,n(n.s=r);var r}));var r=n.O();_N_E=r}]);