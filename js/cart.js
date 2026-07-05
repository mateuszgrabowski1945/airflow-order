let cart = JSON.parse(localStorage.getItem("airflowCart")) || [];

function saveCart() {
    localStorage.setItem("airflowCart", JSON.stringify(cart));
}

function addToCart(index) {

    const product = window.products[index];

    const color = document.getElementById(`color-${index}`).value;
    const size = document.getElementById(`size-${index}`).value;
    const quantity = parseInt(document.getElementById(`qty-${index}`).value);

    cart.push({
        name: product.name,
        price: product.price,
        color: color,
        size: size,
        quantity: quantity
    });

    saveCart();
    renderCart();
}

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    renderCart();

}

function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Koszyk jest pusty.</p>";
        cartTotal.innerHTML = "0.00 zł";

        return;

    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `

        <div class="cart-item">

            <strong>${item.name}</strong><br>

            ${item.color} / ${item.size}<br>

            ${item.quantity} × ${item.price.toFixed(2)} zł

            <br>

            <button
                class="cart-remove"
                onclick="removeFromCart(${index})">

                Usuń

            </button>

        </div>

        `;

    });

    cartItems.innerHTML = html;
    cartTotal.innerHTML = total.toFixed(2) + " zł";

}

renderCart();