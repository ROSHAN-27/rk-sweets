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
  const sweets = [
    new Sweet("DryFruit Barfi",  800,  "images/kaju sweets/Dy fruit barfi.png",  1 ),
    new Sweet("Kaju Anjeer Roll", 1000, "images/kaju sweets/kaju anjeer roll.png", 7),
    new Sweet("Gulkhan Sweet", 450, "images/kaju sweets/Gulkhan Sweet.png", 6),
    new Sweet("Kaju Barfi", 1000, "images/kaju sweets/Kaju strawberry barfi.png", 8),
    new Sweet("Kaju Katli", 1100, "images/kaju sweets/Kaju Katli.png", 8),
    new Sweet("Kaju Pista Roll", 1100, "images/kaju sweets/Kaju Pista roll.png", 8),
    

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