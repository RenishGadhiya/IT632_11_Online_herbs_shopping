"use strict";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDOM = document.querySelector(".cart");
const addToCartButtonsDOM = document.querySelectorAll(
  '[data-action="add-to-cart"]'
);

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    insertItemToDOM(product);
    countCartTotal();

    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
      const productDOM = addToCartButtonDOM.parentNode;

      if (
        productDOM.querySelector(".product-name").innerText === product.name
      ) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });
  });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener("click", () => {
    const productDOM = addToCartButtonDOM.parentNode;
    const product = {
      image: productDOM.querySelector(".product-image").getAttribute("src"),
      name: productDOM.querySelector(".product-name").innerText,
      price: productDOM.querySelector(".product-price").innerText,
      quantity: 1
    };

    cart.forEach(cartItem => {
      console.log(cartItem.quantity, cartItem.price);
    });

    const isInCart =
      cart.filter(cartItem => cartItem.name === product.name).length > 0;

    if (!isInCart) {
      insertItemToDOM(product);
      cart.push(product);
      saveCart();
      handleActionButtons(addToCartButtonDOM, product);
    }
  });
});

function insertItemToDOM(product) {
  cartDOM.insertAdjacentHTML(
    "beforeend",
    `
    <div class="cart-item">
        <img class="cart-item-image" src="${product.image}" alt="${
      product.name
    }" />
        <h2 class="cart-item-name">${product.name}</h2>
        <h3 class="cart-item-price">${product.price}</h3>
        <button class="btn btn-primary btn-small" data-action="decrease-item">
        &minus;
        </button>
        <h3 class="cart-item-quantity">${product.quantity}</h3>
        <button class="btn btn-primary btn-small" data-action="increase-item">
        &plus;
        </button>
        <button class="btn btn-primary btn-small" data-action="remove-item">
        &times;
        </button>
    </div>
    `
  );

  addCartFooter();
}

function handleActionButtons(addToCartButtonDOM, product) {
  addToCartButtonDOM.innerText = "In Cart";
  addToCartButtonDOM.disabled = true;

  const cartItemsDOM = cartDOM.querySelectorAll(".cart-item");
  cartItemsDOM.forEach(cartItemDOM => {
    if (
      cartItemDOM.querySelector(".cart-item-name").innerText === product.name
    ) {
      cartItemDOM
        .querySelector('[data-action="increase-item"]')
        .addEventListener("click", () => increaseItem(product, cartItemDOM));
      cartItemDOM
        .querySelector('[data-action="decrease-item"]')
        .addEventListener("click", () =>
          decreaseItem(product, cartItemDOM, addToCartButtonDOM)
        );
      cartItemDOM
        .querySelector('[data-action="remove-item"]')
        .addEventListener("click", () =>
          removeItem(product, cartItemDOM, addToCartButtonDOM)
        );
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector(
        ".cart-item-quantity"
      ).innerText = ++cartItem.quantity;
      saveCart();
    }
  });
}

function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector(
          ".cart-item-quantity"
        ).innerText = --cartItem.quantity;
        saveCart();
      } else {
        removeItem(product, cartItemDOM, addToCartButtonDOM);
      }
    }
  });
}

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
  cartItemDOM.remove();
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  saveCart();
  addToCartButtonDOM.innerText = "Add to Cart";
  addToCartButtonDOM.disabled = false;

  if (cart.length < 1) {
    document.querySelector(".cart-footer").remove();
  }
}

function addCartFooter() {
  if (document.querySelector(".cart-footer") === null) {
    cartDOM.insertAdjacentHTML(
      "afterend",
      `
        <div class="cart-footer">
          <h2 class="cart-footer-total" data-action="total-price">0</h2>
          <button class="btn btn-primary btn-small btn-danger" data-action="clear-cart">Clear Cart</button>
          <button class="btn btn-primary btn-small btn-danger" data-action="checkout">Checkout</button>
        </div>
        `
    );

    document
      .querySelector('[data-action="clear-cart"]')
      .addEventListener("click", () => clearCart());
    document
      .querySelector('[data-action="checkout"]')
      .addEventListener("click", () => checkout());
  }
}

function clearCart() {
  cartDOM.querySelectorAll(".cart-item").forEach(cartItemDOM => {
    cartItemDOM.remove();
  });

  cart = [];
  localStorage.removeItem("cart");
  document.querySelector(".cart-footer").remove();
  addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.innerText = "Add To Cart";
    addToCartButtonDOM.disabled = false;
  });
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.removeItem("cart");
  location.reload();
}

function countCartTotal() {
  let cartTotal = 0;
  cart.forEach(cartItem => (cartTotal += cartItem.quantity * cartItem.price));
  document.querySelector(
    '[data-action="total-price"]'
  ).innerText = `${cartTotal.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  countCartTotal();
}
