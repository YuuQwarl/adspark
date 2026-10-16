// ===== SCRIPT.JS: mengatur INTERAKSI (tombol, animasi, validasi) =====

// 1. Fungsi singkat: $('#id') = ambil elemen HTML berdasarkan id
var $=function(s){return document.querySelector(s)};
var root=document.documentElement;
// 2. Ingat pilihan tema (terang/gelap) di browser, lalu pakai lagi saat web dibuka
try{var t=localStorage.getItem('adspark-theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
// 3. Tombol tema: klik untuk ganti terang/gelap
$('#th').onclick=function(){
var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
var n=dark?'light':'dark';root.setAttribute('data-theme',n);
try{localStorage.setItem('adspark-theme',n)}catch(e){}
};
// 4. Tombol menu HP (☰): buka/tutup menu
$('#mb').onclick=function(){$('#nav').classList.toggle('open')};
document.querySelectorAll('nav a').forEach(function(a){a.onclick=function(){$('#nav').classList.remove('open')}});
// 5. Angka statistik menghitung naik (0 sampai target)
function count(el){var to=+el.dataset.n,s=el.dataset.s,st=null;
function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/1200,1);el.textContent=Math.floor(to*p).toLocaleString('en-US')+(p===1?s:'');if(p<1)requestAnimationFrame(step)}
requestAnimationFrame(step)}
// 6. Grafik di mockup HP naik saat halaman dibuka
function bars(){document.querySelectorAll('#bars i').forEach(function(b){b.style.height=b.dataset.h+'%'})}
setTimeout(bars,300);
// 7. Animasi muncul saat bagian terlihat di layar (IntersectionObserver)
var io=new IntersectionObserver(function(es){es.forEach(function(e){
if(e.isIntersecting){e.target.classList.add('show');
e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
// 8. Menu menyala sesuai bagian yang sedang dilihat
var secs=document.querySelectorAll('main [id]'),links=document.querySelectorAll('nav a');
addEventListener('scroll',function(){var y=scrollY+120,cur='home';
secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)})});
// 9. Form: cek nama & email sebelum menampilkan pesan terima kasih
$('#f').addEventListener('submit',function(e){
e.preventDefault();var m=$('#msg'),n=$('#nm').value.trim(),em=$('#em').value.trim();
if(!n){m.textContent='Please enter your name.';return}
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){m.textContent='Please enter a valid email.';return}
m.textContent='Thank you, '+n+'! We will contact you at '+em+'.';this.reset();
});
