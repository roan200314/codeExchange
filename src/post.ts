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
    const antwoordDB: any = antwoorden[0];

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));

    const data: HTMLElement | null = document.getElementById("data");
    const div: HTMLElement | null = document.createElement("div");

    const titel: HTMLElement | null = document.createElement("p");
    titel.id = "titel";
    titel.innerText = `${postDB.titel}`;
    titel.style.color = "black";
    div.appendChild(titel);

    const vraag: HTMLElement | null = document.createElement("code");
    vraag.id = "vraag";
    vraag.innerText = `${postDB.vraag}`;
    vraag.style.color = "black";
    div.appendChild(vraag);

    const tags: HTMLElement | null = document.createElement("p");
    tags.innerText = `${postDB.tags}`;
    tags.style.color = "black";

    // Extract the text content from the HTMLElement and then split it
    const tagsText: string | null = tags.innerText;
    if (tagsText) {
        const tagArray: string[] = tagsText.split(","); // Split the string into an array

        // Create new HTML elements for each tag and append them to the document
        tagArray.forEach((tag) => {
            const tagElement: any = document.createElement("span");
            tagElement.id = "tags";
            tagElement.innerText = tag.trim(); // Trim to remove any leading/trailing whitespaces
            div.appendChild(tagElement);
        });
    }

    const antwoord: HTMLElement | null = document.createElement("p");
    antwoord.id = "antwoord";
    antwoord.innerText = `antwoord: ${antwoordDB.antwoord}`;
    antwoord.style.color = "black";

    div.appendChild(antwoord);

    const textareaElement: HTMLTextAreaElement | null = createTextareaForCode(postDB.vraag);
    if (textareaElement) {
        div.appendChild(textareaElement);
    }

    data?.appendChild(div);
}

/**
 * Create a textarea for code if it is enclosed in single quotes
 * @param text The input text
 * @returns HTMLTextAreaElement or null if no code block is found
 */
function createTextareaForCode(text: string): HTMLTextAreaElement | null {
    const codeRegex: RegExp = /'([^']*)'/;
    const match: RegExpMatchArray | null = text.match(codeRegex);

    if (match) {
        const codeText: string = match[1];

        const textareaElement: HTMLTextAreaElement = document.createElement("textarea");
        textareaElement.value = codeText;

        return textareaElement;
    }

    return null;
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
