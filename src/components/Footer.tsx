import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "../config/appconfig";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1 id="logo" className="font-extrabold text-2xl ml-3 text-white">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="mr-2 text-amber-500"
                />
                {APP_CONFIG.APP_NAME}
              </h1>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Resources
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline" rel="noreferrer">
                    Github
                  </a>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase">
                Legal
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-2 pb-4 flex justify-center text-gray-300">
        &copy; 2025-2026. All rights reserved.
      </div>
    </footer>
  );
}
