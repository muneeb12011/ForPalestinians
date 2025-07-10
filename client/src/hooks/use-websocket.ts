import { useEffect, useRef, useState } from "react";

interface UseWebSocketOptions {
  onMessage?: (event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
  } = options;

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const shouldReconnect = useRef(true);

  const connect = () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}${url}`;
    
    const ws = new WebSocket(wsUrl);

    ws.onopen = (event) => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      onOpen?.(event);
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      setSocket(null);
      onClose?.(event);

      if (
        shouldReconnect.current &&
        reconnectAttempts.current < maxReconnectAttempts
      ) {
        setTimeout(() => {
          reconnectAttempts.current++;
          connect();
        }, reconnectInterval);
      }
    };

    ws.onerror = (event) => {
      onError?.(event);
    };

    setSocket(ws);
  };

  useEffect(() => {
    connect();

    return () => {
      shouldReconnect.current = false;
      socket?.close();
    };
  }, [url]);

  const sendMessage = (message: string | object) => {
    if (socket?.readyState === WebSocket.OPEN) {
      const messageStr = typeof message === "string" ? message : JSON.stringify(message);
      socket.send(messageStr);
    }
  };

  const disconnect = () => {
    shouldReconnect.current = false;
    socket?.close();
  };

  return {
    socket,
    isConnected,
    sendMessage,
    disconnect,
  };
}
