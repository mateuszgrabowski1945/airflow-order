let cart = JSON.parse(localStorage.getItem("airflowCart")) || [];

function saveCart() {

    localStorage.setItem(
        "airflowCart",
        JSON.stringify(cart)
    );

}

function getShippingCost(){

    const selected =
        document.querySelector(
            'input[name="shipping"]:checked'
        );

    if(!selected){
        return 0;
    }

    return parseFloat(selected.value);
}

function addToCart(index){

    const product =
        window.products[index];

    const color =
        document.getElementById(
            `color-${index}`
        ).value;

    const size =
        document.getElementById(
            `size-${index}`
        ).value;

    const quantity =
        parseInt(
            document.getElementById(
                `qty-${index}`
            ).value
        );

    const existing =
        cart.find(item =>
            item.id === product.id &&
            item.color === color &&
            item.size === size
        );

    if(existing){

        existing.quantity += quantity;

    }else{

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            color,
            size,
            quantity

        });

    }

    document.getElementById(
        `qty-${index}`
    ).value = 1;

    saveCart();
    renderCart();
}

function removeFromCart(index){

    cart.splice(index,1);

    saveCart();
    renderCart();
}

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();
    renderCart();
}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();
    renderCart();
}

function renderCart(){

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    if(cart.length === 0){

        cartItems.innerHTML =
            "<p>Koszyk jest pusty.</p>";

        cartTotal.innerHTML =
            "0.00 zł";

        return;
    }

    let html = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach((item,index)=>{

        total +=
            item.price *
            item.quantity;

        totalQty +=
            item.quantity;

        html += `

        <div class="cart-item">

            <strong>
                ${item.name}
            </strong>

            <br>

            ${item.color}
            •
            ${item.size}

            <div class="d-flex justify-content-between align-items-center mt-3">

                <div>

                    <button
                        class="btn btn-sm btn-outline-secondary"
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>

                    <strong class="mx-2">

                        ${item.quantity}

                    </strong>

                    <button
                        class="btn btn-sm btn-outline-secondary"
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>

                <strong>

                    ${(item.price * item.quantity).toFixed(2)} zł

                </strong>

            </div>

            <button
                class="cart-remove mt-3"
                onclick="removeFromCart(${index})">

                Usuń

            </button>

        </div>

        `;

    });

    const shipping =
        getShippingCost();

    const grandTotal =
        total + shipping;

    html += `

    <div class="mt-4">

        <hr>

        <div class="d-flex justify-content-between">

            <span>Ilość sztuk</span>

            <strong>${totalQty}</strong>

        </div>

        <div class="d-flex justify-content-between">

            <span>Produkty</span>

            <strong>${total.toFixed(2)} zł</strong>

        </div>

        <div class="d-flex justify-content-between">

            <span>Dostawa</span>

            <strong>${shipping.toFixed(2)} zł</strong>

        </div>

    </div>

    `;
const mobileTotal =
    document.getElementById(
        "mobileCartTotal"
    );

if(mobileTotal){

    mobileTotal.innerHTML =
        grandTotal.toFixed(2) +
        " zł";

}
    cartItems.innerHTML =
        html;

    cartTotal.innerHTML =
        grandTotal.toFixed(2) +
        " zł";
}

document.addEventListener(
    "change",
    (e)=>{

        if(
            e.target.name ===
            "shipping"
        ){

            const lockerBox =
                document.getElementById(
                    "inpostBox"
                );

            if(
                document.getElementById(
                    "inpost"
                ).checked
            ){

                lockerBox.style.display =
                    "block";

            }else{

                lockerBox.style.display =
                    "none";

            }

            renderCart();

        }

    }
);

renderCart();