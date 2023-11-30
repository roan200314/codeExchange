import { runQuery } from "./utils/queryutil";

const registreer: HTMLButtonElement = document.getElementById("button_registreer") as HTMLButtonElement;
registreer.addEventListener("click", zetIn);

async function zetIn(): Promise<void> {
    //email wachtwoord en gebruikersnaam ophalen uit de form
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const voornaamInput: HTMLInputElement | null = document.getElementById("voornaam") as HTMLInputElement;
    const achternaamInput: HTMLInputElement | null = document.getElementById("achternaam") as HTMLInputElement;
    const gebruikersnaamInput: HTMLInputElement | null = document.getElementById("gebruikersnaam") as HTMLInputElement;
    const wachtwoordInput: HTMLInputElement | null = document.getElementById("wachtwoord") as HTMLInputElement;
    const wachtwoord2Input: HTMLInputElement | null = document.getElementById("wachtwoord2") as HTMLInputElement;


    //variabelen gelijk zetten
    const email: string = emailInput.value;
    const voornaam: string = voornaamInput.value;
    const achternaam: string = achternaamInput.value;
    const gebruikersnaam: string = gebruikersnaamInput.value;
    const wachtwoord: string = wachtwoordInput.value;
    const wachtwoord2: string = wachtwoord2Input.value;
    console.log(email, voornaam, achternaam, gebruikersnaam, wachtwoord, wachtwoord2);

    //met trim kijkt die of de string leeg is 
    if (!email.trim() || !voornaam.trim() || !achternaam.trim() || !wachtwoord.trim() || !wachtwoord2.trim() || !gebruikersnaam.trim()) {
      alert("Een of meerdere gegevens niet ingevuld.");
    } else {
      //insert in de database
        alert("Succesvol registreerd.");
        await runQuery("INSERT INTO user (username, password, email, firstname, lastname) VALUES (?)", [gebruikersnaam, wachtwoord, email, voornaam, achternaam]);
    }

}