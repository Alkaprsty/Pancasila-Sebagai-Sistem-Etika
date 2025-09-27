document.addEventListener('DOMContentLoaded', () => {
  
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentSlideSpan = document.getElementById('currentSlide');
  const totalSlidesSpan = document.getElementById('totalSlides');
  const progressBar = document.getElementById('progressBar');
  const bgBlur = document.getElementById('bgBlur');
  const downloadBtn = document.getElementById('downloadBtn');

  
  if (!slides || slides.length === 0) return;

  if (totalSlidesSpan) totalSlidesSpan.textContent = totalSlides;
  updateSlide(); 

  
  function updateBackground(index) {
    if (!bgBlur) return;
  
    const bg = getComputedStyle(slides[index]).backgroundImage;
    bgBlur.style.backgroundImage = bg || 'none';
  }

  function updateSlide() {
  
    slides.forEach(s => s.classList.remove('active'));
    slides[currentSlideIndex].classList.add('active');

  
    if (currentSlideSpan) currentSlideSpan.textContent = (currentSlideIndex + 1);

  
    if (progressBar) {
      const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = progress + '%';
    }

  
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

  
    updateBackground(currentSlideIndex);
  }

  function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < totalSlides) {
      currentSlideIndex = newIndex;
      updateSlide();
    }
  }

  
  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        if (currentSlideIndex < totalSlides - 1) changeSlide(1);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (currentSlideIndex > 0) changeSlide(-1);
        event.preventDefault();
        break;
      case 'Home':
        currentSlideIndex = 0; updateSlide(); event.preventDefault(); break;
      case 'End':
        currentSlideIndex = totalSlides - 1; updateSlide(); event.preventDefault(); break;
    }
  });

  
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlideIndex < totalSlides - 1) changeSlide(1);
      else if (diff < 0 && currentSlideIndex > 0) changeSlide(-1);
    }
  }, { passive: true });

  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

  
      downloadBtn.textContent = "THANK YOU!!";

  
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 200,
          spread: 90,
          startVelocity: 40,
          origin: { y: 0.6 }
        });
      } else {
  
        console.warn('canvas-confetti belum dimuat — tambahkan CDN script jika mau efek.');
      }

  
      const url = "img/Makalah Pancasila Sebagai Sistem Etika Kelompok 8.pdf";
      const a = document.createElement('a');
      a.href = url;
      a.download = "Makalah Pancasila Sebagai Sistem Etika Kelompok 8.pdf";
      document.body.appendChild(a);  
      a.click();
  
      setTimeout(() => {
        document.body.removeChild(a);
      }, 50);
    });
  }

  
  

let isScrolling = false;
const scrollDelay = 1000; 
const scrollThreshold = 40;

document.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  let direction = 0;

  
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    if (e.deltaY > scrollThreshold) direction = 1;
    else if (e.deltaY < -scrollThreshold) direction = -1;
  } 
  
  else {
    if (e.deltaX > scrollThreshold) direction = 1;
    else if (e.deltaX < -scrollThreshold) direction = -1;
  }

  if (direction !== 0) {
    changeSlide(direction);
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, scrollDelay);
  }
}, { passive: true });




  
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});
