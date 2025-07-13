import React from "react"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
]

const TimelineSection = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-12 px-4 md:px-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* Timeline Info */}
        <div className="w-full lg:w-[45%] flex flex-col gap-10">
          {TimeLine.map((item, index) => (
            <div key={index} className="flex items-start gap-6 relative">
              {/* Logo */}
              <div className="min-w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-lg">
                <img src={item.Logo} alt={`Step ${index + 1}`} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-300">
                  {item.Heading}
                </h3>
                <p className="text-sm text-gray-300">{item.Description}</p>
              </div>

              {/* Dotted Line */}
              {index < TimeLine.length - 1 && (
                <div className="absolute left-[26px] top-[60px] h-12 border-l-2 border-dotted border-yellow-400"></div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline Image */}
        <div className="relative shadow-yellow-400 shadow-lg rounded-lg">
          <img
            src={TimeLineImage}
            alt="Timeline Illustration"
            className="w-full h-auto max-w-[400px] rounded-lg object-cover shadow-[20px_20px_0px_0px_#ffffff1a]"
          />
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
