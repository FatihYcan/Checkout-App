// SELECTORS
const deleteAll = document.querySelector(".delete-div .fa-trash-can");
const products = document.querySelector(".products");
// const deleteDiv = document.querySelector(".delete-div");

// CONSTANT
const SHIPPING_PRİCE = 25.99;
const FREE_SHIPPING_LIMIT = 3000;
const TAX_RATE = 0.18;

// EVENTS
deleteAll.addEventListener("click", (e) => {
  if (confirm("Are you sure you want to delete?")) {
    // deleteDiv.style.display = "none";
    noProductCheck();
  }
});

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-minus")) {
    e.target.nextElementSibling.innerText > 1 &&
      e.target.nextElementSibling.innerText--;
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest(".product").remove();
    calculateTotalPrice(e.target);
  }
});

const calculateProductPrice = (btn) => {
  const discountedPrice = btn
    .closest(".product-info")
    .querySelector("#discounted-price").textContent;

  const quantity = btn
    .closest(".buttons-div")
    .querySelector("#quantity").textContent;

  const ProductPrice = btn
    .closest(".buttons-div")
    .querySelector("#product-price");

  ProductPrice.textContent = (discountedPrice * quantity).toFixed(2);
  calculateTotalPrice();
};

const calculateTotalPrice = () => {
  const prices = document.querySelectorAll("#product-price");
  const subtotal = [...prices].reduce(
    (sum, price) => sum + Number(price.textContent),
    0
  );

  const shippingPrice =
    subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0 ? 0 : SHIPPING_PRİCE;

  const taxPrice = subtotal * TAX_RATE;

  const totalPrice = subtotal + shippingPrice + taxPrice;

  document.getElementById("selected-price").textContent = subtotal.toFixed(2);

  document.getElementById("shipping").textContent = shippingPrice.toFixed(2);

  document.getElementById("tax").textContent = taxPrice.toFixed(2);

  document.getElementById("total").textContent = totalPrice.toFixed(2);

  !totalPrice && noProductCheck();
};

const noProductCheck = () => {
  products.textContent = "No product";
  products.classList.add("no-product");
  document.querySelector(".delete-div").style.display = "none";
  document.querySelector(".price-table").style.display = "none";
};

window.addEventListener("load", () => {
  calculateTotalPrice();
});
