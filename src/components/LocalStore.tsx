import { observable } from 'mobx';
import { Observer, useLocalObservable } from 'mobx-react';
import { useState } from 'react';
import { store } from '../store';
import store2  from '../store2';


export function LocalStore() {
    const localStore = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        }
    }))
    // const localStore2 = useLocalObservable(()=>(store))
    // const localStore2 = store
    // const [localStore2] = useState(()=>observable(store))
    // const [localStore2] = useState(()=>observable({
    //     count: 3,
    //     setCount() {
    //         this.count++
    //     }
    // }))

    const [timer] = useState(() =>
        observable({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        })
    )

    return <Observer>{
        () => <div>
            {localStore.secondsPassed}
            <button onClick={localStore.increaseTimer}>click to add</button>

            {/* <button onClick={localStore2.setCount}>click to add {localStore2.count}</button> */}

            <button onClick={timer.increaseTimer}>Seconds passed: {timer.secondsPassed}</button>
        </div>}
    </Observer>
}
