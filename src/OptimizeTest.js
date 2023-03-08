import React, { useEffect, useState } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`updated! text: ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`update! : count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h2>Count</h2>
        <CountView count={count} />
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2>Text</h2>
        <TextView text={text} />
        <input onChange={e => setText(e.target.value)}></input>
      </div>
    </div>
  );
};
export default OptimizeTest;
