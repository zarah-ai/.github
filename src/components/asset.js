import "../styles/asset.css";
import opensea from "../resources/opensea.webp"
import placeholder from "../resources/placeholder.webp"
import { Component } from "react";
import { assetMetadata, assetLink, userLink } from "../utility/seaport";

export class Asset extends Component {

    componentDidMount() {
        console.log(this.props.asset);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}