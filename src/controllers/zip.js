const path = require("path");
const fs = require("fs");
const unzipper = require('unzipper');

exports.extract = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(unzipper.Parse())
            .on('entry', (entry) => {
                let fileName = entry.path;
                let type = entry.type;

                log("Unzipping " + type + " : " + fileName);

                if (type == 'Directory') {
                    if (!fs.existsSync('./tmp/' + fileName)) {
                        fs.mkdirSync('./tmp/' + fileName, {
                            recursive: true
                        });
                    }
                } else {
                    entry.pipe(fs.createWriteStream('./tmp/' + fileName))
                }
            }).on('finish', () => {
                resolve();
            })
    });
}

function log(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress);
}