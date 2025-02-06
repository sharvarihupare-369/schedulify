import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = ({ onCreateTaskClick }: any) => {
  const [inputVal, setInputVal] = useState<string>("");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { username } = authContext;
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <>
      <nav
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        className="p-4 text-white flex justify-between items-center bg-gray-800"
      >
        <div className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="border border-gray-400 px-4 py-2 pr-10 rounded-md"
            placeholder="Search Tasks..."
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center cursor-pointer bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={onCreateTaskClick}
          >
            Create Task
          </button>
          <p>{capitalize(username || "")}</p>
          <img
            width={35}
            className="rounded-full border border-gray-200 cursor-pointer"
            src="https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?t=st=1738768635~exp=1738772235~hmac=d299c5ffb317cf6ff31d279797cc19c933df272d8fafb524a37e7b414c3b7d5c&w=740"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
