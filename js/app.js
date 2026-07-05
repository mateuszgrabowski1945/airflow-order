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

                    <label class="mb-1">
                        Kolor
                    </label>

                    <select
                        class="form-select mb-3"
                        id="color-${index}">

                        ${colors}

                    </select>

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