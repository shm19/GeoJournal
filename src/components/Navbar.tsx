import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm bg-blue-700 flex">
        <NavLink to="/" className="btn btn-ghost text-xl bg-blue-900 mx-4">
          Home
        </NavLink>
        <NavLink to="/geojournal" className="btn btn-ghost text-xl bg-blue-900 mx-4">
          geojournal
        </NavLink>
        <NavLink to="/history" className="btn btn-ghost text-xl bg-blue-900 mx-4">
          history
        </NavLink>
      </div>
      <main >
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
