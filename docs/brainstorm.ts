//////////vragen op scherm laten zien
// Het element waarin de gegevens worden weergegeven selecteren
const data: HTMLElement | null = document.getElementById("data");

async function laatZien(): Promise<void> {
    // De gegevens uit de database ophalen
    const posts: any[] | undefined = await runQuery("SELECT * FROM posts");
    const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers");
    const users: any[] | undefined = await runQuery("SELECT * FROM user");

    // De gegevens weergeven in de div
    if (posts && posts.length > 0) {
        posts.forEach((post: any) => {
            // Variabele hernoemen om conflicten te voorkomen
            if (antwoorden && antwoorden.length > 0) {
                antwoorden.forEach((answer: any) => {
                    // Controleren of het antwoord is gekoppeld aan de huidige vraag
                    if (answer.vraag_id === post.id) {
                        const div: HTMLElement | null = document.createElement("div");
                        div.className = "allepost";

                        // Een paragraaf om de naam van het uitje weer te geven
                        const titel: HTMLElement | null = document.createElement("a");
                        titel.id = "postTitel";
                        titel.href = `post.html?id=${post.id}`;
                        titel.textContent = `${post.titel}`;

                        // Een paragraaf om de prijs van het uitje weer te geven
                        const vraag: HTMLElement | null = document.createElement("p");
                        vraag.id = "postVraag";
                        const vraagVerkort: any = post.vraag.length > 100 ? post.vraag.substring(0, 100) + "...": post.vraag;
                        vraag.textContent = `Vraag: ${vraagVerkort}` ;
                        vraag.style.marginLeft = "10px";
                        vraag.style.color = "black";

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
                        datum.style.color = "black";

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


/*
* Haal alle gegevens van de gebruiker op uit de database
* @param id
* @returns user object
*/
async function getPostInfo(userid: number): Promise<Post | undefined> {
   try {
       const data: any = await api.queryDatabase("SELECT * FROM posts");

       if (data.length > 0) {
           const post: Post = new Post(
               data[0]["id"],
               data[0]["titel"],
               data[0]["vraag"],
               data[0]["tijd"],
               data[0]["tags"],
               data[0]["code_snippet"]
           );
           return post;
       }
       return undefined;
   } catch (error) {
       console.error(error);

       return undefined;
   }
}


if (posts && posts.length > 0) {
    posts.forEach((post: any) => {
        // Variabele hernoemen om conflicten te voorkomen
        if (antwoorden && antwoorden.length > 0) {
            antwoorden.forEach((answer: any) => {
                // Controleren of het antwoord is gekoppeld aan de huidige vraag
                if (answer.vraag_id === post.id) {
                    const div: HTMLElement | null = document.createElement("div");
                    div.className = "allepost";

                    // Een paragraaf om de naam van het uitje weer te geven
                    const titel: HTMLElement | null = document.createElement("a");
                    titel.id = "postTitel";
                    titel.href = `post.html?id=${post.id}`;
                    titel.textContent = `${post.titel}`;

                    // Een paragraaf om de prijs van het uitje weer te geven
                    const vraag: HTMLElement | null = document.createElement("p");
                    vraag.id = "postVraag";
                    const vraagVerkort: any = post.vraag.length > 100 ? post.vraag.substring(0, 100) + "...": post.vraag;
                    vraag.textContent = `Vraag: ${vraagVerkort}` ;
                    vraag.style.marginLeft = "10px";
                    vraag.style.color = "black";

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
                    datum.style.color = "black";

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