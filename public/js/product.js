let allProducts = [];

async function loadProducts() {
  const response = await fetch("/api/products");
  allProducts = await response.json();

  displayProducts(allProducts);
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const SKUCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");

    nameCell.textContent = product.name;
    SKUCell.textContent = product.SKU;
    priceCell.textContent = product.price;

    deleteButton.innerHTML = '<i data-lucide="trash-2"></i>';
    deleteButton.setAttribute("aria-label", "Radera produkt");
    deleteButton.title = "Radera produkt";
    deleteButton.classList.add("delete-btn");
    deleteButton.dataset.id = product.id;

    row.appendChild(nameCell);
    row.appendChild(SKUCell);
    row.appendChild(priceCell);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    productList.appendChild(row);
  });
  lucide.createIcons();
}
