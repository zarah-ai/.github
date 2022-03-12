import "../styles/home.css";
import { Component, StrictMode } from "react";
import { App } from "./app";
import { assets } from "../utility/blockchain";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";

const AppWithId = (Component) => {
    const { id } = useParams();
    return <App id={id} />;
}

export class Home extends Component {
    render() {
        return (
            <StrictMode>
                <HashRouter>
                    <Routes>
                        <Route path="/:id" element={ <AppWithId /> }/>
                        <Route path="*" element={ <App /> } />
                    </Routes>
                </HashRouter>
            </StrictMode>
        );
    }
}