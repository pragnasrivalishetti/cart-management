let cart = [];
let total = 0;

// Show Store Screen
function showStore() {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("store-screen").classList.remove("hidden");
  renderCart();
}

// Add item to cart
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  total += price;
  renderCart();
}

// Remove item from cart
function removeFromCart(name) {
  const index = cart.findIndex(p => p.name === name);
  if (index > -1) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
  }
  renderCart();
}

// Update quantity
function updateQuantity(name, qty) {
  const item = cart.find(p => p.name === name);
  if (item) {
    total -= item.price * item.quantity;
    item.quantity = qty > 0 ? qty : 1;
    total += item.price * item.quantity;
  }
  renderCart();
}

// Render cart
function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
      <div>
        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
        <button onclick="removeFromCart('${item.name}')">❌</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

// Finalize Cart
function finalizeCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.getElementById("store-screen").classList.add("hidden");
  document.getElementById("thankyou-screen").classList.remove("hidden");
}
