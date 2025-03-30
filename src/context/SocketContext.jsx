import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch ,useSelector} from "react-redux";
<<<<<<< HEAD
import { addNotification } from "../redux/NotificationSlice";
=======
import { addNotification } from "../redux/notificationSlice";
>>>>>>> 92e2fa162ea46c113c4d0ebf552782aafa7c8d25


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state)=>state?.customer?.customer?._id||"");
  useEffect(() => {
<<<<<<< HEAD
  
    if (!id) return;
    
    //const newSocket = io("http://localhost:3000", { withCredentials: true });
    const newSocket = io("https://shopsy-backend-gilt.vercel.app", { withCredentials: true });
=======
    if (!id) return;
    
    //const newSocket = io("http://localhost:3000", { withCredentials: true });
    const newSocket = io("https://shopsy-backend-one.vercel.app", { withCredentials: true });
>>>>>>> 92e2fa162ea46c113c4d0ebf552782aafa7c8d25
    newSocket.emit("joinCustomer",id);

    newSocket.on("OrderStatusUpdated", (data) => {
      console.log("New order received:", data);
    //   dispatch(updateOrder(data?.order));
      dispatch(addNotification({ 
        type: "order", 
        message: data.message, 
      }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
