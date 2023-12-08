// Importeer de runQuery functie uit het queryutil bestand
import { runQuery } from "./utils/queryutil";

// Haal de button op met de id "button_registreer" en wijs deze toe aan de variabele "registreer"
const registreer: HTMLButtonElement = document.getElementById("button_registreer") as HTMLButtonElement;

// Voeg een eventlistener toe aan de registreer knop, die de zetIn functie aanroept wanneer er op geklikt wordt
registreer.addEventListener("click", zetIn);

// Definieer de zetIn functie die uitgevoerd wordt bij het klikken op de registreer knop
async function zetIn(event: Event): Promise<void> {
    event.preventDefault(); // Voorkomt het standaardgedrag van het formulier bij verzenden

    // Haal email, voornaam, achternaam, gebruikersnaam, wachtwoord en wachtwoord2 op uit het formulier
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const voornaamInput: HTMLInputElement | null = document.getElementById("voornaam") as HTMLInputElement;
    const achternaamInput: HTMLInputElement | null = document.getElementById("achternaam") as HTMLInputElement;
    const gebruikersnaamInput: HTMLInputElement | null = document.getElementById("gebruikersnaam") as HTMLInputElement;
    const wachtwoordInput: HTMLInputElement | null = document.getElementById("wachtwoord") as HTMLInputElement;
    const wachtwoord2Input: HTMLInputElement | null = document.getElementById("wachtwoord2") as HTMLInputElement;

    // Zet variabelen gelijk
    const email: string = emailInput.value;
    const voornaam: string = voornaamInput.value;
    const achternaam: string = achternaamInput.value;
    const gebruikersnaam: string = gebruikersnaamInput.value;
    const wachtwoord: string = wachtwoordInput.value;
    const wachtwoord2: string = wachtwoord2Input.value;

    // Met trim controleren of de string leeg is
    if (
        !email.trim() ||
        !voornaam.trim() ||
        !achternaam.trim() ||
        !wachtwoord.trim() ||
        !wachtwoord2.trim() ||
        !gebruikersnaam.trim()
    ) {
        alert("Een of meerdere gegevens niet ingevuld.");
    } else if (!isValidEmail(email)) {
        alert("Ongeldig e-mailadres.");
    } else if (!isPasswordValid(wachtwoord)) {
        alert("Het wachtwoord moet minimaal 8 tekens lang zijn.");
    } else if (wachtwoord !== wachtwoord2) {
        alert("De wachtwoorden komen niet overeen.");
    } else {
        // Controleren of het e-mailadres al in de database bestaat
        const userExists: any = await isEmailAlreadyExists(email);

        if (userExists) {
            alert("Dit e-mailadres is al geregistreerd. Probeer in te loggen of vul een ander e-mailadres in.");
        } else {
            // Invoegen in de database
            alert("Succesvol geregistreerd.");
            await runQuery("INSERT INTO user (username, password, email, firstname, lastname) VALUES (?)", [
                gebruikersnaam,
                wachtwoord,
                email,
                voornaam,
                achternaam,
            ]);
        }
    }
}

// Functie om te controleren of een e-mailadres geldig is
function isValidEmail(email: string): boolean {
    const emailRegex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Functie om te controleren of een wachtwoord minimaal 8 tekens lang is
function isPasswordValid(password: string): boolean {
    return password.length >= 8;
}

// Functie om te controleren of een e-mailadres al bestaat in de database
async function isEmailAlreadyExists(email: string): Promise<boolean> {
    // Aannemende dat de runQuery-functie een boolean retourneert die aangeeft of het e-mailadres bestaat
    const result: any = await runQuery("SELECT COUNT(*) FROM user WHERE email = ?", [email]);
    return result && result[0] && result[0]["COUNT(*)"] > 0;
}
