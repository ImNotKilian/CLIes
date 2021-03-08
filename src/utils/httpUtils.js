const https = require('https');

exports.get = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {

            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            })

            resp.on('end', () => {
                resolve(data.toString())
            })

        }).on('error', (err) => {
            reject(err);
        })
    });
}

exports.pipe = (url, pipeline) => {
    return new Promise((resolve, reject) => {
        
        https.get(url, (resp) => {
            let len = parseInt(resp.headers['content-length']);
            let downloaded = 0;
            let old_percent = 0;

            console.log("Starting download (File size: " + (resp.headers['content-length'] || "unknown") + " bytes)")

            resp.on('data', function(chunk) {
                let percent = parseInt(100 * downloaded / len);
                pipeline.write(chunk);
                downloaded += chunk.length;
                
                if (percent != old_percent) {
                    old_percent = percent;

                    if (resp.headers['content-length'] == null)
                        printProgress("Downloading " + downloaded + " bytes" + "\033[0G");
                    else
                        printProgress("Downloading " + percent + "% " + downloaded + " bytes" + "\033[0G");
                }
            });

            resp.on('end', () => {
                pipeline.end();
                resolve();
            })
        });
    });
}

function printProgress(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress);
}