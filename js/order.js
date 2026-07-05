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

async function sendOrder(){

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
            "✅ Zamówienie zostało wysłane."
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