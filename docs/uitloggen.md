function logout(): void {
    // Verwijder de sessies
    const uitloggen: any = confirm("Weet u zeker dat u wilt uitloggen?");
    if (uitloggen === true) {
    session.remove("user");

    // Stuur de gebruiker door naar de login pagina
    url.redirect("login.html");
    }
}

bij deze functie heb ik een confirm toegevoegd waardoor als ok is aangelikt de gebruiker wordt uigechecked en anders blijft die ingelogd