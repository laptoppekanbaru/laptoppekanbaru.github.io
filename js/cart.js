// Shopping cart
let cart = [];

// DOM elements
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const orderModal = document.getElementById('order-modal');
const closeOrderModal = document.getElementById('close-order-modal');
const orderForm = document.getElementById('order-form');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');
const searchResults = document.getElementById('search-results');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Format price to IDR
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    if (totalItems > 0) {
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }

    // Update cart items
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Keranjang belanja Anda kosong</p>';
        checkoutBtn.disabled = true;
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'flex justify-between items-center py-3 border-b border-gray-200';
            cartItemElement.innerHTML = `
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-3">
                            <div>
                                <h4 class="font-medium">${product.name}</h4>
                                <p class="text-sm text-gray-500">${formatPrice(product.price)} x ${item.quantity}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button class="decrease-item px-2 text-gray-500 hover:text-blue-600" data-id="${item.id}">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="increase-item px-2 text-gray-500 hover:text-blue-600" data-id="${item.id}">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                            <button class="remove-item ml-4 text-red-500 hover:text-red-700" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        checkoutBtn.disabled = false;
    }

    // Update cart total
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);
    cartTotal.textContent = formatPrice(total);
}

// Add to cart using event delegation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
        const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
        const id = parseInt(button.getAttribute('data-id'));
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }

        updateCartUI();

        // Show cart drawer
        cartDrawer.classList.remove('drawer-hidden');
        cartOverlay.classList.remove('hidden');

        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
        notification.innerHTML = `
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>${name} telah ditambahkan ke keranjang</span>
                `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

// Cart item actions
document.addEventListener('click', (e) => {
    // Decrease item quantity
    if (e.target.closest('.decrease-item')) {
        const id = parseInt(e.target.closest('.decrease-item').getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
        updateCartUI();
    }

    // Increase item quantity
    if (e.target.closest('.increase-item')) {
        const id = parseInt(e.target.closest('.increase-item').getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        item.quantity += 1;
        updateCartUI();
    }

    // Remove item
    if (e.target.closest('.remove-item')) {
        const id = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }
});

// Toggle cart drawer
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('drawer-hidden');
    cartOverlay.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('drawer-hidden');
    cartOverlay.classList.add('hidden');
});

cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.add('drawer-hidden');
    cartOverlay.classList.add('hidden');
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    orderModal.classList.remove('hidden');
    cartDrawer.classList.add('drawer-hidden');
    cartOverlay.classList.add('hidden');
});

// Order form
closeOrderModal.addEventListener('click', () => {
    orderModal.classList.add('hidden');
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;

    // Format WhatsApp message
    let message = `Halo Rasyid Comp, saya ingin memesan:\n\n`;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        message += `- ${product.name} (${formatPrice(product.price)} x ${item.quantity})\n`;
    });

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);

    message += `\n*Total: ${formatPrice(total)}*\n\n`;
    message += `Nama: ${name}\n`;
    message += `No. WhatsApp: ${phone}\n`;
    if (address) message += `Alamat: ${address}\n`;
    if (notes) message += `Catatan: ${notes}\n`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Close modal and clear form
    orderModal.classList.add('hidden');
    orderForm.reset();

    // Clear cart
    cart = [];
    updateCartUI();
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Initialize cart UI
updateCartUI();