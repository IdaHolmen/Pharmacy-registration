!function(){"use strict";const e=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};let t=(e=>{const t=localStorage.getItem("medicinesArray");return JSON.parse(t)})()??[];const r=document.querySelector(".main-container"),i=document.querySelector(".pharmacy-form"),n=document.querySelector(".pharmacy-list"),a=document.querySelector(".header-text"),s=document.querySelector(".product-name"),o=document.querySelector(".manufacturer"),d=document.querySelector(".expiration-date"),c=document.querySelector(".quantity"),u=document.querySelector(".medicine-type"),l=document.querySelector(".display-medicine"),m=(document.querySelector(".display-medicine-container"),document.querySelector(".content-empty-text")),y=document.querySelector(".render-liquids-button"),v=document.querySelector(".render-tablets-button"),b=document.querySelector(".render-capsules-button"),E=document.querySelector(".render-topicals-button"),p=document.querySelector(".navigate-to-form-button"),q=document.querySelector(".navigate-to-display-button"),x=document.querySelector(".submit-button"),f=(document.querySelector(".update-form-container"),document.querySelector(".exit-update-form-button"),document.querySelector(".name-error-message")),C=document.querySelector(".manufacturer-error-message"),h=document.querySelector(".date-error-message"),S=document.querySelector(".quantity-error-message");p.addEventListener("click",(e=>{e.preventDefault(),p.classList.add("navigate-to-form-button--active"),q.classList.remove("navigate-to-display-button--active"),r.style.backgroundColor="#d0f4de",i.style.display="flex",n.style.display="none",a.textContent="Ready to Register some Medicines?"})),q.addEventListener("click",(e=>{e.preventDefault(),q.classList.add("navigate-to-display-button--active"),p.classList.remove("navigate-to-form-button--active"),r.style.backgroundColor="#a9def9",i.style.display="none",n.style.display="flex",a.textContent="Medicines",y.click()})),i.addEventListener("submit",(e=>{e.preventDefault();const{medicineFormStatus:t}=((e,t,r,i,n,a,s,o)=>{const d={errorStatus:!1,nameError:"",manufacturerError:"",dateError:"",quantityError:""};return e||t||r||i?e?t?r?i?(d.errorStatus=!1,d.nameError="",d.manufacturerError="",d.dateError="",d.quantityError="",n.style.visibility="hidden",a.style.visibility="hidden",s.style.visibility="hidden",o.style.visibility="hidden",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError):(d.errorStatus=!0,d.nameError="",d.manufacturerError="",d.dateError="",d.quantityError="Quantity is required ⚠️",n.style.visibility="hidden",a.style.visibility="hidden",s.style.visibility="hidden",o.style.visibility="visible",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError):(d.errorStatus=!0,d.nameError="",d.manufacturerError="",d.dateError="Expiration date is required ⚠️",d.quantityError="",n.style.visibility="hidden",a.style.visibility="hidden",s.style.visibility="visible",o.style.visibility="hidden",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError):(d.errorStatus=!0,d.nameError="",d.manufacturerError="Manufacturer is required ⚠️",d.dateError="",d.quantityError="",n.style.visibility="hidden",a.style.visibility="visible",s.style.visibility="hidden",o.style.visibility="hidden",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError):(d.errorStatus=!0,d.nameError="Product name is required ⚠️",d.manufacturerError="",d.dateError="",d.quantityError="",n.style.visibility="visible",a.style.visibility="hidden",s.style.visibility="hidden",o.style.visibility="hidden",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError):(d.errorStatus=!0,d.nameError="Product name is required ⚠️",d.manufacturerError="Manufacturer is required ⚠️",d.dateError="Expiration date is required ",d.quantityError="Quanitity is required ⚠️",n.style.visibility="visible",a.style.visibility="visible",s.style.visibility="visible",o.style.visibility="visible",n.textContent=d.nameError,a.textContent=d.manufacturerError,s.textContent=d.dateError,o.textContent=d.quantityError),{medicineFormStatus:()=>d.errorStatus}})(s.value,o.value,d.value,c.value,f,C,h,S);if(t())console.log("Form validation failed.");else{let e;e="liquid"===u.value?new M(s.value,o.value,d.value,c.value,u.value):"tablet"===u.value?new D(s.value,o.value,d.value,c.value,u.value):"capsule"===u.value?new k(s.value,o.value,d.value,c.value,u.value):new T(s.value,o.value,d.value,c.value,u.value),M.addMedicine(e),console.log(e),x.classList.add("submit-button--success"),x.textContent="✓ Added",setTimeout((()=>{x.classList.remove("submit-button--success"),x.textContent="Register Medicine"}),2e3),i.reset()}})),y.addEventListener("click",(()=>{w.activeTab="liquid",w.renderMedicines(t,"Liquid Medicines"),L(),y.classList.add("render-liquids-button--active")})),v.addEventListener("click",(()=>{w.activeTab="tablet",w.renderMedicines(t,"Tablet Medicines"),L(),v.classList.add("render-tablets-button--active")})),b.addEventListener("click",(()=>{w.activeTab="capsule",w.renderMedicines(t,"Capsule Medicines"),L(),b.classList.add("render-capsules-button--active")})),E.addEventListener("click",(()=>{w.activeTab="topical",w.renderMedicines(t,"Topical Medicines"),L(),E.classList.add("render-topicals-button--active")}));const L=()=>{y.classList.remove("render-liquids-button--active"),v.classList.remove("render-tablets-button--active"),b.classList.remove("render-capsules-button--active"),E.classList.remove("render-topicals-button--active")};class g{constructor(e,t,r,i,n){this.name=e,this.manufacturer=t,this.date=r,this.quantity=i,this.type=n,this.ID=Date.now()}static addMedicine(r){t.push(r),e("medicinesArray",t)}static deleteMedicine(r,i){const n=i.filter((e=>e.ID!==r));t=n,e("medicinesArray",t),w.renderMedicines(n,w.activeTab)}}class M extends g{constructor(e,t,r,i,n){super(e,t,r,i,n),this.ID=Date.now()}}class D extends g{constructor(e,t,r,i,n){super(e,t,r,i,n),this.ID=Date.now()}}class k extends g{constructor(e,t,r,i,n){super(e,t,r,i,n),this.ID=Date.now()}}class T extends g{constructor(e,t,r,i,n){super(e,t,r,i,n),this.ID=Date.now()}}class w{static activeTab="liquid";static renderMedicines(e,t){(e=>{for(;e&&e.firstChild;)e.removeChild(e.firstChild)})(l);const r=e.filter((e=>e.type===w.activeTab));if(!r.length)return m.style.display="block",m.textContent="No medicines to show.",void l.append(m);m.style.display="none",r.forEach((t=>{const r=document.createElement("div"),i=document.createElement("div"),n=document.createElement("span"),a=document.createElement("span"),s=document.createElement("span"),o=document.createElement("span"),d=document.createElement("span"),c=document.createElement("div"),u=document.createElement("button"),m=document.createElement("img");n.textContent=`Product name: ${t.name}`,a.textContent=`Manufacturer: ${t.manufacturer}`,s.textContent=`Expiration date: ${t.date}`,o.textContent=`Quantity: ${t.quantity}`,d.textContent=`Type of medicine: ${t.type}`,u.textContent="Delete",m.src="../src/assets/trash-sharp-regular.svg",r.classList.add("display-info"),i.classList.add("medicine-div"),c.classList.add("button-container"),u.classList.add("delete-button"),m.classList.add("trash-can-image"),i.dataset.id=t.ID,l.append(r),r.append(i,c),i.append(n,a,s,o,d),c.append(u),u.append(m),u.addEventListener("click",(r=>{r.preventDefault();const i=t.ID;g.deleteMedicine(i,e)}))}))}}}();