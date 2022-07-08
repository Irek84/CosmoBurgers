import { FC, ReactChild } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";

type TProtectedRouteProps = {
  children?: ReactChild;
  isRedirect: boolean;
  redirectPath: string;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, isRedirect, redirectPath, ...rest }: TProtectedRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isRedirect ? (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default ProtectedRoute;
