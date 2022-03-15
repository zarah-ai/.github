const rl = require("./readline")
const fs = require("fs");

const recursive = { recursive: true };

const existAsync = async dir => {
    return new Promise((resolve, _) => {
        fs.exists(dir, resolve);
    });
}

const rmAsync = async dir => {
    return new Promise((resolve, reject) => {
        fs.rm(dir, recursive, (error) => (error ? reject(error) : resolve()));
    });
};

const mkAsync = async dir => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, recursive, (error) => (error ? reject(error) : resolve()));
    });
};

const writeAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (error) => (error ? reject(error) : resolve()));
    });
};

const readAsync = async path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => (error ? reject(error) : resolve(data)));
    });
};

const readDirAsync = async dir => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => (error ? reject(error) : resolve(files)));
    });
}

const clearFolder = async dir => {
    if (await existAsync(dir)) {
        if (await rl.confirm(dir + " already exists. Are you sure you want to overwrite?")) {
            await rmAsync(dir);
        } else {
            throw Error("Not overwriting " + dir);
        }
    }
    mkAsync(dir);
};

module.exports = {
    existAsync: existAsync,
    rmAsync: rmAsync,
    mkAsync: mkAsync,
    writeAsync: writeAsync,
    readAsync: readAsync,
    readDirAsync: readDirAsync,
    clearFolder: clearFolder,
};