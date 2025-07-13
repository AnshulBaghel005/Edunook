import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard,pdf }) => {
    const handleLevelClick = () => {
  if (cardData.level === "Beginner") {
    const pdfUrl = "/HTML.pdf";
    window.open(pdfUrl, "_blank");
  }
  else if (cardData.level === "Beginners") {
    const pdfUrl = "/CSS Notes.pdf";
    window.open(pdfUrl, "_blank");
  }
    else  {
       const pdfUrl = "/SQL.pdf";
    window.open(pdfUrl, "_blank");
  }
    }



  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white text-black shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-orange-400"
      }  text-richblack-25 h-[300px] box-border cursor-pointer transition-all duration-200 hover:scale-[1.02]`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Section */}
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={`${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level with Click */}
        <div className="flex items-center gap-2 text-[16px] cursor-pointer hover:underline" onClick={handleLevelClick}>
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
