document.querySelector(".item-list").addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-icon')) {
        const hasFilledClass = e.target.classList.toggle('filled');
        e.target.innerHTML = hasFilledClass ? '&#9829;' : '&#9825;';
    }
});