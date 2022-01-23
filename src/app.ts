import { Caisse } from "./classes/Caisse";
import { SoldeView } from "./classes/SoldeView";
import { Transaction } from "./classes/Transaction";

let caisse = new Caisse(10000)

let soldeView = new SoldeView();
caisse.subscribeObeserver(soldeView)

const form = document.querySelector('.transaction')! as HTMLFormElement

form.addEventListener("submit", (e: Event) => {
    e.preventDefault()
    const type = document.querySelector("#type") as HTMLFormElement;
    const montant = document.querySelector("#montant") as HTMLFormElement;
    const person = document.querySelector("#person") as HTMLFormElement;
    const motif = document.querySelector("#motif") as HTMLFormElement;
    const uneTransaction = new Transaction(
        type.value,
        montant.valueAsNumber,
        person.value,
        motif.value
    )

    caisse.addTransaction(uneTransaction)
})

// const form = document.querySelector(".transaction") as HTMLFormElement;

// let maCaisse = new Caisse(1000, )

// const type = document.querySelector("#type") as HTMLFormElement;
// const montant = document.querySelector("#montant") as HTMLFormElement;
// const person = document.querySelector("#person") as HTMLFormElement;
// const motif = document.querySelector("#motif") as HTMLFormElement;

// const ol = document.querySelector("ol")!;

// form.addEventListener("submit" , (e: Event) => {
//     e.preventDefault();

//     let maTransaction = new Transaction(
//         type.value,
//         montant.valueAsNumber,
//         person.value,
//         motif.value
//         )

//         maCaisse.addTransaction(maTransaction);
       
//         render(maTransaction, ol)
//     });

//     const render = (tr: Transaction, container: HTMLUListElement):void => {
//         let li = document.createElement("li")
//         let h4 = document.createElement("h4")
//         let p = document.createElement("p")
//         h4.innerText = tr.getType()==='debit' ? "Debit" : "Credit"
//         h4.className = tr.getType()
//         li.className = tr.getType();
//         p.innerText = tr.TransactionText()
//         li.append(h4)
//         li.append(p)
//         container.append(li)

//     }
