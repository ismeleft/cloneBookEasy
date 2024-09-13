import React from "react";
import Image from "next/image";

interface SearchItemProps {
  active?: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ active }) => {
  return (
    <div
      className={`h-60 w-[720px] flex items-center gap-4 border border-lightblue rounded p-[15px] mb-[15px] ${
        active ? "bg-blue-200 shadow-3xl" : ""
      }`}
    >
      <Image
        className="h-[210px] w-[200px] object-cover rounded"
        src="https://cf.bstatic.com/xdata/images/hotel/square600/347072190.webp?k=74cb5ec7f0ef6a6b424dca16d22b2e0b62c5438fbeef2e9f56bed64167dddbad&o=&s=1"
        alt=""
        width={150}
        height={50}
      />
      <div className="w-[505px] h-[210px]">
        <div className="flex justify-between">
          <h2 className="text-xl w-[300px]">台南微醺文旅|老宅古城|漫遊體驗</h2>
          <div className="flex gap-[5px] text-right">
            傑出
            <br />
            1,223則評論
            <button className="flex items-center justify-center text-white text-xl font-bold h-10 w-10 bg-blue-500 rounded-tl-md rounded-tr-md rounded-br-md">
              9.5
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-blue-500 border-b border-blue-500 text-xs mr-[5px]">
            中西區 台南 400公尺遠
          </span>
          <span className="inline-flex items-center justify-center text-white text-xs font-light p-[5px] bg-blue-500">
            免費專機接送
          </span>

          <div className="mt-[10px] flex justify-between items-end">
            <div className="border-l-[3px] border-lightgray p-[15px_5px] text-xs">
              <div>
                <b>標準單人房－附共用衛浴</b>
                <b>一張單人床</b>
              </div>
              <div className="mt-[10px] text-green-600">
                <b>免費取消</b>
                <b>立即搶下優惠價－可取消</b>
                <br />
                <br />
                <b className="text-red-600">此價格的客房在本站僅剩 1 間</b>
              </div>
            </div>
            <div className="text-xs">
              <span className="flex justify-end">五晚、1位</span>
              <span className="flex justify-end text-xl font-medium">
                TWD 4534
              </span>
              <span className="flex justify-end text-gray-500">
                含稅費與其他費用
              </span>
              <button className="mt-[10px] w-[200px] text-white text-lg py-[5px] px-[10px] bg-[rgb(255,142,4)] rounded hover:bg-[rgb(206,114,1)] cursor-pointer">
                查看客房供應情況
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
