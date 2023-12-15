import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { runQuery } from "./utils/queryutil";

// Haal het huidige URL op en haal de ID op uit de querystring.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
let id: string | null = IdOphalen.searchParams.get("id");

const posts: any[] | undefined = await runQuery("SELECT * FROM posts WHERE id = (?)", [id]);
const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers WHERE vraag_id = (?)", [id]);
const users: any[] | undefined = await runQuery("SELECT * FROM user");

const postDB: any = posts[0];
const antwoordDB: any = antwoorden[0];



async function setup(): Promise<void> {
    document.querySelector(".logout-btn")?.addEventListener("click", logout);

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));

    const data: HTMLElement | null = document.getElementById("data");

    const div: HTMLElement | null = document.createElement("div");

    const titel: HTMLElement | null = document.createElement("p");
    titel.id = "titel";
    titel.innerText = `${postDB.titel}`;
    titel.style.color = "black";


    const vraag: HTMLElement | null = document.createElement("p");
    vraag.id = "vraag";
    vraag.innerText = `vraag: ${postDB.vraag}`;
    vraag.style.color = "black";

    const tags: HTMLElement | null = document.createElement("p");
    tags.id = "tags";
    tags.innerText = `tags: ${postDB.tags}`;
    tags.style.color = "black";

    const antwoord: HTMLElement | null = document.createElement("p");
    antwoord.id = "antwoord";
    antwoord.innerText = `antwoord: ${antwoordDB.antwoord}`;
    antwoord.style.color = "black";

    div.appendChild(titel);
    div.appendChild(vraag);
    div.appendChild(tags);
    div.appendChild(antwoord);


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