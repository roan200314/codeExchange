### Functie: `setup`

- **Doel**: Deze functie initialiseert de pagina door event listeners toe te voegen, gegevens op te halen en weer te geven in HTML-elementen.

- **Stappen**:
<details>
<summary>1. Voeg een event listener toe aan het element met de klasse "logout-btn" voor uitlogfunctionaliteit.</summary>

```javascript
document.querySelector(".logout-btn")?.addEventListener("click", logout);
```
</details>
  <details>
<summary>2. Haal de ID op uit de huidige URL-queryparameters.</summary>

```javascript
const currentURL = window.location.href;
const IdOphalen = new URL(currentURL);
const id = IdOphalen.searchParams.get("id");

```
</details>


 <details>
 <summary> 3. Voer drie databasequery's uit om post-, antwoord- en gebruikersgegevens op te halen.</summary>

 ```javascript
const posts: any[] | undefined = await runQuery("SELECT * FROM posts WHERE id = (?)", [id]);
const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers WHERE vraag_id = (?)", [id]);
const users: any[] | undefined = await runQuery("SELECT * FROM user");

 ```
 </details>

 <details> 
 <summary> 4. Maak HTML-elementen aan om de titel, vraag, antwoorden en tags weer te geven.</summary>

 ```javascript
  const data: HTMLElement | null = document.getElementById("data");
const div: HTMLElement | null = document.createElement("div");

// Create and append a paragraph element for the title
const titel: HTMLParagraphElement | null = document.createElement("p");
titel.id = "titelVraag";
titel.innerText = `${postDB.titel}`;
titel.style.color = "black";
div.appendChild(titel);

// Create and append a paragraph element for the question
const vraag: HTMLParagraphElement | null = document.createElement("p");
vraag.id = "vraag";
vraag.innerText = `${postDB.vraag}`;
vraag.style.color = "black";
div.appendChild(vraag);

// Check for 3 quotes and create text area elements for each match
const vraagText: string | null = vraag.innerText;
if (vraagText) {
    const codeCheck: RegExpMatchArray | null = vraagText.match(/'''([^']+?)'''/g);

    if (codeCheck) {
        let lastIndex: number = 0;

        codeCheck.forEach((match: string) => {
            const startIndex: number = vraagText.indexOf(match, lastIndex);
            const prefixText: string = vraagText.substring(lastIndex, startIndex);

            // Display text before the match
            const prefixElement: HTMLSpanElement = document.createElement("span");
            prefixElement.id = "vraagTop";
            prefixElement.style.color = "black";
            prefixElement.innerText = prefixText;
            div.appendChild(prefixElement);

            // Display the match inside a textarea
            const codeText: string = match.replace(/'''/g, "");
            const textareaElement: HTMLTextAreaElement = document.createElement("textarea");
            textareaElement.value = codeText;
            textareaElement.disabled = "true";
            div.appendChild(textareaElement);

            // Update lastIndex
            lastIndex = startIndex + match.length;
        });

        // Display the remaining text
        const textVraag: string = vraagText.substring(lastIndex);
        const element: HTMLSpanElement = document.createElement("span");
        element.id = "vraagBottom";
        element.style.color = "black";
        element.innerText = textVraag;
        div.appendChild(element);
    } else {
        // If there are no 3 quotes, display the text
        const vraagElement: HTMLSpanElement = document.createElement("span");
        vraagElement.innerText = vraagText;
        div.appendChild(vraagElement);
    }
}

// Create and append a paragraph element for tags
const tags: HTMLElement | null = document.createElement("p");
tags.innerText = `${postDB.tags}`;
tags.style.color = "black";

// Split the text and create new HTML tags for each tag
const tagsText: string | null = tags.innerText;
if (tagsText) {
    const tagArray: string[] = tagsText.split(","); // Split the string into an array

    // Create new HTML tags and append them to the div
    tagArray.forEach((tag) => {
        const tagElement: any = document.createElement("span");
        tagElement.id = "tags";
        tagElement.innerText = tag.trim(); // Remove whitespaces
        div.appendChild(tagElement);
    });
}

// Append the created div to the data element
data?.appendChild(div);

 ```
 </details>

 <details> 
 <summary>5. Voeg deze HTML-elementen toe aan de pagina.</summary>

 ```javascript
   // Append the created div to the data element
  data?.appendChild(div);

  // Add the div containing the elements to the document body
  document.body.appendChild(data); 
 ```
 </details>

### Functie: `getUserInfo`

<details>
<summary> Haal gebruikersgegevens op uit de database op basis van de gebruikers-ID.</summary>

```javascript
async function getUserInfo(userid: number): Promise<User | undefined> {
    console.log(userid);
    try {
        // Execute a database query to fetch user data
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);

        // Check if any data is returned
        if (data.length > 0) {
            // Create a User object with the retrieved data
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

        // Return undefined if no data is found
        return undefined;
    } catch (error) {
        // Log and handle any errors that may occur during the database query
        console.error(error);

        // Return undefined in case of an error
        return undefined;
    }
}

```
</details>


  <details>
  <summary>userid : ID van de gebruiker waarvan de gegevens moeten worden opgehaald.</summary>

  ```javascript
  /**
 * Haal gebruikersgegevens op uit de database op basis van de gebruikers-ID.
 * @param userid - ID van de gebruiker waarvan de gegevens moeten worden opgehaald.
 * @returns user object of type User | undefined
 */
async function getUserInfo(userid: number): Promise<User | undefined> {
    console.log(userid);
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


  ```
</details>

 <details>
 <summary>Een `Promise` van het `User` object of `undefined` als de gebruiker niet wordt gevonden.</summary>

 ```javascript
/**
 * Haal gebruikersgegevens op uit de database op basis van de gebruikers-ID.
 * @param userid - ID van de gebruiker waarvan de gegevens moeten worden opgehaald.
 * @returns Promise<User | undefined>
 */
async function getUserInfo(userid: number): Promise<User | undefined> {
    console.log(userid);
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

 ```
 </details>

- **Stappen**:
<details>
<summary>  1. Voer een databasequery uit om gebruikersgegevens op te halen op basis van de gebruikers-ID.</summary>

```javascript
async function getUserInfo(userid: number): Promise<User | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);

        // Voer de code uit om gebruikersgegevens op te halen

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

```
</details>
<details>
  <summary>2. Als gegevens worden gevonden, maak een nieuw `User` object aan en retourneer het.</summary>

  ```javascript
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

  ```
</details>
<details> 
 <summary>3. Als er geen gegevens zijn, retourneer `undefined`.</summary>

 ```javascript
  } else {
            return undefined; // Retourneer undefined als er geen gegevens zijn
 ```
 </details>
 <details>
 <summary> 4. Als er een fout optreedt, log deze in de console en retourneer `undefined`.</summary>

 ```javascript
    } catch (error) {
        console.error(error);
        return undefined;
    }
 ```
 </details>

### Functie: `logout`

- **Doel**: Verwijder de sessie van de gebruiker en stuur ze door naar de inlogpagina na bevestiging.

- **Stappen**:
 <details>
 <summary> 1. Toon een bevestigingsvenster voor uitloggen.</summary>

 ```javascript
 function logout(): void {
    // Toon een bevestigingsvenster voor uitloggen
    const uitloggen: any = confirm("Weet u zeker dat u wilt uitloggen?");

 ```
 </details>

 <details>
 <summary> 2. Als de gebruiker bevestigt, verwijder de sessie.</summary>

 ```javascript
 
    if (uitloggen === true) {
        // Verwijder de sessiegegevens
        session.remove("user");
 ```
 </details>

 <details>
 <summary> 3. Stuur de gebruiker door naar de inlogpagina.</summary>
 
 ```javascript
  // Stuur de gebruiker door naar de inlogpagina
        url.redirect("login.html");
    }
 ```
 </details>

### Uitvoering

<details>
<summary>- Roep de `setup` functie aan om de pagina-initialisatie te starten bij het laden van de pagina.</summary>

```javascript
// Roep de `setup` functie aan bij het laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
    setup();
});

```
</details>

Met deze code kan een webpagina worden geconfigureerd om gebruikersinformatie weer te geven, met ondersteuning voor uitloggen en weergave van vraaggerelateerde informatie.