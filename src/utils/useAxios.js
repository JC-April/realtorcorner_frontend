import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useAxios = (prefix = "api/") => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const authBaseURL = "https://realtorcornerbackend.onrender.com/api/";

  const axiosInstance = axios.create({
    baseURL: authBaseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens) return req; //added to skip is no authTokens

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      //added the try to attempt access token refresh
      const response = await axios.post(`${authBaseURL}token/refresh/`, {
        refresh: authTokens.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;

      return req;
    } catch (error) {
      //handle expired refresh token or any other failure
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      setUser(null);

      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please log in again to continue",
        toast: true,
        position: "top-right",
        showConfirmButton: "OK",
      }).then(() => {
        navigate("/login");
      });
      return Promise.reject(error); //let the user reauthenticate without throwing an error
    }
  });

  return axiosInstance;
};

export default useAxios;
