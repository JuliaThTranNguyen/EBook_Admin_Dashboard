import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../../types/User";
import {
  AuthReducerState,
  LoginPayload,
  LoginResponse,
} from "../../types/Auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootStatetype } from "../store";

const accessToken = localStorage.getItem("accessToken");

const initialState: AuthReducerState = {
  auth: [],
  allUserData: [],
  user: null,
  loading: false,
  access_Token: accessToken ? accessToken : null,
  error: null,
};

export const UserLogin = createAsyncThunk(
  "auth/UserLogin",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://nodejs-server-thjulia.vercel.app/api/v1/auth/login",
        payload
      );
      toast.success("Log in successfully");
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "An error occurred");
    }
  }
);

export const getUserProfile = createAsyncThunk<User, void>(
  "auth/getUserProfile",
  async (_, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootStatetype).auth
      .access_Token;

    if (!access_token) {
      console.error("Token is missing!");
      return thunkAPI.rejectWithValue("Token is missing !");
    }

    try {
      const response = await axios.get(
        "https://nodejs-server-thjulia.vercel.app/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    const access_token = (thunkAPI.getState() as RootStatetype).auth
      .access_Token;

    if (!access_token) {
      console.error("Token is missing!");
      return thunkAPI.rejectWithValue("Token is missing !");
    }

    try {
      const response = await axios.get(
        "https://nodejs-server-thjulia.vercel.app/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return {
        allUserData: response.data.data,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* HANDLE LOGOUT */
    UserLogout: (state) => {
      console.log("UserLogout action dispatched");
      localStorage.removeItem("accessToken");
      state.user = null;
      state.loading = false;
      state.error = null;
      state.access_Token = "";
      toast.success("Successfully log out !");
    },
  },
  extraReducers: (builder) => {
    /* LOGIN USER*/
    builder
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UserLogin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload === undefined) {
            state.error = "Unable to identify logged in payload";
          } else {
            state.loading = false;
            state.access_Token = action.payload.accessToken;
          }
        }
      )
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = `Invalid credentials, please check your inputs.`;
        state.loading = false;
      });
    /*GET USER PROFILE*/
    builder
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        }
      )
      .addCase(getUserProfile.rejected, (state) => {
        localStorage.removeItem("accessToken");
        state.user = null;
      });

    /*GET ALL USERS DATA*/
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<{ allUserData: User[] }>) => {
          state.allUserData = action.payload.allUserData;
          state.loading = false;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = "Error fetching all users data. Invalid access rights.";
        state.loading = false;
      });
  },
});

const authReducer = authSlice.reducer;
export const { UserLogout } = authSlice.actions;
export const currentAccessToken = (state: RootStatetype) =>
  state.auth.access_Token;
export const currentUser = (state: RootStatetype) => state.auth.user;
export const allUsersData = (state: RootStatetype) => state.auth.allUserData;
export const errorResponse = (state: RootStatetype) => state.auth.error;
export default authReducer;
