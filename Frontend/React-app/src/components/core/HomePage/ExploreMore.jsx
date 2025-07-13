import React, { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"
import HighlightText from "./HighlightText"

const tabsName = ["Free", "New to coding", "Most popular"]

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  )

  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.filter((course) => course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }

  return (
    <div className="w-full bg-gray-900 py-10 px-4 text-white">
      {/* Heading */}
      <div className="text-3xl md:text-4xl font-semibold text-center mb-6">
        Unlock the <HighlightText text="Power of Code" />
        <p className="text-center text-gray-400 text-lg mt-2">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 overflow-x-auto scrollbar-hide">
        {tabsName.map((tab, index) => (
          <button
            key={index}
            onClick={() => setMyCards(tab)}
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 ${
              currentTab === tab
                ? "bg-yellow-400 text-gray-900"
                : "bg-blue-900 text-white hover:bg-yellow-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Courses Cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  )
}

export default ExploreMore
