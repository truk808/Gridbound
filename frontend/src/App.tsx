import './App.css';
import AppRouter from "./router/AppRouter.tsx";
import {useEffect} from "react";
import {useStore} from "./store/RootStore.ts";

export function App() {
    const {socketStore} = useStore();

    useEffect(() => {
        socketStore.connect('ws://localhost:5000')
    }, [socketStore])

    return (
        <div>
            <AppRouter />
        </div>
    );
}