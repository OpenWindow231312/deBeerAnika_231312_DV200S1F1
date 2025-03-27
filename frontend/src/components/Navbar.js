import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="custom-navbar">
      <img src={logo} alt="FactFork Logo" className="custom-logo" />
      <div className="custom-links">
        <NavLink to="/" className="custom-link">Home</NavLink>
        <NavLink to="/compare" className="custom-link">Compare</NavLink>
        <NavLink to="/timeline" className="custom-link">Trends</NavLink>
      </div>
    </div>
  );
};

export default Navbar;


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <nav className={styles.navbar}>
//         {/* Logo */}
//         <img src={logo} alt="Logo" className={styles.logo} />

//         {/* Hamburger Icon */}
//         <div
//           className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
//           <Link
//             to="/"
//             className={styles.navItem}
//             onClick={() => setIsOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/dashboard"
//             className={styles.navItem}
//             onClick={() => setIsOpen(false)}
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/compare"
//             className={styles.navItem}
//             onClick={() => setIsOpen(false)}
//           >
//             Compare
//           </Link>
//           <Link
//             to="/trends"
//             className={styles.navItem}
//             onClick={() => setIsOpen(false)}
//           >
//             Trends
//           </Link>
//         </div>
//       </nav>

//       {/* Add a div that shifts content down when menu is open */}
//       <div className={isOpen ? styles.contentShift : ""}></div>
//     </>
//   );
// };

// export default Navbar;
