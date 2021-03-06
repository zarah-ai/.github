import "../styles/asset.css";
import opensea from "../resources/opensea.webp"
import loader from "../resources/loader.webp"
import { Component } from "react";
import { assetPrice, assetMetadata } from "../utility/seaport";
import { formatCurrency } from "../utility/numbers";

export class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = { image: "", price: 0, owner: "", ownerLink: "", link: "", loaded: false };
    }

    componentDidMount() {
        assetMetadata(this.props.asset).then(x => {
            this.setState({
                image: x.image_url,
                owner: x.owner.user.username,
                ownerLink: "https://opensea.io/" + x.owner.user.username,
                link: x.permalink
            });
        });
        assetPrice(this.props.asset).then(x => {
            this.setState({
                price: formatCurrency(x)
            });
        });
    }

    render() {
        return (
            <div className="asset">
                <div className="asset-card">
                    <div className="asset-img">
                        <img src={this.state.image} alt="Logo" width="100%" style={this.state.loaded ? {} : {display: "none"}} onLoad={() => this.setState({loaded: true})} />
                        <img src={loader} alt="Loader" width="100%" style={this.state.loaded ? {display: "none"} : {}} />
                    </div>
                    <div className="asset-info">
                        <span className="asset-owner">Owner:<br/ ><a href={this.state.ownerLink} target="_blank" rel="noopener noreferrer">{this.state.owner}</a></span>
                        <span className="asset-price">Price:<br/ >{this.state.price} ETH</span>
                        <a className="asset-link" href={this.state.link} target="_blank" rel="noopener noreferrer">
                            <img src={opensea} alt="Available on OpenSea" height="100%" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}