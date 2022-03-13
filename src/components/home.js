import "../styles/home.css";
import { Component, StrictMode } from "react";
import { App } from "./app";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";

const AppWithId = () => {
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