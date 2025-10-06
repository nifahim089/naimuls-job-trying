// ==================== PRODUCT DATA ====================
const products = [
  { id: 1, name: "MacBook Pro M3", category: "laptop", price: 1999, rating: 4.8 },
  { id: 2, name: "Wireless Headphones Pro", category: "headphones", price: 299, rating: 4.6 },
  { id: 3, name: "Mechanical Keyboard K2", category: "keyboard", price: 129, rating: 4.5 },
  { id: 4, name: "4K Monitor Ultra", category: "monitor", price: 499, rating: 4.7 },
  { id: 5, name: "Gaming Laptop X15", category: "laptop", price: 1599, rating: 4.9 },
  { id: 6, name: "Wireless Earbuds Z", category: "headphones", price: 199, rating: 4.2 }
];

// ==================== DOM ELEMENTS ====================
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const cartItemCount = document.getElementById("cartItemCount");
const cartTotalSummary = document.getElementById("cartTotalSummary");

// ==================== STATE ====================
let cart = [];

// ==================== FUNCTIONS ====================

// Render products dynamically
function renderProducts(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 border border-transparent";
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400">Image</div>
      <h3 class="text-lg font-semibold mb-1">${p.name}</h3>
      <p class="text-sm text-gray-500 capitalize">${p.category}</p>
      <p class="text-sm font-bold text-gray-700">$${p.price}</p>
      <p class="text-yellow-500 mb-3">${"⭐".repeat(Math.round(p.rating))}</p>
      <button class="addBtn bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 text-sm">Add to Cart</button>
    `;

    grid.appendChild(card);
  });
}

// Update cart UI (navbar + summary)
function updateCartUI() {
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice}`;
  cartItemCount.textContent = totalItems;
  cartTotalSummary.textContent = `$${totalPrice}`;

  // Show cart summary only when cart has items
  cartSummary.classList.toggle("hidden", totalItems === 0);

  // List items
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-50 p-2 rounded";
    li.innerHTML = `
      <span>${item.name}</span>
      <button class="removeBtn text-red-600 text-sm font-semibold" data-id="${item.id}">Remove</button>
    `;
    cartItems.appendChild(li);
  });
}

// Handle Add to Cart
function handleAddToCart(id) {
  const product = products.find(p => p.id === id);
  if (!cart.some(item => item.id === id)) {
    cart.push(product);
    updateCartUI();

    // Update button
    const btn = document.querySelector(`.addBtn[data-id="${id}"]`) || document.querySelector(`[data-id="${id}"] .addBtn`);
    if (btn) {
      btn.textContent = "Added ✅";
      btn.classList.remove("bg-blue-500");
      btn.classList.add("bg-green-500");
    }

    // Card border highlight
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) card.classList.add("border-green-400");
  }
}

// Handle Remove from Cart
function handleRemoveFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    const btn = card.querySelector(".addBtn");
    btn.textContent = "Add to Cart";
    btn.classList.remove("bg-green-500");
    btn.classList.add("bg-blue-500");
    card.classList.remove("border-green-400");
  }
}

// Filter + Sort + Search combined
function applyFilters() {
  let filtered = [...products];
  const searchVal = searchInput.value.toLowerCase();
  const categoryVal = categoryFilter.value;
  const sortVal = sortFilter.value;

  // Search
  if (searchVal) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal));

  // Category
  if (categoryVal !== "all") filtered = filtered.filter(p => p.category === categoryVal);

  // Sort
  if (sortVal === "low-high") filtered.sort((a, b) => a.price - b.price);
  else if (sortVal === "high-low") filtered.sort((a, b) => b.price - a.price);
  else if (sortVal === "rating") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

// ==================== EVENT LISTENERS ====================

// Initial render
renderProducts(products);

// Live filters
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

// Shop now scroll
document.getElementById("shopNowBtn").addEventListener("click", () => {
  window.scrollTo({ top: grid.offsetTop - 60, behavior: "smooth" });
});

// Delegated click events (Add/Remove)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addBtn")) {
    const card = e.target.closest("[data-id]");
    handleAddToCart(Number(card.dataset.id));
  }

  if (e.target.classList.contains("removeBtn")) {
    handleRemoveFromCart(Number(e.target.dataset.id));
  }
});

