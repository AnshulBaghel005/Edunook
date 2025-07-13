import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="mx-auto mt-16 flex w-11/12 max-w-maxContent flex-col gap-10 py-10 lg:flex-row lg:justify-between">
        {/* Contact Details */}
        <div className="lg:w-[40%] w-full">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] w-full">
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
