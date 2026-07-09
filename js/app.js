async function loadProducts() {

    const response = await fetch("data/products.json");
    const products = await response.json();

    window.products = products;

    document.getElementById("productCounter").innerText =
        `${products.length} produktów`;

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    products.forEach((product, index) => {

        const colors = product.colors.map(color =>
            `<option>${color}</option>`
        ).join("");

        const hasOneSize =
            product.sizes.length === 1;

        const sizes = product.sizes.map(size =>
            `<option>${size}</option>`
        ).join("");

        const imageHtml =
            product.image && product.image !== ""
                ? `<img
                    src="images/products/${product.image}"
                    class="img-fluid w-100"
                    alt="${product.name}">`
                : `<div class="product-image">
                        Zdjęcie w przygotowaniu
                   </div>`;

        container.innerHTML += `

        <div class="col-6 col-md-6 col-lg-4 col-xl-3 mb-4">

            <div class="product-card">

                ${imageHtml}

                <div class="product-body">

                    <h4>${product.name}</h4>

                    <p class="price">
                        ${product.price.toFixed(2)} zł
                    </p>

${
    product.colors.length === 1
    ?
    `
    <input
        type="hidden"
        id="color-${index}"
        value="${product.colors[0]}">

    <div class="mb-3">

        <strong>
            Kolor:
        </strong>

        ${product.colors[0]}

    </div>
    `
    :
    `
    <label class="mb-1">
        Kolor
    </label>

    <select
        class="form-select mb-3"
        id="color-${index}">

        ${colors}

    </select>
    `
}

                    ${
                        hasOneSize
                        ?
                        `
                        <input
                            type="hidden"
                            id="size-${index}"
                            value="${product.sizes[0]}">

                        <div class="mb-3">

                            <strong>
                                Rozmiar:
                            </strong>

                            ${product.sizes[0]}

                        </div>
                        `
                        :
                        `
                        <label class="mb-1">
                            Rozmiar
                        </label>

                        <select
                            class="form-select mb-3"
                            id="size-${index}">

                            ${sizes}

                        </select>
                        `
                    }

                    <label class="mb-1">
                        Ilość
                    </label>

                    <input
                        type="number"
                        class="form-control mb-3"
                        id="qty-${index}"
                        value="1"
                        min="1">

                    <button
                        class="btn btn-airflow w-100"
                        onclick="addToCart(${index})">

                        Dodaj do koszyka

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

loadProducts();
const mobileButton = document.querySelector('.mobile-order-button');
const checkoutPanel = document.querySelector('#checkoutPanel');

if (mobileButton && checkoutPanel) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    mobileButton.style.display = 'none';
                } else {
                    mobileButton.style.display = 'block';
                }

            });

        },

        {
            threshold: 0.15
        }

    );

observer.observe(checkoutPanel);

}

// DOSTAWA

function updateShippingFields() {

    const inpost =
        document.getElementById("inpost");

    const dpd =
        document.getElementById("dpd");

    const pickup =
        document.getElementById("pickup");

    const inpostBox =
        document.getElementById("inpostBox");

    const addressSection =
        document.getElementById("addressSection");

    if (
        !inpost ||
        !dpd ||
        !pickup ||
        !inpostBox ||
        !addressSection
    ) {
        return;
    }

    if (inpost.checked) {

        inpostBox.style.display = "block";
        addressSection.style.display = "none";

    }
    else if (dpd.checked) {

        inpostBox.style.display = "none";
        addressSection.style.display = "block";

    }
    else {

        inpostBox.style.display = "none";
        addressSection.style.display = "none";

    }

}

document
    .querySelectorAll('input[name="shipping"]')
    .forEach(radio => {

        radio.addEventListener(
            "change",
            updateShippingFields
        );

    });

updateShippingFields();
console.log("AIRFLOW shipping loaded");
// FURGONETKA MAPA

const chooseLockerButton =
    document.getElementById("chooseLocker");

const lockerCode =
    document.getElementById("lockerCode");

if (chooseLockerButton && lockerCode) {

    chooseLockerButton.addEventListener("click", () => {

        if (!window.Furgonetka) {
            alert("Mapa Furgonetki jeszcze się ładuje. Spróbuj ponownie za chwilę.");
            return;
        }

        new window.Furgonetka.Map({

    apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGdXJnb25ldGthLnBsIiwiaWF0IjoxNzgzNTg0MjcwLjU3MzcxMywic3ViIjoiOGYzYTk5ZTMtODlmYi00NTM4LWJlZGQtMWJlMTQyNTE3MjA0In0.9a-9byNTYxL8H01WRKq5wKuOX4O0SkOipSKnweu23eI",

    callback: (params) => {

        console.log(params);

        lockerCode.value =
            params.point.code;

    }

}).show();

    });

}