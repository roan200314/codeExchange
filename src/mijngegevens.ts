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

async function setUserValues(): Promise<void> {
    const user: User | undefined = await getUserInfo(session.get("user"));

    if (user) {
        const userNameElement: HTMLElement | null = document.getElementById("userName");
        const userUsernameElement: HTMLElement | null = document.getElementById("userUsername");
        const userEmailElement: HTMLElement | null = document.getElementById("userEmail");
        const userDateOfBirthElement: HTMLElement | null = document.getElementById("userDateOfBirth");
        const userExpertiseElement: HTMLElement | null = document.getElementById("userExpertise");
        const userYearsOfExperienceElement: HTMLElement | null = document.getElementById("userYearsOfExperience");
        const userProfilePictureElement: HTMLImageElement | null = document.getElementById("userProfilePicture");

        if (userNameElement) userNameElement.textContent = user.firstname + " " + user.lastname;
        if (userUsernameElement) userUsernameElement.textContent = user.username;
        if (userEmailElement) userEmailElement.textContent = user.email;
        if (userDateOfBirthElement) userDateOfBirthElement.textContent = user.birth_year;
        if (userExpertiseElement) userExpertiseElement.textContent = user.expertise;
        if (userYearsOfExperienceElement) userYearsOfExperienceElement.textContent = user.years_experience;
        if (userProfilePictureElement) userProfilePictureElement.src = user.profile_picture;
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
                data[0]["birth_year"],
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


// Add event listener to the save button
saveButton.addEventListener("click", async (): Promise<void> => {
    // Get the edited values from the input fields
    const editedGeboortedatum: HTMLInputElement | null = document.getElementById("geboortedatum") as HTMLInputElement;
    const editedJaarervaring: HTMLInputElement | null = document.getElementById("userYearsOfExperience") as HTMLInputElement;
    const editedExpertise: HTMLInputElement | null = document.getElementById("userExpertise") as HTMLInputElement;

    // Perform validation and handle empty values if needed

    const userId: number | undefined = session.get("user");

    if (
        userId !== undefined &&
        editedGeboortedatum?.value !== undefined &&
        editedJaarervaring?.value !== undefined &&
        editedExpertise?.value !== undefined
    ) {
        // Update the database with the new values
        await runQuery(
            "UPDATE user SET birth_year = ?, expertise = ?, years_experience = ? WHERE id = ?",
            [editedGeboortedatum.value, editedExpertise.value, editedJaarervaring.value, userId]
        );

        // Update the displayed values on the page
        document.getElementById("userDateOfBirth")!.textContent = editedGeboortedatum.value;
        document.getElementById("userYearsOfExperience")!.textContent = editedJaarervaring.value;
        document.getElementById("userExpertise")!.textContent = editedExpertise.value;
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
