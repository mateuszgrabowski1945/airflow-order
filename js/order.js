function generateOrderNumber() {

    let current = parseInt(
        localStorage.getItem("airflowOrderNumber") || "0"
    );

    current++;

    localStorage.setItem(
        "airflowOrderNumber",
        current
    );

    const year = new Date().getFullYear();

    return `AF-${year}-${String(current).padStart(6, "0")}`;
}

emailjs.init({
    publicKey: "PDi2rqqaIxLdZahqc"
});

function buildOrderText() {

    let text = "";

    cart.forEach(item => {

        text += `${item.name}
Kolor: ${item.color}
Rozmiar: ${item.size}
Ilość: ${item.quantity}

`;

    });

    return text;

}

async function sendOrder() {

    const orderNumber = generateOrderNumber();

    const customerName =
        document.getElementById("customerName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const street =
        document.getElementById("street").value.trim();

    const zip =
        document.getElementById("zip").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const locker =
        document.getElementById("lockerCode").value.trim();

    if (cart.length === 0) {

        alert("Koszyk jest pusty.");
        return;

    }

    if (!customerName) {

        alert("Podaj imię i nazwisko.");
        return;

    }

    if (!email) {

        alert("Podaj adres e-mail.");
        return;

    }

    if (!phone) {

        alert("Podaj numer telefonu.");
        return;

    }

    if (
        document.getElementById("inpost").checked &&
        !locker
    ) {

        alert("Wybierz paczkomat.");
        return;

    }

    if (
        document.getElementById("dpd").checked &&
        (!street || !zip || !city)
    ) {

        alert("Uzupełnij adres dostawy.");
        return;

    }

    const templateParams = {

        order_number: orderNumber,

        customer_name: customerName,

        email: email,

        phone: phone,

        company:
            document.getElementById("company").value,

        street: street,

        zip: zip,

        city: city,

        locker: locker,
        shipping:
    document.getElementById("inpost").checked
        ? `Paczkomat InPost\n${locker}`
        : document.getElementById("dpd").checked
            ? `Kurier DPD\n${street}\n${zip} ${city}`
            : "Odbiór osobisty",

        order_items:
            buildOrderText(),

        total:
            document.getElementById("cartTotal").innerText

    };

    const orderButton =
        document.getElementById("orderButton");

    try {

        orderButton.disabled = true;
        orderButton.innerText = "Wysyłanie...";

        // MAIL DO AIRFLOW

        await emailjs.send(
            "service_uoy6gkb",
            "template_0c6ktb8",
            templateParams
        );

        // MAIL DO KLIENTA

        try {

            await emailjs.send(
                "service_uoy6gkb",
                "template_hwnmb58",
                templateParams
            );

        }
        catch (mailError) {

            console.error(
                "Nie udało się wysłać maila do klienta:",
                mailError
            );

        }

        alert(
`✅ Zamówienie zostało wysłane.

Numer zamówienia:

${orderNumber}`
        );

        cart = [];

        saveCart();

        renderCart();

        document.getElementById("customerName").value = "";
        document.getElementById("company").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("street").value = "";
        document.getElementById("zip").value = "";
        document.getElementById("city").value = "";
        document.getElementById("lockerCode").value = "";

    }
    catch (error) {

        console.error(error);

        alert(
            "Błąd wysyłki zamówienia."
        );

    }
    finally {

        orderButton.disabled = false;
        orderButton.innerText = "ZAMAWIAM";

    }

}