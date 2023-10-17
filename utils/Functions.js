import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "@env";

export const saveToStorage= async(name,payload)=>{
    try {
        const data= JSON.stringify(payload);
        await AsyncStorage.setItem(name,data)
    } catch (error) {
        return `Error saving`
    }
}

export const getFromStorage= async(name)=>{
    try {
        const jsonValue = await AsyncStorage.getItem(name);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        return `Error saving`
      }
};


export const FetchData= async(endpoint="/",method="GET")=>{
    
    try {
        const res= await fetch(`${BASE_URL}/${endpoint}`,{method:method});
        const data=await res.json();
        return data?.data
    } catch (error) {
        console.log(error)
    }
};


export const postData= async(endpoint="/",method="POST",body={})=>{
    const myHeaders= new Headers();
    myHeaders.append("Content-Type", "application/json"); 

    const options = {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(body)
    }
    console.log(body,'data')
    const res= await fetch(`${BASE_URL}/${endpoint}`,options);
    const data= res.json();
    return data;
};

export const restrictedRequest= async(endpoint="/",method="GET",token)=>{
    const myHeaders= new Headers();
    myHeaders.append("authorization", `Bearer ${token}`); 
    const options = {
        method: method,
        headers: myHeaders, 
    };

    const res= await fetch(`${BASE_URL}/${endpoint}`,options);
    const data= res.json();
    return data;
};


