import { Tree } from "./Tree.js";

let array = [6, 7, 8, 3, 9, 4, 1, 8, 4, 5, 3, 2];
let testTree = new Tree(array);

testTree.delete(2)

console.log(testTree);
