import { useEffect, useState } from "react"

export const useFetch=(url)=>{
    const [data,setdata]= useState([]);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);

    const getData=async(url)=>{
        setLoading(true);
       try {
        const res= await fetch(url);
        const resData= await res.json();
        setdata(resData);
       } catch (error) {
            setError(true)
       };
       setLoading(false);
    };

    useEffect(()=>{
        getData(url);
    },[url])

    return {data,loading,error}
}