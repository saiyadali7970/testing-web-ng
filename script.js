// Cart array to store products
let cart = [];

// Products data with images and details
const products = [
    {
        id: 1,
        name: 'Laptop',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        description: 'High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD. Perfect for work and gaming.',
        features: ['Intel i7 Processor', '16GB RAM', '512GB SSD', '15.6" Display']
    },
    {
        id: 2,
        name: 'Smartphone',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        description: 'Latest smartphone with amazing camera, 128GB storage, and long-lasting battery.',
        features: ['48MP Camera', '128GB Storage', '5000mAh Battery', '6.5" Display']
    },
    {
        id: 3,
        name: 'Headphones',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        description: 'Premium wireless headphones with noise cancellation and amazing sound quality.',
        features: ['Noise Cancellation', 'Wireless', '30hr Battery', 'Premium Sound']
    },
    {
        id: 4,
        name: 'Smart Watch',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        description: 'Smart watch with health tracking, fitness monitoring, and smartphone connectivity.',
        features: ['Health Tracking', 'Fitness Monitor', 'Water Resistant', '7 Day Battery']
    },
    {
        id: 5,
        name: 'Tablet',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
        description: '10-inch tablet perfect for work, entertainment, and creative tasks.',
        features: ['10" Display', '64GB Storage', '8MP Camera', '10hr Battery']
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
        description: 'Portable Bluetooth speaker with powerful bass and clear sound quality.',
        features: ['Portable', 'Bluetooth 5.0', '12hr Battery', 'Waterproof']
    },
    {
        id: 7,
        name: 'Mechanical Keyboard',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
        description: 'RGB mechanical keyboard with tactile switches perfect for gaming and typing.',
        features: ['RGB Lighting', 'Mechanical Switches', 'Gaming Keys', 'USB-C']
    },
    {
        id: 8,
        name: 'Wireless Mouse',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
        features: ['Wireless', 'Ergonomic Design', 'Precision Tracking', '18 Month Battery']
    },
    {
        id: 9,
        name: 'Digital Camera',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
        description: 'Professional digital camera with 24MP sensor and 4K video recording.',
        features: ['24MP Sensor', '4K Video', 'Optical Zoom', 'WiFi Connectivity']
    },
    {
        id: 10,
        name: 'Gaming Monitor',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&h=300&fit=crop',
        description: '27-inch gaming monitor with 144Hz refresh rate and stunning visuals.',
        features: ['27" Display', '144Hz Refresh', '1ms Response', 'FreeSync']
    }
];

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
}

// Show loading screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
    }
}

// Show products page
function showProducts() {
    const landingPage = document.getElementById('landing-page');
    const mainHeader = document.getElementById('main-header');
    const productsMain = document.getElementById('products-main');
    
    // Hide landing page
    if (landingPage) {
        landingPage.style.display = 'none';
    }
    
    // Show header and products
    if (mainHeader) {
        mainHeader.style.display = 'flex';
    }
    
    // Show loading screen
    showLoadingScreen();
    
    // Load products with delay
    setTimeout(() => {
        displayProducts();
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        }
        
        if (productsMain) {
            productsMain.style.display = 'block';
        }
        
        hideLoadingScreen();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
}

// Show landing page
function showLanding() {
    const landingPage = document.getElementById('landing-page');
    const mainHeader = document.getElementById('main-header');
    const productsMain = document.getElementById('products-main');
    
    // Show landing page
    if (landingPage) {
        landingPage.style.display = 'flex';
    }
    
    // Hide header and products
    if (mainHeader) {
        mainHeader.style.display = 'none';
    }
    
    if (productsMain) {
        productsMain.style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load cart and products on page load
window.onload = function() {
    // Show loading screen
    showLoadingScreen();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    // Load products with delay
    setTimeout(() => {
        displayProducts();
        hideLoadingScreen();
    }, 600);
};

// Display all products
function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return; // If not on home page, return
    
    container.innerHTML = products.map(product => `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%234CAF50%22 width=%22250%22 height=%22200%22/%3E%3Ctext fill=%22%23fff%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
            <button onclick="event.stopPropagation(); addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `).join('');
}

// Navigate to product details page
function showProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Add product to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${name} added to cart!`);
}

// Remove product from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
    
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
    
    cartTotal.textContent = calculateTotal().toLocaleString('en-IN');
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = calculateTotal();
    const message = `Thank you for your purchase!\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nThis is a demo store. No actual payment will be processed.`;
    
    alert(message);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartDisplay();
    toggleCart();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

