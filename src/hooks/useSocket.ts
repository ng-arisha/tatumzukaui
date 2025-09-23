import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


let socket: Socket;

export function useSocket(){
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket = io("http://localhost:3000"),{
            auth: {
                token: Cookie.get("token")!
            },
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