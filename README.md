# U2-W4-D5
CONSEGNA:
Crea la parte front-end di uno shop online. In particolare sarai responsabile della creazione di un back-office, dove gli amministratori possono aggiungere e modificare i prodotti.
L’obiettivo di oggi è connettere un’interfaccia statica alle API per poter ricevere prodotti, crearne di nuovi, modificarli una volta creati e cancellarli all’occorrenza.
Questo è l’endpoint principale: https://striveschool-api.herokuapp.com/api/product/
Questo è il modello di un prodotto:
{
  "name": "Nokia 3310",             // REQUIRED
  "description": "Indestructible cellphone", // REQUIRED
  "brand": "Nokia",               // REQUIRED
  "imageUrl": "https://example.com/3310.jpg", // REQUIRED
  "price": 99,                   // REQUIRED
  "_id": "5d318e1a8541744830bef139",     // SERVER GENERATED
  "userId": "6385f782597b9d001545386b",   // SERVER GENERATED
  "createdAt": "2019-07-19T09:32:10.535Z", // SERVER GENERATED
  "updatedAt": "2019-07-19T09:32:10.535Z", // SERVER GENERATED
  "__v": 0                     // SERVER GENERATED
}
Per creare nuovi prodotti dovrai partire da questo modello come riferimento, e formarlo con alcune delle proprietà richieste per poi inviarlo come payload della chiamata POST.
OGNI CHIAMATA DOVRÀ ESSERE AUTENTICATA! L’autenticazione di queste API è una “Token Based Authentication” per rendere privato l’accesso ai suoi contenuti. Senza essere autenticato non potrai ottenere i dati di cui hai bisogno.
Questo è il mio token personale: 
fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzQ3MDc4Y2RkZjAwMTU1ZDY3YTUiLCJpYXQiOjE3NTIyMjA3ODQsImV4cCI6MTc1MzQzMDM4NH0.dO3Raq6bNGr8Ex-_K4TiBrd7oJQwovR3evxi1iXMrdM"
}
})
Il token dovrà venire utilizzato come "authorization" header.
Obiettivi generali:
	•	Avere una pagina back-office, in cui si potranno inserire i prodotti specificando i parametri obbligatori e facoltativi, modificare o cancellare il prodotto.
	•	Una homepage, dove l’utente possa vedere i prodotti disponibili
	•	Una pagina di dettaglio in cui visualizzare tutti i dettagli del prodotto.
	•	In Backoffice: usa una POST su /product con un payload per creare una nuova risorsa.
	•	In Backoffice: aggiungi un bottone per la funzionalità di modifica di un prodotto già creato in precedenza (usa una PUT su /product/[PRODUCT_ID]).
	•	In Backoffice: aggiungi un bottone per la cancellazione di uno specifico prodotto già esistente (usa DELETE su /product/[PRODUCT_ID])
	•	In Backoffice: aggiungi una validazione di base per la creazione/modifica del prodotto nel form (non permettere l'invio dei dati con campi vuoti)
	•	In Backoffice: aggiungi un bottone “Reset” per resettare il form.
	•	In Homepage: premendo un bottone “modifica” su un prodotto si dovrà poterlo modificare.
	•	Pagina Dettaglio: A questa pagina ci si arriverà cliccando sulla card in homepage.
	•	In Backoffice: I bottoni “reset” e “delete” dovranno chiedere conferma prima di procedere con l’operazione.
	•	In Homepage: aggiungi un indicatore di caricamento affianco al titolo principale della pagina durante il caricamento delle risorse.
	•	Crea un sistema di gestione degli errori. Mostra all’utente un messaggio di errore specifico per le varie tipologie di problema, quando qualcosa va storto, attraverso l’utilizzo di componenti di Bootstrap appropriati.

