
const CART_KEY = "noxenShoppingCart";

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
}

function getProductFromCard(button) {
    const card = button.closest(".product-card");

    if (!card) return null;

    const title = card.querySelector("h6");
    const image = card.querySelector("img");
    const priceElement = card.querySelector(".text-white.fw-bold");

    if (!title || !image || !priceElement) return null;

    const price = Number(
        priceElement.textContent.replace(/[^0-9.]/g, "")
    );

    if (!Number.isFinite(price) || price < 0) return null;

    return {
        id: image.getAttribute("src") + "|" + title.textContent.trim(),
        name: title.textContent.trim(),
        image: image.getAttribute("src"),
        price: price
    };
}

function addToCart(product) {
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
}

function changeQuantity(id, amount) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    saveCart(cart.filter(product => product.quantity > 0));
}

function removeFromCart(id) {
    saveCart(getCart().filter(item => item.id !== id));
}

function money(value) {
    return "$" + value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function renderCart() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const countElement = document.getElementById("cartCount");
    const preview = document.getElementById("cartPreview");
    const previewTotal = document.getElementById("cartPreviewTotal");
    const pageItems = document.getElementById("cartPageItems");
    const pageTotal = document.getElementById("cartPageTotal");
    const pageCount = document.getElementById("cartPageCount");

    if (countElement) countElement.textContent = count;
    if (previewTotal) previewTotal.textContent = money(total);
    if (pageTotal) pageTotal.textContent = money(total);
    if (pageCount) pageCount.textContent = count;

    if (preview) {
        preview.innerHTML = cart.length
            ? cart.slice(0, 3).map(item => `
                <div class="cart-preview-item">
                    <img src="${escapeHTML(item.image)}"
                         alt="${escapeHTML(item.name)}">

                    <div class="item-info">
                        <div class="item-name">
                            ${escapeHTML(item.name)}
                        </div>
                        <small class="text-secondary">
                            ${item.quantity} × ${money(item.price)}
                        </small>
                    </div>

                    <button class="cart-remove-btn"
                            data-remove="${escapeHTML(item.id)}"
                            aria-label="Remove ${escapeHTML(item.name)}">
                        ×
                    </button>
                </div>
            `).join("")
            : '<p class="text-secondary small">Your cart is empty.</p>';
    }

    if (pageItems) {
        pageItems.innerHTML = cart.length
            ? cart.map(item => `
                <div class="cart-page-item">
                    <div class="row align-items-center g-3">
                        <div class="col-4 col-md-3">
                            <img src="${escapeHTML(item.image)}"
                                 alt="${escapeHTML(item.name)}">
                        </div>

                        <div class="col-8 col-md-5">
                            <h6>${escapeHTML(item.name)}</h6>
                            <p class="text-secondary mb-1">
                                ${money(item.price)} each
                            </p>
                            <strong>
                                ${money(item.price * item.quantity)}
                            </strong>
                        </div>

                        <div class="col-8 col-md-3 d-flex align-items-center gap-2">
                            <button class="quantity-btn"
                                    data-quantity="${escapeHTML(item.id)}"
                                    data-change="-1">−</button>

                            <span>${item.quantity}</span>

                            <button class="quantity-btn"
                                    data-quantity="${escapeHTML(item.id)}"
                                    data-change="1">+</button>
                        </div>

                        <div class="col-4 col-md-1 text-end">
                            <button class="cart-remove-btn"
                                    data-remove="${escapeHTML(item.id)}">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `).join("")
            : '<p class="text-secondary">Your shopping cart is empty.</p>';
    }
}

document.addEventListener("click", event => {
    const addButton = event.target.closest(".cart-btn");

    if (addButton) {
        const product = getProductFromCard(addButton);

        if (product) {
            addToCart(product);

            const dropdown = document.getElementById("cartDropdown");

            if (dropdown) dropdown.classList.add("show");
        }
    }

    const removeButton = event.target.closest("[data-remove]");

    if (removeButton) {
        removeFromCart(removeButton.dataset.remove);
    }

    const quantityButton = event.target.closest("[data-quantity]");

    if (quantityButton) {
        changeQuantity(
            quantityButton.dataset.quantity,
            Number(quantityButton.dataset.change)
        );
    }
});

const cartButton = document.getElementById("cartButton");
const cartDropdown = document.getElementById("cartDropdown");

if (cartButton && cartDropdown) {
    cartButton.addEventListener("click", event => {
        event.stopPropagation();

        const isOpen = cartDropdown.classList.toggle("show");

        cartButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".cart-wrapper")) {
            cartDropdown.classList.remove("show");
            cartButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            cartDropdown.classList.remove("show");
            cartButton.setAttribute("aria-expanded", "false");
        }
    });
}

renderCart();

/* =========================
   OPEN SELECTED PRODUCT
   ONLY THE FOUR TOP CARDS
========================= */

document.addEventListener("click", function (event) {
    const card = event.target.closest(
        '[data-product="bench"], ' +
        '[data-product="dumbbell"], ' +
        '[data-product="treadmill"], ' +
        '[data-product="gym"]'
    );

    if (!card) return;

    // Do not open the product page when clicking Add to Cart
    if (event.target.closest(".cart-btn")) return;

    const product = card.dataset.product;

    if (!product) return;

    window.location.href =
        "./categories_shop_page.html?product=" +
        encodeURIComponent(product);
});

