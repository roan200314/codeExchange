import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { runQuery } from "./utils/queryutil";

const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
let id: string | null = IdOphalen.searchParams.get("id");
const raten: any[] | undefined = await runQuery("SELECT * FROM rating WHERE post_id = (?)", [id]);

async function setup(): Promise<void> {

    document.querySelector(".logout-btn")?.addEventListener("click", logout);

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

    if (antwoorden && antwoorden.length > 0) {
        const antwoordenContainer: HTMLElement | null = document.getElementById("antwoorden-container");

        antwoorden.forEach(async (answer: any) => {
            const answerDiv: HTMLElement = document.createElement("div");
            answerDiv.className = "answer";

            // Fetch the username based on user ID
            const user: User | undefined = await getUserInfo(answer.user_id);

            // Display username above the answer
            if (user) {
                const usernameElement: HTMLParagraphElement = document.createElement("p");
                usernameElement.innerText = `User: ${user.username}`;
                answerDiv.appendChild(usernameElement);
            }

            const answerText: HTMLParagraphElement = document.createElement("p");
            answerText.innerText = `Answer: ${answer.antwoord}`;
            answerDiv.appendChild(answerText);

            antwoordenContainer?.appendChild(answerDiv);
        });
    }

    const vraag: HTMLParagraphElement | null = document.createElement("p");
    vraag.id = "vraag";
    vraag.innerText = `${postDB.vraag}`;
    vraag.style.color = "black";

    const vraagText: string | null = vraag.innerText;
    if (vraagText) {
        const codeCheck: RegExpMatchArray | null = vraagText.match(/'''([^']+?)'''/g);

        if (codeCheck) {
            let lastIndex: number = 0;

            codeCheck.forEach((match: string) => {
                const startIndex: number = vraagText.indexOf(match, lastIndex);
                const prefixText: string = vraagText.substring(lastIndex, startIndex);

                const prefixElement: HTMLSpanElement = document.createElement("span");
                prefixElement.id = "vraagTop";

                prefixElement.innerText = prefixText;
                div.appendChild(prefixElement);

                const codeText: string = match.replace(/'''/g, "");
                const textareaElement: HTMLTextAreaElement = document.createElement("textarea");
                textareaElement.value = codeText;
                textareaElement.disabled = "true";
                div.appendChild(textareaElement);

                lastIndex = startIndex + match.length;
            });

            const textVraag: string = vraagText.substring(lastIndex);
            const element: HTMLSpanElement = document.createElement("span");
            element.id = "vraagBottom";

            element.innerText = textVraag;
            div.appendChild(element);
        } else {
            const vraagElement: HTMLSpanElement = document.createElement("span");
            vraagElement.innerText = vraagText;
            div.appendChild(vraagElement);
        }
    }

    const tags: HTMLElement | null = document.createElement("p");
    tags.innerText = `${postDB.tags}`;
    tags.style.color = "black";

    const tagsText: string | null = tags.innerText;
    if (tagsText) {
        const tagArray: string[] = tagsText.split(",");

        tagArray.forEach((tag) => {
            const tagElement: any = document.createElement("span");
            tagElement.id = "tags";
            tagElement.innerText = tag.trim();
            div.appendChild(tagElement);
        });
    }

    data?.appendChild(div);
}

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
    const uitloggen: any = confirm("Weet u zeker dat u wilt uitloggen?");
    if (uitloggen === true) {
        session.remove("user");
        url.redirect("login.html");
    }
}

const upvote: HTMLButtonElement = document.getElementById("upvote") as HTMLButtonElement;
upvote.addEventListener("click", rating);
const downvote: HTMLButtonElement = document.getElementById("downvote") as HTMLButtonElement;
downvote.addEventListener("click", rating);

async function rating(userid: number): Promise<void> {
    const cijfer: any = document.getElementById("cijfer");
    let counter: any = 0;

    if (cijfer) {
        if (this.id === "upvote") {
            counter++;
            console.log(cijfer);
            await runQuery("INSERT INTO rating (post_id, user_id, rating) VALUES (?)", [id, userid, cijfer]);
        }
        if (this.id === "downvote") {
            counter--;
        }
    }
    cijfer.innerText = counter.toString();
}

setup();
