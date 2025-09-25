import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


let socket: Socket;

export function useSocket(){
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_API_URL),{
            autoconnect: false,
            transports: ['websocket'],
            
            
        };
        socket.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to server");
        });
        socket.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from server");
        }
        );
        return () => {
            
            socket.off("disconnect");
           
        }
    }, []);

    return {socket, isConnected};
}