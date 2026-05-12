const input = document.getElementById("asd");
const button = document.getElementById("asd2");
const output = document.getElementById("asd3");

// This is your "database" of results
const messages = {
    1: "Sa oled alguspunkt – lihtne, aga oluline.",
    2: "Sa oled tasakaal ja koostöö.",
    3: "Sa oled loominguline ja natuke hull 😄",
    4: "Sa oled stabiilne ja usaldusväärne.",
    5: "Sa armastad vabadust ja seiklusi.",
    6: "Sa hoolid teistest rohkem kui iseendast.",
    7: "Sa oled mõtleja ja natuke müstiline.",
    8: "Sa oled ambitsioonikas ja võimukas.",
    9: "Sa oled vana hing ja tark.",
    727: "Elite ball knowledge, sa mängid osu!",
    "-1": "Sa mõtled väljaspool kasti, aga see pole alati halb asi.",
    69: "nice",
    68: ":närtsinud roos:",
    67: "KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS SEITSE KUUS",
    42: "Sa oled universumi vastus kõigile küsimustele! 🌌",
    10: "Sa oled nagu 10 – täiuslik ja täielik! 🎉"
};

button.addEventListener("click", () => {
    const number = Number(input.value);

    if (!number) {
        output.textContent = "Palun sisesta number!";
        return;
    }

    // default fallback if number not in list
    output.textContent = messages[number] || "Selle numbri kohta pole veel sõnumit 😅";
});