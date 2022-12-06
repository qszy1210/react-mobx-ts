import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Hooks extends Component<any, any> {
    render() {
        return <div>here you are:
            <button onClick={this.props.setCount}>add</button>
            {this.props.count}</div>
    }
}

export default Hooks