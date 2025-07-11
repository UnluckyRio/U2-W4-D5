// Selettori degli elementi principali
const productsContainer = document.getElementById("productsContainer"); // Contenitore delle card
const loadingSpinner = document.getElementById("loadingSpinner"); // Spinner di caricamento
const errorAlert = document.getElementById("errorAlert"); // Alert per errori

// Token di autenticazione fornito
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTIyMjA3ODQsImV4cCI6MTc1MzQzMDM4NH0.dO3Raq6bNGr8Ex-_K4TiBrd7oJQwovR3evxi1iXMrdM";
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

// Funzione per mostrare lo spinner di caricamento
function showLoading() {
  loadingSpinner.classList.remove("d-none");
}

// Funzione per nascondere lo spinner di caricamento
function hideLoading() {
  loadingSpinner.classList.add("d-none");
}

// Funzione per mostrare un messaggio di errore
function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
}

// Funzione per nascondere il messaggio di errore
function hideError() {
  errorAlert.classList.add("d-none");
}

// Funzione per creare la card di un prodotto
function createProductCard(product) {
  // Costruisco la card Bootstrap per il prodotto
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

  const card = document.createElement("div");
  card.className = "card h-100";
  card.style.cursor = "pointer";
  card.onclick = () => {
    // Al click, vado alla pagina di dettaglio passando l'ID del prodotto
    window.location.href = `dettaglio.html?id=${product._id}`;
  };

  // Immagine prodotto
  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.className = "card-img-top";
  img.alt = product.name;

  // Corpo della card
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Titolo prodotto
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = product.name;

  // Brand prodotto
  const brand = document.createElement("h6");
  brand.className = "card-subtitle mb-2 text-muted";
  brand.textContent = product.brand;

  // Prezzo prodotto
  const price = document.createElement("p");
  price.className = "card-text fw-bold";
  price.textContent = `€ ${product.price}`;

  // Bottone modifica
  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm me-2";
  editBtn.textContent = "Modifica";
  editBtn.onclick = (e) => {
    // Prevengo il click sulla card
    e.stopPropagation();
    // Vado al backoffice per modificare il prodotto
    window.location.href = `backoffice.html?id=${product._id}`;
  };

  // Appendo gli elementi
  cardBody.appendChild(title);
  cardBody.appendChild(brand);
  cardBody.appendChild(price);
  cardBody.appendChild(editBtn);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

// Funzione per caricare i prodotti dall'API
async function loadProducts() {
  showLoading(); // Mostro lo spinner
  hideError(); // Nascondo eventuali errori precedenti
  productsContainer.innerHTML = ""; // Svuoto il contenitore
  try {
    // Chiamata fetch autenticata
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Errore nel caricamento: ${response.status}`);
    }
    const products = await response.json(); // Ottengo i prodotti
    // Creo una card per ogni prodotto
    products.forEach((product) => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });
  } catch (error) {
    // Gestione errori
    showError(error.message);
  } finally {
    hideLoading(); // Nascondo lo spinner
  }
}

// Avvio il caricamento prodotti al caricamento della pagina
window.addEventListener("DOMContentLoaded", loadProducts);
