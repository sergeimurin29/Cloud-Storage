import "./animations.css";
import './App.css';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AuthAction} from "./actions/user";
import NavRoutes from "./routes/NavRoutes";


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(AuthAction());
        }
    }, []);
    return (
        <div className="App">
            <NavRoutes/>
        </div>
    );
}

export default App;
