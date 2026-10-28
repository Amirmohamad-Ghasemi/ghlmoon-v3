
const cpProducts = {
    bench: {
        name: "Adjustable Bench",
        price: 299,
        image: "../asset/sandali1.png"
    },
    dumbbell: {
        name: "Hex Dumbbell Set (Pair)",
        price: 199,
        image: "../asset/download.png"
    },
    treadmill: {
        name: "Treadmill Pro 500",
        price: 1299,
        image: "../asset/file_00000000a35081f4a258f315ae048e94.png"
    },
    gym: {
        name: "Home Gym Station",
        price: 899,
        image: "../asset/file_0000000089d48243ace9d6d8cd059b8f.png"
    }
};

const params = new URLSearchParams(window.location.search);
const productKey = params.get("product") || "bench";
const product = cpProducts[productKey] || cpProducts.bench;

// Product information
const nameElement = document.getElementById("cpProductName");
const breadcrumbElement = document.getElementById("cpBreadcrumbName");
const priceElement = document.getElementById("cpProductPrice");
const imageElement = document.getElementById("cpProductImage");

if (nameElement) nameElement.textContent = product.name;
if (breadcrumbElement) breadcrumbElement.textContent = product.name;

if (priceElement) {
    priceElement.textContent =
        "$" + product.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}

if (imageElement) {
    imageElement.src = product.image;
    imageElement.alt = product.name;
}

// Product options
let cpQuantity = 1;
let cpColor = "Black";

// Quantity buttons
const quantityDisplay = document.getElementById("cpQuantity");

const decreaseButton = document.getElementById("cpDecrease");
const increaseButton = document.getElementById("cpIncrease");

function updateQuantityDisplay() {
    if (quantityDisplay) {
        quantityDisplay.textContent = cpQuantity;
    }
}

if (decreaseButton) {
    decreaseButton.addEventListener("click", function () {
        cpQuantity = Math.max(1, cpQuantity - 1);
        updateQuantityDisplay();
    });
}

if (increaseButton) {
    increaseButton.addEventListener("click", function () {
        cpQuantity += 1;
        updateQuantityDisplay();
    });
}

// Color selection
document.querySelectorAll("[data-color]").forEach(function (button) {
    button.addEventListener("click", function () {
        cpColor = button.dataset.color || "Black";

        document.querySelectorAll("[data-color]").forEach(function (item) {
            item.classList.remove("active", "selected");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active", "selected");
        button.setAttribute("aria-pressed", "true");
    });
});

// Add to cart
const addButton = document.getElementById("cpAddToCart");

if (addButton) {
    addButton.addEventListener("click", function (event) {
        event.preventDefault();

        const cartKey = "noxenShoppingCart";
        const message = document.getElementById("cpMessage");

        try {
            let cart = [];

            try {
                cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
            } catch (error) {
                cart = [];
            }

            if (!Array.isArray(cart)) {
                cart = [];
            }

            const itemId = productKey + "-" + cpColor;
            const quantityToAdd = Math.max(
                1,
                Number(cpQuantity) || 1
            );

            const existingItem = cart.find(function (item) {
                return item.id === itemId;
            });

            if (existingItem) {
                existingItem.quantity =
                    Math.max(0, Number(existingItem.quantity) || 0)
                    + quantityToAdd;
            } else {
                cart.push({
                    id: itemId,
                    name: product.name,
                    image: product.image,
                    price: Number(product.price),
                    quantity: quantityToAdd,
                    color: cpColor
                });
            }

            localStorage.setItem(cartKey, JSON.stringify(cart));

            // Update cart count
            const cartCount = document.getElementById("cartCount");

            if (cartCount) {
                cartCount.textContent = cart.reduce(function (total, item) {
                    return total + (Number(item.quantity) || 0);
                }, 0);
            }

            // Refresh cart preview if the site's function exists
            if (typeof window.renderCart === "function") {
                window.renderCart();
            }

            if (message) {
                message.textContent =
                    product.name + " added to cart successfully!";
            }
        } catch (error) {
            console.error("Add to cart failed:", error);

            if (message) {
                message.textContent =
                    "Could not add product. Please try again.";
            }
        }
    });
}
