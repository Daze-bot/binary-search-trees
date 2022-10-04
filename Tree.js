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

  delete(n, root = this.root) {
    if (root === null) {
      return root;
    }

    if (n > root.value) {
      root.right = this.delete(n, root.right);
    } else if (n < root.value) {
      root.left = this.delete(n, root.left);
    } else {
      if (root.right === null) {
        return root.left;
      } else if (root.left === null) {
        return root.right;
      }
      root.value = this.minValue(root.right);
      root.right = this.delete(root.value, root.right);
    }

    return root;
  }

  minValue(root) {
    let minV = root.value;
    while (root.left != null) {
      minV = root.left.value;
      root = root.left;
    }
    return minV;
  }

  find(n, root = this.root) {
    if (root === null || n === root.value) {
      return root;
    }

    if (n > root.value) {
      return this.find(n, root.right);
    }
    return this.find(n, root.left);
  }
}

export { Tree };