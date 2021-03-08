const https = require("../utils/httpUtils");
const dir = require("../controllers/directories");

exports.checkProject = (author, name) => {
    return new Promise ( async (resolve, reject) => {
        let resp = await https.get(`https://raw.githubusercontent.com/${author}/${name}/master/package.json`).catch((e) => {
            return reject(e);
        })

        try {
            let data = JSON.parse(resp);
            resolve(data);
        } catch (e) {
            reject("Project isn't exists");
        }
    })
}

exports.downloadProject = (author, name) => {
    return new Promise ( async (resolve, reject) => {
        let file = dir.createFileStream("repository.zip");
        await https.pipe(`https://codeload.github.com/${author}/${name}/zip/master`, file);

        resolve();
    })
}