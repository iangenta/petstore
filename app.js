let cart = JSON.parse(localStorage.getItem("cart")) || [];
let stock = {
    harness1: 10,
    toy1: 10,
    food1: 10,
    medicine1: 10,
};

function addToCart(name, price) {
    if (stock[name] === 0) {
        alert("Item is out of stock");
        return;
    }
    let item = cart.find((i) => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        item = {
            name: name,
            price: price,
            quantity: 1
        };
        cart.push(item);
    }
    stock[name]--;
    updateCart();
}


function removeFromCart(name) {
    let item = cart.find((i) => i.name === name);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter((i) => i.name !== name);
        }
        stock[name]++;
        updateCart();
    }
}

function updateCart() {
    let cartItemsList = "";
    let totalPrice = 0;
    cart.forEach((item) => {
        cartItemsList += `<li>${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity} <button class="remove-btn" data-name="${item.name}">Remove</button></li>`;
        totalPrice += item.price * item.quantity;
    });
    document.getElementById("cart-items").innerHTML = cartItemsList;
    document.getElementById("cart-total").innerHTML = `Total: $${totalPrice}`;
    if (cart.length > 0) {
        document.getElementById("checkout-btn").disabled = false;
    } else {
        document.getElementById("checkout-btn").disabled = true;
    }
    updateStock();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateStock() {
    let productElements = document.getElementsByClassName("product");
    for (let i = 0; i < productElements.length; i++) {
        let name = productElements[i].getElementsByClassName("add-to-cart-btn")[0].getAttribute("data-name");
        let stockLevel = stock[name];
        let stockElem = productElements[i].getElementsByClassName("stock-level")[0];
        if (!stockElem) {
            stockElem = document.createElement("div");
            stockElem.className = "stock-level";
            productElements[i].appendChild(stockElem);
        }
        stockElem.innerHTML = "Stock: " + stockLevel;
        if (stockLevel === 0) {
            productElements[i].getElementsByClassName("add-to-cart-btn")[0].disabled = true;
        } else {
            productElements[i].getElementsByClassName("add-to-cart-btn")[0].disabled = false;
        }
    }
}
let cartIcon = document.querySelector("#cart-icon");
let header = document.querySelector("header");
cartIcon.addEventListener("click", function() {
    header.classList.toggle("show-cart");
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        let name = e.target.getAttribute("data-name");
        let price = e.target.getAttribute("data-price");
        addToCart(name, price);
    }
    if (e.target.classList.contains("remove-btn")) {
        let name = e.target.getAttribute("data-name");
        removeFromCart(name);
    }
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    let shippingInformation = {};
    // Collect shipping and billing information from form inputs
    // Send request to server to save order details and complete checkout process
});

updateStock();

// this code should be put in script tag in html file.
// Additionally in your HTML you need to create a new div with the class "stock-level" in each article tag with the class "product"
// so you can get the stock level by class name and appending it to the product container.


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        let name = e.target.getAttribute("data-name");
        let price = e.target.getAttribute("data-price");
        addToCart(name, price);
    }
            
    if (e.target.classList.contains("remove-btn")) {
        let name = e.target.getAttribute("data-name");
        removeFromCart(name);
    }
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    let shippingInformation = {};
    // Collect shipping and billing information from form inputs
    // Send request to server to save order details and complete checkout process
});

updateStock();

            // this code should be put in script tag in html file.
            // Additionally in your HTML you need to create a new div with the class "stock-level" in each article tag with the class "product"
            // so you can get the stock level by class name and appending it to the product container.
