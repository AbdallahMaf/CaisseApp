export class Transaction {
        private type: string
        private montant: number
        private person: string
        private motif: string

       constructor(
           _type: string,
           _montant: number,
           _person: string,
           _motif: string
       ){
           this.type = _type
           this.montant = _montant
           this.person = _person
           this.motif = _motif
       }

       getType(){
           return this.type
       }

       getMontant(){
           return this.montant
       }

       getPerson(){
           return this.person
       }

       getMotif(){
           return this.motif
       }

       TransactionText(){
         return `${this.montant} ont ete ${(this.type === 'credit')? "deposes" : "retires"} par ${this.person} suite a : ${this.motif}`
     }
            
}



// export class Transaction {
//     constructor(
//         private type: string,
//         private montant: number,
//         private person: string,
//         private motif: string
//     ) {}

//     text(){
//         return `${this.montant} ont ete ${this.type === 'credit' ? "deposes" : "retires"} par ${this.person} suite a : ${this.motif}`
//     }

//     getMontant(){
//         return this.montant;
//     }

//     getType(){
//         return this.type;
//     }
// }