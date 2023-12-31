/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}


export const AuthSlice = createSlice({

    name: "auth",
    initialState: initialState,
    reducers: {

        setCredentials: (state, action) => {



            state.userInfo = action.payload;
            const expiresInMilSeconds = action.payload.expiresIn * 1000;

            const expirationTime = new Date().getTime() + expiresInMilSeconds;
            console.log("currentTime: " + new Date().getTime());
            console.log("expiration: " + expirationTime);
            localStorage.setItem('expirationTime', expirationTime.toString());
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutUser: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('expirationTime');
        }

    }
})
export default AuthSlice.reducer;
export const { setCredentials, logoutUser } = AuthSlice.actions