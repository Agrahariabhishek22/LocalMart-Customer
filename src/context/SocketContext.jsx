import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch ,useSelector} from "react-redux";

import { addNotification } from "../redux/notificationSlice";



export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state)=>state?.customer?.customer?._id||"");
  useEffect(() => {
    if(!id)return;
    console.log("shopkeeper context called")
    const newSocket = io("http://localhost:3000", { withCredentials: true });
    //const newSocket = io("https://shopsy-backend-one.vercel.app", { withCredentials: true });

    newSocket.emit("joinCustomer",id);

    newSocket.on("OrderStatusUpdated", (data) => {
      console.log("New order received:", data);
    //   dispatch(updateOrder(data?.order));
      dispatch(addNotification({ 
        type: "order", 
        message: data.message, 
      }));
    });
  newSocket.on("Logged-Out",()=>{
    console.log("logout socket")
    newSocket.emit("disconnect",id)
  })
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch,id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
