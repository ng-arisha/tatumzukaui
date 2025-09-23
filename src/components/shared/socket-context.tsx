import { createContext } from "react";
import { Socket } from "socket.io-client";


const SocketContext = createContext<Socket | null>(null);

function SocketContextProvider({children}:{children: React.ReactNode}) {
    
    return (
        <div>
            
        </div>
    )
}

export default SocketContextProvider
