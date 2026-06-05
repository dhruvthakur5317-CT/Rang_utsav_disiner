// Rang Utsav Designer - Web Store Application Logic

// Default Product Catalog Data (Preloaded on first visit)
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    title: "Jaipur Crimson Gota Anarkali Suit",
    category: "suits",
    price: 4800,
    originalPrice: 6000,
    image: "images/suit_product.png",
    images: ["images/suit_product.png", "images/sari_product.png", "images/coord_product.png"],
    description: "A premium rich crimson Anarkali suit with handcrafted gotapatti borders and a premium georgette dupatta.",
    reviews: [
      { name: "Priyanjali Sharma", rating: 5, comment: "Absolutely beautiful suit! The embroidery is very neat, and the crimson color is very royal. Perfect fit.", date: "15-May-2026", image: "" },
      { name: "Kirti Mandhan", rating: 4, comment: "Very good fabric quality. Received it in 3 days. Length is perfect.", date: "20-May-2026", image: "" }
    ]
  },
  {
    id: "p2",
    title: "Royal Golden Kanjeevaram Silk Sari",
    category: "sari",
    price: 12500,
    originalPrice: 16000,
    image: "images/sari_product.png",
    images: ["images/sari_product.png", "images/hero_boutique.png"],
    description: "Exquisite hand-woven silk sari with pure gold thread borders, ideal for traditional weddings and festive occasions.",
    reviews: [
      { name: "Rekha Goel", rating: 5, comment: "The silk quality is top-notch! Feels extremely authentic. Beautiful sheen on the gold zari work.", date: "10-May-2026", image: "" }
    ]
  },
  {
    id: "p3",
    title: "Heritage Crimson Embroidered Lehenga",
    category: "lehenga",
    price: 38000,
    originalPrice: 48000,
    image: "images/lehenga_product.png",
    images: ["images/lehenga_product.png", "images/hero_boutique.png"],
    description: "Intricately hand-embroidered bridal lehenga in rich deep red velvet with golden zardozi work and dual dupattas.",
    reviews: [
      { name: "Tanya Kapoor", rating: 5, comment: "Stunning craftsmanship! The velvet is thick and heavy. Felt like a queen wearing it.", date: "28-May-2026", image: "" }
    ]
  },
  {
    id: "p4",
    title: "Modern Indigo Printed Silk Co-ord Set",
    category: "coord",
    price: 2800,
    originalPrice: 3500,
    image: "images/coord_product.png",
    images: ["images/coord_product.png", "images/suit_product.png"],
    description: "Sophisticated silk printed co-ord set with a belted tunic and straight-fit trousers for a modern ethnic silhouette.",
    reviews: [
      { name: "Meera Sen", rating: 4, comment: "Perfect for office wear and casual outings. Silk blend fabric is very breathable.", date: "02-Jun-2026", image: "" }
    ]
  }
];

// App State
let products = [];
let cart = [];
let activeCategory = "all";
let searchFilter = "";
let currentSort = "default";
let adminPasscode = "eagle@@2442";
let razorpayKey = localStorage.getItem("rzp_key") || "";
let leafletMap = null;

// Product detail modal state
let currentDetailProduct = null;
let currentSlideIndex = 0;
let currentReviewRating = 0;
let currentUploadedReviewImageBase64 = "";

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initProducts();
  initCart();
  renderCatalog();
  initMap();
  setupEventListeners();
  setupScrollReveal();
});

// Theme Management (Light / Dark Mode Toggle)
function initTheme() {
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) {
    document.body.classList.add("dark-theme");
    updateThemeIcon(true);
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
  showToast(isDark ? "Dark theme enabled" : "Light theme enabled", "success");
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById("theme-toggle-icon");
  if (icon) {
    if (isDark) {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  }
}

// Product Inventory Data Loader
function initProducts() {
  const storedProducts = localStorage.getItem("rang_products");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    
    // Upgrade existing stored structure to array formats if needed
    let upgraded = false;
    products = products.map(p => {
      if (!p.images || !Array.isArray(p.images)) {
        p.images = [p.image];
        upgraded = true;
      }
      if (!p.reviews || !Array.isArray(p.reviews)) {
        p.reviews = [
          { name: "Valued Customer", rating: 5, comment: "Excellent fabric and design. Very happy with the product!", date: "01-Jun-2026", image: "" }
        ];
        upgraded = true;
      }
      return p;
    });
    if (upgraded) {
      localStorage.setItem("rang_products", JSON.stringify(products));
    }
  } else {
    products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem("rang_products", JSON.stringify(products));
  }
}

// Cart Data Loader
function initCart() {
  const storedCart = localStorage.getItem("rang_cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("rang_cart", JSON.stringify(cart));
  updateCartUI();
}

// Save Products to LocalStorage
function saveProducts() {
  localStorage.setItem("rang_products", JSON.stringify(products));
  renderCatalog();
}

// Toast Notifications Helper
function showToast(message, type = "success") {
  const container = document.getElementById("toast-notifications-wrapper");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Remove toast after animation completes
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Map Initialization (Leaflet.js)
function initMap() {
  try {
    const shopCoordinates = [26.9124, 75.7873];
    
    leafletMap = L.map("map", {
      scrollWheelZoom: false
    }).setView(shopCoordinates, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    const marker = L.marker(shopCoordinates).addTo(leafletMap);
    marker.bindPopup(`
      <div style="font-family: var(--font-body); padding: 5px;">
        <h4 style="font-family: var(--font-display); color: #800020; margin-bottom: 5px;">Rang Utsav Designer</h4>
        <p style="font-size: 0.8rem; margin: 0; color: #5C4A4C;">Shop No. 12, Golden Plaza Mall, Near Main Market, Jaipur</p>
        <a href="https://maps.google.com/?q=26.9124,75.7873" target="_blank" style="display:inline-block; font-size: 0.75rem; color: #C5A059; margin-top: 8px; font-weight:600;">Get Directions <i class="fa-solid fa-diamond-turn-right"></i></a>
      </div>
    `).openPopup();
  } catch (error) {
    console.error("Failed to initialize Leaflet Map:", error);
  }
}

// Render catalog grid cards
function renderCatalog() {
  const grid = document.getElementById("product-listing-grid");
  if (!grid) return;

  // Filter Catalog items
  let filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort Catalog items
  if (currentSort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === "discount") {
    filteredProducts.sort((a, b) => {
      const discA = a.originalPrice - a.price;
      const discB = b.originalPrice - b.price;
      return discB - discA;
    });
  }

  // Handle empty catalog state
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-secondary);">
        <i class="fa-solid fa-shirt" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;"></i>
        <p>No products found in this category matching your search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredProducts.map(p => {
    const savings = p.originalPrice - p.price;
    const discountPercent = Math.round((savings / p.originalPrice) * 100);
    
    // Check for primary image and secondary image
    const primaryImg = p.images && p.images[0] ? p.images[0] : p.image;
    const secondaryImg = p.images && p.images[1] ? p.images[1] : primaryImg;
    const hasMultipleImgs = p.images && p.images.length > 1;

    return `
      <div class="product-card" id="product-${p.id}" onclick="handleProductCardClick('${p.id}', event)" style="cursor: pointer;">
        ${discountPercent > 0 ? `<span class="product-badge">${discountPercent}% Off</span>` : ""}
        <div class="product-img-wrapper">
          <img src="${primaryImg}" alt="${p.title}" class="product-img" loading="lazy">
          ${hasMultipleImgs ? `<img src="${secondaryImg}" alt="${p.title} alternate view" class="product-img secondary-img" loading="lazy">` : ""}
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart-btn" onclick="addToCartDirectly('${p.id}', event)" style="width: 100%;">
              <i class="fa-solid fa-cart-plus"></i> Add To Cart
            </button>
          </div>
        </div>
        <div class="product-details">
          <span class="product-category">${p.category.toUpperCase()}</span>
          <h3 class="product-title">${p.title}</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; height: 36px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
            ${p.description}
          </p>
          <div class="product-price-row">
            <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
            ${p.originalPrice > p.price ? `
              <span class="original-price">₹${p.originalPrice.toLocaleString("en-IN")}</span>
              <span class="discount">Save ₹${savings.toLocaleString("en-IN")}</span>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Handler for Catalog click: opens details drawer
window.handleProductCardClick = function(productId, event) {
  // Prevent trigger if customer clicked Add to Cart button
  if (event.target.closest('.add-to-cart-btn') || event.target.closest('.btn-primary')) {
    return;
  }
  openProductDetailModal(productId);
};

// Add to Cart from grid directly
window.addToCartDirectly = function(productId, event) {
  if (event) event.stopPropagation();
  addToCart(productId);
};

// Shopping Cart Actions
window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  showToast(`Added "${product.title}" to your cart!`, "success");
  
  const cartBtn = document.getElementById("cart-drawer-toggle-button");
  if (cartBtn) {
    cartBtn.style.transform = "scale(1.2)";
    setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
  }
};

window.updateQty = function(productId, change) {
  const cartItem = cart.find(item => item.id === productId);
  if (!cartItem) return;

  cartItem.quantity += change;
  if (cartItem.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }
  
  saveCart();
};

window.removeFromCart = function(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (!cartItem) return;

  cart = cart.filter(item => item.id !== productId);
  saveCart();
  showToast(`Removed "${cartItem.title}" from cart`, "success");
};

// Render Drawer Cart Items
function updateCartUI() {
  const itemsContainer = document.getElementById("cart-drawer-items-list");
  const badgeCount = document.getElementById("cart-badge-count");
  const summaryCount = document.getElementById("cart-summary-count");
  const summaryDiscount = document.getElementById("cart-summary-discount");
  const summaryTotal = document.getElementById("cart-summary-total-amount");

  if (!itemsContainer) return;

  let totalItemsCount = 0;
  let subtotalAmount = 0;
  let totalSavingsAmount = 0;

  cart.forEach(item => {
    totalItemsCount += item.quantity;
    subtotalAmount += item.price * item.quantity;
    totalSavingsAmount += (item.originalPrice - item.price) * item.quantity;
  });

  if (badgeCount) badgeCount.textContent = totalItemsCount;
  if (summaryCount) summaryCount.textContent = `${totalItemsCount} items`;
  if (summaryDiscount) summaryDiscount.textContent = `- ₹${totalSavingsAmount.toLocaleString("en-IN")}`;
  if (summaryTotal) summaryTotal.textContent = `₹${subtotalAmount.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your shopping cart is empty.</p>
        <a href="#catalog" class="btn btn-secondary" onclick="toggleCartDrawer(false)" style="font-size: 0.75rem; padding: 10px 20px;">Explore Collection</a>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => {
    const primaryImg = item.images && item.images[0] ? item.images[0] : item.image;
    return `
      <div class="cart-item">
        <img src="${primaryImg}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <span class="cart-item-category">${item.category}</span>
          <h4 class="cart-item-title">${item.title}</h4>
          <span class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</span>
          
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            
            <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Drawer visibility states
function toggleCartDrawer(show) {
  const drawer = document.getElementById("cart-drawer-container");
  const overlay = document.getElementById("cart-drawer-overlay");
  if (!drawer || !overlay) return;

  if (show) {
    drawer.classList.add("active");
    overlay.classList.add("active");
  } else {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }
}

function toggleAdminDrawer(show) {
  const drawer = document.getElementById("admin-drawer-container");
  const overlay = document.getElementById("admin-drawer-overlay");
  if (!drawer || !overlay) return;

  if (show) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    resetAdminUI();
  } else {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }
}

// Product Details Drawer Modal View
function openProductDetailModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentDetailProduct = product;
  
  const modal = document.getElementById("product-detail-modal-container");
  const overlay = document.getElementById("product-detail-modal-overlay");
  if (!modal || !overlay) return;

  // Set Details
  document.getElementById("modal-product-title-header").textContent = product.title;
  document.getElementById("modal-product-category").textContent = product.category.toUpperCase();
  document.getElementById("modal-product-title").textContent = product.title;
  document.getElementById("modal-product-desc").textContent = product.description;
  document.getElementById("modal-product-price").textContent = `₹${product.price.toLocaleString("en-IN")}`;
  document.getElementById("modal-product-original-price").textContent = `₹${product.originalPrice.toLocaleString("en-IN")}`;
  
  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);
  document.getElementById("modal-product-discount").textContent = `${discountPercent}% Off`;

  // Render Carousel Images
  const wrapper = document.getElementById("carousel-slides-wrapper");
  const dotsWrapper = document.getElementById("carousel-dots-wrapper");
  if (wrapper && dotsWrapper) {
    wrapper.innerHTML = product.images.map(img => `
      <img src="${img}" class="carousel-slide" alt="${product.title} carousel slide" style="width: 100%; height: 100%; object-fit: cover; flex-shrink: 0;">
    `).join("");

    dotsWrapper.innerHTML = product.images.map((img, i) => `
      <div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="gotoSlide(${i})"></div>
    `).join("");
  }

  // Reset Slide position
  currentSlideIndex = 0;
  showSlide(0);

  // Render Reviews and Ratings distribution
  renderProductReviews(product);

  // Bind Add to Cart Button
  const cartBtn = document.getElementById("modal-add-to-cart-btn");
  cartBtn.onclick = function() {
    addToCart(product.id);
  };

  // Open Modal
  modal.style.right = "0px";
  overlay.classList.add("active");
}

function closeProductDetailModal() {
  const modal = document.getElementById("product-detail-modal-container");
  const overlay = document.getElementById("product-detail-modal-overlay");
  if (!modal || !overlay) return;

  modal.style.right = "-700px";
  overlay.classList.remove("active");
  currentDetailProduct = null;
  resetReviewForm();
}

// Carousel Navigation
window.gotoSlide = function(index) {
  const wrapper = document.getElementById("carousel-slides-wrapper");
  if (!wrapper || !currentDetailProduct) return;

  const totalSlides = currentDetailProduct.images.length;
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  currentSlideIndex = index;
  wrapper.style.transform = `translateX(-${index * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll("#carousel-dots-wrapper .carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

function showSlide(index) {
  gotoSlide(index);
}

// Product Reviews rendering
function renderProductReviews(product) {
  const listTarget = document.getElementById("reviews-list-target");
  const avgStarsVal = document.getElementById("reviews-avg-stars-num");
  const avgStarsIcons = document.getElementById("reviews-avg-stars-icons");
  const totalCountText = document.getElementById("reviews-total-count-text");
  const distributionBars = document.getElementById("reviews-rating-distribution-bars");
  const photosGrid = document.getElementById("reviews-photos-thumbnails-grid");
  const photosSection = document.getElementById("reviews-photos-section-wrapper");

  if (!listTarget) return;

  const reviewList = product.reviews || [];
  const reviewCount = reviewList.length;

  // 1. Average Stars
  let avgRating = 0;
  if (reviewCount > 0) {
    const totalRatingSum = reviewList.reduce((acc, curr) => acc + curr.rating, 0);
    avgRating = (totalRatingSum / reviewCount).toFixed(1);
  }
  
  if (avgStarsVal) avgStarsVal.textContent = reviewCount > 0 ? avgRating : "0.0";
  if (totalCountText) totalCountText.textContent = `${reviewCount} Rating${reviewCount !== 1 ? 's' : ''} & Review${reviewCount !== 1 ? 's' : ''}`;

  // Average Stars Icons
  if (avgStarsIcons) {
    avgStarsIcons.innerHTML = "";
    const starsNum = parseFloat(avgRating);
    for (let i = 1; i <= 5; i++) {
      if (starsNum >= i) {
        avgStarsIcons.innerHTML += `<i class="fa-solid fa-star"></i>`;
      } else if (starsNum > i - 1 && starsNum < i) {
        avgStarsIcons.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        avgStarsIcons.innerHTML += `<i class="fa-regular fa-star"></i>`;
      }
    }
  }

  // 2. Stars Distribution percentages (5 down to 1)
  if (distributionBars) {
    distributionBars.innerHTML = "";
    const starsFrequency = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewList.forEach(r => {
      starsFrequency[r.rating] = (starsFrequency[r.rating] || 0) + 1;
    });

    for (let stars = 5; stars >= 1; stars--) {
      const freq = starsFrequency[stars];
      const percent = reviewCount > 0 ? Math.round((freq / reviewCount) * 100) : 0;
      distributionBars.innerHTML += `
        <div class="rating-bar-row">
          <span class="rating-bar-label">${stars} <i class="fa-solid fa-star" style="font-size:0.65rem;"></i></span>
          <div class="rating-bar-bg">
            <div class="rating-bar-fill" style="width: ${percent}%;"></div>
          </div>
          <span class="rating-bar-percent">${percent}%</span>
        </div>
      `;
    }
  }

  // 3. Customer Photo Gallery
  if (photosGrid && photosSection) {
    const photoReviews = reviewList.filter(r => r.image && r.image !== "");
    if (photoReviews.length > 0) {
      photosSection.style.display = "block";
      photosGrid.innerHTML = photoReviews.map(r => `
        <img src="${r.image}" class="review-photo-thumbnail" alt="Review photo by ${r.name}" onclick="expandReviewImage('${r.image}')">
      `).join("");
    } else {
      photosSection.style.display = "none";
    }
  }

  // 4. Render Reviews List
  if (reviewCount === 0) {
    listTarget.innerHTML = `
      <div style="text-align:center; padding: 20px; color: var(--text-secondary); font-size: 0.8rem;">
        <i class="fa-regular fa-comments" style="font-size: 2rem; margin-bottom: 8px; opacity: 0.3;"></i>
        <p>No reviews yet. Be the first to share your purchase review!</p>
      </div>
    `;
    return;
  }

  listTarget.innerHTML = reviewList.map(r => {
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= r.rating) {
        starsHtml += `<i class="fa-solid fa-star"></i>`;
      } else {
        starsHtml += `<i class="fa-regular fa-star"></i>`;
      }
    }

    return `
      <div class="review-card">
        <div class="review-stars">${starsHtml}</div>
        <p class="review-text">${r.comment}</p>
        ${r.image ? `
          <div class="review-images-row">
            <img src="${r.image}" class="review-photo-thumbnail" alt="Review image attachment" onclick="expandReviewImage('${r.image}')">
          </div>
        ` : ""}
        <div class="review-author">
          <span>By ${r.name} <i class="fa-solid fa-circle-check" style="color:var(--color-success); margin-left:4px; font-size:0.65rem;" title="Verified Purchase"></i></span>
          <span>${r.date}</span>
        </div>
      </div>
    `;
  }).join("");
}

// Expand Review image full preview
window.expandReviewImage = function(src) {
  const zoomOverlay = document.createElement("div");
  zoomOverlay.style.position = "fixed";
  zoomOverlay.style.top = "0";
  zoomOverlay.style.left = "0";
  zoomOverlay.style.width = "100%";
  zoomOverlay.style.height = "100%";
  zoomOverlay.style.backgroundColor = "rgba(0,0,0,0.85)";
  zoomOverlay.style.zIndex = "1000";
  zoomOverlay.style.display = "flex";
  zoomOverlay.style.alignItems = "center";
  zoomOverlay.style.justifyContent = "center";
  zoomOverlay.style.cursor = "pointer";
  zoomOverlay.onclick = () => zoomOverlay.remove();

  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "4px";
  img.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";

  zoomOverlay.appendChild(img);
  document.body.appendChild(zoomOverlay);
};

// Stars input selection handler in Review Form
function setupReviewStarsSelection() {
  const stars = document.querySelectorAll("#review-stars-selector i");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.dataset.value);
      currentReviewRating = val;
      
      stars.forEach(s => {
        const starVal = parseInt(s.dataset.value);
        if (starVal <= val) {
          s.className = "fa-solid fa-star active";
        } else {
          s.className = "fa-regular fa-star";
        }
      });
    });
  });
}

// File Reader logic for reviews local uploads
function setupReviewImageUpload() {
  const input = document.getElementById("review-image-file");
  const previewBox = document.getElementById("review-image-preview-box");
  const thumbnail = document.getElementById("review-image-preview-thumbnail");

  if (!input) return;

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      currentUploadedReviewImageBase64 = "";
      if (previewBox) previewBox.style.display = "none";
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // limit 2MB
      showToast("Photo must be less than 2MB!", "error");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function(evt) {
      currentUploadedReviewImageBase64 = evt.target.result;
      if (thumbnail) thumbnail.src = evt.target.result;
      if (previewBox) previewBox.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

// Save Review Action
function handleReviewSubmit() {
  if (!currentDetailProduct) return;
  
  const nameInput = document.getElementById("review-reviewer-name");
  const textInput = document.getElementById("review-comment-text");

  if (!nameInput || !textInput) return;

  const nameVal = nameInput.value.trim();
  const textVal = textInput.value.trim();

  if (!nameVal || !textVal) {
    showToast("Please enter name and comments!", "error");
    return;
  }

  if (currentReviewRating === 0) {
    showToast("Please select a star rating!", "error");
    return;
  }

  // Create review item
  const newReview = {
    name: nameVal,
    rating: currentReviewRating,
    comment: textVal,
    date: new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }),
    image: currentUploadedReviewImageBase64
  };

  // Append to state
  const productIndex = products.findIndex(p => p.id === currentDetailProduct.id);
  if (productIndex !== -1) {
    if (!products[productIndex].reviews) products[productIndex].reviews = [];
    products[productIndex].reviews.unshift(newReview);
    
    // Sync persistence
    saveProducts();
    
    // Refresh modal reviews UI
    renderProductReviews(products[productIndex]);
    
    // Reset Form
    resetReviewForm();
    showToast("Review submitted successfully! Thank you.", "success");
  }
}

function resetReviewForm() {
  document.getElementById("write-review-form").reset();
  currentReviewRating = 0;
  currentUploadedReviewImageBase64 = "";
  
  const previewBox = document.getElementById("review-image-preview-box");
  if (previewBox) previewBox.style.display = "none";
  
  const stars = document.querySelectorAll("#review-stars-selector i");
  stars.forEach(s => s.className = "fa-regular fa-star");
}

// Razorpay Payments Setup
function triggerRazorpayCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  let subtotalAmount = 0;
  cart.forEach(item => {
    subtotalAmount += item.price * item.quantity;
  });

  if (razorpayKey && razorpayKey.startsWith("rzp_")) {
    // REAL SDK popup integration if key provided
    const options = {
      key: razorpayKey,
      amount: subtotalAmount * 100, // conversion in paise
      currency: "INR",
      name: "Rang Utsav Designer",
      description: "Premium Clothes Checkout Portal",
      image: "images/suit_product.png",
      handler: function (response) {
        showToast(`Payment Approved! ID: ${response.razorpay_payment_id}`, "success");
        cart = [];
        saveCart();
        toggleCartDrawer(false);
        setTimeout(() => {
          alert(`✨ Payment Successful via Razorpay!\nTransaction ID: ${response.razorpay_payment_id}\nThank you for shopping with Rang Utsav Designer.`);
        }, 500);
      },
      prefill: {
        name: "Guest Customer",
        email: "customer@rangutsavdesigner.com",
        contact: "9876543210"
      },
      theme: {
        color: "#800020"
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response){
        showToast(`Payment Failed: ${response.error.description}`, "error");
      });
      rzp.open();
    } catch (err) {
      console.warn("Razorpay script load failed. Launching beautiful simulation checkout...", err);
      openSimulatedRazorpayModal(subtotalAmount);
    }
  } else {
    // Fallback: Open cinematic simulated Razorpay popup (Clean & premium!)
    openSimulatedRazorpayModal(subtotalAmount);
  }
}

// Simulated Razorpay Popup UI triggers
function openSimulatedRazorpayModal(amount) {
  const modal = document.getElementById("razorpay-sim-modal-container");
  const overlay = document.getElementById("razorpay-sim-modal-overlay");
  if (!modal || !overlay) return;

  // Set checkout total price
  document.getElementById("rzp-sim-amount").textContent = `₹${amount.toLocaleString("en-IN")}`;
  
  // Set QR image data using free QR code server
  document.getElementById("rzp-upi-qr-image").src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("upi://pay?pa=rangutsavdesigner@ybl&pn=Rang%20Utsav%20Designer&am=" + amount + "&cu=INR")}`;

  // Reset steps displays
  showRazorpaySimStep("rzp-step-methods");

  // Toggle open
  modal.style.display = "flex";
  overlay.classList.add("active");
  setTimeout(() => {
    modal.classList.add("active");
  }, 50);

  // Close Cart drawer silently
  toggleCartDrawer(false);
}

function closeSimulatedRazorpayModal() {
  const modal = document.getElementById("razorpay-sim-modal-container");
  const overlay = document.getElementById("razorpay-sim-modal-overlay");
  if (!modal || !overlay) return;

  modal.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

function showRazorpaySimStep(stepId) {
  const steps = document.querySelectorAll("#rzp-sim-steps-wrapper .rzp-step");
  steps.forEach(st => {
    if (st.id === stepId) {
      st.style.display = "block";
    } else {
      st.style.display = "none";
    }
  });
}

function runSimulatedPaymentProcessing() {
  showRazorpaySimStep("rzp-step-processing");
  
  setTimeout(() => {
    // Complete Payment
    const txId = "pay_sim_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById("rzp-sim-success-txid").textContent = `Transaction ID: ${txId}`;
    showRazorpaySimStep("rzp-step-success");
  }, 2000);
}

// Admin Panel inventory authorization & CRUD operations
function resetAdminUI() {
  document.getElementById("admin-passcode-field").value = "";
  document.getElementById("admin-login-credentials-panel").style.display = "flex";
  document.getElementById("admin-management-controls-panel").style.display = "none";
  
  // Set current key ID
  const keyField = document.getElementById("admin-razorpay-key-input");
  if (keyField) keyField.value = razorpayKey;
}

function handleAdminAuthentication() {
  const field = document.getElementById("admin-passcode-field");
  if (!field) return;

  if (field.value === adminPasscode) {
    document.getElementById("admin-login-credentials-panel").style.display = "none";
    document.getElementById("admin-management-controls-panel").style.display = "block";
    showToast("Authenticated. Welcome shop manager!", "success");
    renderAdminProductsList();
  } else {
    showToast("Invalid security credentials!", "error");
  }
}

// List inventory items in Admin tab
function renderAdminProductsList() {
  const container = document.getElementById("admin-inventory-items-container");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="admin-product-item" id="admin-item-${p.id}">
      <img src="${p.images && p.images[0] ? p.images[0] : p.image}" alt="${p.title}" class="admin-product-img">
      <div class="admin-product-info">
        <h5 class="admin-product-name">${p.title}</h5>
        <span class="admin-product-price">₹${p.price.toLocaleString("en-IN")}</span>
        <span style="font-size:0.7rem; color:var(--text-secondary); margin-left:10px;">(${p.category})</span>
      </div>
      <div class="admin-item-actions">
        <button class="admin-action-btn edit" onclick="loadEditForm('${p.id}')" aria-label="Edit Item"><i class="fa-solid fa-pen"></i></button>
        <button class="admin-action-btn delete" onclick="deleteProduct('${p.id}')" aria-label="Delete Item"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

// Load Selected Item info into the add/edit form
window.loadEditForm = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("admin-product-id").value = product.id;
  document.getElementById("admin-product-title-input").value = product.title;
  document.getElementById("admin-product-category-input").value = product.category;
  document.getElementById("admin-product-price-input").value = product.price;
  document.getElementById("admin-product-original-price-input").value = product.originalPrice;
  document.getElementById("admin-product-image-select").value = product.images && product.images[0] ? product.images[0] : product.image;
  
  // Format additional images array back to string
  const additionalImgs = product.images ? product.images.slice(1).join(", ") : "";
  document.getElementById("admin-product-images-input").value = additionalImgs;
  
  document.getElementById("admin-product-description-input").value = product.description;
  
  document.getElementById("admin-product-submit-btn").textContent = "Update Product details";
  showToast(`Editing "${product.title}"`, "success");
};

// Delete Product
window.deleteProduct = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (confirm(`Are you sure you want to delete "${product.title}" from catalog?`)) {
    products = products.filter(p => p.id !== productId);
    cart = cart.filter(item => item.id !== productId);
    
    saveProducts();
    saveCart();
    renderAdminProductsList();
    showToast("Product deleted from catalog", "success");
  }
};

// Handle Create / Edit product form submission
function handleProductSubmit() {
  const id = document.getElementById("admin-product-id").value;
  const title = document.getElementById("admin-product-title-input").value.trim();
  const category = document.getElementById("admin-product-category-input").value;
  const price = parseFloat(document.getElementById("admin-product-price-input").value);
  const originalPrice = parseFloat(document.getElementById("admin-product-original-price-input").value);
  
  // Primary image
  const primaryImage = document.getElementById("admin-product-image-select").value;
  
  // Parse additional images
  const additionalImagesStr = document.getElementById("admin-product-images-input").value.trim();
  let additionalImages = [];
  if (additionalImagesStr) {
    additionalImages = additionalImagesStr.split(",").map(url => url.trim()).filter(url => url !== "");
  }
  const imagesArray = [primaryImage, ...additionalImages];
  
  const description = document.getElementById("admin-product-description-input").value.trim();

  // Save Razorpay key value if updated
  const keyVal = document.getElementById("admin-razorpay-key-input").value.trim();
  razorpayKey = keyVal;
  localStorage.setItem("rzp_key", keyVal);

  if (!title || !category || isNaN(price) || isNaN(originalPrice) || !description) {
    showToast("Please fill all required inputs correctly!", "error");
    return;
  }

  if (id) {
    // Update Operation
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      const existingReviews = products[index].reviews || [];
      products[index] = { 
        id, 
        title, 
        category, 
        price, 
        originalPrice, 
        image: primaryImage, 
        images: imagesArray, 
        description,
        reviews: existingReviews
      };
      showToast("Inventory item updated successfully!", "success");
    }
  } else {
    // Create Operation
    const newId = "p_" + Date.now();
    products.push({ 
      id: newId, 
      title, 
      category, 
      price, 
      originalPrice, 
      image: primaryImage, 
      images: imagesArray, 
      description,
      reviews: [
        { name: "Verified Buyer", rating: 5, comment: "Beautiful print and superb fabric quality! Fully recommended.", date: "05-Jun-2026", image: "" }
      ]
    });
    showToast("New clothes catalog added successfully!", "success");
  }

  saveProducts();
  clearProductForm();
  renderAdminProductsList();
}

function clearProductForm() {
  document.getElementById("admin-product-id").value = "";
  document.getElementById("admin-product-add-form").reset();
  document.getElementById("admin-product-submit-btn").textContent = "Save Product";
  
  // Reset key placeholder
  const keyField = document.getElementById("admin-razorpay-key-input");
  if (keyField) keyField.value = razorpayKey;
}

// Global Category Filter Trigger
window.filterCatalogDirectly = function(categoryName) {
  activeCategory = categoryName;
  
  // Set catalog tab active
  const tabs = document.querySelectorAll("#catalog-category-filter-tabs .filter-btn");
  tabs.forEach(tab => {
    if (tab.dataset.filter === categoryName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  renderCatalog();
};

// Event Listeners setup
function setupEventListeners() {
  // Theme Toggle click event
  const themeBtn = document.getElementById("theme-toggle-button");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Cart Drawer open/close events
  const cartOpenBtn = document.getElementById("cart-drawer-toggle-button");
  const cartCloseBtn = document.getElementById("cart-drawer-close-btn");
  const cartOverlay = document.getElementById("cart-drawer-overlay");

  if (cartOpenBtn) cartOpenBtn.addEventListener("click", () => toggleCartDrawer(true));
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", () => toggleCartDrawer(false));
  if (cartOverlay) cartOverlay.addEventListener("click", () => toggleCartDrawer(false));

  // Double-Click Logo Admin trigger (Hidden Access)
  const brandLogoText = document.getElementById("brand-logo-title");
  const brandLogoSub = document.getElementById("brand-logo-subtitle");
  
  if (brandLogoText) brandLogoText.addEventListener("dblclick", () => toggleAdminDrawer(true));
  if (brandLogoSub) brandLogoSub.addEventListener("dblclick", () => toggleAdminDrawer(true));

  // Key combination Admin trigger: Ctrl + Shift + A
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      toggleAdminDrawer(true);
    }
  });

  // Admin Drawer close events
  const adminCloseBtn = document.getElementById("admin-drawer-close-btn");
  const adminOverlay = document.getElementById("admin-drawer-overlay");

  if (adminCloseBtn) adminCloseBtn.addEventListener("click", () => toggleAdminDrawer(false));
  if (adminOverlay) adminOverlay.addEventListener("click", () => toggleAdminDrawer(false));

  // Admin authentication submit action
  const authBtn = document.getElementById("admin-passcode-auth-btn");
  if (authBtn) {
    authBtn.addEventListener("click", handleAdminAuthentication);
  }
  const passcodeField = document.getElementById("admin-passcode-field");
  if (passcodeField) {
    passcodeField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleAdminAuthentication();
    });
  }

  // Admin inventory save / clear events
  const productFormSubmit = document.getElementById("admin-product-submit-btn");
  if (productFormSubmit) {
    productFormSubmit.addEventListener("click", handleProductSubmit);
  }
  const productFormClear = document.getElementById("admin-product-clear-btn");
  if (productFormClear) {
    productFormClear.addEventListener("click", clearProductForm);
  }

  // Filter click events
  const filterTabsContainer = document.getElementById("catalog-category-filter-tabs");
  if (filterTabsContainer) {
    filterTabsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        const buttons = filterTabsContainer.querySelectorAll(".filter-btn");
        buttons.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        
        activeCategory = e.target.dataset.filter;
        renderCatalog();
      }
    });
  }

  // Search input typing event
  const searchInput = document.getElementById("catalog-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchFilter = e.target.value;
      renderCatalog();
    });
  }

  // Sorting list option change event
  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Pay Button action
  const payBtn = document.getElementById("cart-checkout-payment-btn");
  if (payBtn) {
    payBtn.addEventListener("click", triggerRazorpayCheckout);
  }

  // Click on categories cards in dashboard updates catalog filter
  const categoryCardsWrapper = document.getElementById("category-cards-wrapper");
  if (categoryCardsWrapper) {
    categoryCardsWrapper.addEventListener("click", (e) => {
      const card = e.target.closest(".category-card");
      if (card) {
        const categoryVal = card.dataset.category;
        filterCatalogDirectly(categoryVal);
        const catalogSection = document.getElementById("catalog");
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Product Details Modal Close triggers
  const detailCloseBtn = document.getElementById("product-detail-close-btn");
  const detailOverlay = document.getElementById("product-detail-modal-overlay");
  
  if (detailCloseBtn) detailCloseBtn.addEventListener("click", closeProductDetailModal);
  if (detailOverlay) detailOverlay.addEventListener("click", closeProductDetailModal);

  // Carousel Buttons click listeners
  const carouselPrev = document.getElementById("carousel-prev-btn");
  const carouselNext = document.getElementById("carousel-next-btn");
  
  if (carouselPrev) carouselPrev.addEventListener("click", () => gotoSlide(currentSlideIndex - 1));
  if (carouselNext) carouselNext.addEventListener("click", () => gotoSlide(currentSlideIndex + 1));

  // Reviews forms initializations
  setupReviewStarsSelection();
  setupReviewImageUpload();

  const reviewSubmitBtn = document.getElementById("submit-review-btn");
  if (reviewSubmitBtn) {
    reviewSubmitBtn.addEventListener("click", handleReviewSubmit);
  }

  // Simulated Razorpay Popups events setup
  setupRazorpaySimEvents();

  // Header background shade adjustment on scroll
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// Razorpay Simulated popup elements events
function setupRazorpaySimEvents() {
  const closeBtn = document.getElementById("razorpay-sim-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeSimulatedRazorpayModal);

  // Method selectors
  const payUpi = document.getElementById("payment-method-upi");
  const payCard = document.getElementById("payment-method-card");
  const payNb = document.getElementById("payment-method-netbanking");

  if (payUpi) payUpi.addEventListener("click", () => showRazorpaySimStep("rzp-step-upi-qr"));
  if (payCard) payCard.addEventListener("click", () => showRazorpaySimStep("rzp-step-card-form"));
  if (payNb) payNb.addEventListener("click", () => showRazorpaySimStep("rzp-step-netbanking"));

  // Back button selectors
  const back1 = document.getElementById("rzp-back-to-methods-1");
  const back2 = document.getElementById("rzp-back-to-methods-2");
  const back3 = document.getElementById("rzp-back-to-methods-3");

  if (back1) back1.addEventListener("click", (e) => { e.preventDefault(); showRazorpaySimStep("rzp-step-methods"); });
  if (back2) back2.addEventListener("click", (e) => { e.preventDefault(); showRazorpaySimStep("rzp-step-methods"); });
  if (back3) back3.addEventListener("click", (e) => { e.preventDefault(); showRazorpaySimStep("rzp-step-methods"); });

  // Simulate success triggers
  const btnUpiSim = document.getElementById("rzp-sim-success-qr-btn");
  const btnCardSim = document.getElementById("rzp-sim-success-card-btn");
  const btnCloseSuccess = document.getElementById("rzp-sim-success-close-btn");

  if (btnUpiSim) btnUpiSim.addEventListener("click", runSimulatedPaymentProcessing);
  if (btnCardSim) btnCardSim.addEventListener("click", runSimulatedPaymentProcessing);
  if (btnCloseSuccess) btnCloseSuccess.addEventListener("click", () => {
    closeSimulatedRazorpayModal();
    cart = [];
    saveCart();
    
    showToast("Purchase Complete! Receipt sent to email.", "success");
    setTimeout(() => {
      alert("✨ Congratulations! Your order at Rang Utsav Designer was received successfully. (Simulated Checkout Done)");
    }, 200);
  });

  // Netbanking bank trigger
  const nbGrid = document.getElementById("rzp-nb-grid");
  if (nbGrid) {
    nbGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".nb-bank-btn");
      if (btn) {
        runSimulatedPaymentProcessing();
      }
    });
  }
}

// Cinematic Entrance Animations
function setupScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}
