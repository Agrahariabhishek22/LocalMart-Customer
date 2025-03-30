import { useState } from "react";
import axios from "axios"; // Best for handling API requests

const useAPI = () => { 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const callApi = async ({ url, method = "GET", data = {}, headers = {} }) => {
        setLoading(true);
        setError(null);
       
        //url = `https://shopsy-backend-one.vercel.app/${url}`
        url = `http://localhost:3000/${url}`;
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
setLoading(false);
           if(response && (response.status === 201||response.status === 200)) return response.data
           else return null; // Return the response data
        } catch (err) {
            console.log(err.response?.data || "Something went wrong");
            setLoading(false);
            return null; // Return null on error
        } 
    };
   
    return { callApi, loading, error };
};

export default useAPI;
