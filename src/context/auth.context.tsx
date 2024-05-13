import React, { useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

type Action = { type: "login"; token: string; user: User } | { type: "logout" };

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        token: action.token,
        user: action.user,
      };
    case "logout":
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      throw new Error("Unknown Auth Action!");
  }
}

const AuthStateContext = React.createContext<AuthState>(initialState);
AuthStateContext.displayName = "AuthStateContext";
const AuthActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
AuthActionContext.displayName = "AuthActionContext";

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch({ type: "login", token, user });
    }
  }, []);

  useEffect(() => {
    if (state.token && state.user) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token, state.user]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={dispatch}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error(`useAuthState must be used within an AuthProvider`);
  }
  return context;
}

export function useAuthAction() {
  const dispatch = React.useContext(AuthActionContext);
  if (dispatch === undefined) {
    throw new Error(`useAuthAction must be used within an AuthProvider`);
  }
  return {
    login(token: string, user: User) {
      dispatch({ type: "login", token, user });
    },
    logout() {
      dispatch({ type: "logout" });
    },
  };
}
