class Product {
    constructor(name, price, imageSrc) {
        this.name = name;
        this.price = price;
        this.imageSrc = imageSrc;
    }

    createHTMLElement() {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${this.imageSrc}" alt="${this.name}">
            <h2>${this.name}</h2>
            <button class="shop-now-btn" onclick="addToCart('${this.name}', ${this.price})">Shop Now</button>
        `;
        return productDiv;
    }
}

const products = [
    new Product("Gulab Jamun", 400, "./images/gulab_jamun-removebg-preview.png"),
    new Product("Kaju Katli", 1000, "./images/kaju_katli-removebg-preview.png"),
    new Product( "Carrot Halwa", 350, "./images/carrot_halwa-removebg-preview.png", 3 ),
    new Product("Bread Cake", 450, "./images/breadcake-removebg-preview.png", 4),
    new Product("Kalakand", 400, "./images/kalakand-removebg-preview.png", 5),
    new Product("Rasgulla", 450, "./images/rasgulla-removebg-preview.png", 6),
    new Product("Laddu", 400, "./images/laddu-removebg-preview.png", 7),
    new Product("Sandwich", 550, "./images/sandwich-removebg-preview.png", 8),
    new Product("DryFruit Halwa", 550,"images/dryfruit halwa.png"),
    new Product("Mixture", 300, "./images/mixture-removebg-preview.png", 9),
    new Product("Murukulu", 250, "./images/murukulu-removebg-preview.png", 10),
    new Product(
      "Kaju Mixture",
      450,
      "./images/special_kaju_mixture-removebg-preview.png",
      11
    ),
    new Product("Chakodi", 280, "./images/chakodi-removebg-preview.png", 13),
    new Product("Nippattu", 330, "./images/nippattu-removebg-preview.png", 14),
    new Product(
      "White Muruku",
      250,
      "./images/nippats-removebg-preview.png",
      15
    ),
    // Add more products here
];

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-container");

    products.forEach(product => {
        const productElement = product.createHTMLElement();
        productsContainer.appendChild(productElement);
    });
});

let cartItems = [];

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Rs${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });
    cartTotal.textContent = `Total: Rs${totalPrice.toFixed(2)}`;
}

function purchase() {
    const cartItemsList = document.getElementById("cart-items");
    if (cartItemsList.children.length === 0) {
      alert("You haven't purchased anything");
    } else {
      alert("Thank you for your purchase!");
      // Clear the cart
      cartItemsList.innerHTML = "";
      const cartTotal = document.getElementById("cart-total");
      cartTotal.textContent = "Rs0.00";
    }
  }