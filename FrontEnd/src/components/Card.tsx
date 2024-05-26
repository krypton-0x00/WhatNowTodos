import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { editIdState } from "../atom/todo";
import { editEnableState } from "../atom/todo";

interface cardProps {
  id: string;
  isCompleted: boolean;
  title: string;
  description: string;
}

function Card({ id, isCompleted, title, description }: cardProps) {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editEnable, setEditEnable] = useRecoilState(editEnableState);

  async function handleDelete(id: string) {
    const todoId = id;
    console.log(todoId);
    await axios.delete(`http://localhost:4000/api/todos/${todoId}`);
  }
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCheckedStatus = event.target.checked;
    setIsChecked(newCheckedStatus);

    try {
      const response = await axios.patch(`http://localhost:4000/api/todos/`, {
        id: id,
        title: title,
        description: description,
        isCompleted: newCheckedStatus,
      });
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };
  return (
    <>
      <div className={`card bg-white ${isCompleted ? "bg-green-600" : ""}`}>
        <div className="title">{title}</div>
        <div className="description">
          {description}
          etc
        </div>
        <div className="card-options">
          <label className="checkbox-container">
            Mark As Done
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="input-checkbox"
            />
          </label>
          <button onClick={() => handleDelete(id)} className="delete">
            Delete
          </button>
          <button
            onClick={() => {
              setEditId(id);
              setEditEnable(true);
            }}
            className="edit"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
