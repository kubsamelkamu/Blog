import { useContext } from "react";
import { AuthContext } from "./Authservice";

export const useAuth = () => useContext(AuthContext);