function updateCharCount() {
  const isCount50OrAbove = textarea.value.length >= 50;
  textarea.value = isCount50OrAbove ? textarea.value.slice(0, 50) : textarea.value;
  para.style.color = isCount50OrAbove ? 'red' : '';
  span.textContent = isCount50OrAbove ? '50/50' : `${textarea.value.length}/50`;
}

const textarea = document.getElementById('text-input');
const span = document.getElementById('count');
const para = document.getElementById('char-count');

textarea.addEventListener('input', updateCharCount);