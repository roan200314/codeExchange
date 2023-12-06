import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";


async function setUserValues(): Promise<void> {
    const user: User | undefined = await getUserInfo(session.get("user"));

    if (user) {
        document.querySelector("#userName")!.innerHTML = user.firstname + " " + user.lastname;
        document.querySelector("#userUsername")!.innerHTML = user.username;
        document.querySelector("#userEmail")!.innerHTML = user.email;
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

setUserValues();






