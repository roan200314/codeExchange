
# mijngegevens.ts

Deze documentatie gaat over het bestand [mijngegevens.ts](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-a-se-ti/blok-2/kiiruuyoojoo70/-/blob/main/src/mijngegevens.ts?ref_type=heads)

Deze functionaliteit stelt gebruikers in staat om hun profielgegevens te bekijken, bewerken en hun profielfoto's te beheren. Hieronder staan de belangrijkste onderdelen.

 ## Gebruikersinterface

De HTML-elementen zijn ontworpen om een overzichtelijke gebruikersinterface te bieden met interactieve functies. Hier is een korte beschrijving van enkele elementen:

- <details> <summary> editButton, saveButton: Knoppen om tussen de bewerkmodus te schakelen en wijzigingen op te slaan. 
    </summary>

  ``` javascript
    editButton.style.display = editButton.style.display === "none" ? "block" : "none";
    saveButton.style.display = saveButton.style.display === "none" ? "block" : "none";
  ```
    </details>

- <details> <summary>  profilePictureInput: Een invoerveld voor het selecteren van een profielfoto en inserten in de Database, code moet nog aan gewerkt worden.
    </summary>
     
     ``` javascript

       profilePictureInput.addEventListener("change", async (): Promise<void> => {
       const selectedFile: File | undefined = profilePictureInput.files?.[0];

       if (selectedFile) {
        
           const userId: number | undefined = session.get("user");

           if (userId !== undefined) {
               // Upload the selected file and update the database
               await runQuery(
                    "UPDATE user SET profilePicture = (?) WHERE id = (?)",
                    [selectedFile.name, userId]
                );

               // Update the displayed values on the page
               document.getElementById("userProfilePicture")!.src = URL.createObjectURL(selectedFile);

               console.log("Selected file:", selectedFile);
           }
       }  
     ```                                                   
 </details>

- <details> <summary>  userProfilePicture: Een klikbare afbeelding die de profielfoto vertegenwoordigt. 
   </summary>

   ``` javascript
     // Update the displayed values on the page
            document.getElementById("userProfilePicture")!.src = URL.createObjectURL(selectedFile);
   ```
   </details>

## TypeScript-code
- <details> <summary> toggleEditMode(): Deze functie schakelt de bewerkmodus in en uit door de contentEditable-attributen van de velden te wijzigen. Het zorgt ook    voor de zichtbaarheid van de bewerk- en opslaan-knoppen. 
    </summary>

  ``` javascript
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
  ```
    
</details>
 
- <details> <summary> setUserValues(): Deze functie haalt de gebruikersgegevens op vanuit de backend-API en vult de HTML-elementen in met de ontvangen informatie.
      </summary>
       
    ```  javascript // Function to set user values
        async function setUserValues(): Promise<void> {
         const user: User | undefined = await getUserInfo(session.get("user"));
         console.log(User);

         if (user) {
          document.getElementById("userName")!.textContent = user.firstname + " " + user.lastname;
          document.getElementById("userUsername")!.textContent = user.username;
          document.getElementById("userEmail")!.textContent = user.email;
          document.getElementById("userExpertise")!.textContent = user.expertise || "";
          document.getElementById("userDateOfBirth")!.textContent = user.dateOfBirth || "";
          document.getElementById("userYearsOfExperience")!.textContent = user.yearsOfExperience?.toString() || "";
          document.getElementById("userProfilePicture")!.src = user.profilePicture || "";
         }}
    ```
</details>



- <details> <summary> getUserInfo(userid): Een asynchrone functie om gebruikersinformatie op te halen op basis van de gebruikers-id. 
      </summary>
  
    ``` javascript
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
     }}

  ```
 </details>

- <details> <summary> saveButton.addEventListener("click"): Een event listener die wordt geactiveerd wanneer de gebruiker op de opslaan-knop klikt. Het haalt de bewerkte waarden op en update de database 
       </summary>
 
    ``` javascript
          // Add event listener to the save button

      saveButton.addEventListener("click", async (): Promise<void> => {

      // Get the edited values from the input fields

      const editedGeboortedatum: string | undefined = document.getElementById("userDateOfBirth")?.textContent;
      const editedJaarervaring: string | undefined = document.getElementById("userYearsOfExperience")?.textContent;
      const editedExpertise: string | undefined = document.getElementById("userExpertise")?.textContent;

   
      const userId: number | undefined = session.get("user");
    
   



      if (userId !== undefined && editedGeboortedatum !== undefined && editedJaarervaring !== undefined && editedExpertise !== undefined) {

        // Update the database with the new values

        await runQuery(
            "UPDATE user SET geboortejaar = ?, jaar_ervaring = ?, expertise = ? WHERE id =  ?", [ editedGeboortedatum, editedJaarervaring, editedExpertise ,userId]
            
        );

        // Update the displayed values on the page
        
        document.getElementById("userDateOfBirth")!.textContent = editedGeboortedatum;
        document.getElementById("userYearsOfExperience")!.textContent = editedJaarervaring;
        document.getElementById("userExpertise")!.textContent = editedExpertise;
      }

      toggleEditMode();
     });

  ```
</details>

## Bewerken van Gebruikersprofiel

### Schakelen tussen Bewerkmodus

<details>
<summary> - De bewerkmodus wordt geactiveerd wanneer de gebruiker op de bewerkknop klikt. Dit wordt bereikt door de toggleEditMode-functie, die de bewerkbaarheid van velden wijzigt en de zichtbaarheid van knoppen aanpast. </summary>

``` javascript 
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

```
</details>

### Wijzigingen Opslaan

- De opslaan-knop activeert de saveButton.addEventListener("click")-functie. Hier worden de bewerkte waarden opgehaald en naar de database gestuurd met behulp van de runQuery-functie. Vervolgens worden de weergegeven waarden op de pagina bijgewerkt.

## Profiel Verwijderen

<details>
<summary> - De Verwijder knop activeert een Query waarbij de gebruikersprofiel wordt verwijdert. Er word eerst een alert gegeven of de gebruiker definitief zijn/haar gegevens wilt verwijderen </summary>

```javascript
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
```
