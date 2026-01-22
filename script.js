// Active nav highlighting based on current path
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path);
  });
})();

// Smooth scroll for same-page anchors (if any)
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Modal previews
document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-open');
    const modal = document.getElementById(id);
    if(modal){ modal.setAttribute('aria-hidden','false'); }
  });
});
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const modal = btn.closest('.modal');
    modal && modal.setAttribute('aria-hidden','true');
  });
});
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m=>m.setAttribute('aria-hidden','true'));
  }
});
document.querySelectorAll('.modal').forEach(m=>{
  m.addEventListener('click', e=>{
    if(e.target === m) m.setAttribute('aria-hidden','true');
  });
});

// Contact form validation demo
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fields = ['name','email','message'];
    let valid = true;

    fields.forEach(id=>{
      const input = document.getElementById(id);
      const error = document.querySelector(`.error[data-for="${id}"]`);
      if(!input.value.trim()){
        error.textContent = 'This field is required.';
        valid = false;
      } else if(id==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)){
        error.textContent = 'Please enter a valid email.';
        valid = false;
      } else {
        error.textContent = '';
      }
    });

    if(valid){
      // Replace with Netlify Forms or your API call
      alert('Thanks! Your message has been validated locally.');
      form.reset();
    }
  });
}
