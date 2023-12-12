# Welkom

Welkom op jouw Portfolio-website! Hier kan je met de wereld delen wat jij allemaal kan en wat je hebt gedaan.

We zijn met een Code Exchange website bezig.
Dit project houdt in dat Roan en Erdem een website aan het maken zijn die ervoor zorgt dat HBO ICT studenten online code kunnen delen dankzij een forum.

<details>
  <summary>laatZien()</summary>

  ```javascript
  async function laatZien(): Promise<void> {
      // De gegevens uit de database ophalen
      const posts: any[] | undefined = await runQuery("SELECT * FROM posts");
      const antwoorden: any[] | undefined = await runQuery("SELECT * FROM answers");
      const users: any[] | undefined = await runQuery("SELECT * FROM user");

      // De gegevens weergeven in de div
      if (posts && posts.length > 0) {
          posts.forEach((post: any) => {
              // Rename variable to avoid conflict
              if (antwoorden && antwoorden.length > 0) {
                  antwoorden.forEach((answer: any) => {
                      // Check if the answer is associated with the current question
                      if (answer.vraag_id === post.id) {
                          const div: HTMLElement | null = document.createElement("div");
                          div.className = "allepost";
                          // Een knop aanmaken om de vraag te bekijken
                          const bekijkVraagKnop: HTMLElement | null = document.createElement("button");
                          bekijkVraagKnop.className = "postBekijk";

                          // Een paragraaf om de naam van het uitje weer te geven
                          const titel: HTMLElement | null = document.createElement("p");
                          titel.id = "postTitel";
                          titel.textContent = `titel: ${post.titel}`;
                          titel.style.color = "black";
                          // De tekst voor de knop om aan een uitje deel te nemen
                          bekijkVraagKnop.textContent = "Bekijk de vraag";

                          // Een paragraaf om de prijs van het uitje weer te geven
                          const vraag: HTMLElement | null = document.createElement("p");
                          vraag.id = "postVraag";
                          vraag.textContent = `Vraag: ${post.vraag}`;
                          vraag.style.marginLeft = "10px";
                          vraag.style.color = "black";

                          // Additional code based on answers
                          const antwoorden: HTMLElement | null = document.createElement("p");
                          antwoorden.id = "answerText";
                          antwoorden.textContent = `Answer: ${answer.antwoord}`;
                          antwoorden.style.marginLeft = "10px";
                          antwoorden.style.color = "black";

                          // Fetch user information based on user_id
                          const user: any = users.find((u) => u.id === post.user_id);
                          const userName: any = user ? user.username : "Unknown";

                          // Een paragraaf om de prijs van het uitje weer te geven
                          const naam: HTMLElement | null = document.createElement("p");
                          naam.id = "postNaam";
                          naam.textContent = `Naam van vraagsteller: ${userName}`;
                          naam.style.marginLeft = "10px";
                          naam.style.color = "black";

                          // Een paragraaf om de prijs van het uitje weer te geven
                          const datum: HTMLElement | null = document.createElement("p");
                          datum.id = "postTijd";
                          datum.textContent = `datum van vraag: ${post.tijd}`;
                          datum.style.marginLeft = "10px";
                          datum.style.color = "black";

                          // De knoppen en paragrafen aan de div toevoegen
                          div.appendChild(titel);
                          div.appendChild(vraag);
                          div.appendChild(naam);
                          div.appendChild(datum);
                          div.appendChild(antwoorden);
                          div.appendChild(bekijkVraagKnop);
                          data?.appendChild(div);
                      }
                  });
              } else {
                  // Een bericht weergeven als er geen gegevens zijn
                  data.textContent = "Geen gegevens gevonden";
              }
          });
      }
  }


