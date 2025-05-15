
let cart = {
    items: [],
    total: 0
};

function addToCart(size, type, price) {
    const item = {
        size: size,
        type: type,
        price: parseFloat(price),
        id: Date.now() 
    };
    
    cart.items.push(item);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    updateCartDisplay();
    saveCart();
}

function removeFromCart(id) {
    cart.items = cart.items.filter(item => item.id !== id);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);

    updateCartDisplay();

    saveCart();
}
function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (cartContainer) {
        cartContainer.innerHTML = cart.items.map(item => `
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
                <div class="flex-1">
                    <p class="text-gray-800">${item.size} ${item.type}</p>
                </div>
                <div class="flex items-center gap-4">
                    <p class="text-[rgb(231,111,81)]">$${item.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    if (totalElement) {
        totalElement.textContent = `$${cart.total.toFixed(2)}`;
    }
}

function saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

document.addEventListener('DOMContentLoaded', loadCart);

function login(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Dummy login check
  if (username === 'admin' && password === '12345678') {
    // Hide login and show main content
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
  } else {
    alert('Invalid credentials');
  }
}
