import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  children,
  redirectСondition,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !redirectСondition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
