document.addEventListener("DOMContentLoaded", () => {
    const CART_KEY = "noxenShoppingCart";

    const imageElement = document.getElementById("cpProductImage");
    const titleElement = document.getElementById("cpProductTitle");
    const priceElement = document.getElementById("cpProductPrice");
    const categoryElement = document.getElementById("cpProductCategory");
    const descriptionElement = document.getElementById("cpProductDescription");

    const colorInput = document.getElementById("cpProductColor");
    const selectedColorText = document.getElementById("cpSelectedColor");
    const quantityInput = document.getElementById("cpProductQuantity");

    const minusButton = document.getElementById("cpQuantityMinus");
    const plusButton = document.getElementById("cpQuantityPlus");
    const addButton = document.getElementById("cpAddToCart");
    const messageElement = document.getElementById("cpCartMessage");

    // All four homepage products
    const products = {
        bench: {
            name: "Adjustable Bench",
            price: 299,
            image: "../asset/simkesh.png",
            category: "STRENGTH EQUIPMENT",
            description:
                "Train comfortably with the NOXEN Adjustable Bench, designed to support a variety of strength-training exercises."
        },

        dumbbell: {
            name: "Hex Dumbbell Set (Pair)",
            price: 199,
            image: "../asset/sandali1.png",
            category: "STRENGTH EQUIPMENT",
            description:
                "Upgrade your strength training with the NOXEN Hex Dumbbell Set, designed for versatile workouts at home."
        },

        treadmill: {
            name: "Treadmill Pro 500",
            price: 1299,
            image: "../asset/download.png",
            category: "CARDIO EQUIPMENT",
            description:
                "Bring your cardio workouts home with the NOXEN Treadmill Pro 500."
        },

        gym: {
            name: "Home Gym Station",
            price: 899,
            image: "../asset/file_00000000a35081f4a258f315ae048e94.png",
            category: "STRENGTH EQUIPMENT",
            description:
                "Build your home workout space with the NOXEN Home Gym Station."
        }
    };

    // Read shopping cart
    function readCart() {
        try {
            const cart = JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

            return Array.isArray(cart) ? cart : [];
        } catch {
            return [];
        }
    }

    // Format price
    function formatMoney(price) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(price);
    }

    function getProductPrice() {
        const rawPrice = priceElement.textContent.replace(/[^0-9.]/g, "");
        return Number(rawPrice) || 0;
    }

    // Get product ID from the URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    const product = products[productId];

    // Display the selected product
    if (product) {
        titleElement.textContent = product.name;
        priceElement.textContent = formatMoney(product.price);
        imageElement.src = product.image;
        imageElement.alt = product.name;
        categoryElement.textContent = product.category;
        descriptionElement.textContent = product.description;
    } else {
        titleElement.textContent = "Product Not Found";

        messageElement.style.color = "#ff6675";
        messageElement.textContent =
            "Please return to the shop and select a product.";

        addButton.disabled = true;
    }

    // Handle image loading errors
    imageElement.addEventListener("error", () => {
        imageElement.alt =
            "Product image could not be loaded. Check the image path.";
    });

    // Color selection
    document.querySelectorAll(".cp-color-option").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".cp-color-option").forEach((option) => {
                option.classList.remove("active");
                option.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            const color = button.dataset.color || "Black";

            colorInput.value = color;
            selectedColorText.textContent = color;
            messageElement.textContent = "";
        });
    });

    // Quantity controls
    function setQuantity(value) {
        const quantity = Math.min(
            99,
            Math.max(1, Number(value) || 1)
        );

        quantityInput.value = quantity;
    }

    minusButton.addEventListener("click", () => {
        setQuantity(Number(quantityInput.value) - 1);
    });

    plusButton.addEventListener("click", () => {
        setQuantity(Number(quantityInput.value) + 1);
    });

    quantityInput.addEventListener("change", () => {
        setQuantity(quantityInput.value);
    });

    // Add selected product to shopping cart
    addButton.addEventListener("click", () => {
        if (!product) return;

        const name = titleElement.textContent.trim();
        const price = getProductPrice();
        const image = imageElement.getAttribute("src") || "";
        const category = categoryElement.textContent.trim();
        const color = colorInput.value || "Black";

        const quantity = Math.min(
            99,
            Math.max(1, Number(quantityInput.value) || 1)
        );

        if (!name || !Number.isFinite(price)) {
            messageElement.style.color = "#ff6675";
            messageElement.textContent =
                "Please check the product information.";
            return;
        }

        const cart = readCart();

        // Find the same product with the same color
        const existingProduct = cart.find((item) =>
            item.name === name &&
            (item.color || "Black") === color
        );

        if (existingProduct) {
            existingProduct.quantity = Math.min(
                999,
                (Number(existingProduct.quantity) || 1) + quantity
            );
        } else {
            cart.push({
                id: `${Date.now()}-${Math.random()
                    .toString(16)
                    .slice(2)}`,
                name: name,
                price: price,
                image: image,
                category: category,
                color: color,
                quantity: quantity
            });
        }

        // Save cart
        try {
            localStorage.setItem(
                CART_KEY,
                JSON.stringify(cart)
            );

            messageElement.style.color = "#65d995";
            messageElement.textContent =
                "Product added to your cart!";

            addButton.innerHTML =
                '<i class="bi bi-check-circle"></i> ADDED TO CART';

            setTimeout(() => {
                addButton.innerHTML =
                    '<i class="bi bi-cart-plus me-2"></i> ADD TO CART';
            }, 1400);

        } catch {
            messageElement.style.color = "#ff6675";
            messageElement.textContent =
                "Could not save the cart. Please check your browser settings.";
        }
    });
});