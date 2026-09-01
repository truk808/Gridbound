import './App.css';
import AppRouter from "./router/AppRouter.tsx";
import {useEffect} from "react";
import {useStore} from "./store/RootStore.ts";

export function App() {
    const {socketStore} = useStore();

    useEffect(() => {
        socketStore.connect(import.meta.env.VITE_WS_URL)
    }, [socketStore])

    return (
        <div>
            <AppRouter />
        </div>
    );
}