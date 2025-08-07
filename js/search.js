// Handle search button click
document.getElementById('search-btn').addEventListener('click', (e) => {
    e.stopPropagation();

    // Toggle search bar visibility
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');

    if (!searchBar.classList.contains('hidden')) {
        const searchInput = document.getElementById('search-input');
        searchInput.focus();

        // Handle search input
        const handleSearch = (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const searchResults = document.getElementById('search-results');
            searchResults.classList.remove('hidden');

            // Get all product cards
            const products = Array.from(document.querySelectorAll('.product-card'));

            // Clear previous results
            searchResults.innerHTML = '';

            if (searchTerm === '') {
                searchResults.innerHTML = '<p class="text-center text-gray-500 py-4">Masukkan kata kunci pencarian</p>';
                return;
            }

            // Filter and display matching products
            const matchingProducts = products.filter(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const desc = product.querySelector('p').textContent.toLowerCase();
                return title.includes(searchTerm) || desc.includes(searchTerm);
            });

            if (matchingProducts.length > 0) {
                matchingProducts.forEach(product => {
                    const title = product.querySelector('h3').textContent;
                    const price = product.querySelector('.text-blue-600').textContent;
                    const img = product.querySelector('img').src;
                    const originalCartBtn = product.querySelector('.add-to-cart');

                    // Clone cart button and copy its event listeners
                    const cartBtn = originalCartBtn.cloneNode(true);
                    const productData = {
                        title: title,
                        price: price,
                        img: img
                    };

                    // Add click event to the cloned cart button
                    cartBtn.addEventListener('click', () => {
                        // Extract product ID from original button
                        const originalId = parseInt(originalCartBtn.getAttribute('data-id') || originalCartBtn.parentElement.querySelector('.add-to-cart').getAttribute('data-id'));

                        // Find the product in products array
                        const product = products.find(p => p.id === originalId);

                        if (product) {
                            // Check if item already exists in cart
                            const existingItem = cart.find(item => item.id === product.id);
                            if (existingItem) {
                                existingItem.quantity += 1;
                            } else {
                                cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
                            }

                            // Update cart UI
                            updateCartUI();

                            // Show cart drawer
                            cartDrawer.classList.remove('drawer-hidden');
                            cartOverlay.classList.remove('hidden');

                            // Show success notification
                            const notification = document.createElement('div');
                            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
                            notification.innerHTML = `
                                <i class="fas fa-check-circle mr-2"></i>
                                <span>${product.name} telah ditambahkan ke keranjang</span>
                            `;
                            document.body.appendChild(notification);
                            setTimeout(() => {
                                notification.remove();
                            }, 3000);
                        }
                    });

                    const resultItem = document.createElement('div');
                    resultItem.className = 'flex items-center p-2 border-b hover:bg-gray-50 bg-white';
                    resultItem.innerHTML = `
                        <img src="${img}" class="w-16 h-16 object-cover rounded mr-4">
                        <div class="flex-1">
                            <h4 class="font-semibold" style="color:black">${title}</h4>
                            <p class="text-sm text-gray-600">${price}</p>
                        </div>
                        <div class="cart-button-container">
                            
                            </div>
                    `;

                    // Add cart button to search result item
                    resultItem.querySelector('.cart-button-container').appendChild(cartBtn);
                    searchResults.appendChild(resultItem);
                });
            } else {
                searchResults.innerHTML = '<p class="text-center text-gray-500 py-4">Tidak ada produk yang ditemukan</p>';
            }
        };

        // Add input event listener with debounce
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => handleSearch(e), 300);
        });
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    const searchBtn = document.getElementById('search-btn');

    if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
        searchBar.classList.add('hidden');
        searchResults.classList.add('hidden');
    }
});