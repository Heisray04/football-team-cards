const fullImages = [
  { src: 'https://cdn.freecodecamp.org/curriculum/labs/stonehenge.jpg', alt: 'stonehenge'},
  { src: 'https://cdn.freecodecamp.org/curriculum/labs/storm.jpg', alt: 'storm'},
  { src: 'https://cdn.freecodecamp.org/curriculum/labs/trees.jpg', alt: 'trees'}
];

const gallery = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox-image');

gallery.addEventListener('click', (e) => {
  if (!e.target.alt) return;
  const image = fullImages.filter((img) => e.target.alt === img.alt)[0];
  lightbox.style.display = 'flex';
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
});

lightbox.addEventListener('click', (e) => {
  if (e.target.alt) return;
  lightbox.style.display = 'none';
});