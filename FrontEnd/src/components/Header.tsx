import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atom/todo";

function Header() {
  const [isAddEnabled, setIsAddEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useRecoilState(searchState);

  async function handleAdd() {
    const req = await axios.post("http://localhost:4000/api/todos", {
      title: title,
      description: description,
    });
    console.log(req);

    console.log("Added");
  }

  return (
    <>
      <div className="navbar">
        <div>
          <h1 className="heading">What Now</h1>
        </div>

        <div>
          <input
            className="search"
            type="search"
            name=""
            id=""
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
        <button
          onClick={() => {
            setIsAddEnabled((prev) => !prev);
          }}
          className="edit bg-green-600"
        >
          Add
        </button>
      </div>

      <div
        className={`flex flex-col gap-4 fixed items-center justify-center px-4 py-3 top-1/2 left-1/2 transform -translate-x-1/2 w-full h-full -translate-y-1/2 backdrop-blur-sm border ${
          isAddEnabled ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <input
            className="px-4 py-3 w-[90%] rounded-md bg-slate-200"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="px-4 py-3 w-[90%] rounded-md bg-slate-200"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={() => {
              handleAdd();
              setIsAddEnabled(false);
              setTitle("");
              setDescription("");
            }}
            className="edit bg-green-600"
          >
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
