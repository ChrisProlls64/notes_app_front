import { Note } from "./note.js";
import { NoteManager } from "./note-manager.js";
import { NoteElement } from "./note-element.js";

// le modèle
let notes = [];
const minChars = 6;

const inputElem = document.getElementById("my-input");
const listElem = document.getElementById("list");
const categoryElem = document.getElementById("categories");
const categoryFilter = document.getElementById("categoryFilter");
const errorMsg = document.getElementById("error-msg");
const form = document.getElementsByTagName("form")[0];

function updateCounter() {
  document.getElementById("count").innerText = notes.length;
}

function addNoteToModel() {
  // ajouter la nouvelle note dans
  const newNote = new Note(inputElem.value);
  notes.push(newNote);
  newNote.classList = "readonly";
}

function clickHandler(event) {
  event.target.classList.toggle("border");
}

function addNoteToView() {
  // création de l'element d'affichage
  let newItem = document.createElement("li");
  newItem.className = "border";
  const addedNote = notes[notes.length - 1];

  // ajouter dans l'arbre / DOM
  // on l'ajoute comme enfant de la liste
  listElem.appendChild(newItem);

  newItem.addEventListener("click", clickHandler);
}

function addNotes() {
  addNoteToModel();
  addNoteToView();
}

function resetInput() {
  // reset du champs de saisie
  inputElem.value = "";
}

function isValid() {
  // vérifier validité de la saisie
  // au moins quatre caractères
  let valid = inputElem.value.length >= minChars;
  return valid;
}

function showError() {
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.style.display = "none";
}

inputElem.addEventListener("change", function (event) {
  if (isValid()) {
    hideError();
  } else {
    showError();
  }
});

// gérer la soumission du formulaire.
form.addEventListener("submit", async function (event) {
  // empêcher le rechargement de la page(comportement par défaut d'un form)
  event.preventDefault();
  if (isValid()) {
    //instanciation d'une nouvelle note
    const newNote = new Note(
      null,
      inputElem.value,
      categoryElem.value,
      new Date()
    );
    await NoteManager.create(newNote);
    await refreshNoteList();
    // addNotes();
    updateCounter();
    resetInput();
  }
});

listElem.addEventListener("click", (event) => {
  console.log("event target : ", event.target.getAttribute("data-id"));
  // on convertit en nombre la valeur de l'attribut  data-id de l'élément cliqué
  const id = +event.target.getAttribute("data-id");
  //si j'ai bien cliqué sur un élément qui est bien associé à un id de note
  if (!isNaN(id)) {
    NoteManager.remove(id);
  }
});

document.querySelector("#error-msg span").innerText = minChars;

async function refreshNoteList() {
  notes = await NoteManager.list();
  // let noteElements = notes.forEach(note => listElem.appendChild(NoteElement.create(note)));
  // aussi ecrit comme suit :
  if (categoryFilter.value == '') {
    let noteElements = notes.map(note => NoteElement.create(note));
    listElem.innerHTML = "";
    noteElements.forEach(item => listElem.appendChild(item));
    document.getElementById("count").innerText = notes.length;
  } 
  else {
    let filteredElements = notes.filter(note => note.category == categoryFilter.value);
    let mappedFilteredElements = filteredElements.map(note =>
      NoteElement.create(note)
      );
      listElem.innerHTML = "";
      mappedFilteredElements.forEach(item => listElem.appendChild(item));
    }
    // listElem.innerHTML = "";
    // noteElements.forEach((item) => listElem.appendChild(item));
  };
  
  refreshNoteList();
  categoryFilter.addEventListener("change", async function (event) {
    refreshNoteList();
    // document.getElementById("count").innerText = .length;
});

//original :
// async function refreshNoteList() {
//   notes = await NoteManager.list();
//   // let noteElements = notes.forEach(note => listElem.appendChild(NoteElement.create(note)));
//   // aussi ecrit comme suit :
//   let noteElements = notes.map((note) => NoteElement.create(note));
//   listElem.innerHTML = "";

//   noteElements.forEach((item) => listElem.appendChild(item));

//   document.getElementById("count").innerText = notes.length;
// }
console.log(categoryFilter.value);


// async function refreshNoteList() {
//   notes = await NoteManager.list();
//   // let noteElements = notes.forEach(note => listElem.appendChild(NoteElement.create(note)));
//   // aussi ecrit comme suit :
//   let noteElements = notes.map((note) => NoteElement.create(note));
//   listElem.innerHTML = "";

//   categoryFilter.addEventListener("change", async function(event) {
//     filteredResults = notes.filter(([Note.category]) === categoryFilter.value)
//     notes = await NoteManager.list();
//     // categoryFilter.addEventListener("change", console.log(categoryFilter.value));
//   });

//   document.getElementById("count").innerText = notes.length;
// }
