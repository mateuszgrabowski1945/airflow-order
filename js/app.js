async function loadProducts(){

    const response = await fetch("data/products.json");

    const products = await response.json();

    const container = document.getElementById("productsContainer");

    products.forEach(product=>{

        container.innerHTML += `

        <div class="col-lg-4 mb-4">

            <div class="product-card shadow-sm">

                <div class="product-image">

                    Zdjęcie w przygotowaniu

                </div>

                <div class="product-body">

                    <h4>${product.name}</h4>

                    <p class="price">

                        ${product.price} zł

                    </p>

                    <button class="btn btn-airflow">

                        Dodaj do koszyka

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

loadProducts();