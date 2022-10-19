import { AUTH_ERROR, LOGIN_SUCCESS , REGISTER_SUCCESS ,LOGOUT_SUCCESS } from "../actionType"

const initialState = {
    data :[],
    isAuth: localStorage.getItem('token') ?? false
}


const authReducer = (state=initialState,action) =>{
    switch(action.type){
        case LOGIN_SUCCESS :
            let token = action.payload.data.token;
            localStorage.setItem("token",token);
        return{
            ...state,
            error: null,
            isAuth: token,
            login:action.payload
        }
        case REGISTER_SUCCESS :
        return{
            ...state,
            error: null,
            register:action.payload
        }
        case LOGOUT_SUCCESS :
            localStorage.clear()
        return{
            isAuth: null,
        }
        case AUTH_ERROR :
            return{
                ...state,
                register: null,
                error : action.payload?.data?.message
            }
        default:
            return state
    }
}

export default authReducer;