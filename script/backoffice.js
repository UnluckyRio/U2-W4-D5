/*
  Backoffice - Guida d'uso (vedi anche guida in pagina):
  - Compila il form per aggiungere/modificare un prodotto (tutti i campi sono obbligatori).
  - Il bottone "Salva" crea o aggiorna il prodotto.
  - Il bottone "Reset" svuota il form (chiede conferma).
  - Il bottone "Elimina" appare solo in modalità modifica e chiede conferma prima di cancellare.
  - La lista mostra tutti i prodotti con bottone "Modifica" per caricarli nel form.
  - Tutte le operazioni mostrano spinner e alert Bootstrap per errori/successi.
*/

// Selettori elementi principali
const productForm = document.getElementById("productForm"); // Form prodotto
const productIdInput = document.getElementById("productId"); // Campo nascosto ID
const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const descriptionInput = document.getElementById("description");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const productsList = document.getElementById("productsList"); // Lista prodotti
const loadingSpinner = document.getElementById("loadingSpinner"); // Spinner
const errorAlert = document.getElementById("errorAlert"); // Alert errore
const successAlert = document.getElementById("successAlert"); // Alert successo

// Token di autenticazione fornito
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTIyMjA3ODQsImV4cCI6MTc1MzQzMDM4NH0.dO3Raq6bNGr8Ex-_K4TiBrd7oJQwovR3evxi1iXMrdM";
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

// Funzioni utility per spinner e alert
function showLoading() {
  loadingSpinner.classList.remove("d-none");
}
function hideLoading() {
  loadingSpinner.classList.add("d-none");
}
function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
}
function hideError() {
  errorAlert.classList.add("d-none");
}
function showSuccess(message) {
  successAlert.textContent = message;
  successAlert.classList.remove("d-none");
}
function hideSuccess() {
  successAlert.classList.add("d-none");
}

// Funzione per svuotare il form
function resetForm() {
  productIdInput.value = "";
  nameInput.value = "";
  brandInput.value = "";
  descriptionInput.value = "";
  imageUrlInput.value = "";
  priceInput.value = "";
  deleteBtn.classList.add("d-none"); // Nascondo elimina
}

// Funzione per validare il form (campi obbligatori)
function isFormValid() {
  return (
    nameInput.value.trim() &&
    brandInput.value.trim() &&
    descriptionInput.value.trim() &&
    imageUrlInput.value.trim() &&
    priceInput.value.trim()
  );
}

// Funzione per caricare tutti i prodotti
async function loadProducts() {
  showLoading();
  hideError();
  productsList.innerHTML = "";
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!response.ok)
      throw new Error(`Errore caricamento prodotti: ${response.status}`);
    const products = await response.json();
    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";
      const card = document.createElement("div");
      card.className = "card h-100";
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.className = "card-img-top";
      img.alt = product.name;
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = product.name;
      const brand = document.createElement("h6");
      brand.className = "card-subtitle mb-2 text-muted";
      brand.textContent = product.brand;
      const price = document.createElement("p");
      price.className = "card-text fw-bold";
      price.textContent = `€ ${product.price}`;
      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-warning btn-sm me-2";
      editBtn.textContent = "Modifica";
      editBtn.onclick = () => loadProductInForm(product);
      cardBody.appendChild(title);
      cardBody.appendChild(brand);
      cardBody.appendChild(price);
      cardBody.appendChild(editBtn);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      productsList.appendChild(col);
    });
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// Funzione per caricare un prodotto nel form per modifica
function loadProductInForm(product) {
  productIdInput.value = product._id;
  nameInput.value = product.name;
  brandInput.value = product.brand;
  descriptionInput.value = product.description;
  imageUrlInput.value = product.imageUrl;
  priceInput.value = product.price;
  deleteBtn.classList.remove("d-none"); // Mostro elimina
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scorro in alto
}

// Funzione per gestire submit del form (crea o aggiorna)
productForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  hideError();
  hideSuccess();
  if (!isFormValid()) {
    showError("Compila tutti i campi obbligatori!");
    return;
  }
  const product = {
    name: nameInput.value.trim(),
    brand: brandInput.value.trim(),
    description: descriptionInput.value.trim(),
    imageUrl: imageUrlInput.value.trim(),
    price: parseFloat(priceInput.value),
  };
  const id = productIdInput.value;
  showLoading();
  try {
    let response;
    if (id) {
      // Modifica prodotto (PUT)
      response = await fetch(API_URL + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok)
        throw new Error("Errore durante la modifica del prodotto.");
      showSuccess("Prodotto modificato con successo!");
    } else {
      // Crea nuovo prodotto (POST)
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok)
        throw new Error("Errore durante la creazione del prodotto.");
      showSuccess("Prodotto creato con successo!");
    }
    resetForm();
    await loadProducts();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
});

// Gestione bottone reset con conferma
resetBtn.addEventListener("click", function () {
  if (confirm("Sei sicuro di voler resettare il form?")) {
    resetForm();
    hideError();
    hideSuccess();
  }
});

// Gestione bottone elimina con conferma
deleteBtn.addEventListener("click", async function () {
  const id = productIdInput.value;
  if (!id) return;
  if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;
  showLoading();
  hideError();
  hideSuccess();
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!response.ok)
      throw new Error("Errore durante l'eliminazione del prodotto.");
    showSuccess("Prodotto eliminato con successo!");
    resetForm();
    await loadProducts();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
});

// Se arrivo da homepage con ?id=... carico il prodotto nel form
window.addEventListener("DOMContentLoaded", async function () {
  hideError();
  hideSuccess();
  resetForm();
  await loadProducts();
  // Controllo se c'è un id in URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id) {
    showLoading();
    try {
      const response = await fetch(API_URL + id, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      if (!response.ok) throw new Error("Prodotto non trovato.");
      const product = await response.json();
      loadProductInForm(product);
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  }
});
