const github = require("../controllers/github");
const dir = require("../controllers/directories");
const zip = require("../controllers/zip");

module.exports = async (args) => {

    let arg = args[0];
    let author = (arg == null ? null : args[0].split("/")[0].split("@")[1]);
    let name = (arg == null ? null : args[0].split("/")[1]);

    if (author == null || name == null) {
        throw "Requires an author and project name, i.e: cli download @user/project"
    }

    await github.checkProject(author, name).catch((e) => {
        throw e;
    });

    console.log("Downloading repository...")

    dir.createTempDir();
    await github.downloadProject(author, name);

    console.log("Download complete: ");
    console.log("Unzipping repository...");

    await zip.extract("./tmp/repository.zip");

    console.log("Unzip finished");

    console.log("Deleting zip file");
    await dir.deleteZipFile();
        
    console.log("Renaming directory...");
    await dir.rename(name);

    console.log("Moving directory...");
    await dir.move(name);
    
    setTimeout(async () => {
        await dir.deleteTempDir();
        console.log("Finished!")
    }, 1000);
}