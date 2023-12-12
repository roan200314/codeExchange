import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { Post } from "./models/post";
import { runQuery } from "./utils/queryutil";

// Haal het huidige URL op en haal de ID op uit de querystring.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

const posts: any[] | undefined = await runQuery("SELECT * FROM posts WHERE id = (?)", [id]);
const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers");
const users: any[] | undefined = await runQuery("SELECT * FROM user");



async function setup(): Promise<void> {

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));

    const post: Post | undefined = await getPostInfo(session.get("post"));

    const data: HTMLElement | null = document.getElementById("data");

    const div: HTMLElement | null = document.createElement("div");

    const vraag: HTMLElement | null = document.createElement("p");
    vraag.innerText = post?.vraag ?? "Default Value";
    vraag.style.color = "black";

    div.appendChild(vraag);

    data?.appendChild(div);

}

/**
 * Haal alle gegevens van de gebruiker op uit de database
 * @param id
 * @returns user object
 */
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
/*
* Haal alle gegevens van de gebruiker op uit de database
* @param id
* @returns user object
*/
async function getPostInfo(userid: number): Promise<Post | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM posts WHERE id = ?",[id]);
 
        if (data.length > 0) {
            const post: Post = new Post(
                data[0]["id"],
                data[0]["titel"],
                data[0]["vraag"],
                data[0]["tijd"],
                data[0]["tags"],
                data[0]["code_snippet"]
            );
            return post;
        }
        return undefined;
    } catch (error) {
        console.error(error);
 
        return undefined;
    }
 }

 setup();