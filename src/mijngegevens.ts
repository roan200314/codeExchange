import { runQuery } from "./utils/queryutil";

const resultaat: any[] | undefined = await runQuery("SELECT * FROM user");

const user: any = resultaat[1];

const data:HTMLElement | null = document.getElementById("userInfo");

const div: HTMLElement | null = document.createElement("div");

const paragraaf:HTMLElement | null = document.createElement("input");
paragraaf.value = `${user.username}`;

div.appendChild(paragraaf);
data?.appendChild(div);
