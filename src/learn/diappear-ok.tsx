import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  // if (showHint) {
  //   return (
  //     <div>
  //       <p><i>Hint: Your favorite city?</i></p>
  //       <Form />
  //       <button onClick={() => {
  //         setShowHint(false);
  //       }}>Hide hint</button>
  //     </div>
  //   );
  // }
  return (
    <div>
      <>{showHint?<Hint/>:null}</>
      <Form />
      <button onClick={() => {
        setShowHint(show=>!show);
      }}>{showHint?"Hide":"Show"} hint</button>
    </div>
  );
}
function Hint() {
  return (
    <p><i>Hint: Your favorite city?</i></p>
  )
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
