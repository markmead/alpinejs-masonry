function r(t){let o=parseFloat(getComputedStyle(t).gap),i=getComputedStyle(t).gridTemplateRows.split(" ").length,n=[...t.childNodes].filter(e=>e.nodeType===1),s=n.length/i;n.forEach(e=>e.style.removeProperty("margin-top")),s!==1&&n.forEach(function(e,a){let p=n[a-s];if(!p)return;let d=e.getBoundingClientRect().top,u=p.getBoundingClientRect().bottom,c=d-u;c!==o&&(e.style.marginTop=`-${c-o}px`)})}function m(t){t.directive("masonry",(o,{},{cleanup:i})=>{r(o),window.addEventListener("resize",()=>r(o)),i(()=>{window.removeEventListener("resize",r)})})}var v=m;export{v as default};
