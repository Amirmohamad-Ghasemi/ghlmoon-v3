let cart =
    JSON.parse(
        localStorage.getItem("novaCart")
    ) || [];


function showCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛒
                </div>

                <h2>
                    سبد خرید شما خالی است
                </h2>

                <p>
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>

                <a href="index.html">
                    رفتن به فروشگاه
                </a>

            </div>

        `;

        totalElement.textContent =
            "0 تومان";

        return;

    }


    container.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        total +=
            item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${new Intl.NumberFormat("fa-IR")
                            .format(item.price)}
                        تومان
                    </p>

                    <div class="quantity">

                        <button
                            onclick="increase(${index})">
                            +
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="decrease(${index})">
                            -
                        </button>

                    </div>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    حذف

                </button>

            </div>

        `;

    });


    totalElement.textContent =
        new Intl.NumberFormat("fa-IR")
            .format(total) +
        " تومان";

}


function increase(index) {

    cart[index].quantity++;

    saveCart();

}


function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


function saveCart() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

    showCart();

}


showCart();