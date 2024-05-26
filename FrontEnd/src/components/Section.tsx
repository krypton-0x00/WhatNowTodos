import Card from "./Card";
import { useRecoilState } from "recoil";
import { data } from "../atom/todo.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { editEnableState } from "../atom/todo.js";
import { editIdState } from "../atom/todo.js";
import { searchState } from "../atom/todo.js";

function Section() {
  const [todoData, setTodoData] = useRecoilState(data);
  const [isEditEnable, setIsEditEnable] = useRecoilState(editEnableState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useRecoilState(searchState);

  useEffect(() => {
    axios.get("http://localhost:4000/api/todos/").then((res) => {
      setTodoData(res.data);
    });
  }, [todoData]);

  return (
    <div className="pt-[20%] md:pt-[5%] flex flex-col flex-wrap items-center md:grid md:grid-cols-4">
      {todoData
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.title.toLowerCase().includes(search.toLowerCase());
        })
        .map((item) => (
          <Card
            key={item._id}
            id={item._id}
            isCompleted={item.isCompleted}
            title={item.title}
            description={item.description}
          />
        ))}

      <div>
        <div
          className={`flex flex-col gap-4 fixed items-center justify-center px-4 py-3 top-1/2 left-1/2 transform -translate-x-1/2 w-full h-full -translate-y-1/2 backdrop-blur-sm border  ${
            isEditEnable ? "flex flex-col" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-bold text-slate-800">Edit Todo</h1>
          <input
            type="text "
            className="px-4 py-3 w-[90%] rounded-md bg-slate-200"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            className="px-4 py-3 w-[90%] rounded-md bg-slate-200"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button className="delete" onClick={() => setIsEditEnable(false)}>
            Cancel
          </button>
          <button
            className="edit bg-green-600"
            onClick={() => {
              setIsEditEnable(false);
              axios.patch(`http://localhost:4000/api/todos/`, {
                id: editId,
                title: title,
                description: description,
                isCompleted: false,
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
