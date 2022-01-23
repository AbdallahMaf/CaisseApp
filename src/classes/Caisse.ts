//import {Transaction} from './Transaction.js'
import { IObserver } from '../interfaces/IObserver.js';
import { ISubject } from '../interfaces/ISubject.js';
import { Transaction } from './Transaction.js';


 export class Caisse implements ISubject {
    private solde: number;
    private transaction: any[] = [];

    private observers: IObserver[] = [];

    constructor(_solde: number){
        this.solde = _solde;
    }
    subscribeObeserver(obs: IObserver): void {
        this.observers.push(obs)
    }
    unsubscribeObeserver(obs: IObserver): void {
       let idx = this.observers.indexOf(obs)
       if(idx !== -1){
           this.observers.splice(idx, 1)
       }
    }
    notifyObservers(): void {
        for(const element of this.observers){
            element.getNotification(this)
        }
    }
    
    public getSolde(){
        return this.solde
    }

    public getTransaction(){
        return this.transaction
    }

    public addTransaction(tr:Transaction){
        this.transaction.push(tr)
        if(tr.getType() === 'credit'){
            this.solde += tr.getMontant()
        }
        else{

        }
    }
}


// export class Caisse{
//     constructor(
//         private solde: number, 
//         private transactions: Transaction[]
//     ){}

//     getTransactions(){
//         return this.transactions
//     }

//     getSolde(){
//         return this.solde
//     }

//     addTransaction(transaction:Transaction){
//         this.transactions.push(transaction)
//         if (transaction.getType() ==='debit'){
//             this.solde -= transaction.getMontant() 
//         }
//         else{
//             this.solde += transaction.getMontant()
//         }
//     }
// }
