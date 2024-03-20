class Sweet {
  constructor(name, price, imageSrc, id) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
    this.id = id;
    this.quantity = 1; // Initialize quantity to 1
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('sweet');
    div.innerHTML = `
      <img src="${this.imageSrc}" alt="${this.name}" />
      <h2>${this.name}</h2>
      <p>Price: Rs${this.price.toFixed(2)}</p>
      <div class="quantity-controls">
        <button class="quantity-minus">-</button>
        <span class="quantity">${this.quantity}</span>
        <button class="quantity-plus">+</button>
      </div>
      <button class="add-to-cart" data-id="${this.id}">Add to Cart</button>
    `;
    
    const addToCartButton = div.querySelector('.add-to-cart');
    const quantityMinusButton = div.querySelector('.quantity-minus');
    const quantityPlusButton = div.querySelector('.quantity-plus');
    const quantitySpan = div.querySelector('.quantity');
    
    addToCartButton.addEventListener('click', () => {
      addToCart(this);
    });
    
    quantityMinusButton.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        quantitySpan.textContent = this.quantity;
        updateTotalPrice(-this.price); // Update total price
        updateCartItemQuantity(this.id, this.quantity); // Update cart item quantity
      }
    });
    
    quantityPlusButton.addEventListener('click', () => {
      this.quantity++;
      quantitySpan.textContent = this.quantity;
      updateTotalPrice(this.price); // Update total price
      updateCartItemQuantity(this.id, this.quantity); // Update cart item quantity
    });

    return div;
  }
}

class Savoury {
  constructor(name, price, imageSrc, id) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
    this.id = id;
    this.quantity = 1; // Initialize quantity to 1
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('savoury');
    div.innerHTML = `
      <img src="${this.imageSrc}" alt="${this.name}" />
      <h2>${this.name}</h2>
      <p>Price: Rs${this.price.toFixed(2)}</p>
      <div class="quantity-controls">
        <button class="quantity-minus">-</button>
        <span class="quantity">${this.quantity}</span>
        <button class="quantity-plus">+</button>
      </div>
      <button class="add-to-cart" data-id="${this.id}">Add to Cart</button>
    `;
    
    const addToCartButton = div.querySelector('.add-to-cart');
    const quantityMinusButton = div.querySelector('.quantity-minus');
    const quantityPlusButton = div.querySelector('.quantity-plus');
    const quantitySpan = div.querySelector('.quantity');
    
    addToCartButton.addEventListener('click', () => {
      addToCart(this);
    });
    
    quantityMinusButton.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        quantitySpan.textContent = this.quantity;
        updateTotalPrice(-this.price); // Update total price
        updateCartItemQuantity(this.id, this.quantity); // Update cart item quantity
      }
    });
    
    quantityPlusButton.addEventListener('click', () => {
      this.quantity++;
      quantitySpan.textContent = this.quantity;
      updateTotalPrice(this.price); // Update total price
      updateCartItemQuantity(this.id, this.quantity); // Update cart item quantity
    });

    return div;
  }
}

class ShoppingCartItem {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sweetsContainer = document.getElementById("sweetsContainer");
  const savouriesContainer = document.getElementById("savouriesContainer");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let totalPrice = 0;
    
  function addToCart(item) {
    let cartItem = findCartItemById(item.id);
    if (cartItem) {
      cartItem.quantity++; // Increase quantity if item is already in the cart
    } else {
      cartItem = new ShoppingCartItem(item.name, item.price, 1); // Initialize quantity to 1 for new item
      const li = document.createElement('li');
      li.dataset.itemId = item.id;
      li.dataset.name = item.name;
      li.dataset.price = item.price;
      li.dataset.quantity = cartItem.quantity;
      li.textContent = `${cartItem.name} x ${cartItem.quantity} - Rs${cartItem.price.toFixed(2)}`;
      cartItemsList.appendChild(li);
    }
  
    totalPrice += cartItem.price;
    cartTotal.textContent = `Rs${totalPrice.toFixed(2)}`;
  
    // Save updated cart items to local storage
    saveCartToLocalStorage(cartItems);
  }
  
  function findCartItemById(itemId) {
    const cartItems = cartItemsList.querySelectorAll('li');
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].dataset.itemId === itemId) {
        return {
          name: cartItems[i].dataset.name,
          price: parseFloat(cartItems[i].dataset.price),
          quantity: parseInt(cartItems[i].dataset.quantity)
        };
      }
    }
    return null;
  }
  

  const sweets = [
    new Sweet("Gulab Jamun",  400,  "./images/gulab_jamun-removebg-preview.png",  1 ),
    new Sweet( "Kaju Katli", 1000, "./images/kaju_katli-removebg-preview.png", 2  ),
    new Sweet( "Carrot Halwa", 350, "./images/carrot_halwa-removebg-preview.png", 3 ),
    new Sweet("Bread Cake", 450, "./images/breadcake-removebg-preview.png", 4),
    new Sweet("Kalakand", 400, "./images/kalakand-removebg-preview.png", 5),
    new Sweet("Rasgulla", 450, "./images/rasgulla-removebg-preview.png", 6),
    new Sweet("Laddu", 400, "./images/laddu-removebg-preview.png", 7),
    new Sweet("Sandwich", 550, "./images/sandwich-removebg-preview.png", 8),
    new Sweet("DryFruit Halwa", 550,"images/dryfruit halwa.png")
  ];

  const savouries = [
    new Savoury("Mixture", 300, "./images/mixture-removebg-preview.png", 9),
    new Savoury("Murukulu", 250, "./images/murukulu-removebg-preview.png", 10),
    new Savoury(
      "Kaju Mixture",
      450,
      "./images/special_kaju_mixture-removebg-preview.png",
      11
    ),
    new Savoury("Chakodi", 280, "./images/chakodi-removebg-preview.png", 13),
    new Savoury("Nippattu", 330, "./images/nippattu-removebg-preview.png", 14),
    new Savoury(
      "White Muruku",
      250,
      "./images/nippats-removebg-preview.png",
      15
    ),
  ];

  sweets.forEach((sweet) => {
    const sweetElement = sweet.createHTMLElement();
    sweetsContainer.appendChild(sweetElement);

    sweetElement
      .querySelector(".add-to-cart")
      .addEventListener("click", function () {
        addToCart(sweet);
      });
  });

  savouries.forEach((savoury) => {
    const savouryElement = savoury.createHTMLElement();
    savouriesContainer.appendChild(savouryElement);

    savouryElement
      .querySelector(".add-to-cart")
      .addEventListener("click", function () {
        addToCart(savoury);
      });
  });
});

function saveCartToLocalStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getCartFromLocalStorage() {
  const cartItemsJSON = localStorage.getItem("cartItems");
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

document.addEventListener("DOMContentLoaded", function () {
  // Existing code

  // Load cart items from local storage
  const savedCartItems = getCartFromLocalStorage();
  savedCartItems.forEach((savedCartItem) => {
    const li = document.createElement("li");
    li.textContent = `${savedCartItem.name} - Rs${savedCartItem.price.toFixed(
      2
    )}`;
    cartItemsList.appendChild(li);
  });

  // Calculate total price from saved items
  totalPrice = savedCartItems.reduce((total, item) => total + item.price, 0);
  cartTotal.textContent = `Rs${totalPrice.toFixed(2)}`;
});

function addToCart(item) {
  // Existing code

  // Save updated cart items to local storage
  saveCartToLocalStorage(cartItems);
}

function purchase() {
  // Existing code

  // Clear local storage
  localStorage.removeItem("cartItems");
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

//   sweets.forEach(sweet => {
//     const sweetElement = sweet.createHTMLElement();
//     sweetsContainer.appendChild(sweetElement);

//     sweetElement.querySelector('.add-to-cart').addEventListener('click', function() {
//       const cartItem = new ShoppingCartItem(sweet.name, sweet.price);
//       const li = document.createElement('li');
//       li.textContent = `${cartItem.name} - Rs${cartItem.price.toFixed(2)}`;
//       cartItemsList.appendChild(li);

//       totalPrice += cartItem.price;
//       cartTotal.textContent = `Rs${totalPrice.toFixed(2)}`;
//     });
//   });

//   savouries.forEach(savoury => {
//     const savouryElement = savoury.createHTMLElement();
//     savouriesContainer.appendChild(savouryElement);

//     savouryElement.querySelector('.add-to-cart').addEventListener('click', function() {
//       const cartItem = new ShoppingCartItem(savoury.name, savoury.price);
//       const li = document.createElement('li');
//       li.textContent = `${cartItem.name} - Rs${cartItem.price.toFixed(2)}`;
//       cartItemsList.appendChild(li);

//       totalPrice += cartItem.price;
//       cartTotal.textContent = `Rs${totalPrice.toFixed(2)}`;
//     });
//   });
// });




