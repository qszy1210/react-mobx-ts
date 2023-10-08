import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { extendObservable, observable } from 'mobx';

@observer
export default class TestSimple extends Component {

    num = {id: 1}

    constructor(props: any){
        super(props)
        extendObservable(this, {
            num: this.num
        })
    }

    setNum() {
        this.num.id ++;
        this.num = this.num;
    }
    render() {
        return (
            <>
                <div >TestSimple{this.num.id}</div>
                <button onClick={this.setNum.bind(this)}>click</button>
            </>
        )
    }
}
