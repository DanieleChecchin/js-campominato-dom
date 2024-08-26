// ! FASE DI PREPARAZIONE

// Mi prendo gli elementi dal DOM
const button = document.querySelector('button');
const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const form = document.querySelector('form');
const select = document.getElementById('select-level');

// Funzione per creare le celle
function getCell(content) {
    // Creo una cella
    const cell = document.createElement('div');
    // Aggiungo la classe cell al div creato
    cell.className = 'cell';

    // Aggiungo il contenuto alla cella (aggiungo i numeri chiesti)
    cell.append(content);

    // Restituisco all'esterno la cella creata
    return cell;
}

// Funzione per generare 16 numeri casuali (Bombe)
const createBombs = (cells, totalBombs) => {
    const bombs = [];
    while (bombs.length < totalBombs) { // Fintanto che il numero di elementi nell'array bombs è minore delle bombe totali che devo ottenere (16)
        const randomNumber = Math.floor(Math.random() * cells) + 1; // Numero casuale tra 1 e 16
        if (!bombs.includes(randomNumber)) bombs.push(randomNumber); // Inserisco solo i numeri random che non si ripetono nell'array bombs (Per avere solo numeri divesi tra loro)
    }
    return bombs;
}

// Funzione per capire se la partita è terminata per la vittoria della stessa o se per aver cliccato una bomba
const endGame = (score, hasWon = false) => { // Prendo come parametri il punteggio(per stamparlo) è un valore booleano per dire se ha vinto o perso

    const result = hasWon ? 'Vinto' : 'Perso'; // Ternario per inserire la parola 'vinto' o 'perso' da usare nell'alert
    alert(`Hai ${result} , partita terminata. Hai totalizzato ${score} punti!`); // Messaggio finale
}



// ! EVENTI DINAMICI
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Per fare in modo che si svuoti ogni volta
    grid.innerHTML = '';

    // Cambio il testo al bottone
    button.innerText = 'Restart';

    // ! FASE DI ELABORAZIONE
    // Prendo i valori della select 
    const level = select.value;

    // Imposto il numero di celle sulle quali dovrò ciclare (Difficoltà facile)
    let rows = 10;
    let cols = 10;

    // Uso un switch per decidere il numero di caselle in base alla difficoltà (Media o Difficile)
    switch (level) {
        case 'normal':
            rows = 9;
            cols = 9;
            break;
        case 'hard':
            rows = 7;
            cols = 7;
            break;
    }

    const cells = rows * cols; // Totale celle in base alla difficoltà
    let score = 0; // Punteggio iniziale
    const totalBombs = 16; // Totale bombe
    const maxScore = cells - totalBombs; // Punteggio massimo per vincere

    // Genero le bombe
    const bombs = createBombs(cells, totalBombs);
    console.log(bombs);

    // Per ogni cella che voglio creare:
    for (let i = 1; i <= cells; i++) {

        // Creo una cella (richiamando la funzione creata all'inizio)
        const cell = getCell(i);

        // Aggiungo il contenuto alla cella (richiamando la funzione creata e che ho modificato)
        const content = cells[i];

        // Inserisco la cella nel DOM
        grid.appendChild(cell);

        // Aggiungo l'evento del click sulla cella
        cell.addEventListener('click', () => {

            // Faccio in modo che la funzione si interrompa se la cella ha già la classe 'clicked'
            if (cell.classList.contains('clicked')) return;

            // Verifico se la cella cliccata dall'utente è una bomba
            const isBomb = bombs.includes(parseInt(i));

            // Se l'utente ha cliccato una casella contenente una bomba
            if (isBomb) {
                cell.classList.add('bomb'); // Aggiungo la classe per le bombe
                endGame(score); // Funzione di fine partita

            } else { // Se non è una bomba
                // Aggiungo la classe che mi colora la cella al click
                cell.classList.add('clicked');

                // Incremento il punteggio ogni volta che clicco su una casella senza bomba e lo stampo in pagine nel div con span id(Milestone 1)
                scoreElement.innerText = ++score;

                // Faccio un if dicendo che se il punteggio dell'utente è uguale al punteggio massimo raggiungibile vuol dire che ha vinto e stampo in console il messaggio
                if (score === maxScore) endGame(score, true); // Funzione di fine partita
            }
        })
    }
})
