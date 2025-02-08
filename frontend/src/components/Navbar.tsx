import { useContext, useEffect, useRef, useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { logoutUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const Navbar = ({
  onCreateTaskClick,
  handleSearch,

}: any) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { username } = authContext;
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      handleSearch(inputVal);
    }, 1000);
    return () => {
      clearTimeout(debounceId);
    };
  }, [inputVal, handleSearch]);
  const handleLogout = async () => {
    const response = await logoutUser(token);
    if (response.success) {
      toast.success(response.message);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
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
          {window.innerWidth < 500 ? (
            <CiSquarePlus
              style={{ cursor: "pointer" }}
              onClick={onCreateTaskClick}
              size={40}
            />
          ) : (
            <button
              className="flex items-center cursor-pointer bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={onCreateTaskClick}
            >
              Create Task
            </button>
          )}
          <img
            width={35}
            className="rounded-full border border-gray-200 cursor-pointer"
            src="https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?t=st=1738768635~exp=1738772235~hmac=d299c5ffb317cf6ff31d279797cc19c933df272d8fafb524a37e7b414c3b7d5c&w=740"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-3 top-11 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 transform translate-y-2 opacity-100">
              <div className="p-3">
                <p className="text-gray-800 font-semibold">
                  Hi {capitalize(username || "")}
                </p>
              </div>
              <hr />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Navbar;