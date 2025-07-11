// Selettori degli elementi principali
const productDetail = document.getElementById("productDetail"); // Contenitore dettagli prodotto
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

// Funzione per ottenere l'ID del prodotto dall'URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Funzione per creare la visualizzazione dettagliata del prodotto
function renderProductDetail(product) {
  // Svuoto il contenitore
  productDetail.innerHTML = "";

  // Creo la card dettagliata del prodotto
  const col = document.createElement("div");
  col.className = "col-12 col-md-8 col-lg-6";

  const card = document.createElement("div");
  card.className = "card shadow";

  // Immagine prodotto
  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.className = "card-img-top";
  img.alt = product.name;

  // Corpo della card
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Titolo prodotto
  const title = document.createElement("h3");
  title.className = "card-title mb-3";
  title.textContent = product.name;

  // Brand prodotto
  const brand = document.createElement("h5");
  brand.className = "card-subtitle mb-2 text-muted";
  brand.textContent = product.brand;

  // Descrizione prodotto
  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = product.description;

  // Prezzo prodotto
  const price = document.createElement("p");
  price.className = "card-text fw-bold";
  price.textContent = `Prezzo: € ${product.price}`;

  // Data creazione
  const createdAt = document.createElement("p");
  createdAt.className = "card-text text-secondary";
  createdAt.textContent = `Creato il: ${new Date(
    product.createdAt
  ).toLocaleString("it-IT")}`;

  // Data ultima modifica
  const updatedAt = document.createElement("p");
  updatedAt.className = "card-text text-secondary";
  updatedAt.textContent = `Ultima modifica: ${new Date(
    product.updatedAt
  ).toLocaleString("it-IT")}`;

  // Appendo gli elementi
  cardBody.appendChild(title);
  cardBody.appendChild(brand);
  cardBody.appendChild(description);
  cardBody.appendChild(price);
  cardBody.appendChild(createdAt);
  cardBody.appendChild(updatedAt);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);
  productDetail.appendChild(col);
}

// Funzione per caricare i dettagli del prodotto
async function loadProductDetail() {
  showLoading(); // Mostro lo spinner
  hideError(); // Nascondo eventuali errori precedenti
  productDetail.innerHTML = "";
  const productId = getProductIdFromUrl(); // Ottengo l'ID dall'URL
  if (!productId) {
    showError("ID prodotto non trovato nell'URL.");
    hideLoading();
    return;
  }
  try {
    // Chiamata fetch autenticata per il singolo prodotto
    const response = await fetch(API_URL + productId, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Errore nel caricamento: ${response.status}`);
    }
    const product = await response.json(); // Ottengo il prodotto
    renderProductDetail(product); // Mostro i dettagli
  } catch (error) {
    // Gestione errori
    showError(error.message);
  } finally {
    hideLoading(); // Nascondo lo spinner
  }
}

// Avvio il caricamento dettagli al caricamento della pagina
window.addEventListener("DOMContentLoaded", loadProductDetail);
