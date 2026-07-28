// Galeri Lightbox
document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');
  const modalCaption = document.getElementById('galleryModalCaption');
  const closeBtn = document.getElementById('galleryClose');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    updateModal();
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  function updateModal() {
    const img = galleryImages[currentIndex];
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModal();
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateModal();
  }
  galleryImages.forEach((img, idx) => {
    img.addEventListener('click', () => openModal(idx));
  });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  window.addEventListener('keydown', function(e) {
    if (modal && modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeModal();
    }
  });
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
});
// script.js - Cursed In Eternity
// Tüm sayfa geçişleri, galeri ve sayaç fonksiyonları burada

function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  }
}

function startCountdown() {
  const countdowns = document.querySelectorAll('.countdown-box');
  countdowns.forEach(cd => {
    const releaseDate = new Date(cd.getAttribute('data-date')).getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const distance = releaseDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      cd.querySelector('.days').textContent = days.toString().padStart(2, '0');
      cd.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
      cd.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
      cd.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
      if (distance < 0) {
        cd.innerHTML = "<span style='color:#8cd0ff;'>Albüm Çıktı!</span>";
      }
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  showSection('home');
  startCountdown();
});
