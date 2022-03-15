import "../styles/app.css";
import { Component } from "react";
import { Header } from "./header";
import { Asset } from "./asset";
import { Footer } from "./footer";
import { numberOfAssets } from "../utility/seaport";

export class App extends Component {
    constructor(props) {
        super(props);
        const id = this.props.id || 0;

        const random = Math.floor(Math.random() * numberOfAssets);
        this.isRandom = (id <= 0 || id >= numberOfAssets);
        this.asset = (this.isRandom ? random : id-1);
    }

    componentDidMount() {
        if (this.isRandom) {
            window.history.replaceState(null, "", "/#/");
        }
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Asset asset={this.asset} />
                <Footer />
            </div>
        );
    }
}