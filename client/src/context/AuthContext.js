import { createContext } from "react"
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
    user:null,
    // user: {
    //     _id:"6172c942c7b9b84e73ba3fc2",
    //     username:"Pratik Kumar",
    //     email: "Pratik@hotmail.com",
    //     password:"$2b$10$2.uAeckxznctAoUc3TO0Qe5Dfc/TGisG4z6Lq1Es7t0A21GlTt85K",
    //     profilePicture:"profile.jpg",
    //     coverPicture:"",
    //     followers:Array,
    //     following:Array,
    //     isAdmin:false,
    // },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}