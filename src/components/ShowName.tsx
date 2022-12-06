import * as React from 'react';

export interface IShowNameProps {
}

export function ShowName(props: IShowNameProps) {
    const [name, setName] = React.useState('qs')
    return (
        <div>
            {name}
            <button onClick={()=>setName(name + '1')}>setname</button>
        </div>
    );
}
