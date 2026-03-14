import { readFile } from "fs";

readFile("../../.gitignore", (error, data) => {
    if (error) {
        throw error;
    }
    console.log(data.toString());
});

console.log("Hello World!");

let number = 10;

for (let i = 0; i < number; i++) {
    console.log(i);
}
