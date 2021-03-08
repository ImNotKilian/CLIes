const github = require("../controllers/github");

module.exports = async (args) => {

    let arg = args[0];
    let author = (arg == null ? null : args[0].split("/")[0].split("@")[1]);
    let name = (arg == null ? null : args[0].split("/")[1]);

    if (author == null || name == null) {
        throw "Requires an author and project name, i.e: cli info @user/project"
    }

    let data = await github.checkProject(author, name).catch((e) => {
        throw e;
    });

    console.log("\nProject Information:");
    console.log("\t\u001b[36mName:             \u001b[0m" + data.name || "--");
    console.log("\t\u001b[36mVersion:          \u001b[0m" + data.version || "--");
    console.log("\t\u001b[36mDescription:      \u001b[0m" + data.description || "--");
    console.log("\t\u001b[36mLicense:          \u001b[0m" + data.license || "--");
    console.log("\t\u001b[36mDependencies:     \u001b[0m" + (data.dependencies == null ? 0 : data.dependencies.length));
    console.log("\t\u001b[36mDev Dependencies: \u001b[0m" + (data.devDependencies == null ? 0 : data.devDependencies.length));

    console.log("\nUseful commands:");
    console.log("\tcli \u001b[32;1mdownload \u001b[35;1m@" + author + "/" + name + "\u001b[0m");
    console.log("\tcli \u001b[32;1minstall \u001b[35;1m@" + author + "/" + name + "\u001b[0m");
}