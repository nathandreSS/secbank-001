import * as React from "react";
import { jwtDecode } from "jwt-decode";
import { AxiosResponse } from "axios";
import api from "../api";
import { ReactNode, useContext, useState } from "react";

interface LoginBody {
  username: string;
  password: string;
}

interface ResponseToken {
  access_token: string;
  refresh_token: string;
}
interface AuthContextType {
  authed: boolean;
  user: User | null;
  login: (body: LoginBody) => Promise<void>;
  refresh: (onRefreshed: (token: string) => void) => Promise<string>;
  logout: () => void;
}
const authContext = React.createContext<AuthContextType | null>(null);

interface RequireAuthProps {
  children: ReactNode;
}

interface User {
  id: string;
}

interface DecodedJwt {
  sub: string;
}
export function AuthProvider({ children }: RequireAuthProps) {
  const [authed, setAuthed] = useState<boolean>(
    !!(
      localStorage.getItem("access_token") &&
      localStorage.getItem("refresh_token")
    ),
  );
  const [user, setUser] = useState<User | null>(null);

  const access_token = localStorage.getItem("access_token");
  if (access_token && !user) {
    const decodedJwt = jwtDecode<DecodedJwt>(access_token);
    setUser({ id: decodedJwt.sub });
    setAuthed(true);
  }
  const login = async (body: LoginBody) => {
    const response: AxiosResponse<ResponseToken> = await api.post(
      "user/login",
      body,
    );
    const accessToken = response.data.access_token;
    const decodedJwt = jwtDecode<DecodedJwt>(accessToken);
    setUser({ id: decodedJwt.sub });
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    setAuthed(true);
  };

  const refresh = async (onRefreshed: (token: string) => void) => {
    const data = { refresh_token: localStorage.getItem("refresh_token") };
    const response = await api.put("/user/refresh", data);
    const accessToken = response.data.access_token;
    const decodedJwt = jwtDecode<DecodedJwt>(accessToken);
    setUser({ id: decodedJwt.sub });
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    // Notifica todos que estão aguardando o novo token
    onRefreshed(accessToken);
    return accessToken;
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setAuthed(false);
  };

  return (
    <authContext.Provider value={{ authed, user, login, refresh, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
