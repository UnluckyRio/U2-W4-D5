// Script per la gestione della dark mode
// Aggiunge/rimuove la classe 'dark-mode' al body e salva la preferenza in localStorage

const darkModeToggle = document.getElementById("darkModeToggle"); // Bottone toggle
const darkModeIcon = document.getElementById("darkModeIcon"); // Icona

// Funzione per attivare/disattivare la dark mode
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    if (darkModeIcon) darkModeIcon.className = "bi bi-sun"; // Icona sole
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    if (darkModeIcon) darkModeIcon.className = "bi bi-moon"; // Icona luna
    localStorage.setItem("darkMode", "false");
  }
}

// Recupero preferenza da localStorage
const darkModePref = localStorage.getItem("darkMode");
if (darkModePref === "true") {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// Listener sul bottone toggle
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(!isDark);
  });
}
