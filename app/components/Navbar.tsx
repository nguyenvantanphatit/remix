import { Link } from '@remix-run/react'

const Navbar = () => {
  return (
    <>
      <nav
        className="py-5  transition-all duration-500 w-full bg-indigo-600 relative top-0 left-0 z-[99999] border-b border-indigo-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex items-center justify-between flex-row">
            <div className=" flex justify-between  lg:flex-row">
              <Link to="/" className='text-white font-bold text-2xl'>Blog</Link>
            </div>

            <ul className="hidden lg:flex items-center flex-col mt-4 lg:mt-0 lg:flex-row">
              <li>
                <Link to="/"
                  className="text-gray-100 text-sm lg:text-base mb-2 block  font-medium hover:text-white transition-all duration-500 lg:mr-6 md:mb-0 lg:text-left text-center">Home</Link>
              </li>
              <li>
                <Link to="/"
                  className="text-gray-100 text-sm lg:text-base mb-2 block  font-medium hover:text-white transition-all duration-500 lg:mr-6 md:mb-0 lg:text-left text-center">About
                  us</Link>
              </li>
              <li>
                <Link to="/products"
                  className="text-gray-100 text-sm lg:text-base mb-2 block  font-medium hover:text-white transition-all duration-500 lg:mr-6 md:mb-0 lg:text-left text-center">Products</Link>
              </li>
              <li>
                <Link to="/cart"
                  className="text-gray-100 text-sm lg:text-base mb-2 block  font-medium hover:text-white transition-all duration-500 lg:mr-6 md:mb-0 lg:text-left text-center">Cart</Link>
              </li>
            </ul>
            <div className="flex items-center justify-center gap-4">
              <Link to="/login"
                className="text-gray-100 text-sm lg:text-base mb-2 block  font-medium hover:text-white transition-all duration-500 lg:mr-6 md:mb-0 lg:text-left text-center">Login
              </Link>
              <button
                className="max-[450px]:hidden bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 border border-white py-3 px-6 text-sm md:ml-5 hover:bg-indigo-700">Sign
                up </button>

            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
