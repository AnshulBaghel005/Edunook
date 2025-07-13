import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg">
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <p className="mb-1 text-sm">First Name <sup className="text-pink-500">*</sup></p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full rounded-md bg-gray-700 p-3 text-white"
              />
            </label>
            <label className="flex-1">
              <p className="mb-1 text-sm">Last Name <sup className="text-pink-500">*</sup></p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full rounded-md bg-gray-700 p-3 text-white"
              />
            </label>
          </div>

          <label className="w-full">
            <p className="mb-1 text-sm">Email Address <sup className="text-pink-500">*</sup></p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-md bg-gray-700 p-3 text-white"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="relative flex-1">
              <p className="mb-1 text-sm">Create Password <sup className="text-pink-500">*</sup></p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full rounded-md bg-gray-700 p-3 pr-10 text-white"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
              </span>
            </label>
            <label className="relative flex-1">
              <p className="mb-1 text-sm">Confirm Password <sup className="text-pink-500">*</sup></p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-md bg-gray-700 p-3 pr-10 text-white"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9 cursor-pointer"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
