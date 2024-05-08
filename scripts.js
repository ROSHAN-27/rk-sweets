
class Sweet {
  constructor(name, price, imageSrc, id) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
    this.id = id;
    this.quantity = 1;
     // Initialize quantity to 1
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('sweet');
    div.innerHTML = `
      <div class="image-container">
        <img src="${this.imageSrc}" alt="${this.name}" />
      </div>
      <div class="details">
        <h4>${this.name}</h4>
        <p>Price: Rs${this.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="quantity-minus">-</button>
          <span class="quantity">${this.quantity}</span>
          <button class="quantity-plus">+</button>
        </div>
        <button class="add-to-cart" data-id="${this.id}">Add to Cart</button>
      </div>
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
      <h4>${this.name}</h4>
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
    new Sweet("SpecialLaddu",  360,  "./images/ladddu-removebg-preview.png",  1 ),
    new Sweet("Rasgulla", 400, "images/rasgulla-removebg-preview.png", 6),
    new Sweet("MotichurLaddu", 340, "images/motichurLaddu-removebg-preview.png", 7),
    new Sweet("CarrotKalakand", 400, "./images/sweet-removebg-preview.png", 8),
    new Sweet("SoanPapdi", 400, "./images/soanpapdi-removebg-preview.png", 8),

  ];



  const savouries = [
    new Savoury("RK Special Mixture", 300, "./images/dryfruit mixture.png", 9),
    new Savoury("Khara Boondi", 250, "./images/kharaboondi.png", 10),
    new Savoury( "White Muruku",250, "./images/nippats-removebg-preview.png",15),
    new Savoury("Chakodi", 280, "./images/chakodi.png", 13),
    new Savoury("Masala Peanuts", 330, "./images/masala peanuts.png", 14),
    
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

class Sweets1 {
  constructor(name, imageSrc) {
    this.name = name;
    this.imageSrc = imageSrc;
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('sweets1');
    div.innerHTML = `
    <a href="shop.html" class="sweet-link">
    <div class="image-container">
      <img src="${this.imageSrc}" alt="${this.name}" />
    </div>
    <div class="details">
      <h4>${this.name}</h4>
    </div>
  </a>
    `;

    return div;
  }
}

const sweets1 = [
  new Sweets1("Dry Fruit Laddu", "images/dryfruit.png"),
  new Sweets1("Laddu", "images/gole laddu.jpg"),
  new Sweets1("Milk Kalakand", "images/sliderImage2.png"),
  new Sweets1("Kaju Katli", "images/sliderImage1.png"),
  new Sweets1("Mysore Pak", "images/mysorepak.png"),
  new Sweets1("Gulab Jamun", "images/jamun.jpg"),
  new Sweets1("Bread Cake", "images/kalakand.png"),
  new Sweets1("Halwa", "images/Halwa.png"),
];

document.addEventListener("DOMContentLoaded", function () {
  const sweets1Container = document.getElementById("sweetsContainer1");
  
  sweets1.forEach((sweet) => {
    const sweetElement = sweet.createHTMLElement();
    sweets1Container.appendChild(sweetElement);
  });
});

class Savoury1 {
  constructor(name, imageSrc) {
    this.name = name;
    this.imageSrc = imageSrc;
  }

  createHTMLElement() {
    const div = document.createElement('div');
    div.classList.add('savoury1');
    div.innerHTML = `
      <a href="shop.html" class="savoury1-link">
        <div class="image-container">
          <img src="${this.imageSrc}" alt="${this.name}" />
        </div>
        <div class="details">
          <h4>${this.name}</h4>
        </div>
      </a>
    `;

    return div;
  }
}

const savoury1Items = [
  new Savoury1("Bombay Mixture",  "images/Bombay Mixture.png"),
  new Savoury1("NavaDhanyalu", "images/NavaDhanyalu.png"),
  new Savoury1("Masala Nuts", "images/masala nuts.png"),
  new Savoury1("Pakora", "images/pakora.jpg"),
  new Savoury1("Masala ChanaDal", "images/masala chanadal.jpeg"),
  new Savoury1("Sev & Seedai", "images/Butter Muruku.png"),
  new Savoury1("Ompudi", "images/ompudi.jpg"),
  new Savoury1("Murukulu", "images/nippattu-removebg-preview.png"),
  
  
];

document.addEventListener("DOMContentLoaded", function () {
  const savoury1Container = document.getElementById("savoury1Container");
  
  savoury1Items.forEach((savoury1) => {
    const savoury1Element = savoury1.createHTMLElement();
    savoury1Container.appendChild(savoury1Element);
  });
});







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




