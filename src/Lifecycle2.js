import { useEffect, useState } from "react";

const UnMountTest = () => {
  useEffect(() => {
    console.log("mount !");
    return () => {
      // unmount 즉, 마운트 종료 시에 실행됨.
      console.log('unmount!')
    }
  }, []);

  return <div>UnMount Testing Component</div>
};

const Lifecycle2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnMountTest/>}
    </div>
  );
};
export default Lifecycle2;
