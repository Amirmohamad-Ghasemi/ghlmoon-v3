function openProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}


function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("novaCart")
        ) || [];

    let count = 0;

    cart.forEach(function(item) {

        count += item.quantity;

    });

    const element =
        document.getElementById("cartCount");

    if (element) {

        element.textContent = count;

    }

}


updateCartCount();