import React, { useEffect, useState } from "react";
import { BiBook } from "react-icons/bi";
import { PiMoonBold } from "react-icons/pi";

const NavBar = () => {
  const [isOn, setIsOn] = useState(localStorage.getItem("mode"));
  const [fontFamilyName, setFontFamilyName] = useState("");

  useEffect(() => {
    // store the display mode to local storage
    localStorage.setItem("mode", isOn);
    let body = document.querySelector("html");
    isOn === "dark" ? body.classList.add("dark") : (body.className = "");

    // store the font name to local storage
    const storedValue = localStorage.getItem("selectedOption");
    if (storedValue) {
      setFontFamilyName(storedValue);
    }

    // get the body tag and set an attribute of style and value to be font-family from localStorage
    document
      .querySelector("body")
      .setAttribute("style", `font-family: ${fontFamilyName}`);
  }, [isOn, fontFamilyName]);

  function handleDisplayMode(e) {
    if (e.target.checked) {
      setIsOn("dark");
    } else {
      setIsOn("light");
    }
  }

  function handleFontNameChange(event) {
    const value = event.target.value;
    setFontFamilyName(value);
    localStorage.setItem("selectedOption", value);
  }

  return (
    <div className='flex justify-between items-center'>
      <BiBook size={48} className='text-gray7 stroke-[0.01] ' />

      <div className='flex items-center gap-5'>
        <div>
          <select
            id='exampleSelect'
            value={fontFamilyName}
            onChange={handleFontNameChange}
            className='flex items-center text-gray2  font-bold bg-transparent outline-none dark:text-gray4'
          >
            <option className='dark:text-gray5' value='sans'>
              Serif San
            </option>
            <option className='dark:text-gray5' value='serif'>
              Serif
            </option>
            <option className='dark:text-gray5' value='mono'>
              Mono
            </option>
          </select>
        </div>

        <div className='h-8 border-r-2 border-gray9'></div>

        {/* Set toggle button */}
        <div className='flex items-center gap-3'>
          <button
            className={`relative inline-flex items-center h-6 px-1 rounded-full w-12 transition-colors duration-200 ease-in-out 
                ${
                  isOn === "dark"
                    ? "bg-purple cursor-pointer"
                    : "bg-gray7  cursor-pointer"
                }`}
          >
            <label htmlFor='check'>
              <span
                className={`block cursor-pointer w-5 h-5 transform px-1 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  isOn === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              >
                <input
                  type='checkbox'
                  className='hidden cursor-pointer'
                  id='check'
                  onChange={e => handleDisplayMode(e)}
                />
              </span>
            </label>
          </button>

          <PiMoonBold size={24} className='dark:text-purple' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
