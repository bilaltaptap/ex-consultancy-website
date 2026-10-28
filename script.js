// Mobile menu
const nav = document.getElementById("nav");
const toggle = document.getElementById("menuToggle");
toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  toggle.innerHTML = nav.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

// Header shadow + active link on scroll
const header = document.getElementById("header");
const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
const sections = links.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  let current = sections[0];
  sections.forEach(s => { if (window.scrollY + 120 >= s.offsetTop) current = s; });
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
});

// Testimonial slider
const slides = document.querySelectorAll(".testi-slide");
const dots = document.querySelectorAll("#testiDots button");
let idx = 0;
function show(i) {
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("active", n === idx));
  dots.forEach((d, n) => d.classList.toggle("active", n === idx));
}
document.getElementById("testiPrev").onclick = () => show(idx - 1);
document.getElementById("testiNext").onclick = () => show(idx + 1);
dots.forEach((d, n) => d.onclick = () => show(n));
setInterval(() => show(idx + 1), 6000);

// Counters + reveal on scroll
const counted = new WeakSet();
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    e.target.querySelectorAll("[data-count]").forEach(el => {
      if (counted.has(el)) return;
      counted.add(el);
      const target = +el.dataset.count;
      const start = performance.now();
      const step = t => {
        const p = Math.min((t - start) / 1200, 1);
        el.textContent = Math.round(target * p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
}, { threshold: 0.2 });
document.querySelectorAll(".services, .about, .industries, .testi-cta, .contact").forEach(s => {
  s.classList.add("reveal");
  io.observe(s);
});

// Contact form -> opens WhatsApp with the message prefilled (no backend needed)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Hello! I'd like a free consultation.%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AEmail: ${f.get("email")}%0AService: ${f.get("service")}%0AMessage: ${f.get("message")}`;
  document.getElementById("formNote").textContent = "Thank you! Opening WhatsApp to send your request…";
  window.open(`https://wa.me/923001234567?text=${text}`, "_blank");
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
