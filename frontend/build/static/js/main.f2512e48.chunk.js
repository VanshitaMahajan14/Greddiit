(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,a,t){e.exports=t(32)},,,,,,,,function(e,a,t){},function(e,a,t){e.exports=t.p+"static/media/logo.06e73328.svg"},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){e.exports=t.p+"static/media/cat.67f6dce8.jpg"},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),c=t(16),r=t.n(c),s=(t(25),t(3)),i=(t(26),t(27),t(1)),m=function(e){var a=Object(i.m)(),t=Object(l.useState)(""),c=Object(s.a)(t,2),r=c[0],m=c[1],o=Object(l.useState)(""),u=Object(s.a)(o,2),d=u[0],E=u[1];return Object(l.useEffect)(function(){"true"===localStorage.getItem("logged")&&a("/Profile")},[]),n.a.createElement("div",{class:"login"},n.a.createElement("h1",{class:"formname"},"Login Page"),n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(r)},action:"",class:"formhai"},n.a.createElement("div",{class:"user-box"},n.a.createElement("label",{htmlFor:"email"},"Email"),n.a.createElement("input",{class:"text",value:r,onChange:function(e){return m(e.target.value)},type:"text",name:"email",id:"email"})),n.a.createElement("div",{class:"user-box"},n.a.createElement("label",{htmlFor:"email"},"Password"),n.a.createElement("input",{class:"text",value:d,onChange:function(e){return E(e.target.value)},type:"text",name:"password",id:"password"})),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("button",{class:"bt",type:"submit",onClick:function(){"admin"===r&&"admin"===d?(localStorage.setItem("logged",!0),a("/Profile")):alert("Wrong Credentials")}},"Login"),n.a.createElement("button",{class:"reg",onClick:function(){return e.onFormSwitch("register")}},"Don't have an account? Register")))},o=(t(28),function(e){var a=Object(l.useState)(""),t=Object(s.a)(a,2),c=(t[0],t[1],Object(l.useState)("")),r=Object(s.a)(c,2),i=(r[0],r[1],Object(l.useState)("")),m=Object(s.a)(i,2),o=(m[0],m[1],Object(l.useState)("")),u=Object(s.a)(o,2),d=(u[0],u[1],Object(l.useState)("")),E=Object(s.a)(d,2),g=E[0],f=E[1],p=Object(l.useState)(""),h=Object(s.a)(p,2),b=(h[0],h[1],Object(l.useState)("")),v=Object(s.a)(b,2),y=v[0],x=v[1];return n.a.createElement("div",{className:"RegForm"},n.a.createElement("h1",{class:"formname"},"Create Account"),n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(g)},action:""},n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"First Name"),n.a.createElement("input",{class:"text",type:"text",name:"First Name"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"Last Name"),n.a.createElement("input",{class:"text",type:"text",name:"Last Name"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"User Name"),n.a.createElement("input",{class:"text",type:"text",name:"UserName"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"Age"),n.a.createElement("input",{class:"text",type:"text",name:"Age"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"Email"),n.a.createElement("input",{class:"text",value:g,onChange:function(e){return f(e.target.value)},type:"text",name:"Email"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"Contact"),n.a.createElement("input",{class:"text",type:"text",name:"Contact"})),n.a.createElement("div",{class:"reg-box"},n.a.createElement("label",{htmlFor:""},"Password"),n.a.createElement("input",{class:"text",value:y,onChange:function(e){return x(e.target.value)},type:"text",name:"Password"})),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("button",{class:"bt",type:"submit"},"Register"),n.a.createElement("button",{class:"reg",onClick:function(){return e.onFormSwitch("login")}},"Already have an account? Login")))}),u=(t(29),t(30),function(e){var a=e.followers,t=e.closeModal;return n.a.createElement("div",{className:"modal-overlay"},n.a.createElement("div",{className:"modal-content"},n.a.createElement("h2",null,"Followers"),n.a.createElement("ul",null,a.map(function(e){return n.a.createElement("li",{key:e.id},e.name)})),n.a.createElement("button",{onClick:t},"Close")))}),d=function(e){var a=e.following,t=e.closeModal;return n.a.createElement("div",{className:"modal-overlay"},n.a.createElement("div",{className:"modal-content"},n.a.createElement("h2",null,"Followers"),n.a.createElement("ul",null,a.map(function(e){return n.a.createElement("li",{key:e.id},e.name)})),n.a.createElement("button",{onClick:t},"Close")))},E=[{id:"id1",name:"BelugaFan"},{id:"id2",name:"BelugaNeighbour"},{id:"id3",name:"BelugaMoM"}],g=[{id:"id1",name:"BelugaFan"},{id:"id2",name:"BelugaNeighbour"},{id:"id3",name:"BelugaMoM"}],f=function(){var e=Object(i.m)();Object(l.useEffect)(function(){"false"!==localStorage.getItem("logged")&&localStorage.getItem("logged")||(console.log("lae chak mai agya"),e("/"));var a=localStorage.getItem("userName");a&&y(a);var t=localStorage.getItem("userBio");t&&w(t)},[]);var a=Object(l.useState)(!1),t=Object(s.a)(a,2),c=t[0],r=t[1],m=Object(l.useState)(!1),o=Object(s.a)(m,2),f=o[0],p=o[1],h=Object(l.useState)(localStorage.getItem("userName")||"Thecoolcat"),b=Object(s.a)(h,2),v=b[0],y=b[1],x=Object(l.useState)(localStorage.getItem("userBio")||"I am Beluga - your favourite cat"),j=Object(s.a)(x,2),S=j[0],w=j[1];return n.a.createElement("div",null,n.a.createElement("div",{class:"container"},n.a.createElement("div",{class:"profile"},n.a.createElement("div",{class:"profile-image"},n.a.createElement("img",{src:"https://cdn.pixabay.com/photo/2022/09/19/20/39/cat-7466428__340.jpg",alt:""})),n.a.createElement("div",{class:"profile-user-settings"},n.a.createElement("h1",{class:"profile-user-name"},v),n.a.createElement("button",{class:"btn profile-edit-btn",onClick:function(){var e=prompt("Enter new name:");y(e),localStorage.setItem("userName",e);var a=prompt("Enter new Bio:");w(a),localStorage.setItem("userBio",a)}},"Edit Profile")),n.a.createElement("div",{class:"profile-stats"},n.a.createElement("button",{class:"Posts"},"Posts"),n.a.createElement("button",{class:"Followers",onClick:function(){return r(!c)}},"Followers"),n.a.createElement("button",{class:"Following",onClick:function(){return p(!f)}},"Following")),c?n.a.createElement(u,{followers:E,closeModal:function(){return r(!1)}}):null,f?n.a.createElement(d,{following:g,closeModal2:function(){return p(!1)}}):null,n.a.createElement("div",null,n.a.createElement("button",{class:"logout",onClick:function(){localStorage.removeItem("userName"),localStorage.removeItem("userBio"),localStorage.setItem("logged",!1),e("/")}},"Logout")),n.a.createElement("div",{class:"profile-bio"},n.a.createElement("p",null,S)))),n.a.createElement("div",{class:"container"},n.a.createElement("div",{class:"gallery"},n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 89"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 5")))),n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-type"},n.a.createElement("span",{class:"visually-hidden"},"Video"),n.a.createElement("i",{class:"fas fa-video","aria-hidden":"true"})),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 38"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 0")))),n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 94"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 3")))),n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 66"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 2")))),n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 45"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 0")))),n.a.createElement("div",{class:"gallery-item",tabindex:"0"},n.a.createElement("img",{src:"https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop",class:"gallery-image",alt:""}),n.a.createElement("div",{class:"gallery-item-info"},n.a.createElement("ul",null,n.a.createElement("li",{class:"gallery-item-likes"},n.a.createElement("span",{class:"visually-hidden"},"Likes:"),n.a.createElement("i",{class:"fas fa-heart","aria-hidden":"true"})," 41"),n.a.createElement("li",{class:"gallery-item-comments"},n.a.createElement("span",{class:"visually-hidden"},"Comments:"),n.a.createElement("i",{class:"fas fa-comment","aria-hidden":"true"})," 0")))))))},p=(t(31),t(5)),h=function(){var e=Object(l.useState)("login"),a=Object(s.a)(e,2),t=a[0],c=a[1],r=function(e){c(e)};return n.a.createElement(p.a,null,n.a.createElement("div",{className:"returnpage"},n.a.createElement(i.c,null,n.a.createElement(i.a,{path:"/",element:"login"===t?n.a.createElement(m,{onFormSwitch:r}):n.a.createElement(o,{onFormSwitch:r})}),n.a.createElement(i.a,{path:"/Profile",element:n.a.createElement(f,null)}))))},b=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,33)).then(function(a){var t=a.getCLS,l=a.getFID,n=a.getFCP,c=a.getLCP,r=a.getTTFB;t(e),l(e),n(e),c(e),r(e)})};r.a.render(n.a.createElement(h,null),document.getElementById("root")),b()}],[[17,1,2]]]);
//# sourceMappingURL=main.f2512e48.chunk.js.map