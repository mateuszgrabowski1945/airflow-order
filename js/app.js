async function loadProducts() {

    const response = await fetch("data/products.json");
    const products = await response.json();

    document.getElementById("productCounter").innerText =
        `${products.length} produktów`;

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    products.forEach((product, index) => {

        const colors = product.colors.map(color =>
            `<option>${color}</option>`
        ).join("");

        const sizes = product.sizes.map(size =>
            `<option>${size}</option>`
        ).join("");

        container.innerHTML += `

        <div class="col-lg-6 mb-4">

            <div class="product-card shadow-sm">

                <div class="product-image">

                    Zdjęcie w przygotowaniu

                </div>

                <div class="product-body">

                    <h4>${product.name}</h4>

                    <p class="price">

                        ${product.price.toFixed(2)} zł

                    </p>

                    <label>Kolor</label>

                    <select
                        class="form-select mb-3"
                        id="color-${index}">

                        ${colors}

                    </select>

                    <label>Rozmiar</label>

                    <select
                        class="form-select mb-3"
                        id="size-${index}">

                        ${sizes}

                    </select>

                    <label>Ilość</label>

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

    window.products = products;

}

loadProducts();