import { runQuery } from "./utils/queryutil";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";

const vraag: HTMLButtonElement = document.getElementById("button_vraag") as HTMLButtonElement;
vraag.addEventListener("click", zetIn);

const user: User | undefined = await getUserInfo(session.get("user"));


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
        await runQuery("INSERT INTO posts (user_id, titel, vraag, tags) VALUES (?)", [
            
            user.id,
            titel,
            vraag,
            tags
        ]);
        console.log(user?.id, titel, vraag, tags);
    }
}

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
