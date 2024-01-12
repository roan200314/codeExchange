# Welkom

Welkom op jouw Portfolio-website! Hier kan je met de wereld delen wat jij allemaal kan en wat je hebt gedaan.

We zijn met een Code Exchange website bezig.
Dit project houdt in dat Roan en Erdem een website aan het maken zijn die ervoor zorgt dat HBO ICT studenten online code kunnen delen dankzij een forum.

<details>
  <summary>laatZien(): gegevens ophalen</summary>

```javascript
//////////vragen op scherm laten zien
// Het element waarin de gegevens worden weergegeven selecteren
const data: HTMLElement | null = document.getElementById("data");

async function laatZien(): Promise<void> {
     De gegevens uit de database ophalen
    const posts: any[] | undefined = await runQuery("SELECT * FROM posts");
    const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers");
    const users: any[] | undefined = await runQuery("SELECT * FROM user");
```

    # in Bovenstaande functie haal ik eerst alle gegevens op uit de database tabellen : 'post', 'answers' en 'user'. 
</details>

</details>
<details>
<summary>laatZien(): forEach statement</summary>
<code>
```javascript
    // De gegevens weergeven in de div
    if (posts && posts.length > 0) {
        posts.forEach((post: any) => {
            // Variabele hernoemen om conflicten te voorkomen
            if (antwoorden && antwoorden.length > 0) {
                antwoorden.forEach((answer: any) => {     </code>```

Na dat ik dat heb gedaan maak ik een forEach statement die ervoor zorgt dat ik de gegevens ophaal en dan op het scherm kan laten zien.
Dit doe ik door eerst door Post te loopen en vervolgens door answers.

 </details> 
<details>
<summary>laatZien(): checken of het antwoord bij de post hoort.</summary>
                <code> ```javascript   // Controleren of het antwoord is gekoppeld aan de huidige vraag
                    if (answer.vraag_id === post.id) {
                        const div: HTMLElement | null = document.createElement("div");
                        div.className = "allepost";</code>
````
Hier checkt de if statement of uit de tabel answers de row "vraag.id" gelijk staat aan 'post.id' als dat zo is maakt die een div aan.   ``                    
</details>

<details>
<summary>laatZien(): paragrafen aanmaken</summary>
```javascript
                        <code>// Een paragraaf om de naam van het uitje weer te geven
                        const titel: HTMLElement | null = document.createElement("a");
                        titel.id = "postTitel";
                        titel.href = `post.html?id=${post.id}`;
                        titel.textContent = `${post.titel}`;

                        // Een paragraaf om de prijs van het uitje weer te geven
<details>
<summary>laatZien(): tekst verkorten

                        const vraag: HTMLElement | null = document.createElement("p");
                        vraag.id = "postVraag";
                        const vraagVerkort: any = post.vraag.length > 100 ? post.vraag.substring(0, 100) + "...": post.vraag;
                        vraag.textContent = `Vraag: ${vraagVerkort}` ;
                        vraag.style.marginLeft = "10px";
                        vraag.style.color = "black";
</details>
                        // Extra code gebaseerd op antwoorden
                        const antwoorden: HTMLElement | null = document.createElement("p");
                        antwoorden.id = "answerText";
                        antwoorden.textContent = `Antwoord: ${answer.antwoord}`;
                        antwoorden.style.marginLeft = "10px";
                        antwoorden.style.color = "black";

                        // Gebruikersinformatie ophalen op basis van user_id
                        const user: any = users.find((u) => u.id === post.user_id);
                        const userName: any = user ? user.username : "Unknown";

                        // Een paragraaf om de prijs van het uitje weer te geven
                        const naam: HTMLElement | null = document.createElement("p");
                        naam.id = "postNaam";
                        naam.textContent = `Naam van vraagsteller: ${userName}`;
                        naam.style.marginLeft = "10px";
                        naam.style.color = "black";

                        // Een paragraaf om de prijs van het uitje weer te geven
                        const datum: HTMLElement | null = document.createElement("p");
                        datum.id = "postTijd";
                        datum.textContent = `datum van vraag: ${post.tijd}`;
                        datum.style.marginLeft = "10px";
                        datum.style.color = "black";</code>
In bovenstaande functie maakt die paragrafen aan met de gegevens die in de database staan.                        
</details>

                        // De knoppen en paragrafen aan de div toevoegen
                        div.appendChild(titel);
                        div.appendChild(vraag);
                        div.appendChild(naam);
                        div.appendChild(antwoorden);
                        div.appendChild(datum);
                        data?.appendChild(div);
                    }
                });
            } else {
                // Een bericht weergeven als er geen gegevens zijn
                data.textContent = "Geen gegevens gevonden";
            }
        });
    }
}

laatZien();



daarna heb ik een 'const vraagVerkort'aangemaakt. Hierin heb ik een functie gemaakt waardoor als een vraag die meer dan 100 tekens heeft verkort wordt en dan niet volledig te zien is.

vervolgens maak ik een div aan om alle gegevens erin te stoppen.

daarna komen alle paragrafen waar ik gegevens in kan zetten van de vragen en antwoorden.

vervolgens assign ik alles aan de div en komt het op het scherm.

