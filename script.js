let cart = [];
let total = 0;

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

function removeFromCart(name) {
  const itemIndex = cart.findIndex(p => p.name === name);

  if (itemIndex > -1) {
    total -= cart[itemIndex].price;
    cart[itemIndex].quantity -= 1;

    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
  }

  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity})
      <button onclick="removeFromCart('${item.name}')">❌</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}
