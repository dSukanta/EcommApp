import React,{createContext,useState} from 'react';


export const Appcontext= createContext();



export const AppContextProvider= ({children})=>{
    const [userData,setUserData] = useState(null);
    const [cartItem,setCartItem] = useState(null);
    const [userToken,setUserToken] = useState(null);

    const values={
        userData,
        setUserData,
        cartItem,
        setCartItem,
        userToken,
        setUserToken
    }

    return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>
}

