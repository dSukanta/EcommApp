import React,{createContext,useState,useEffect} from 'react';
import { getFromStorage, restrictedRequest } from '../utils/Functions';


export const Appcontext= createContext();



export const AppContextProvider= ({children})=>{
    const [userData,setUserData] = useState(null);
    const [cartItem,setCartItem] = useState([]);
    const [userToken,setUserToken] = useState(null);

    const getCartItem = async () => {
        const token= await getFromStorage('token');
        if(token){
            setUserToken(token);
          const res = await restrictedRequest(
            `cart/mycart/${token}`,
            'GET',
            token,
          );
          setCartItem(res.data)
        //   console.log(res);
        }
      };

      useEffect(()=>{
        getCartItem();
      },[]);

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

