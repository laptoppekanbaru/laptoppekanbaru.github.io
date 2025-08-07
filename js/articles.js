const articles = [
    {
        image: "https://source.unsplash.com/random/800x600?tech",
        title: "Contoh atikel terbaru",
        description: "Rekomendasi upgrade komponen PC untuk pengalaman gaming terbaik.",
        link: "#"
    },
    {
        image: "https://source.unsplash.com/random/800x600?laptop",
        title: "Tips Memilih Laptop Gaming",
        description: "Panduan lengkap memilih laptop gaming sesuai kebutuhan dan budget Anda.",
        link: "#"
    },
    {
        image: "https://source.unsplash.com/random/800x600?computer",
        title: "Cara Merawat Laptop",
        description: "Tips dan trik merawat laptop agar tetap awet dan performa maksimal.",
        link: "#"
    },
    {
        image: "https://source.unsplash.com/random/800x600?tech",
        title: "Upgrade PC untuk Gaming",
        description: "Rekomendasi upgrade komponen PC untuk pengalaman gaming terbaik.",
        link: "#"
    },
    {
        image: "https://source.unsplash.com/random/800x600?tech",
        title: "Upgrade PC untuk Gaming",
        description: "Rekomendasi upgrade komponen PC untuk pengalaman gaming terbaik.",
        link: "#"
    }
];

const blogContainer = document.getElementById('blog-articles');

// Only display first 3 articles
articles.slice(0, 3).forEach(article => {
    const articleElement = document.createElement('article');
    articleElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';
    articleElement.innerHTML = `
                    <img src="${article.image}" alt="Article thumbnail" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="font-semibold text-lg mb-2">${article.title}</h3>
                        <p class="text-gray-600 mb-4">${article.description}</p>
                        <a href="${article.link}" class="text-blue-600 hover:text-blue-700 font-medium">Baca selengkapnya →</a>
                    </div>
                `;
    blogContainer.appendChild(articleElement);
});