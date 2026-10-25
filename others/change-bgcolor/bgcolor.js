const colors = [ 
    {name: 'Magenta', hexa: '#ff00ff'}, {name: 'Gray', hexa: '#808080'}, {name: 'Navy', hexa: '#000080'},
    {name: 'Lime', hexa: '#32cd32'}, {name: 'Teal', hexa: '#008080'}, {name: 'Gold', hexa: '#ffd700'},
    {name: 'Pink', hexa: '#ffc0cb'}, {name: 'Purple', hexa: '#800080'}, {name: 'Orange', hexa: '#ffa500'},
    {name: 'Silver', hexa: '#c0c0c0'}, {name: 'Green', hexa: '#00ff00'}, {name: 'Yellow', hexa: '#ffff00'},
    {name: 'Blue', hexa: '#0000ff'}, {name: 'Brown', hexa: '#a52a2a'}, {name: 'Turquoise', hexa: '#40e0d0'},
    {name: 'Emerald', hexa: '#2ecc71'}, {name: 'Lavender', hexa: '#e6e6fa'}, {name: 'Coral', hexa: '#ff7f50'},
    {name: 'Red', hexa: '#ff0000'}, {name: 'Crimson', hexa: '#dc143c'}, {name: 'Cyan', hexa: '#00ffff'},
    {name: 'black', hexa: '#000000'}, {name: 'Navy Blue', hexa: '#001f3f'}, {name: 'Royal Blue', hexa: '#4169e1'}
];
const darkColors = ['black', 'Navy', 'Navy Blue', 'Blue', 'Purple', 'Brown', 'Teal', 'Crimson', 'Royal Blue'];

const bodyEl = document.body;
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const para = document.createElement("p");
const para2 = document.createElement("p");
const btn3 = document.createElement("button");
const btn4 = document.createElement("button");

btn3.textContent = 'Reset';
btn4.textContent = 'Apply';
btn4.style.marginLeft = '10px';
para2.textContent = 'Click to reset and continue or lock color';

let currentColor = null;

function toggleBackground() {
    if (btn1.disabled) return;
    currentColor = colors[Math.floor(Math.random() * colors.length)];
    bodyEl.style.backgroundColor = currentColor.hexa;
    bodyEl.style.color = darkColors.includes(currentColor.name) ? '#ffffff' : '#000000';
    para.innerHTML = `Background color has been changed to <b>${currentColor.name}</b>`;
    bodyEl.appendChild(para);
}

function removeElements() {
    para2.remove();
    btn3.remove();
    btn4.remove();
}

function setColor() {
    if (!currentColor) return;
    btn1.removeEventListener("click", toggleBackground);
    [btn1, btn2].forEach(btn => alterHoverEffect(btn));
    para.innerHTML = `Background color is set to <b>${currentColor.name}</b>`;
    bodyEl.append(para, btn3, btn4, para2);
}

function alterHoverEffect(btn) {
    btn.disabled = !btn.disabled;
}

btn1.addEventListener("click", toggleBackground);

btn2.addEventListener("click", setColor);

btn3.addEventListener("click", () => {
    bodyEl.style.backgroundColor = '';
    bodyEl.style.color = '';
    currentColor = null;
    para.textContent = "Color has been reseted. Click the button to change the background color again.";
    removeElements();
    [btn1, btn2].forEach(btn => alterHoverEffect(btn));
    btn1.addEventListener("click", toggleBackground);
});

btn4.addEventListener('click', () => {
    removeElements();
    btn2.removeEventListener('click', setColor);
});