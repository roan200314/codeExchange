import { runQuery } from "./utils/queryutil";

const vraag: HTMLButtonElement = document.getElementById("button_vraag") as HTMLButtonElement;
vraag.addEventListener("click", zetIn);

async function zetIn(): Promise<void> {
    const hoofdTitel: HTMLInputElement = document.getElementById("titel") as HTMLInputElement;
    const hoofdVraag: HTMLInputElement = document.getElementById("vraag") as HTMLInputElement;
    const hoofdTags: HTMLInputElement = document.getElementById("tags") as HTMLInputElement;

    //variabelen gelijk zetten
    const titel: string = hoofdTitel.value;
    const vraag: string = hoofdVraag.value;
    const tags: string = hoofdTags.value;

    console.log(titel, vraag, tags);

    // if (!email.trim() || !voornaam.trim() || !achternaam.trim() || !wachtwoord.trim() || !wachtwoord2.trim() || !gebruikersnaam.trim()) {
    //     alert("Een of meerdere gegevens niet ingevuld.");
    //   } else {
    //     //insert in de database
    //       alert("Succesvol registreerd.");
    //       await runQuery("INSERT INTO user (username, password, email, firstname, lastname) VALUES (?)", [gebruikersnaam, wachtwoord, email, voornaam, achternaam]);
    //   }
}
