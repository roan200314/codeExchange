import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { runQuery } from "./utils/queryutil";

// Haal het huidige URL op en haal de ID op uit de querystring.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

const posts: any[] | undefined = await runQuery("SELECT * FROM posts WHERE id = (?)", [id]);
const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers");
const users: any[] | undefined = await runQuery("SELECT * FROM user");



