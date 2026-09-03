const journalText =
    document.getElementById("journalText");

const saveButton =
    document.getElementById("saveJournal");

const journalEntries =
    document.getElementById("journalEntries");


function getEntries() {

    return JSON.parse(
        localStorage.getItem("journalEntries")
    ) || [];

}


function saveEntries(entries) {

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

}


function displayEntries() {

    const entries = getEntries();

    journalEntries.innerHTML = "";

    if (entries.length === 0) {

        journalEntries.innerHTML = `
            <p class="empty-journal">
                No journal entries yet. 🌷
            </p>
        `;

        return;
    }


    entries.forEach(function (entry, index) {

        const entryDiv =
            document.createElement("div");

        entryDiv.className =
            "journal-entry";

        entryDiv.innerHTML = `
            <p>${entry.text}</p>

            <small>${entry.date}</small>

            <button
                class="delete-entry"
                data-index="${index}">
                Delete
            </button>
        `;

        journalEntries.appendChild(entryDiv);

    });


    const deleteButtons =
        document.querySelectorAll(".delete-entry");


    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(button.dataset.index);

                const entries =
                    getEntries();

                entries.splice(index, 1);

                saveEntries(entries);

                displayEntries();

            }
        );

    });

}


saveButton.addEventListener(
    "click",
    function () {

        const text =
            journalText.value.trim();

        if (text === "") {
            return;
        }


        const entries =
            getEntries();


        const newEntry = {

            text: text,

            date:
                new Date().toLocaleDateString()

        };


        entries.unshift(newEntry);

        saveEntries(entries);

        journalText.value = "";

        displayEntries();

    }
);


displayEntries();