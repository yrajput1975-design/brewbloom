// Safe GA4 event helper
function track(name, params){ if(typeof gtag==='function'){ gtag('event', name, params||{}); } }

// Product button clicks -> select_item
document.querySelectorAll('[data-item-id]').forEach(function(b){
  b.addEventListener('click', function(){
    track('select_item', {item_list_name:'Products', items:[{item_id:b.dataset.itemId, item_name:b.dataset.itemName, price:Number(b.dataset.price), currency:'INR'}]});
    var m=document.getElementById('msg'); if(m){ m.textContent='Demo: details for '+b.dataset.itemName+' coming soon!'; }
  });
});

// Category filters
document.querySelectorAll('.chip').forEach(function(c){
  c.addEventListener('click', function(){
    document.querySelectorAll('.chip').forEach(function(x){x.classList.remove('active')}); c.classList.add('active');
    document.querySelectorAll('.card').forEach(function(card){ card.style.display=(c.dataset.filter==='all'||card.dataset.cat===c.dataset.filter)?'':'none'; });
  });
});

// Demo forms with validation (demo_form_submit, not generate_lead/sign_up, since nothing is really delivered)
function handleForm(id, formName, ids){
  var f=document.getElementById(id); if(!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault(); var s=f.querySelector('.status'), ok=true;
    ids.forEach(function(i){ var el=document.getElementById(i); if(!el.value.trim() || (el.type==='email' && !/^\S+@\S+\.\S+$/.test(el.value))) ok=false; });
    if(!ok){ s.textContent='Please fill all fields with valid values.'; s.className='status err'; return; }
    s.textContent='Thanks! (Demo only – nothing was sent.)'; s.className='status ok';
    track('demo_form_submit', {form_name:formName}); f.reset();
  });
}
handleForm('contactForm','contact_enquiry',['name','email','subject','message']);
handleForm('newsForm','newsletter',['nemail']);
