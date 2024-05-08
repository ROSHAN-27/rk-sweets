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
    new Sweet("RK Special Laddu", 380,"images/laddu/Special Laddu.png",8 ),
    new Sweet("Badam Rose Laddu",  800,  "images/laddu/Badam rose laddu.png",  1 ),
    new Sweet("Motichur Laddu", 450, "images/laddu/motichur laddu.png", 6),
    new Sweet("Gulab Jamun",400, "images/jamun.jpg"),
    new Sweet("Kaju Pista Laddu", 1000, "images/laddu/kaju pista laddu.png", 7),
    new Sweet("DryFruit Laddu", 450, "images/dryfruit.png",9),
    new Sweet("Choco Barfi",  400,  "images/milk sweet/badam choco barfi.png",  1 ),
    new Sweet("Choco Peda", 400, "images/milk sweet/choco peda.png", 6),
    new Sweet("Bread Cake", 400, "images/milk sweet/kalakand.png", 7),
    new Sweet("Kesar Peda", 400, "images/milk sweet/kesar peda.png", 8),
    new Sweet("Rasgulla", 400, "images/rasgulla-removebg-preview.png", 6),
    new Sweet("Milk Kalakand",450, "images/sliderImage2.png"),
    new Sweet("Milk Cake", 400, "images/milk sweet/milk cake.png", 8),
    new Sweet("Carrot Cake", 400, "images/milk sweet/sweet.png", 8),
    new Sweet("Banaras SoanPapdi",  500,  "images/soan papdi/Banaras soan papdi.png",  1 ),
    new Sweet("Coffee SoanPapdi", 400, "images/soan papdi/coffee soan papdi.png", 7),
    new Sweet("Ghee SoanPapdi", 450, "images/soan papdi/Ghe soan papdi.png", 6),
    new Sweet("DryFruit Halwa", 450, "images/halwa/Halwa.png", 6),
    new Sweet("Badam Mysore Pak",  550,  "images/mysore pak/badam mysore pak.png",  1 ),
    new Sweet("Bournvita Barfi", 400, "images/mysore pak/bournvita barfi.png", 7),
    new Sweet("Horlicks Barfi", 400, "images/mysore pak/Horlicks barfi.png", 6),
    new Sweet("Ghee Mysore Pak", 600, "images/mysore pak/mysorepak.png", 8),
    new Sweet("Special Mysore Pak", 600, "images/mysore pak/SPecial mysorepak.png", 8),
    new Sweet("DryFruit Barfi",  800,  "images/kaju sweets/Dy fruit barfi.png",  1 ),
    new Sweet("Kaju Anjeer Roll", 1000, "images/kaju sweets/kaju anjeer roll.png", 7),
    new Sweet("Gulkhan Sweet", 450, "images/kaju sweets/Gulkhan Sweet.png", 6),
    new Sweet("Kaju Barfi", 1000, "images/kaju sweets/Kaju strawberry barfi.png", 8),
    new Sweet("Kaju Katli", 1100, "images/kaju sweets/Kaju Katli.png", 8),
    new Sweet("Kaju Pista Roll", 1100, "images/kaju sweets/Kaju Pista roll.png", 8)
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