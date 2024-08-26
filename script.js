// ! FASE DI PREPARAZIONE

// Mi prendo gli elementi dal DOM
const button = document.querySelector('button');
const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score')

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



// ! EVENTI DINAMICI
button.addEventListener('click', function () {

    // ! FASE DI ELABORAZIONE
    // Imposto il numero di celle sulle quali dovrò ciclare
    const rows = 10;
    const cols = 10;
    const cells = rows * cols;
    let score = 0;
    const totalBombs = 16;
    const maxScore = cells - totalBombs;

    // Genero le bombe
    const bombs = createBombs(cells, totalBombs);
    console.log(bombs);

    // Per fare in modo che si svuoti ogni volta
    grid.innerHTML = '';

    // Cambio il testo al bottone
    button.innerText = 'Restart';

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

            // Verifico se l'utente ha cliccato una casella contenente una bomba
            if(bombs.includes(i)){
                console.log(`Hai perso, partita terminata. Hai totalizzato ${score} punti!`);
                cell.classList.add('bomb');
            }

            // Aggiungo la classe che mi colora la cella al click
            cell.classList.add('clicked');

            // Incremento il punteggio ogni volta che clicco su una casella senza bomba e lo stampo in pagine nel div con span id(Milestone 1)
            scoreElement.innerText = ++score;

            // Faccio un if dicendo che se il punteggio dell'utente è uguale al punteggio massimo raggiungibile vuol dire che ha vinto e stampo in console il messaggio
            if(score === maxScore){
                console.log(`Hai vinto. Hai totalizzato ${scorse} punti!`)
            }
        })
    }
})
