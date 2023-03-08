import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    }
    case "DELETE": {
      return state.filter(i => i.id !== action.targetId);
    }
    case "EDIT": {
      return state.map(i =>
        i.id === action.targetId ? { ...i, content: action.newContent } : i
      );
    }
    default:
      return state;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then(res => res.json());

    const initData = res.slice(0, 20).map(i => {
      return {
        author: i.email,
        content: i.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []); // 빈배열이므로 mount 시에만 실행됨

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        author,
        content,
        emotion,
        id: dataId.current,
      },
    });

    dataId.current += 1;
  }, []);

  const onDelete = useCallback(targetId => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(i => i.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = parseInt((goodCount / data.length) * 100);

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} /> {/*onCreate를 DiaryEditor에 넘겨줌*/}
      <div>일기 갯수 : {data.length}</div>
      <div>기분 좋은 일기 갯수 : {goodCount}</div>
      <div>기분 안좋은 일기 갯수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio} %</div>
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
      {/*diaryList라는 이름으로 DiaryList 컴포넌트에 prop으로 넘겨준다! */}
    </div>
  );
}

export default App;
