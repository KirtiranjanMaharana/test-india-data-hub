import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Sidebar = ({ categories, loading }) => {
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [selectedContinent, setSelectedContinent] = useState("");

  useEffect(() => {
    if (categories) {
      const firstContinent = Object.keys(categories)[0];
      setSelectedContinent(firstContinent);
    }
  }, [categories]);

  const toggleSubmenu = (category) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  return (
    <div className="overflow-y-auto p-4 pt-6 border border-[#E2E4E8] w-[300px] transition-width duration-300 ease-in-out relative">
      {/* Dropdown for selecting continent */}
      <div className="mb-4">
        <label
          htmlFor="continent-select"
          className="block text-[#3A4662] font-medium mb-2"
        >
          Select Continent
        </label>
        <select
          id="continent-select"
          className="w-full border border-[#E2E4E8] rounded-md p-2"
          value={selectedContinent}
          onChange={handleContinentChange}
        >
          <option value="" disabled>
            -- Select Continent --
          </option>
          {categories &&
            Object.keys(categories).map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
        </select>
      </div>

      {/* Homepage List */}
      <ul className="rounded-md mt-3 relative bg-gray-100 p-2">
        <li className="text-[#3A4662] font-satoshi mb-3 bg-[#fff] font-medium min-h-[60px] text-[16px] leading-[25.6px] flex items-center gap-x-4 cursor-pointer p-2 mt-1 rounded-md">
          <span className="flex-1">Home Page</span>
        </li>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Render categories for the selected continent */}
            {selectedContinent &&
              Object.entries(categories[selectedContinent] || {}).map(
                ([category, subcategories], index) => (
                  <React.Fragment key={index}>
                    <li
                      onClick={() => toggleSubmenu(category)}
                      className={`${
                        submenuOpen[category] ? "bg-[#a6a4ff] text-[#fff]" : ""
                      } text-[#3A4662] font-satoshi bg-[#e5e0fe] font-medium min-h-[60px] text-[16px] leading-[25.6px] flex items-center gap-x-4 cursor-pointer p-2 mt-1 rounded-md hover:bg-[#a6a4ff] hover:text-[#fff]`}
                    >
                      <span className="flex-1">{category}</span>
                      <span className="text-xl">
                        {submenuOpen[category] ? "▲" : "▼"}
                      </span>
                    </li>
                    {submenuOpen[category] && (
                      <ul className="ml-6 mt-2">
                        {Object.keys(subcategories).map(
                          (subcategory, subIndex) => (
                            <li
                              key={subIndex}
                              className="text-[#3A4662] rounded-md font-satoshi text-[14px] pl-4 hover:bg-[#a6a4ff] hover:text-[#fff] flex items-center gap-x-2 cursor-pointer p-2"
                            >
                              {subcategory}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </React.Fragment>
                )
              )}
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
