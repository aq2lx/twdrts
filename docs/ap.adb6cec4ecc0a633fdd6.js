var ap=function(t){var e={};function n(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function c(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}var i={Modal:function(){function t(e){a(this,t),this.el=document.getElementById(e)}return c(t,[{key:"show",value:function(){this.el.classList.add("md-show")}},{key:"hide",value:function(){this.el.classList.remove("md-show")}},{key:"toggle",value:function(){this.el.classList.toggle("md-show")}}]),t}(),Table:function(){function t(e){a(this,t),(this.el=document.createElement("table")).className=e}return c(t,[{key:"addRow",value:function(t){for(var e=document.createElement("tr"),n=0;n<t.length;n++)e.appendChild(t[n]);return this.el.appendChild(e),this}},{key:"addCol",value:function(t){var e=document.createElement("td");return t.hasOwnProperty("class")&&(e.className=t.class),t.hasOwnProperty("id")&&(e.id=t.id),t.hasOwnProperty("text")&&(e.innerHTML=t.text),t.hasOwnProperty("child")&&e.appendChild(t.child),t.hasOwnProperty("rowspan")&&e.setAttribute("rowspan",t.rowspan),t.hasOwnProperty("colspan")&&e.setAttribute("colspan",t.colspan),e}}]),t}(),SelectTraits:function(){function t(e){var n=this;a(this,t),this.el=document.getElementById(e),this.bottons=this.el.querySelectorAll("button"),this.btnApply=document.getElementById("btn-apply-traits"),this.active=[],[].forEach.call(this.bottons,function(t){t.onclick=function(){var e=t.dataset.trait;if(e.match(/all|melee|range/))for(var a=n.active.length;a--;)n.remove(n.active[a]);else{if(!e.match(/fast|strong|alert|tough/))return!1;for(var r=n.active.length;r--;)n.active[r].match(/fast|strong|alert|tough/)||n.remove(n.active[r])}n.toggle(t)}})}return c(t,[{key:"toggle",value:function(t){var e=t.dataset.trait;t.classList.toggle("active");var n=this.active.indexOf(e);return-1==n?this.active.push(e):this.active.splice(n,1),this}},{key:"remove",value:function(t){var e=this.active.indexOf(t),n=this.el.querySelector("[data-trait=".concat(t,"]"));this.active.splice(e,1),n.classList.remove("active")}}]),t}()};e.a=i},,,,,,function(t,e,n){"use strict";n.r(e),n.d(e,"AdrenalineRush",function(){return i});var a=n(0);n(7);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={apAtttack:20,methodAPMultiple:{atk:1,def:1.4},bg:{fast:"#c18c00",strong:"#415c1c",alert:"#981014",tough:"#003466"}},i={state:{leaderAP:0,buffLeaderTxt:"none",member:[]},init:function(){this.defineEl().iniEvents().iniModal().mergeOptions().bootstrap().calculateAll()},mergeOptions:function(){return this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){r(t,e,n[e])})}return t}({},this.state,{method:"atk",member:[{trait:"fast"},{trait:"strong"},{trait:"alert"},{trait:"tough"},{trait:"fast"}]}),this},defineEl:function(){return this.el={modalSetAPBuff:new a.a.Modal("modal-set-ap-buff"),leaderTrait:new a.a.SelectTraits("leader-trait"),selectTraits:document.querySelectorAll('[data-el="select-trait"]'),showBuff:document.getElementById("show-buff")},this},iniEvents:function(){for(var t=this,e=function(e){var n=t.el.selectTraits[e].nextElementSibling;t.el.selectTraits[e].onclick=function(){n.classList.toggle("show")};for(var a=n.querySelectorAll("li"),r=function(r){a[r].onclick=function(){var c=a[r].dataset.trait;t.state.member[e].trait!==c&&t.setTrait(e,c),n.classList.remove("show")}},c=0;c<a.length;c++)r(c)},n=0;n<this.el.selectTraits.length;n++)e(n);document.getElementById("buff").onclick=function(){t.el.modalSetAPBuff.show()},this.el.leaderTrait.btnApply.onclick=function(){t.applyBuff()};var a=document.querySelectorAll('input[name="method"]'),r=document.querySelectorAll('input[name="special-apf"]');[].slice.call(a).concat([].slice.call(r)).forEach(function(e){e.onchange=function(){t.calculateAll()}});for(var c=document.querySelectorAll('select[name="weapon-ap"]'),i=function(e){c[e].onchange=function(){t.calculateAP(e)}},o=0;o<c.length;o++)i(o);var l=document.querySelectorAll('select[name="ipt-ap"]'),s=function(e){l[e].onchange=function(){t.calculateAP(e)}};for(o=0;o<l.length;o++)s(o);var u=document.querySelectorAll('input[name="special-apt"]'),h=function(e){u[e].onchange=function(){t.calculateAP(e)}};for(o=0;o<u.length;o++)h(o);var f=document.querySelectorAll('input[name="ap-gain"]'),d=function(e){f[e].oninput=function(){this.value>100&&(this.value=100)},f[e].onkeyup=function(){t.calculateAP(e)}};for(o=0;o<f.length;o++)d(o);return this},iniModal:function(){var t=this;return document.getElementById("btn-close-md").onclick=function(){t.el.modalSetAPBuff.hide()},this},bootstrap:function(){document.getElementById("method-".concat(this.state.method)).checked=!0;for(var t=0;t<this.state.member.length;t++)this.setTrait(t,this.state.member[t].trait);return this},setTrait:function(t,e){this.el.selectTraits[t].className=this.el.selectTraits[t].className.replace(/fast|strong|alert|tough/,e),document.getElementById("m".concat(t)).style.backgroundColor=c.bg[e];var n=document.getElementById("spf".concat(t)),a=document.getElementById("spt".concat(t)),r=document.getElementById("chk-arf".concat(t)),i=document.getElementById("chk-art".concat(t));r.checked=!1,i.checked=!1,{fast:function(){n.classList.remove("hide"),a.classList.add("hide")},strong:function(){n.classList.add("hide"),a.classList.add("hide")},alert:function(){n.classList.add("hide"),a.classList.add("hide")},tough:function(){n.classList.add("hide"),a.classList.remove("hide")}}[e](),this.state.member[t].trait=e,this.calculateAll()},applyBuff:function(){this.el.showBuff.innerHTML="";for(var t=0;t<this.el.leaderTrait.active.length;t++){var e=this.el.leaderTrait.active[t];if(e.match(/all|melee|range/))this.el.showBuff.innerHTML+='<span class="clr-amber">'.concat(e,"</span> ");else{if(!e.match(/fast|strong|alert|tough/))return!1;this.el.showBuff.innerHTML+='<i class="icon icon-trait i-sm icon-trait-'.concat(e,'"></i> ')}}var n=document.querySelector('input[name="ipt-apa"]:checked').dataset.txt;this.el.showBuff.innerHTML+="".concat(n," AP Atk"),this.state.leaderAP=parseFloat(document.querySelector('input[name="ipt-apa"]:checked').value),this.el.modalSetAPBuff.hide(),this.calculateAll()},getAPLeader:function(t){var e=this.el.leaderTrait.active,n=this.state.leaderAP;if("all"===e[0])return n;if("melee"===e[0]&&this.state.member[t].trait.match(/fast|strong/))return n;if("range"===e[0]&&this.state.member[t].trait.match(/alert|tough/))return n;for(var a=0;a<e.length;a++)if(e[a]===this.state.member[t].trait)return n;return 0},getRechargeRate:function(t){return parseInt(document.getElementById("ipt-ap".concat(t)).value,10)},getAPWeapon:function(t){return parseFloat(document.getElementById("w".concat(t)).value)},getAPReceived:function(t){var e=parseInt(document.getElementById("ipt-gain".concat(t)).value,10)||0,n=this.getAPPercentage(this.getRechargeRate(t),e),a=document.getElementById("apg".concat(t));return n?(a.classList.add("show"),a.innerHTML="+".concat(n)):a.classList.remove("show"),n},getAPSpecialFast:function(t){for(var e=document.querySelectorAll('input[name="special-apf"]:checked'),n=0,a=0;a<e.length;a++){var r=parseInt(e[a].value,10);n+=this.getAPPercentage(this.getRechargeRate(t),r)}var c=document.getElementById("apwf".concat(t));return n?(c.classList.add("show"),c.innerHTML="+".concat(n)):c.classList.remove("show"),n},getAPSpecialTough:function(t){if("tough"===this.state.member[t].trait){var e=document.getElementById("chk-art".concat(t)),n=document.getElementById("apwt".concat(t));if(e.checked){var a=parseInt(e.value,10),r=this.getAPPercentage(this.getRechargeRate(t),a);return r&&(n.classList.add("show"),n.innerHTML="+".concat(r)),r}return n.classList.remove("show"),0}return 0},getMethod:function(){return parseFloat(c.methodAPMultiple[document.querySelector('input[name="method"]:checked').value])},getAPPercentage:function(t,e){return Math.ceil(t*parseInt(e,10)/100)},calculateAll:function(){for(var t=0;t<=4;t++)this.calculateAP(t)},calculateAP:function(t){this.report(t,this.calculateNode(t),this.getAPReceived(t)+this.getAPSpecialFast(t)+this.getAPSpecialTough(t))},calculateNode:function(t){return parseFloat(((c.apAtttack+this.getAPLeader(t)+this.getAPWeapon(t))*this.getMethod()).toFixed(2))},report:function(t,e,n){this.reportFT(t,e,n),this.reportApPerTurn(t,e)},reportFT:function(t,e,n){for(var a=document.getElementById("rft".concat(t)),r=this.getRechargeRate(t),c=0,i=0;i<r;)i+=e,c++;if(n){for(var o=0;n<r;)n+=e,o++;a.innerHTML=o}else a.innerHTML=c},reportApPerTurn:function(t,e){document.getElementById("apt".concat(t)).innerHTML=e}}},function(t,e,n){}]);