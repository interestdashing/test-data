const process = require("process");
const fs = require("fs");
const iterations = process.argv[2] || 0;
const makeGuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const makeRandomString = function (min, max) {
    const options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const chars = min + (Math.random() * (max - min));
    
    let result = "";
    for (let i = 0; i < chars; i++) {
        result += options[Math.floor(Math.random() * options.length)];
    }
    return result;
};

for (let i = 0; i < iterations; i++) {
    const item = {
        id: makeGuid(),
        name: "This is a random type1 object " + makeRandomString(10, 100),
        description: "Description " + makeRandomString(100, 500),
        x: Math.random(),
        y: Math.random(),
        width: Math.random(),
        height: Math.random()
    };
    fs.writeFileSync("type1/" + item.id + ".json", JSON.stringify(item, undefined, 4));
}
