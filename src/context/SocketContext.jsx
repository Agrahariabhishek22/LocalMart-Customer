import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/NotificationSlice";


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const owner = { shopId: "67cc0e494ba0465f69296021" };
    if (!owner?.shopId) return;

    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.emit("joinCustomer", owner.shopId);

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
