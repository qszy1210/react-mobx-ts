import * as React from 'react';
import { useEffect, useState } from 'react';

export const Delay =  () => {

    const [val, setVal] = useState(0);
    const [val2, setVal2] = useState(0);

    useEffect(() => {
        let interval = 2000;
        if (val % 2) {
            interval = 1000;
        }

        setTimeout(() => {
            setVal2(val)
        }, interval);

    }, [val])

    return <div>
        <button onClick={() => setVal(val => val + 1)}
            style={{ display: "inline-block", width: "100px" }}
        >{val}</button>
        <span>{val2}</span>
    </div>
}

export const Delay2 =  () => {

    const [val, setVal] = useState(0);
    const [val2, setVal2] = useState(0);

    var p: any;
    useEffect(() => {
        let interval = 2000;
        if (val % 2) {
            interval = 1000;
        }

        p = setTimeout(() => {
            setVal2(val)
        }, interval);

        return ()=>{
            clearTimeout(p);
        }

    }, [val])

    return <div>
        <button onClick={() => setVal(val => val + 1)}
            style={{ display: "inline-block", width: "100px" }}
        >{val}</button>
        <span>{val2}</span>
    </div>
}