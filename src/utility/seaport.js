import fetch from "node-fetch";

const contract = "0x3acce66cd37518a6d77d9ea3039e00b3a2955460";
const requestOptions = { method: "GET", redirect: "follow" };

export const collectionInfo = async () => {
    const slug = await collectionSlug();
    const url = "https://api.opensea.io/api/v1/collection/" + slug;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json.collection;
}

export const collectionSlug = async () => {
    const url = "https://api.opensea.io/api/v1/asset_contract/" + contract;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json.collection.slug;
}

export const assetMetadata = async (asset) => {
    const url = "https://api.opensea.io/api/v1/asset/" + contract + "/" + asset;
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json.collection.slug;
}