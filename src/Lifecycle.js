import { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  useEffect(()=> {
    console.log('Mounting!') // Mounting : 컴포넌트의 탄생
  }, []) // 뎁스에 빈 배열을 넣어주면 처음 mounting 시에만 실행된다.

  useEffect(()=> {
    console.log(`text is update: ${text}`)
  }, [text])

  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert('count값이 5를 넘었습니다! 1로 초기화합니다.');
      setCount(1);
    }
  }, [count]); // 두번쨰 인자에 특정 state 값을 작성해주면 해당 state값의 변화만 감지

  useEffect(() =>{
    console.log('update!')
  }) // 두번째 인자인 dependency array를 작성하지 않으면, 모든 state의 변화를 감지

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={e => setText(e.target.value)}></input>
      </div>
    </div>
  );
};

export default Lifecycle;
