import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { runQuery } from "./utils/queryutil";

async function setup(): Promise<void> {
    document.querySelector(".logout-btn")?.addEventListener("click", logout);

    const currentURL: string = window.location.href;
    const IdOphalen: URL = new URL(currentURL);
    let id: string | null = IdOphalen.searchParams.get("id");

    const posts: any[] | undefined = await runQuery("SELECT * FROM posts WHERE id = (?)", [id]);
    const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers WHERE vraag_id = (?)", [id]);
    const users: any[] | undefined = await runQuery("SELECT * FROM user");

    const postDB: any = posts[0];

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));

    const data: HTMLElement | null = document.getElementById("data");
    const div: HTMLElement | null = document.createElement("div");

    const titel: HTMLParagraphElement | null = document.createElement("p");
    titel.id = "titelVraag";
    titel.innerText = `${postDB.titel}`;
    titel.style.color = "black";
    div.appendChild(titel);

    const vraag: HTMLParagraphElement | null = document.createElement("p");
    vraag.id = "vraag";
    vraag.innerText = `${postDB.vraag}`;
    vraag.style.color = "black";

    // Check voor 3 qoutes on vervolgens een textarea te zetten voor die match.
    const vraagText: string | null = vraag.innerText;
    if (vraagText) {
        const codeCheck: RegExpMatchArray | null = vraagText.match(/'''([^']+?)'''/g);

        if (codeCheck) {
            let lastIndex: number = 0;

            codeCheck.forEach((match: string) => {
                const startIndex: number = vraagText.indexOf(match, lastIndex);
                const prefixText: string = vraagText.substring(lastIndex, startIndex);

                // Display text before the match
                const prefixElement: HTMLSpanElement = document.createElement("span");
                prefixElement.id = "vraagTop";
                prefixElement.style.color = "black";
                prefixElement.innerText = prefixText;
                div.appendChild(prefixElement);

                // Display the match inside a textarea
                const codeText: string = match.replace(/'''/g, "");
                const textareaElement: HTMLTextAreaElement = document.createElement("textarea");
                textareaElement.value = codeText;
                textareaElement.disabled = "true";
                div.appendChild(textareaElement);

                // Update lastIndex
                lastIndex = startIndex + match.length;
            });

            // de rest van de tekst laten zien
            const textVraag: string = vraagText.substring(lastIndex);
            const element: HTMLSpanElement = document.createElement("span");
            element.id = "vraagBottom";
            element.style.color = "black";
            element.innerText = textVraag;
            div.appendChild(element);
        } else {
            // als geen 3 qoutes zijn tekst laten zien.
            const vraagElement: HTMLSpanElement = document.createElement("span");
            vraagElement.innerText = vraagText;
            div.appendChild(vraagElement);
        }
    }
    const tags: HTMLElement | null = document.createElement("p");
    tags.innerText = `${postDB.tags}`;
    tags.style.color = "black";

    // split de tekst
    const tagsText: string | null = tags.innerText;
    if (tagsText) {
        const tagArray: string[] = tagsText.split(","); // Split de string naar array

        // maak nieuwe html tags en voeg ze toe aan de div
        tagArray.forEach((tag) => {
            const tagElement: any = document.createElement("span");
            tagElement.id = "tags";
            tagElement.innerText = tag.trim(); // whitespaces weghalen.
            div.appendChild(tagElement);
        });
    }
    data?.appendChild(div);

}

/**
 * Haal alle gegevens van de gebruiker op uit de database
 * @param id
 * @returns user object
 */
async function getUserInfo(userid: number): Promise<User | undefined> {
    console.log(userid);
    try {
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);
        if (data.length > 0) {
            const user: User = new User(
                data[0]["id"],
                data[0]["username"],
                data[0]["email"],
                data[0]["firstname"],
                data[0]["lastname"],
                data[0]["expertise"],
                data[0]["dateOfBirth"],
                data[0]["yearsOfExperience"],
                data[0]["profilePicture"]
            );
            return user;
        }
        return undefined;
    } catch (error) {
        console.error(error);

        return undefined;
    }
}

function logout(): void {
    // Verwijder de sessies
    const uitloggen: any = confirm("Weet u zeker dat u wilt uitloggen?");
    if (uitloggen === true) {
        session.remove("user");

        // Stuur de gebruiker door naar de login pagina
        url.redirect("login.html");
    }
}

setup();
