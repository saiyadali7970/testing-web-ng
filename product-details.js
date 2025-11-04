// Load cart from localStorage on page load
window.onload = function() {
    // Show loading screen
    showLoadingScreen();
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    // Load product details with delay
    setTimeout(() => {
        loadProductDetails();
        hideLoadingScreen();
    }, 600);
};

// Load product details from URL parameter
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        document.getElementById('product-details-container').innerHTML = 
            '<div class="error-message"><h2>Product not found</h2><a href="index.html">Go back to products</a></div>';
        hideLoadingScreen();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-details-container').innerHTML = 
            '<div class="error-message"><h2>Product not found</h2><a href="index.html">Go back to products</a></div>';
        hideLoadingScreen();
        return;
    }
    
    displayProductDetails(product);
}

// Display product details
function displayProductDetails(product) {
    const container = document.getElementById('product-details-container');
    
    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%234CAF50%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23fff%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p class="detail-price">₹${product.price.toLocaleString('en-IN')}</p>
            <p class="detail-description">${product.description}</p>
            <div class="detail-features">
                <h3>Features:</h3>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="detail-add-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `;
}

