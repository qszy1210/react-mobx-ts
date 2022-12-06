import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from 'react';
class Store {
    @observable
    count = 1
}
@observer
export class RunIAction extends React.Component{

    constructor(prop: any) {
        super(prop)
        this.s = new Store();
        // eslint-disable
        // window["s"] = this.s;
    }

    s: any
    // @observable
    name = observable({a: "sss"})

    doClick() {
        runInAction(()=>{
            runInAction(()=>{
                // this.s.count++;
                debugger
                this.name.a = this.name.a + "22";
            })

            // setTimeout(()=>{
                runInAction(()=>{
                    // this.s.count++;
                    this.name.a = this.name.a + "11";
                    debugger
                })
            // })

            debugger
        })
        // this.s.count++;
        // this.name.a = this.name.a + "s";
    }

    render() {
        return <div>
            <button onClick={this.doClick.bind(this)}>click</button>
            <div>{this.s.count}</div>
            <div>{this.name.a}</div>
        </div>
    }
}