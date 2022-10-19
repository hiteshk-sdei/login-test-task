import instance from "../../Utils/api";
import { LOGIN_SUCCESS , REGISTER_SUCCESS ,AUTH_ERROR, LOGOUT_SUCCESS} from "../actionType";

export const login = (data) =>{
    return (dispatch) => {
        return instance.post('/signin', data)
            .then(data => {
                if(data.status===200){
                    dispatch({
                        type:LOGIN_SUCCESS,
                        payload: data
                    })
                }else{
                    dispatch({
                        type:AUTH_ERROR,
                        payload: data
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type:AUTH_ERROR,
                    payload: error.response
                })
            });
    };
}

export const register = (data) =>{
    
    return (dispatch) => {
        return instance.post('/signup', data)
            .then(data => {
                if(data.status===200){
                    dispatch({
                        type:REGISTER_SUCCESS,
                        payload: data
                    })
                }else{
                    dispatch({
                        type:AUTH_ERROR,
                        payload: data
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type:AUTH_ERROR,
                    payload: error.response
                })
            });
    };
}

export const logout = () =>{
    
    return (dispatch) => {
        return instance.post('/signout')
            .then(data => {
                if(data.status===200){
                    dispatch({
                        type:LOGOUT_SUCCESS,
                        payload: data
                    })
                }else{
                    dispatch({
                        type:AUTH_ERROR,
                        payload: data
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type:AUTH_ERROR,
                    payload: error.response
                })
            });
    };
}