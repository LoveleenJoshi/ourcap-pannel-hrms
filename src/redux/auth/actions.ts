// constants
import { Thunk } from 'yup/lib/util/types';
import { AuthActionTypes } from './constants';
import { RootState } from '../store';
import { AppDispatch } from '../store';

export interface AuthActionType {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.FORGOT_PASSWORD
        | AuthActionTypes.FORGOT_PASSWORD_CHANGE
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER;
    payload: {} | string;
}

interface UserData {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});
const LOGIN_URL = 'http://35.154.28.156/api/login';

export const loginUser = (username: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { username, password },
});
// In redux/actions.ts or similar file
// export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
//     try {
//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('password', password);

//         const response = await fetch(LOGIN_URL, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 // Add your headers here
//                 // Example:
//                 'Content-Type': 'application/json',
//                 // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             // Extract the token from the response
//             const token = data.token;
//             // Save the token in Redux store or local storage
//             localStorage.setItem('accessToken', token);
//             // Dispatch an action to update the Redux store with user data or token
//             dispatch({
//                 type: AuthActionTypes.API_RESPONSE_SUCCESS,
//                 payload: { token, userData: data.user }, // Adjust payload according to your backend response structure
//             });
//         } else {
//             throw new Error('Login failed');
//         }
//     } catch (error) {
//         dispatch({
//             type: AuthActionTypes.API_RESPONSE_ERROR,
//             // payload: err.message || 'An error occurred during login',
//         });
//     }
// };


export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (fullname: string, email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { fullname, email, password },
});

export const forgotPassword = (username: string): AuthActionType => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { username },
});

export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
