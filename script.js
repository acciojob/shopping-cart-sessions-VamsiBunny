// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage (if available)
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // Clear the cart list before rendering
  cartList.innerHTML = '';

  // Display cart items
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Update sessionStorage with the current cart state
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  // Ensure the product exists and is not already in the cart
  if (product && !cart.some((p) => p.id === productId)) {
    cart.push(product);  // Add product to cart
    renderCart();        // Re-render the cart and save to sessionStorage
  }
}

// Remove item from cart
function removeFromCart(productId) {
  // Remove the product from the cart array
  cart = cart.filter((product) => product.id !== productId);
  renderCart();  // Re-render the cart and save to sessionStorage
}

// Clear the cart
function clearCart() {
  cart = [];  // Reset cart array
  sessionStorage.removeItem('cart');  // Remove cart from sessionStorage
  renderCart();  // Re-render the cart (which will be empty)
}

// Event listeners for "Add to Cart" buttons
productList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listeners for "Remove from Cart" buttons
cartList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render (renders both products and cart)
renderProducts();
renderCart();
