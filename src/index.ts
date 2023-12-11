import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { runQuery } from "./utils/queryutil";

/**
 * Deze methode wordt aangeroepen als de pagina is geladen, dat gebeurd helemaal onderin!
 */
async function setup(): Promise<void> {
    // Kijk of de gebruiker is ingelogd anders mag je hier niet komen.
    security();

    // Maak een actie aan voor de logout knop. Als je hier op drukt wordt de logout functie aangeroepen
    document.querySelector(".logout-btn")?.addEventListener("click", logout);

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));
}

/**
 * Check if the user is logged in
 * De methode geeft niets terug (void) en heeft daarom geen return statement
 */
function security(): void {
    // Als de sessie met naam user_id niet bestaat (door de ! werkt de if als nietwaar) dan is de gebruiker niet ingelogd
    if (!session.get("user") || session.get("user") === undefined) {
        // Stuur de gebruiker door naar de login pagina
        url.redirect("login.html");
    }
}

/**
 * Haal alle gegevens van de gebruiker op uit de database
 * @param id
 * @returns user object
 */
async function getUserInfo(userid: number): Promise<User | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);

        if (data.length > 0) {
            const user: User = new User(
                data[0]["id"],
                data[0]["username"],
                data[0]["email"],
                data[0]["firstname"],
                data[0]["lastname"]
            );
            return user;
        }
        return undefined;
    } catch (error) {
        console.error(error);

        return undefined;
    }
}

/**
 * Logout van de gebruiker door de sessie te verwijderen
 * De methode geeft niets terug (void) en heeft daarom geen return statement
 */
function logout(): void {
    // Verwijder de sessies
    session.remove("user");

    // Stuur de gebruiker door naar de login pagina
    url.redirect("login.html");
}

//////////vragen op scherm laten zien
// Het element waarin de gegevens worden weergegeven selecteren
const data: HTMLElement | null = document.getElementById("data");

async function laatZien(): Promise<void> {
    // De gegevens uit de database ophalen
    const resultaat: any[] | undefined = await runQuery("SELECT * FROM posts");
    const uitjeDB: any = resultaat[0];

    // De gegevens weergeven in de div
    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            const div: HTMLElement | null = document.createElement("div");
            div.className = "allePosts";

            // Een knop aanmaken om de vraag te bekijken
            const bekijkVraagKnop: HTMLElement | null = document.createElement("button");
            bekijkVraagKnop.className = "postBekijk";

            // Een paragraaf om de naam van het uitje weer te geven
            const titel: HTMLElement | null = document.createElement("p");
            titel.id = "postTitel";
            titel.textContent = `titel: ${row.titel}`;
            titel.style.color = "black";
            // De tekst voor de knop om aan een uitje deel te nemen
            bekijkVraagKnop.textContent = "Bekijk de vraag";

            // Een paragraaf om de prijs van het uitje weer te geven
            const vraag: HTMLElement | null = document.createElement("p");
            vraag.id = "postVraag";
            vraag.textContent = `Vraag: ${row.vraag}`;
            vraag.style.marginLeft = "10px";
            vraag.style.color = "black";

            // Een paragraaf om de prijs van het uitje weer te geven
            const naam: HTMLElement | null = document.createElement("p");
            naam.id = "postNaam";
            naam.textContent = `Naam van vraagsteller: ${row.user_id}`;
            naam.style.marginLeft = "10px";
            naam.style.color = "black";

            // Een paragraaf om de prijs van het uitje weer te geven
            const datum: HTMLElement | null = document.createElement("p");
            datum.id = "postTijd";
            datum.textContent = `datum van vraag: ${row.tijd}`;
            datum.style.marginLeft = "10px";
            datum.style.color = "black";

            // Een paragraaf om de prijs van het uitje weer te geven
            const antwoorden: HTMLElement | null = document.createElement("p");
            antwoorden.id = "postAntwoorden";
            antwoorden.textContent = `aantal antwoorden: ${row.tijd}`;
            antwoorden.style.marginLeft = "10px";
            antwoorden.style.color = "black";

            // De knoppen en paragrafen aan de div toevoegen
            div.appendChild(titel);
            div.appendChild(vraag);
            div.appendChild(naam);
            div.appendChild(datum);
            div.appendChild(antwoorden);
            div.appendChild(bekijkVraagKnop);
            data?.appendChild(div);
        });
    } else {
        // Een bericht weergeven als er geen gegevens zijn
        data.textContent = "Geen gegevens gevonden";
    }
}
laatZien();

// Run bij het opstarten de setup functie
await setup();
