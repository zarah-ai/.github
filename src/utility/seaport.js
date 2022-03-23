import fetch from "node-fetch";

export const numberOfAssets = 110;
const contract = "0xa5BDD12E8e12b326e030D934CfdaF98443a26486";
const requestOptions = { method: "GET", redirect: "follow" };

export const collectionInfo = async () => {
    const slug = await collectionSlug();
    const url = "https://api.opensea.io/api/v1/collection/" + slug;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json.collection;
};

export const collectionSlug = async () => {
    const url = "https://api.opensea.io/api/v1/asset_contract/" + contract;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json.collection.slug;
};

export const assetMetadata = async (asset) => {
    const url = "https://api.opensea.io/api/v1/asset/" + contract + "/" + asset;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
};

export const assetPrice = async (asset) => {
    const url = "https://api.opensea.io/api/v1/asset/" + contract + "/" + asset + "/listings";
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (json.listings.length == 0) {
        return 0;
    }
    const basePrice = json.listings[0].current_price
    const decimals = json.listings[0].payment_token_contract.decimals
    return basePrice * Math.pow(10, -decimals)
};