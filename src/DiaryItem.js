import React, { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ ...i }) => {
  const { onDelete, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const [localContent, setLocalContent] = useState(i.content);
  const localContentInput = useRef();
  const handleDelete = () => {
    if (window.confirm(`${i.id}를 삭제하시겠습니까?`)) {
      onDelete(i.id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(i.content);
  };

  const handleChangeContent = e => {
    setLocalContent(e.target.value);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${i.id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(i.id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {i.author} | 오늘의 감정 : {i.emotion}
        </span>
        <br />
        <span className="date">
          {new Date(i.created_date).toLocaleString()}
        </span>
        <br />
      </div>
      {isEdit ? (
        <>
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={handleChangeContent}
          />
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <div className="content">{i.content}</div>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
