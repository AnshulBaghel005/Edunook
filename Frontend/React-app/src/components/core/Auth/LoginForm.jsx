import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-md bg-gray-700 text-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Login to Your Account</h2>

        {/* Email Field */}
        <label className="block">
          <p className="mb-1 text-sm">
            Email Address <sup className="text-red-400">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full p-3 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        {/* Password Field */}
        <label className="block relative">
          <p className="mb-1 text-sm">
            Password <sup className="text-red-400">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter password"
            className="w-full p-3 pr-12 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[43px] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={22} fill="#9CA3AF" />
            ) : (
              <AiOutlineEye fontSize={22} fill="#9CA3AF" />
            )}
          </span>
        </label>

        {/* Forgot Password */}
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-yellow-300 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-medium py-2 rounded-md transition duration-200"
        >
          Sign In
        </button>

        {/* Optional Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-300 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
