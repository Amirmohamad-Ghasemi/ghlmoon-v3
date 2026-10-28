
const CART_KEY = "noxenShoppingCart";

const cartItemsContainer = document.getElementById("cartPageItems");
const cartCountElement = document.getElementById("cartCount");
const itemsLabel = document.getElementById("itemsLabel");
const summaryCount = document.getElementById("summaryCount");
const subtotalElement = document.getElementById("cartSubtotal");
const totalElement = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
}

function getItemId(item) {
    return String(
        item.id ??
        item.itemId ??
        `${item.image || ""}|${item.name || item.title || ""}|${item.color || ""}`
    );
}

function getItemName(item) {
    return item.name || item.title || item.productName || "NOXEN Product";
}

function getItemPrice(item) {
    const rawPrice = item.price ?? item.amount ?? 0;

    if (typeof rawPrice === "number") {
        return Number.isFinite(rawPrice) ? Math.max(0, rawPrice) : 0;
    }

    const normalized = String(rawPrice)
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "");

    const price = Number(normalized);

    return Number.isFinite(price) ? Math.max(0, price) : 0;
}

function getItemImage(item) {
    return item.image || item.img || item.imageUrl || "";
}

function getQuantity(item) {
    const quantity = Number(item.quantity ?? item.qty ?? 1);

    return Number.isFinite(quantity)
        ? Math.max(1, Math.min(99, Math.floor(quantity)))
        : 1;
}

function formatPrice(price) {
    return "$" + price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function changeQuantity(id, amount) {
    const cart = getCart();
    const index = cart.findIndex(item => getItemId(item) === id);

    if (index === -1) return;

    const newQuantity = getQuantity(cart[index]) + amount;

    if (newQuantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = Math.min(99, newQuantity);
    }

    saveCart(cart);
}

function removeItem(id) {
    const cart = getCart().filter(item => getItemId(item) !== id);
    saveCart(cart);
}

function renderCart() {
    const cart = getCart();

    const totalItems = cart.reduce(
        (sum, item) => sum + getQuantity(item),
        0
    );

    const subtotal = cart.reduce(
        (sum, item) => sum + getItemPrice(item) * getQuantity(item),
        0
    );

    cartCountElement.textContent = totalItems;
    itemsLabel.textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
    summaryCount.textContent = totalItems;
    subtotalElement.textContent = formatPrice(subtotal);
    totalElement.textContent = formatPrice(subtotal);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "";
        cartItemsContainer.appendChild(
            document.getElementById("emptyCartTemplate").content.cloneNode(true)
        );

        checkoutButton.disabled = true;
        checkoutButton.classList.add("opacity-50");
        return;
    }

    checkoutButton.disabled = false;
    checkoutButton.classList.remove("opacity-50");

    cartItemsContainer.innerHTML = cart.map(item => {
        const id = getItemId(item);
        const name = getItemName(item);
        const price = getItemPrice(item);
        const quantity = getQuantity(item);
        const image = getItemImage(item);
        const color = item.color ? String(item.color) : "";

        return `
            <article class="cart-item">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    onerror="this.style.visibility='hidden'"
                >

                <div class="item-info">

                    <h5 class="fw-bold mb-2">
                        ${escapeHTML(name)}
                    </h5>

                    ${color ? `
                        <p class="text-secondary small mb-2">
                            Color: ${escapeHTML(color)}
                        </p>
                    ` : ""}

                    <p class="item-price mb-3">
                        ${formatPrice(price)}
                    </p>

                    <div class="d-flex align-items-center flex-wrap gap-3">

                        <div class="quantity-control">

                            <button
                                type="button"
                                data-action="decrease"
                                data-id="${escapeHTML(id)}"
                                aria-label="Decrease quantity"
                            >−</button>

                            <span class="quantity-number">
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                data-action="increase"
                                data-id="${escapeHTML(id)}"
                                aria-label="Increase quantity"
                                ${quantity >= 99 ? "disabled" : ""}
                            >+</button>

                        </div>

                        <button
                            type="button"
                            class="remove-btn"
                            data-action="remove"
                            data-id="${escapeHTML(id)}"
                        >
                            <i class="bi bi-trash3 me-1"></i>
                            Remove
                        </button>

                    </div>

                </div>

                <div class="fw-bold text-nowrap">
                    ${formatPrice(price * quantity)}
                </div>

            </article>
        `;
    }).join("");
}

cartItemsContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(id, 1);
    }

    if (action === "decrease") {
        changeQuantity(id, -1);
    }

    if (action === "remove") {
        removeItem(id);
    }
});

checkoutButton.addEventListener("click", () => {
    if (getCart().length === 0) return;

    alert("Checkout is not connected yet.");
});

window.addEventListener("storage", event => {
    if (event.key === CART_KEY) {
        renderCart();
    }
});

renderCart();
