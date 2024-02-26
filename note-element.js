export class NoteElement {
    static create(note) {
            const noteElem = document.createElement('li');

            // noteElem.innerText = note.text;
            noteElem.innerHTML = `${note.text} - ${note.date} - ${note.category} <button data-id="${note.id}">Modifier</button> - <button data-id="${note.id}">Supprimer</button>`;

            return noteElem;
    };
} 
