import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { extendObservable, observable,untracked } from 'mobx';

@observer
export default class MyMobx extends Component {

    num = observable({id: 1})

    constructor(props: any){
        super(props)
    }

    setNum() {
        this.num.id ++;
        this.num = this.num;
    }

    getNum(){
        return untracked(()=>this.num.id);
    }
    getNum1(){
        return this.getNum();
    }

    render() {
        return (
            <>
                <div >TestSimple{this.getNum1.bind(this)()}</div>
                <button onClick={this.setNum.bind(this)}>mobx</button>
            </>
        )
    }
}
