import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { Answers } from "./models/answers";
import { runQuery } from "./utils/queryutil";

const user: User | undefined = await getUserInfo(session.get("user"));

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

const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
let id: string | null = IdOphalen.searchParams.get("id");

const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers WHERE vraag_id = (?)", [id]);

const antwoordVerstuur: HTMLButtonElement = document.getElementById("button_Antwoord") as HTMLButtonElement;
antwoordVerstuur.addEventListener("click", answer);


async function answer(): Promise<void> {
    const antwoord: HTMLInputElement = document.getElementById("titelAntwoord") as HTMLInputElement;

    const antwoordForm: string = antwoord.value;

    if (!antwoordForm.trim()) {
        alert("U heeft geen antwoord ingevuld!");
    } else {
        //insert in de database
        alert("Succesvol antwoord opgestuurd");
        await runQuery("INSERT INTO answers (vraag_id, user_id, antwoord) VALUES (?)", [
            
            id,
            user?.id,
            antwoordForm,
        ]);
        console.log(id, user?.id, antwoordForm);
    }
}

/**
 * Haal alle gegevens van de gebruiker op uit de database
 * @param id
 * @returns user object
 */
async function getAnswerInfo(): Promise<Answers | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM answers WHERE vraag_id = (?) ORDER BY tijd DESC", id);
        if (data.length > 0) {
            const answer: Answers = new Answers(
                data[0]["id"],
                data[0]["vraag_id"],
                data[0]["user_id"],
                data[0]["antwoord"]
            );
            return answer;
        }
        return undefined;
    } catch (error) {
        console.error(error);

        return undefined;
    }
}
const answer2: Answers | undefined = await getAnswerInfo(session.get("answer"));
console.log(answer2);

async function laatZien(): Promise<void> {
const div: any = document.createElement("div");
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

        const answerTime: HTMLParagraphElement = document.createElement("p");
        answerTime.innerText = `tijd: ${answer.tijd}`;
        answerDiv.appendChild(answerTime);

        antwoordenContainer?.appendChild(answerDiv);
    });
}

}
laatZien();
