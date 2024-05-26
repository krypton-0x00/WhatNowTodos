import { atom } from "recoil";

// Define the interface for each object in the array
interface ObjType {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

// Define the Recoil atom with the correct type
export const data = atom<ObjType[]>({
  key: "data",
  default: [],
});

// Define the Recoil atom for edit enable state
export const editEnableState = atom<boolean>({
  key: "editEnableState",
  default: false,
});

export const editIdState = atom<string>({
  key: "editIdState",
  default: "",
});
export const searchState = atom<string>({
  key: "searchState",
  default: "",
});
// // Usage
// const [todoData, setTodoData] = useRecoilState(data);
