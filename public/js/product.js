let allProducts = [];

async function loadProducts() {
  const response = await fetch("/api/products");
  allProducts = await response.json();

  displayProducts(allProducts);
}

function displayTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const priorityCell = document.createElement("td");
    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    const completeButton = document.createElement("button");

    completeButton.type = "button";
    completeButton.classList.add("complete-btn");

    completeButton.innerHTML =
      task.completed === 1
        ? '<i data-lucide="square-check"></i>'
        : '<i data-lucide="square"></i>';

    completeButton.setAttribute("aria-label", "Markera som färdig");

    completeButton.dataset.id = task.id;

    nameCell.textContent = task.name;
    descriptionCell.textContent = task.description;
    priorityCell.textContent = task.priority;

    deleteButton.innerHTML = '<i data-lucide="trash-2"></i>';
    deleteButton.setAttribute("aria-label", "Radera produkt");
    deleteButton.title = "Radera produkt";
    deleteButton.classList.add("delete-btn");
    deleteButton.dataset.id = task.id;

    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priorityCell);
    actionCell.appendChild(completeButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    taskList.appendChild(row);
  });
  lucide.createIcons();
}
