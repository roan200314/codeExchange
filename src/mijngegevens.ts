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
        document.getElementById("userExpertise")!.textContent = user.expertise || "";
        document.getElementById("userDateOfBirth")!.textContent = user.dateOfBirth || "";
        document.getElementById("userYearsOfExperience")!.textContent = user.yearsOfExperience?.toString() || "";
        document.getElementById("userProfilePicture")!.src = user.profilePicture || "";
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
