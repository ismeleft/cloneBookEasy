"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import zhTW from "date-fns/locale/zh-TW";

import SearchItem from "./SearchItem";

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const icons = {
  calendar: faCalendarAlt,
};

const HotelList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRangeText, setDateRangeText] = useState("");
  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
    <>
      <div className="flex justify-center mt-7">
        <div className="w-full max-w-5xl gap-5 flex">
          <div className="sticky h-max rounded-s-sm top-2 ">
            <div className="bg-blue-400 p-3 text-lg font-normal">搜尋</div>
            <div className=" w-64 mt-2 flex flex-col bg-blue-300 p-2 gap-1">
              <label>目的地/住宿名稱：</label>
              <input
                className="rounded-sm px-1 py-2"
                type="text"
                placeholder="要去哪裡？"
              />
            </div>
            <div className=" w-64 mt-2 flex flex-col bg-blue-300 p-2 gap-1">
              <label>入住/退房日期：</label>
              <div
                className="flex-1 min-w-[200px] relative"
                ref={datePickerRef}
              >
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
            </div>
            <div className=" w-64 mt-2 flex flex-col bg-blue-300 p-2 gap-1">
              <label>每晚最低價格：</label>
              <input className="rounded-sm px-1 py-2" type="text" />
            </div>
            <div className=" w-64 mt-2 flex flex-col bg-blue-300 p-2 gap-1">
              <label>每晚最高價格：</label>
              <input className="rounded-sm px-1 py-2" type="text" />
            </div>
            <div className=" w-64 mt-2 flex flex-col bg-blue-300 p-2 gap-1">
              <span>3位成人．2位小孩．1間房間</span>
            </div>
            <div className="mt-2 bg-blue-700 p-3 text-lg font-normal text-center text-white">
              搜尋
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-[15px]">
              <div>
                <h2>在台北找到505間房間</h2>
              </div>
              <div className="p-5 bg-white rounded-sm bg-map">
                <button className="px-4 py-2 border-0 bg-blue-500 text-white">
                  在地圖上顯示
                </button>
              </div>
            </div>
            <SearchItem active="active" />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelList;
