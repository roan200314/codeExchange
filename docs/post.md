### Functie: `setup`

- **Doel**: Deze functie initialiseert de pagina door event listeners toe te voegen, gegevens op te halen en weer te geven in HTML-elementen.

- **Stappen**:
  1. Voeg een event listener toe aan het element met de klasse "logout-btn" voor uitlogfunctionaliteit.
  2. Haal de ID op uit de huidige URL-queryparameters.
  3. Voer drie databasequery's uit om post-, antwoord- en gebruikersgegevens op te halen.
  4. Maak HTML-elementen aan om de titel, vraag, antwoorden en tags weer te geven.
  5. Voeg deze HTML-elementen toe aan de pagina.

### Functie: `getUserInfo`

- **Doel**: Haal gebruikersgegevens op uit de database op basis van de gebruikers-ID.

- **Parameters**:
  - `userid`: ID van de gebruiker waarvan de gegevens moeten worden opgehaald.

- **Retourneert**: Een `Promise` van het `User` object of `undefined` als de gebruiker niet wordt gevonden.

- **Stappen**:
  1. Voer een databasequery uit om gebruikersgegevens op te halen op basis van de gebruikers-ID.
  2. Als gegevens worden gevonden, maak een nieuw `User` object aan en retourneer het.
  3. Als er geen gegevens zijn, retourneer `undefined`.
  4. Als er een fout optreedt, log deze in de console en retourneer `undefined`.

### Functie: `logout`

- **Doel**: Verwijder de sessie van de gebruiker en stuur ze door naar de inlogpagina na bevestiging.

- **Stappen**:
  1. Toon een bevestigingsvenster voor uitloggen.
  2. Als de gebruiker bevestigt, verwijder de sessie.
  3. Stuur de gebruiker door naar de inlogpagina.

### Uitvoering

- Roep de `setup` functie aan om de pagina-initialisatie te starten bij het laden van de pagina.

Met deze code kan een webpagina worden geconfigureerd om gebruikersinformatie weer te geven, met ondersteuning voor uitloggen en weergave van vraaggerelateerde informatie.