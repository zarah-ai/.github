import "../styles/app.css";
import { Component } from "react";
import { Header } from "./header";
import { Asset } from "./asset";
import { Footer } from "./footer";
import { assets } from "../utility/blockchain";

export class App extends Component {
    constructor(props) {
        super(props);
        const id = this.props.id || 0;

        const random = Math.floor(Math.random() * assets.length);
        this.isRandom = (id <= 0 || id >= assets.length);
        const index = (this.isRandom ? random : id - 1);
        this.asset = assets[index];
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