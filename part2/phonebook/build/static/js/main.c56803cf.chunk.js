(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),r=t.n(c),o=t(14),l=t(2),i=function(e){return u.a.createElement("div",null,e.text,u.a.createElement("input",{value:e.value,onChange:e.onChange}))},m=function(e){return u.a.createElement("div",null,u.a.createElement("form",{onSubmit:e.onSubmit},u.a.createElement("div",null,"name:",u.a.createElement("input",{value:e.nameValue,onChange:e.nameOnChange})),u.a.createElement("div",null,"number:",u.a.createElement("input",{value:e.numberValue,onChange:e.numberOnChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},f=function(e){var n=e.name,t=e.number,a=e.onClick;return u.a.createElement("li",null,n," ",t,u.a.createElement("button",{onClick:a},"remove"))},s=function(e){return u.a.createElement("ul",null,e.persons.map((function(n){return u.a.createElement(f,{key:n.id,name:n.name,number:n.number,onClick:function(){return e.onClick(n)}})})))},d=function(e){var n=e.message,t=e.className;return null===n?null:u.a.createElement("div",{className:t},n)},b=t(3),h=t.n(b),v="/api/persons",E=function(){return h.a.get(v).then((function(e){return e.data}))},p=function(e){return h.a.post(v,e).then((function(e){return e.data}))},O=function(e){return h.a.delete("".concat(v,"/").concat(e))},g=function(e,n){return h.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},C=(t(37),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),f=Object(l.a)(r,2),b=f[0],h=f[1],v=Object(a.useState)(""),C=Object(l.a)(v,2),j=C[0],w=C[1],k=Object(a.useState)(""),S=Object(l.a)(k,2),y=S[0],N=S[1],T=Object(a.useState)(null),V=Object(l.a)(T,2),x=V[0],J=V[1],L=Object(a.useState)(null),R=Object(l.a)(L,2),A=R[0],B=R[1];Object(a.useEffect)((function(){E().then((function(e){return c(e)}))}),[]);var D=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(d,{message:x,className:"success"}),u.a.createElement(d,{message:A,className:"error"}),u.a.createElement(i,{text:"filter shown with:",value:y,onChange:function(e){N(e.target.value)}}),u.a.createElement("h3",null,"add a new"),u.a.createElement(m,{onSubmit:function(e){e.preventDefault();var n={name:b,number:j};if(t.map((function(e){return e.name})).includes(n.name)){if(window.confirm("".concat(n.name," is already in the phonebook, ")+"replace old number with a new one?")){var a=t.find((function(e){return e.name===n.name})),u=Object(o.a)({},a,{number:j});g(u.id,u).then((function(e){c(t.map((function(n){return n.id===e.id?u:n}))),h(""),w("")})).then((function(){J("Updated ".concat(u.name,"'s number")),setTimeout((function(){J(null)}),5e3)})).catch((function(e){B("".concat(u.name," has been removed from the server")),setTimeout((function(){B(null)}),5e3),c(t.filter((function(e){return e.id!==u.id})))}))}}else p(n).then((function(e){c(t.concat(e)),h(""),w("")})).then((function(){J("Added ".concat(n.name)),setTimeout((function(){J(null)}),5e3)}))},nameValue:b,nameOnChange:function(e){h(e.target.value)},numberValue:j,numberOnChange:function(e){w(e.target.value)}}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(s,{persons:D,onClick:function(e){window.confirm("Remove ".concat(e.name,"?"))&&O(e.id).then((function(){return c(t.filter((function(n){return n.id!==e.id})))})).then((function(){J("Removed ".concat(e.name)),setTimeout((function(){J(null)}),5e3)})).catch((function(n){B("".concat(e.name," has already been removed")),setTimeout((function(){B(null)}),5e3),c(t.filter((function(n){return n.id!==e.id})))}))}}))});r.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(C,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.c56803cf.chunk.js.map