// Importeer de runQuery functie uit het queryutil bestand
import { runQuery } from "./utils/queryutil";
import "./config";
import { api, session } from "@hboictcloud/api";
import { User } from "./models/user";


const editButton: HTMLButtonElement = document.getElementById("editButton") as HTMLButtonElement;
const saveButton: HTMLButtonElement = document.getElementById("saveButton") as HTMLButtonElement;
const profilePictureInput: HTMLInputElement = document.getElementById("profilePictureInput") as HTMLInputElement;

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

// Function to set user values
async function setUserValues(): Promise<void> {
    const user: User | undefined = await getUserInfo(session.get("user"));

    if (user) {
        document.getElementById("userName")!.textContent = user.firstname + " " + user.lastname;
        document.getElementById("userUsername")!.textContent = user.username;
        document.getElementById("userEmail")!.textContent = user.email;
        const tijd: any = user.birth_year;
        document.getElementById("userDateOfBirth")!.textContent = tijd;
        document.getElementById("userExpertise")!.textContent = user.expertise;
        document.getElementById("userYearsOfExperience")!.textContent = user.years_experience;
        document.getElementById("userProfilePicture")!.src = user.profile_picture;
        console.log(tijd);
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

// Set user values on page load
setUserValues();

// Add event listener to the edit button
editButton.addEventListener("click", toggleEditMode);

// Add event listener to the save button
saveButton.addEventListener("click", async (): Promise<void> => {
    // Get the edited values from the contenteditable elements or input fields
    const editedGeboortedatum: HTMLElement | null = document.getElementById("userDateOfBirth")?.textContent;
    const editedJaarervaring: HTMLElement | null = document.getElementById("userYearsOfExperience")?.textContent;
    const editedExpertise: HTMLElement | null = document.getElementById("userExpertise")?.textContent;

    // Perform validation and handle empty values if needed

    // Assuming you have the user's ID stored in a variable named userId
    const userId: number | undefined = session.get("user");

    if (userId !== undefined && editedGeboortedatum !== undefined && editedJaarervaring !== undefined && editedExpertise !== undefined) {
        // Update the database with the new values
        await runQuery(
            "UPDATE user SET geboortedatum = ?, jaarervaring = ?, expertise = ? WHERE id = ?",
            [editedGeboortedatum, editedJaarervaring, editedExpertise, userId]
        );

        // Update the displayed values on the page
        document.getElementById("userDateOfBirth")!.textContent = editedGeboortedatum;
        document.getElementById("userYearsOfExperience")!.textContent = editedJaarervaring;
        document.getElementById("userExpertise")!.textContent = editedExpertise;
    }

    toggleEditMode();
});


// Add event listener to the profile picture for opening file input
const userProfilePicture: HTMLImageElement = document.getElementById("userProfilePicture") as HTMLImageElement;
userProfilePicture.addEventListener("click", () => {
    profilePictureInput.click();
});

// Add event listener to the file input for handling file selection
profilePictureInput.addEventListener("change", async (): Promise<void> => {
    const selectedFile: File | undefined = profilePictureInput.files?.[0];

    if (selectedFile) {
    
        console.log("Selected file:", selectedFile);
    }
});
