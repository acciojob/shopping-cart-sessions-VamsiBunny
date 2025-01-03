// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render products list
function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Render cart list
function renderCart() {
    cartList.innerHTML = '';

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
        cartList.appendChild(li);
    });

    console.log("Updating sessionStorage with cart:", cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);

    if (product) {
        cart.push(product); // Allow duplicates
        renderCart();
    }
}

// Remove product from cart by index
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the specific index
    renderCart();
}

// Clear cart
function clearCart() {
    cart = [];
    sessionStorage.removeItem('cart');
    renderCart();
}

// Event Listeners
productList.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("add-to-cart-btn")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        addToCart(productId);
    }
});

cartList.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("remove-from-cart-btn")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        removeFromCart(index);
    }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial Render
renderProducts();
renderCart();
