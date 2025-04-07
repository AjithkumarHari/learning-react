import { useState, useEffect } from "react";

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);
    
    useEffect(() => {

        function updateOnlineStatus() {
            setIsOnline(true);
        }

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return isOnline;
}