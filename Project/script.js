const products = [
    { id: 1, name: 'Product 1', price: 10.00, description: 'Chanel N°5', image: 'images/image1.jpeg' },
    { id: 2, name: 'Product 2', price: 20.00, description: 'Dior J’adore', image: 'images/image2.jpeg' },
    { id: 3, name: 'Product 3', price: 30.00, description: 'Gucci Bloom', image: 'images/image3.jpeg' },
    { id: 4, name: 'Product 4', price: 15.00, description: 'Yves Saint Laurent Black Opium ', image: 'images/image4.jpeg' },
    { id: 5, name: 'Product 5', price: 25.00, description: 'Tom Ford Black Orchid', image: 'images/image5.jpeg' },
    { id: 6, name: 'Product 6', price: 35.00, description: 'Versace Bright Crystal ', image: 'images/image6.jpeg' }
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function renderCart() {
    const cartItemsUl = document.getElementById('cart-items');
    cartItemsUl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsUl.appendChild(li);
    });
    document.getElementById('total-price').textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

function updateQuantity(id, quantity) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity, 10);
        if (cartItem.quantity <= 0) {
            removeFromCart(id);
        } else {
            renderCart();
        }
    }
}

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    showSection('products');
});
