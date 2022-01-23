import {IObserver} from "../interfaces/IObserver"
import {Caisse} from "./Caisse"

export class SoldeView implements IObserver{

    private htmlSoldeView: HTMLHeadingElement

    constructor(){
        this.htmlSoldeView = document.querySelector('#soldeview')
    }

    getNotification(caisse: Caisse): void {
        console.log(`SoldeView notifie par le nouveau ${caisse.getSolde()}`);

        this.htmlSoldeView.innerText = caisse.getSolde().toString()
    }
}