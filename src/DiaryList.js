import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onDelete, onEdit }) => {
  return (
    <div className="DiaryList">
      <h2>다이어리 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map(i => (
          <DiaryItem key={i.id} {...i} onDelete={onDelete} onEdit={onEdit}/>
        ))}
      </div>
    </div>
  );
};

// DiaryList의 기본 props는 []로 설정하기
// DiaryList.defaultProps = {
//   diaryList: [],
// };

export default DiaryList;
