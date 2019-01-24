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
    const chars = min + Math.floor(Math.random() * (max - min));
    
    let result = "";
    for (let i = 0; i < chars; i++) {
        result += options[Math.floor(Math.random() * options.length)];
    }
    return result;
};

const makeRandomArray = function (itemMin, itemMax, stringMin, stringMax) {
    const items = [];
    const itemCount = itemMin + Math.floor(Math.random() * (itemMax - itemMin));
    for (let i = 0; i < itemCount; i++) {
        items.push(makeRandomString(stringMin, stringMax));
    }
    return items;
};

for (let i = 0; i < iterations; i++) {
    const item = {
        id: makeGuid(),
        name: "This is a random type3 object " + makeRandomString(10, 100),
        description: "Description " + makeRandomString(100, 500),
        details: {
            items: makeRandomArray(4, 20, 5, 25),
            foo: makeRandomArray(0, 100, 20, 40),
            bar: makeRandomArray(0, 100, 20, 40)
        }
    };
    fs.writeFileSync("type3/" + item.id + ".json", JSON.stringify(item, undefined, 4));
}
