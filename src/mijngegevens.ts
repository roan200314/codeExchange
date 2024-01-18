// Importeer de runQuery functie uit het queryutil bestand
import { runQuery } from "./utils/queryutil";
import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";
import { Post } from "./models/post";
import { Answers } from "./models/answers";

const editButton: HTMLButtonElement = document.getElementById("editButton") as HTMLButtonElement;
const saveButton: HTMLButtonElement = document.getElementById("saveButton") as HTMLButtonElement;
const profilePictureInput: HTMLInputElement = document.getElementById(
    "profilePictureInput"
) as HTMLInputElement;
const user: User | undefined = await getUserInfo(session.get("user"));

// Function to toggle edit mode
function toggleEditMode(): void {
    const editableFields: NodeListOf<Element> = document.querySelectorAll("[contenteditable]");
    editableFields.forEach((field: Element) => {
        field.contentEditable = String(!(field as HTMLElement).isContentEditable);
    });

    // Toggle button visibility
    editButton.style.display = editButton.style.display === "none" ? "block" : "none";
    saveButton.style.display = saveButton.style.display === "none" ? "block" : "none";
}

async function setUserValues(): Promise<void> {
    const user: User | undefined = await getUserInfo(session.get("user"));

    if (user) {
        const userNameElement: HTMLElement | null = document.getElementById("userName");
        const userUsernameElement: HTMLElement | null = document.getElementById("userUsername");
        const userEmailElement: HTMLElement | null = document.getElementById("userEmail");
        const userDateOfBirthElement: HTMLInputElement | null = document.getElementById(
            "geboortedatum"
        ) as HTMLInputElement;
        const userExpertiseElement: HTMLElement | null = document.getElementById("userExpertise");
        const userYearsOfExperienceElement: HTMLElement | null =
            document.getElementById("userYearsOfExperience");
        // const userProfilePictureElement: HTMLImageElement | null =
        //     document.getElementById("userProfilePicture");

        if (userNameElement) userNameElement.textContent = user.firstname + " " + user.lastname;
        if (userUsernameElement) userUsernameElement.textContent = user.username;
        if (userEmailElement) userEmailElement.textContent = user.email;
        if (userDateOfBirthElement) {
            const birthDate: Date = new Date(user.birth_year);
            userDateOfBirthElement.value = birthDate.toLocaleDateString();
        }
        if (userExpertiseElement) userExpertiseElement.textContent = user.expertise;
        if (userYearsOfExperienceElement) userYearsOfExperienceElement.textContent = user.years_experience;
        // if (userProfilePictureElement) userProfilePictureElement.src = user.profile_picture;
    }
}

// Function to get user info
async function getUserInfo(userid: number): Promise<User | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);

        if (data.length > 0) {
            const user: User = new User(
                data[0]["id"],
                data[0]["username"],
                data[0]["email"],
                data[0]["firstname"],
                data[0]["lastname"],
                data[0]["birth_year"],
                data[0]["expertise"],
                data[0]["years_experience"],
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

// Set user values on page load
setUserValues();

// Add event listener to the edit button
editButton.addEventListener("click", toggleEditMode);

saveButton.addEventListener("click", async (): Promise<void> => {
    try {
        const editedUsername: HTMLSpanElement | null = document.getElementById("userUsername") as HTMLSpanElement;
        const editeduserEmail: HTMLSpanElement | null = document.getElementById("userEmail") as HTMLSpanElement;
        const editedJaarervaring: HTMLSpanElement | null = document.getElementById("userYearsOfExperience") as HTMLSpanElement;
        const editedExpertise: HTMLSpanElement | null = document.getElementById("userExpertise") as HTMLSpanElement;
        const editedGeboortedatum: HTMLInputElement | null = document.getElementById("geboortedatum") as HTMLInputElement;
        
        // Now you can access the values using the 'innerText' and 'value' properties
        const usernameValue: string = editedUsername.innerText || "";
        const userEmailValue: string = editeduserEmail.innerText || "";
        const jaarervaringValue: string = editedJaarervaring.innerText || "";
        const expertiseValue: string = editedExpertise.innerText || "";
        const geboortedatumValue: string = editedGeboortedatum.value || "";
        

        console.log(jaarervaringValue);


        // Perform validation and handle empty values if needed

        const userId: number | undefined = session.get("user");
    

            // Update the database with the new values
            const updateResult: any = await api.queryDatabase(
                "UPDATE user SET username = ?, email = ?, birth_year = ?, expertise = ?, years_experience = ? WHERE id = ?",
                usernameValue, userEmailValue, geboortedatumValue, expertiseValue, jaarervaringValue, userId
                );

            console.log("Update Result:", updateResult);

            if (updateResult && updateResult.affectedRows > 0) {
                // Success message or further actions if needed
                console.log("Update successful");
            } else {
                console.error("Update failed. No rows affected.");
            }
        

        toggleEditMode();
    } catch (error) {
        console.error("Error during update:", error);
    }
});


const deleteButton: HTMLButtonElement | null = document.getElementById(
    "deleteButton"
) as HTMLButtonElement | null;

// Event listener for the delete button
deleteButton?.addEventListener("click", async () => {
    // Display a confirmation popup
    const userConfirmed: boolean = window.confirm("Do you really want to delete your account?");

    if (userConfirmed) {
        // Get the edited values from the input fields
        const editedName: HTMLInputElement | null = document.getElementById("userName").textContent;
        const editedUsername: HTMLInputElement | null = document.getElementById("userUsername").textContent;
        const editeduserEmail: HTMLInputElement | null = document.getElementById("userEmail").textContent;
        const editedJaarervaring: HTMLInputElement | null =
            document.getElementById("userYearsOfExperience").textContent;
        const editedExpertise: HTMLInputElement | null = document.getElementById("userExpertise").textContent;
        const editedgeboortedatum: HTMLInputElement | null =
            document.getElementById("userExpertise").textContent;

        // Validate and handle empty values if needed

        const userId: number | undefined = session.get("user");

        if (
            userId !== undefined &&
            editedJaarervaring !== null &&
            editedExpertise !== null &&
            editedName !== null &&
            editeduserEmail !== null &&
            editedgeboortedatum !== null &&
            editedUsername !== null
        ) {
            // Perform the delete query
            await runQuery("DELETE FROM user WHERE id = ?", user.id);

            // Optionally, you can perform additional actions after deletion
            console.log("Account deleted successfully");

            url.redirect("login.html");
        }
    } else {
        // Handle the case when some values are missing or invalid
        console.log("Invalid values or missing data");
    }
    //     else {
    //     // User canceled the deletion
    //     console.log("Account deletion canceled");
    // }

});

const data: HTMLElement | null = document.getElementById("data");

const vragen: any[] | undefined = await runQuery("SELECT * FROM posts WHERE user_id = (?) ORDER BY tijd DESC", user?.id);


if (vragen && vragen.length > 0) {
    // Voor elk bericht in de lijst van berichten
    vragen.forEach((post: Post) => {

            const div: HTMLElement | null = document.createElement("div");
            div.className = "allepost";

            // Een link om de titel van het bericht weer te geven
            const titel: HTMLElement | null = document.createElement("a");
            titel.id = "postTitel";
            titel.href = `post.html?id=${post.id}`;
            titel.textContent = `${post.titel}`;

            // Een paragraaf om de vraag van het bericht weer te geven
            const vraag: HTMLElement | null = document.createElement("p");
            vraag.id = "postVraag";
            const vraagVerkort: string = post.vraag.length > 100 ? post.vraag.substring(0, 100) + "..." : post.vraag;
            vraag.textContent = `Vraag: ${vraagVerkort}`;
            vraag.style.marginLeft = "10px";

            // Een paragraaf om het tijdstip van de vraag weer te geven
            const datum: HTMLElement | null = document.createElement("p");
            datum.id = "postTijd";
            datum.textContent = `Datum van vraag: ${post.tijd}`;
            datum.style.marginLeft = "10px";
            

            // Voeg knoppen en paragrafen toe aan de div
            div.appendChild(titel);
            div.appendChild(vraag);
            div.appendChild(datum);
            data?.appendChild(div);

            console.log(post);
    });
}
// Get user's answers
const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers WHERE user_id = ? ORDER BY id DESC", user?.id);

if (antwoorden && antwoorden.length > 0) {
    // For each answer in the list of answers
    antwoorden.forEach((answer: Answers) => {

        const div: HTMLElement | null = document.createElement("div");
        div.className = "alleantwoorden";

        // Display the question title (you may need to fetch the question title from the associated post)
        const vraagTitel: HTMLElement | null = document.createElement("h3");
        vraagTitel.textContent = `Vraag Titel: ${answer.vraag_id}`; // You may need to fetch the question title here
        vraagTitel.style.marginLeft = "10px";

        // Display the answer
        const antwoord: HTMLElement | null = document.createElement("p");
        antwoord.id = "antwoord";
        antwoord.textContent = `Antwoord: ${answer.antwoord}`;
        antwoord.style.marginLeft = "10px";

        // Add elements to the div
        div.appendChild(vraagTitel);
        div.appendChild(antwoord);
        data?.appendChild(div);

        console.log(answer);
    });
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
document.querySelector(".logout-btn")?.addEventListener("click", logout);
