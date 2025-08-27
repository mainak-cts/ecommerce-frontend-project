import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="nav-bar w-full flex flex-wrap items-center gap-2 bg-white shadow px-6 py-3 mt-19 border-b border-gray-200">
        {[
          "All",
          "Smartphones",
          "Laptops",
          "Beauty",
          "Groceries",
          "Furniture",
        ].map((label, index) => (
          <NavLink
            data-testid={`link-${label}`}
            key={index}
            to={label === "All" ? "/" : `/products/category/${label}`}
            className={({ isActive }) =>
              `relative px-4 py-2 font-semibold text-base rounded transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded after:transition-all after:duration-300"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            {label === "Smartphones"
              ? "Phones"
              : label === "Furniture"
              ? "Furnitures"
              : label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
