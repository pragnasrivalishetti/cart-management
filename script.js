let cart = [];
let total = 0;
let cartFinalized = false;

function addToCart(name, price) {
  if (cartFinalized) {
    alert("Cart already finalized. Proceed to payment.");
    return;
  }

  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  total += price;
  renderCart();
}

function removeFromCart(name) {
  if (cartFinalized) return;

  const index = cart.findIndex(p => p.name === name);
  if (index > -1) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
  }
  renderCart();
}

function updateQuantity(name, qty) {
  if (cartFinalized) return;

  const item = cart.find(p => p.name === name);
  if (item) {
    total -= item.price * item.quantity;
    item.quantity = qty;
    total += item.price * item.quantity;
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
      <div>
        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1 > 0 ? item.quantity - 1 : 1})">-</button>
        <button onclick="removeFromCart('${item.name}')">❌</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

function finalizeCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  cartFinalized = true;
  document.getElementById("cart-actions").classList.add("hidden");
  document.getElementById("payment-section").classList.remove("hidden");
  alert("✅ Cart finalized. Proceed to payment.");
}

function pay() {
  alert(`💳 Payment successful! Total paid: ₹${total}`);
  cart = [];
  total = 0;
  cartFinalized = false;
  renderCart();
  document.getElementById("payment-section").classList.add("hidden");
  document.getElementById("cart-actions").classList.remove("hidden");
}
