import { Tree } from './Tree.js';

let array = [3, 6, 9];
let testTree = new Tree(array);

testTree.insert(10);
testTree.insert(11);
testTree.insert(5);
testTree.insert(4);

console.log(testTree);

console.log(testTree.isBalanced());
