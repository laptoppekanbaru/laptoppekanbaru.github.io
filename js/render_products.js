// Product data array
let products = [
    { id: 1, name: "MacBook Pro M1 2023", price: 18999000, desc: "13.3\", 8GB RAM, 256GB SSD", image: "https://cdn.pixabay.com/photo/2014/09/24/14/29/macbook-459196_1280.jpg", badge: { text: "New", color: "bg-red-500" } },
    { id: 2, name: "ASUS ROG Strix G15", price: 15499000, desc: "15.6\", RTX 3060, 16GB RAM, 512GB SSD", image: "https://cdn.pixabay.com/photo/2016/11/22/23/44/porsche-1851246_1280.jpg", badge: { text: "Best Seller", color: "bg-green-500" } },
    { id: 3, name: "Dell XPS 13 9310", price: 16750000, desc: "13.4\" FHD+, i7-1165G7, 16GB RAM, 512GB SSD", image: "https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg" },
    { id: 4, name: "PC Gaming Rasyid Ultimate", price: 25999000, desc: "Ryzen 7 5800X, RTX 3070, 32GB RAM, 1TB SSD", image: "https://cdn.pixabay.com/photo/2017/01/22/12/07/imac-1999636_1280.png", badge: { text: "Promo", color: "bg-yellow-500" } },
    { id: 5, name: "Lenovo ThinkPad X1 Carbon", price: 14250000, desc: "14\" WUXGA, i5-1135G7, 16GB RAM, 512GB SSD", image: "https://cdn.pixabay.com/photo/2016/11/29/01/34/laptop-1866478_1280.jpg" },
    { id: 6, name: "Acer Nitro 5 AN515-55", price: 10999000, desc: "15.6\" FHD, i5-10300H, GTX 1650, 8GB RAM", image: "https://cdn.pixabay.com/photo/2016/11/22/23/44/buildings-1851249_1280.jpg" },
    { id: 7, name: "RAM Upgrade Kit 32GB (2x16GB)", price: 1750000, desc: "DDR4 3200MHz CL16 for Laptop/PC", image: "https://cdn.pixabay.com/photo/2018/02/21/05/17/cpu-3169484_1280.jpg", badge: { text: "Upgrade", color: "bg-purple-500" } },
    { id: 8, name: "SSD NVMe 1TB Samsung 980 Pro", price: 2499000, desc: "PCIe 4.0, Read 7000MB/s, Write 5000MB/s", image: "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg" },
    { id: 9, name: "Laptop Cleaning Service", price: 350000, desc: "Full cleaning, thermal paste replacement", image: "https://cdn.pixabay.com/photo/2015/07/26/17/29/mixer-861258_1280.jpg", badge: { text: "Service", color: "bg-blue-500" } },
    { id: 10, name: "PC Office Rasyid Basic", price: 6499000, desc: "i3-10100, 8GB RAM, 256GB SSD, Win 10 Pro", image: "https://cdn.pixabay.com/photo/2014/09/20/13/52/board-453758_1280.jpg" }
];

// Function to display products
function displayProducts() {
    const productContainer = document.querySelector('.grid');
    productContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-2">${product.desc}</p>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-blue-600">Rp ${product.price.toLocaleString()}</span>
                        <button class="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}"
                                data-image="${product.image}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Function to delete product
function deleteProduct(productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        // Remove the product from the array
        products.splice(index, 1);
        // Refresh the display
        displayProducts();
    }
}

// Initial display of products
displayProducts();
