import "../styles/footer.css";
import { Component } from "react";

export class Footer extends Component {
    mailto() {
        window.location.href = "mailto:contact@zarah.ai";
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-phantom">
                    <span>Copyright © 2022 zarah.ai</span>
                </div>
                <div className="footer-content">
                    <span>Copyright © 2022 zarah.ai</span>
                    <span className="footer-contact" onClick={this.mailto}>Contact</span>
                </div>
            </div>
        );       
    }
}