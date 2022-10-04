import { Node } from './Node.js';
import { mergeSort } from './mergeSort.js';

class Tree {
  constructor(array) {
    this.finalArray = this.sortAndRemoveDups(array);
    this.root = this.buildTree(this.finalArray, 0, this.finalArray.length - 1);
  }

  sortAndRemoveDups(array) {
    let sortedArray = mergeSort(array);
    let finalArray = [...new Set(sortedArray)];

    return finalArray;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let rootNode = new Node(array[mid]);

    rootNode.left = this.buildTree(array, start, mid -1);
    rootNode.right = this.buildTree(array, mid + 1, end);

    return rootNode;
  }

  insert(n, root = this.root) {
    if (this.root === null) {
      this.root = new Node(n);
      return root;
    }

    if (root === null) {
      root = new Node(n)
      return root;
    }

    if (n > root.value) {
      root.right = this.insert(n, root.right);
    } else {
      root.left = this.insert(n, root.left);
    }

    return root;
  }
}

export { Tree };