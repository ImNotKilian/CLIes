const fs = require('fs');
const path = require('path');

exports.createTempDir = () => {
    if (!fs.existsSync('./tmp')) {
        fs.mkdirSync('./tmp');
    }
}

exports.createFileStream = (name) => {
    let stream = fs.createWriteStream("./tmp/" + name);
    return stream;
}

exports.deleteZipFile = () => {
    fs.unlinkSync('./tmp/repository.zip');
}

exports.deleteTempDir = () => {
    fs.unlinkSync('./tmp');
}

exports.rename = (name, newname) => {
    return new Promise ( (resolve, reject) => {
        fs.rename(path.join('./tmp/', name + '-master'), path.join('./tmp/', (newname == null ? name : newname)), (err) => {
            if (err) {
                console.error(err);
                reject("Error renaming directory");
            } else
                resolve();
        });
    })
}

exports.move = (name) => {
    return new Promise (( resolve, reject ) => {
        fs.rename(path.join('./tmp/', name), path.join('./', name), (err) => {
            if (err) {
                console.error(err);
                reject("Error moving directory");
            } else
                resolve();
        });
    })
}