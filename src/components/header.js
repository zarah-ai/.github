import "../styles/header.css";
import { Component } from "react";
import { collectionInfo } from "../utility/seaport";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { description: "", image: "", items: 0, owners: 0, price: 0, traded: 0, slug: "" };
    }

    componentDidMount() {
        collectionInfo().then(x => {
            this.setState({
                description: x.description,
                image: x.image_url,
                items: x.stats.count,
                owners: x.stats.num_owners,
                price: x.stats.floor_price,
                traded: x.stats.total_volume,
                slug: x.slug
            });
        });
    }

    render() {
        return (
            <div className="header">
                <div className="header-img"><img src={this.state.image} alt="Logo" width="100%" /></div>
                <p className="header-text">{this.state.description}</p>
                <a className="header-stats" href={"https://opensea.io/collection/" + this.state.slug} target="_blank">
                    <span>{this.state.items}<br />assets</span>
                    <span>{this.state.owners}<br />owners</span>
                    <span>{this.state.price} ETH<br />floor price</span>
                    <span>{this.state.traded} ETH<br />volume traded</span>
                    <div></div>
                </a>
            </div>
        );
    }
}