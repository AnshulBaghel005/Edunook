import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/img1.jpg";
import BannerImage2 from "../assets/Images/img2.jpg";
import BannerImage3 from "../assets/Images/aboutus3.png";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="bg-gray-900 text-white font-poppins">
      {/* Hero Section */}
      <section className="relative mx-auto w-11/12 max-w-maxContent py-20 text-center">
        <header className="mx-auto max-w-4xl text-4xl font-semibold leading-tight lg:text-5xl lg:w-3/4">
          Driving Innovation in Online Education for a{" "}
          <HighlightText text={"Brighter Future"} />
          <p className="mt-4 text-base font-medium text-gray-300 lg:text-lg">
            Edunook is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          <img
            src={BannerImage1}
            alt="About Us 1"
            className="mx-auto max-h-48 w-full object-cover rounded-lg shadow-lg"
          />
          <img
            src={BannerImage2}
            alt="About Us 2"
            className="mx-auto max-h-48 w-full object-cover rounded-lg shadow-lg"
          />
          <img
            src={BannerImage3}
            alt="About Us 3"
            className="mx-auto max-h-48 w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-t border-gray-700 py-16">
        <div className="mx-auto w-11/12 max-w-maxContent text-gray-300">
          <Quote />
        </div>
      </section>

      {/* Founding Story & Vision/Mission */}
      <section className="mx-auto w-11/12 max-w-maxContent py-20">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="mb-6 bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent">
              Our Founding Story
            </h2>
            <p className="mb-4 text-gray-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-gray-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src={FoundingStory}
              alt="Founding Story"
              className="rounded-lg shadow-[0_0_20px_0] shadow-red-500 mx-auto max-w-full"
            />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="lg:w-5/12">
            <h2 className="mb-6 bg-gradient-to-b from-red-500 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent">
              Our Vision
            </h2>
            <p className="text-gray-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          <div className="lg:w-5/12">
            <h2 className="mb-6 bg-gradient-to-b from-blue-400 via-cyan-400 to-green-300 bg-clip-text text-4xl font-bold text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning Grid & Contact Form */}
      <section className="mx-auto mt-20 w-11/12 max-w-maxContent flex flex-col gap-16 text-white">
        <LearningGrid />

        {/* Contact form card wrapper */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-3xl mx-auto w-full">
          <ContactFormSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
