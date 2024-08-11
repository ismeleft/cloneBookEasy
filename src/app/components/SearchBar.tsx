"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import zhTW from "date-fns/locale/zh-TW";

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const icons = {
  search: faSearch,
  calendar: faCalendarAlt,
  user: faUser,
};

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState("1 位成人 · 0 位小孩 · 1 間房");
  const [dateRangeText, setDateRangeText] = useState("");

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    if (startDate && endDate) {
      setSelectionRange({
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      });
      setDateRangeText(
        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 border border-gray-300 absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-screen-lg">
      <div className="flex-1 flex items-center border border-gray-300 rounded-md">
        <FontAwesomeIcon
          icon={icons.search}
          className="text-gray-400 w-5 h-4 ml-4 mr-2"
        />
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 rounded-md"
          placeholder="你要去哪裡？"
        />
      </div>

      <div className="flex-1 min-w-[200px] relative">
        <div className="flex items-center border border-gray-300 rounded-md">
          <FontAwesomeIcon
            icon={icons.calendar}
            className="text-gray-400 w-4 h-4 ml-4 mr-2"
            onClick={() => setIsOpen(!isOpen)}
          />
          <input
            type="text"
            value={dateRangeText}
            onClick={() => setIsOpen(!isOpen)}
            readOnly
            className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 rounded-md"
            placeholder="選擇日期區間"
          />
        </div>
        {isOpen && (
          <div className="absolute z-10">
            <DateRange
              editableDateInputs={true}
              ranges={[selectionRange]}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              locale={zhTW}
            />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-[200px] flex items-center border border-gray-300 rounded-md">
        <FontAwesomeIcon
          icon={icons.user}
          className="text-gray-400 w-4 h-4 ml-4 mr-2"
        />
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 appearance-none rounded-md"
        >
          <option>1 位成人 · 0 位小孩 · 1 間房</option>
          <option>2 位成人 · 0 位小孩 · 1 間房</option>
          <option>2 位成人 · 1 位小孩 · 1 間房</option>
          <option>3 位成人 · 0 位小孩 · 1 間房</option>
        </select>
      </div>

      <button
        className="bg-primary hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-300 min-w-[120px]"
        onClick={() => console.log({ destination, selectionRange, guests })}
      >
        搜尋
      </button>
    </div>
  );
};

export default SearchBar;
