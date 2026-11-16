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

document.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest(".delete-btn");

  if (!deleteButton) {
    return;
  }

  const id = deleteButton.dataset.id;

  await deleteProduct(id);
});

async function deleteProduct(id) {
  const confirmed = confirm("Vill du verkligen ta bort produkten?");

  if (!confirmed) {
    return;
  }

  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Det gick inte att ta bort produkten.");
    return;
  }

  await loadProducts();
}

const productForm = document.querySelector("#product-form");

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const SKU = document.querySelector("#SKU").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#description").value;

  const product = { name, SKU, price, description };

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error("Kunde inte skapa produkt!");
  }

  productForm.reset();
  await loadProducts();
});
loadProducts();