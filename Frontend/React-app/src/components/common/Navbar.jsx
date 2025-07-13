import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img  className="rounded-3xl mb-2.75" src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div
                    className={`flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p className="hover:text-red-400 transition-all">{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-0 top-full z-[1000] w-[200px] rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[20%] top-0 -z-10 h-6 w-6 translate-x-[50%] translate-y-[-50%] rotate-45 select-none rounded bg-richblack-5" />
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block rounded-lg bg-transparent py-2 pl-2 hover:bg-red-400"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center text-white">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`hover:text-red-500 transition-all ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User actions */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-yellow-25 transition-all" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-3 py-2 text-white hover:bg-gray-700 transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-blue-500 px-3 py-2 text-white hover:bg-richblack-700 transition-all">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblack-800 z-50 p-4 md:hidden">
          <ul className="flex flex-col gap-3 text-white">
            {NavbarLinks.map((link, i) => (
              <li key={i}>
                {link.title === "Catalog" ? (
                  <details className="group">
                    <summary className="cursor-pointer text-white-100 hover:text-yellow-50 flex items-center gap-2">
                      Catalog <BsChevronDown className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="ml-4 mt-2">
                      {subLinks.length > 0 ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, j) => (
                            <Link
                              key={j}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block py-1 text-richblack-200 hover:text-yellow-25"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-sm text-richblack-300">No Courses</p>
                      )}
                    </div>
                  </details>
                ) : (
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <p className="hover:text-yellow-25">{link.title}</p>
                  </Link>
                )}
              </li>
            ))}

            {token === null ? (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full mt-2 rounded bg-gray-700 px-4 py-2 text-white-100 hover:bg-gray-600">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full mt-2 rounded bg-richblack-700 px-4 py-2 text-richblack-100 hover:bg-richblack-600">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <div className="mt-2">
                <ProfileDropdown />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
