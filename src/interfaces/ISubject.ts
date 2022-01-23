import { IObserver } from "./IObserver";

export interface ISubject{
    subscribeObeserver(obs:IObserver) : void
    unsubscribeObeserver(obs:IObserver) : void
    notifyObservers() : void
}