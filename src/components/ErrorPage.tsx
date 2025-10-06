import { isRouteErrorResponse, useRouteError, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  const url = useLocation();

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
      <div className="container mx-auto mt-10 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-2xl">{isRouteError ? `Not Found: ${url.pathname}` : error.message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
