#!/usr/bin/env node
'use strict';

// List of commands
const commands = new Map();

// Install commands
commands.set("info", require("./commands/info"));
commands.set("help", require("./commands/help"));
commands.set("download", require("./commands/download"));
commands.set("install", require("./commands/install"));

// Check for command
async function init () {
    let command = process.argv[2] || "help";
    let callback = commands.get(command) || commands.get("help");

    let args = [];
    for (let i = 3; i < process.argv.length; i++) {
        args.push(process.argv[i]);
    }

    try {
        await callback(args);
    } catch (e) {
        console.error("\nThis command has returned an error:");
        console.error("\t\u001b[32;1m" + command + " \u001b[35;1m" + args.join(" ") + "\u001b[0m");
        console.error("\nThe command returned this message:\n\t\u001b[31;1m" + e + "\u001b[0m");
        console.error("\nRead the documentation here:\n\t\u001b[36m\u001b[4mhttps://github.com/sammwyy/clies\u001b[0m")
    }
}

// Main
init();