import { action, makeAutoObservable, observable } from 'mobx';

class Store {
    constructor() {
        makeAutoObservable(this)
    }
    count = 1;

    setCount = () => {
        this.count++;
    }
}
export const store = new Store();