import { useState } from "react";
import axios from "axios"; // Best for handling API requests
import toast from "react-hot-toast"
const useAPI = () => { 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const callApi = async ({ url, method = "GET", data = {}, headers = {} }) => {
        setLoading(true);
        setError(null);
       
      //  url = `https://shopsy-backend-one.vercel.app/${url}`
        url = `https://localmart-backend.onrender.com/${url}`
       // url = `http://localhost:3000/${url}`;
        console.log(url)
        try {
            const response = await axios({
                url,
                method,
                data,
                headers,
                withCredentials: true
            });

console.log(response)

           if(response && (response.status === 201||response.status === 200)) return response.data
           else throw new Error(response); // Return the response data
        } catch (err) {
            console.log(err)
            const errorMessage = err?.response?.data?.message||err?.response?.data?.errors[0] || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage); 
           return null;
        } finally {
            setLoading(false);
        }
    };
   
    return { callApi, loading, error };
};

export default useAPI;
