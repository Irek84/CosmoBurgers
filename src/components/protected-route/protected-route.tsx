import { FC, ReactChild } from "react";
import { Route, Redirect } from "react-router-dom";

type TProtectedRouteProps = {
  children?: ReactChild;
  redirectСondition: boolean;
  redirectPath: string;
  path: string;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  redirectСondition,
  redirectPath,
  ...rest
}: TProtectedRouteProps) => {
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
