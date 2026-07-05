function generateOrderNumber(){

    let current =
        parseInt(
            localStorage.getItem(
                "airflowOrderNumber"
            ) || "0"
        );

    current++;

    localStorage.setItem(
        "airflowOrderNumber",
        current
    );

    const year =
        new Date().getFullYear();

    return `AF-${year}-${String(current).padStart(6,"0")}`;
}
emailjs.init({
    publicKey: "PDi2rqqaIxLdZahqc"
});

function buildOrderText(){

    let text = "";

    cart.forEach(item => {

        text += `
${item.name}
Kolor: ${item.color}
Rozmiar: ${item.size}
Ilość: ${item.quantity}

`;

    });

    return text;
}

async function sendOrder(){const orderNumber =
    generateOrderNumber();

    if(cart.length === 0){

        alert("Koszyk jest pusty.");
        return;
    }

    const customerName =
        document.getElementById("customerName").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    if(
        !customerName ||
        !email ||
        !phone
    ){

        alert(
            "Uzupełnij wymagane pola."
        );

        return;
    }

    const templateParams = {

    order_number:
        orderNumber,

    customer_name:
        customerName,

        customer_name:
            customerName,

        email:
            email,

        phone:
            phone,

        company:
            document.getElementById("company").value,

        street:
            document.getElementById("street").value,

        zip:
            document.getElementById("zip").value,

        city:
            document.getElementById("city").value,

        locker:
            document.getElementById("lockerCode").value,

        order_items:
            buildOrderText(),

        total:
            document.getElementById("cartTotal").innerText
    };

    try{

        await emailjs.send(
            "service_uoy6gkb",
            "template_0c6ktb8",
            templateParams
        );

        alert(
`✅ Zamówienie zostało wysłane.

Numer zamówienia:

${orderNumber}`
);

        cart = [];

        saveCart();

        renderCart();

    }catch(error){

        console.error(error);

        alert(
            "Błąd wysyłki zamówienia."
        );

    }

}