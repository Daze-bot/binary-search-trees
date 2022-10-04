import { Node } from './Node.js';
import { mergeSort } from './mergeSort.js';

class Tree {
  constructor(array) {
    const startArray = this.sortAndRemoveDups(array);
    this.root = this.buildTree(startArray, 0, startArray.length - 1);
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
    while (root.left !== null) {
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

  levelOrder(root = this.root) {
    let queue = [];
    let result = [];

    if (root === null) {
      return;
    }

    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current.value);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return result;
  }

  preOrder(root = this.root, preOrderArray = []) {
    if (root === null) {
      return
    }

    preOrderArray.push(root.value);
    this.preOrder(root.left, preOrderArray);
    this.preOrder(root.right, preOrderArray);

    return preOrderArray;
  }

  inOrder(root = this.root, inOrderArray = []) {
    if (root === null) {
      return
    }

    this.inOrder(root.left, inOrderArray);
    inOrderArray.push(root.value);
    this.inOrder(root.right, inOrderArray);

    return inOrderArray;
  }

  postOrder(root = this.root, postOrderArray = []) {
    if (root === null) {
      return
    }

    this.postOrder(root.left, postOrderArray);
    this.postOrder(root.right, postOrderArray);
    postOrderArray.push(root.value);

    return postOrderArray;
  }

  height(root = this.root) {
    if (this.root === null) {
      return null;
    }
    
    if (root === null) {
      return -1;
    }

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, depth = 0) {
    if (node === null) {
      return;
    }

    if (node === root) {
      return depth;
    }

    if (node.value > root.value) {
      return this.depth(node, root.right, depth + 1);
    }
    return this.depth(node, root.left, depth + 1);
  }

  checkBalance(root) { 
    if (root === null) {
      return 0;
    }

    let leftHeight = this.checkBalance(root.left);
    let rightHeight = this.checkBalance(root.right);

    if (
      leftHeight === false ||
      rightHeight === false ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return false;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    return this.checkBalance(root) !== false;
  }

  rebalance(root = this.root) {
    if (this.isBalanced(root) === true) {
      return;
    }

    let newArray = this.inOrder(root);
    this.root = this.buildTree(newArray, 0, newArray.length - 1);
  }
}

export { Tree };
