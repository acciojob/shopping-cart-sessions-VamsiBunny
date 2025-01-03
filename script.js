// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
  ];
  
 
  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-list");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  
 
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  

  function renderProducts() {
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
      productList.appendChild(li);
    });
  }
  

  function renderCart() {
   
    cartList.innerHTML = '';
  
   
    cart.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
      cartList.appendChild(li);
    });
  
    
    console.log("Updating sessionStorage with cart:", cart);
    sessionStorage.setItem('cart', JSON.stringify(cart)); 
  }
  
 
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
  
    if (product && !cart.some((p) => p.id === productId)) {
      cart.push(product);  
      renderCart();        
    }
  }
  
  
  function removeFromCart(productId) {
    
    cart = cart.filter((product) => product.id !== productId);
    renderCart();  
  }
  
  
  function clearCart() {
    cart = []; 
    sessionStorage.removeItem('cart'); 
    renderCart();  
  }
  
  
  productList.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("add-to-cart-btn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    }
  });
  
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
  