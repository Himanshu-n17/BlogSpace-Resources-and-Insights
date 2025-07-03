import React, { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie"; // 🔹 Add this

const AuthContext = createContext(undefined);

// Reducer stays the same...
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // 🔁 Restore user from cookie on load
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const user = Cookies.get("user");
    if (accessToken && user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: JSON.parse(user),
      });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      const user = {
        id: data.userResponse?.id || "",
        name: data.userResponse?.name || "User",
        email: data.userResponse?.email || email,
        accessToken: data.accessToken,
      };

      // 🔐 Store in cookies
      Cookies.set("accessToken", data.accessToken, { expires: 7 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user;
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      const user = {
        name: data.userResponse?.name || name,
        email: data.userResponse?.email || email,
      };

      // 🔐 Store in cookies
      Cookies.set("accessToken", data.accessToken, { expires: 7 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user;
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

const getAuthToken = () => {
  const token = Cookies.get("accessToken");
  return token;
};

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        clearError,
        getAuthToken,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
