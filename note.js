
export class Note {
    constructor(id, text, category, date) {
        this.id = id;
        this.text = text;
        this.category = category;
        this.date = new Date().toLocaleDateString();
    }


    fullDisplay() {
        // const formattedDate = this.date.toLocaleDateString();
        const display = `Text: ${this.text} - 
        Author: ${this.author} - 
        Date: ${this.date}`;
        return display;
    }

}

// const n1 = new Note('Acheter du lait', 'Chris');
// const n2 = new Note('Rdv dentiste', 'Chris');

// console.log(n1.fullDisplay());
// console.log(n2.fullDisplay());


