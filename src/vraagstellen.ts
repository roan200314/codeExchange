import { runQuery } from "./utils/queryutil";

const vraag: HTMLButtonElement = document.getElementById("button_vraag") as HTMLButtonElement;
vraag.addEventListener("click", zetIn);

// Haal alle gebruikers op om weer te geven in een dropdown.
const resultaat: any[] | undefined = await runQuery("SELECT * FROM user");

const user: any = resultaat[0];

async function zetIn(): Promise<void> {
    const hoofdTitel: HTMLInputElement = document.getElementById("titelVraag") as HTMLInputElement;
    const hoofdVraag: HTMLInputElement = document.getElementById("vraag") as HTMLInputElement;
    const hoofdTags: HTMLInputElement = document.getElementById("tags") as HTMLInputElement;

    //variabelen gelijk zetten
    const titel: string = hoofdTitel.value;
    const vraag: string = hoofdVraag.value;
    const tags: string = hoofdTags.value;



    if (!titel.trim() || !vraag.trim() || !tags.trim()) {
        alert("Een of meerdere gegevens niet ingevuld.");
      } else {
        //insert in de database
          alert("Succesvol opgestuurd");
          await runQuery("INSERT INTO posts (user_id, titel, vraag, tags) VALUES (?)", [`${user.id}`, titel, vraag, tags]);
          console.log(`${user.id}`, titel, vraag, tags);
      }
}
