
Deze functionaliteit stelt gebruikers in staat om hun profielgegevens te bekijken, bewerken en hun profielfoto's te beheren. Hieronder staan de belangrijkste onderdelen.


 ## Gebruikersinterface

De HTML-elementen zijn ontworpen om een overzichtelijke gebruikersinterface te bieden met interactieve functies. Hier is een korte beschrijving van enkele elementen:

- <details> <summary> editButton, saveButton: Knoppen om tussen de bewerkmodus te schakelen en wijzigingen op te slaan. 
    </summary>

  ```
    editButton.style.display = editButton.style.display === "none" ? "block" : "none";
    saveButton.style.display = saveButton.style.display === "none" ? "block" : "none";
  ```
    </details>

- <details> <summary>  profilePictureInput: Een invoerveld voor het selecteren van een profielfoto en inserten in de Database, code moet nog aan gewerkt worden.
    </summary>
     
     ```

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

   ```
     // Update the displayed values on the page
            document.getElementById("userProfilePicture")!.src = URL.createObjectURL(selectedFile);
   ```
   </details>

## TypeScript-code
- <details> <summary> toggleEditMode(): Deze functie schakelt de bewerkmodus in en uit door de contentEditable-attributen van de velden te wijzigen. Het zorgt ook    voor de zichtbaarheid van de bewerk- en opslaan-knoppen. 
    </summary>

  ``` 
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
       
    ```   // Function to set user values
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
  
    ```
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

- saveButton.addEventListener("click"): Een event listener die wordt geactiveerd wanneer de gebruiker op de opslaan-knop klikt. Het haalt de bewerkte waarden op en update de database met behulp van de runQuery-functie.

- userProfilePicture.addEventListener("click"): Deze event listener opent het bestandsinvoerdialog wanneer er op de profielfoto wordt geklikt.

- profilePictureInput.addEventListener("change"): Hiermee wordt een event listener toegevoegd aan het invoerveld voor profielfoto's. Het wordt geactiveerd wanneer een bestand is geselecteerd en werkt bij het uploaden van de profielfoto.

## Bewerken van Gebruikersprofiel

### Schakelen tussen Bewerkmodus

- De bewerkmodus wordt geactiveerd wanneer de gebruiker op de bewerkknop klikt. Dit wordt bereikt door de toggleEditMode-functie, die de bewerkbaarheid van velden wijzigt en de zichtbaarheid van knoppen aanpast.

### Wijzigingen Opslaan

- De opslaan-knop activeert de saveButton.addEventListener("click")-functie. Hier worden de bewerkte waarden opgehaald en naar de database gestuurd met behulp van de runQuery-functie. Vervolgens worden de weergegeven waarden op de pagina bijgewerkt.