import type { NoteData } from "@/lib/types";

export const dsaNotes: NoteData = {
  title: "DSA Basics",
  description:
    "A beginner-friendly revision deck on the data structures and algorithms interviewers start with — arrays, hash maps, sorting, heaps, trees and graphs.",
  coverImage: "/images/dsa-icon.svg",
  accent: "#fb923c",

  topics: [
    "Big O",
    "Arrays",
    "Hash Maps",
    "Sorting",
    "Heaps",
    "Trees",
    "Graphs",
  ],

  slides: [
    {
      title: "What is DSA?",
      content: `
DSA stands for Data Structures and Algorithms.

• A data structure is a way to store and organise data
• An algorithm is a step-by-step way to solve a problem
• Choosing the right structure makes an algorithm fast or slow
• Interviews test whether you can pick the right tool and explain why

Interview Answer:
"Data structures organise data, and algorithms are the steps that work on that data. Together they decide how efficient a solution is."
      `,
    },

    {
      title: "Big O Notation",
      content: `
Big O describes how the time or memory of a solution grows as the input gets bigger.

Common Complexities:
• O(1) — constant, same time for any input size
• O(log n) — halves the work each step, like binary search
• O(n) — goes through the input once
• O(n log n) — efficient sorting like merge sort
• O(n²) — nested loops over the input

Interview Answer:
"Big O tells us how an algorithm scales with input size, focusing on the worst case and ignoring constants."
      `,
      code: {
        language: "javascript",
        code: `// O(1)
const first = arr[0];

// O(n)
for (const item of arr) console.log(item);

// O(n²)
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[i], arr[j]);
  }
}`,
      },
    },

    {
      title: "Array",
      content: `
An array stores items in order, one after another in memory, and each item has an index.

• Access by index is O(1)
• Searching an unsorted array is O(n)
• Adding or removing at the end is O(1)
• Adding or removing at the start or middle is O(n), because items must shift

Interview Answer:
"An array is an ordered collection with fast index access, but inserting or deleting in the middle is slow because elements need to shift."
      `,
      code: {
        language: "javascript",
        code: `const nums = [10, 20, 30];

nums[1];        // 20  → O(1)
nums.push(40);  // add at end → O(1)
nums.pop();     // remove at end → O(1)
nums.unshift(5); // add at start → O(n)
nums.includes(30); // search → O(n)`,
      },
    },

    {
      title: "Two Pointers",
      content: `
Two pointers is a common array technique that uses two indexes moving through the array.

• Often one pointer starts at the beginning and one at the end
• Works well on sorted arrays
• Turns many O(n²) nested-loop problems into O(n)

Interview Answer:
"Two pointers uses two indexes that move towards each other or in the same direction, avoiding nested loops."
      `,
      code: {
        language: "javascript",
        code: `// Is there a pair in a sorted array that adds up to target?
function hasPairWithSum(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}

hasPairWithSum([1, 3, 5, 8, 11], 13); // true (5 + 8)`,
      },
    },

    {
      title: "Hash Map",
      content: `
A hash map stores data as key-value pairs and uses a hash function to find where each key lives.

• Insert, lookup and delete are O(1) on average
• Keys are unique, adding the same key again overwrites the value
• In JavaScript use Map, or a plain object for string keys
• Collisions happen when two keys hash to the same slot, handled internally

Interview Answer:
"A hash map stores key-value pairs and gives average O(1) lookup, insert and delete by hashing the key."
      `,
      code: {
        language: "javascript",
        code: `const ages = new Map();

ages.set("Nihal", 25);   // insert
ages.get("Nihal");       // 25 → lookup
ages.has("Arun");        // false
ages.delete("Nihal");    // delete
ages.size;               // 0`,
      },
    },

    {
      title: "Hash Map: Two Sum",
      content: `
Two Sum is the classic hash map interview question.

Problem:
Find the indexes of two numbers that add up to a target.

• The brute-force solution checks every pair in O(n²)
• With a hash map, store each number's index as you go
• For each number, check if target minus number is already stored
• This brings it down to O(n) time

Interview Answer:
"I use a hash map to remember numbers I have seen, so I can find the matching pair in a single pass."
      `,
      code: {
        language: "javascript",
        code: `function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (seen.has(needed)) return [seen.get(needed), i];
    seen.set(nums[i], i);
  }
  return [];
}

twoSum([2, 7, 11, 15], 9); // [0, 1]`,
      },
    },

    {
      title: "Hash Set & Frequency Count",
      content: `
A set stores only unique values, and a map is great for counting how often things appear.

• Set is perfect for removing duplicates or checking "have I seen this?"
• A frequency map counts occurrences in one pass
• Used in anagram, duplicate and most-frequent-element problems

Interview Answer:
"I use a Set for uniqueness checks and a Map to count frequencies, both in O(n) time."
      `,
      code: {
        language: "javascript",
        code: `// Remove duplicates
const unique = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]

// Count characters
function countChars(str) {
  const count = new Map();
  for (const ch of str) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }
  return count;
}

countChars("hello"); // h:1, e:1, l:2, o:1`,
      },
    },

    {
      title: "Sorting Basics",
      content: `
Sorting puts items in order, and many problems become easier once data is sorted.

Common Algorithms:
• Bubble, Selection, Insertion sort — simple, O(n²)
• Merge sort — O(n log n), stable, uses extra memory
• Quick sort — O(n log n) on average, O(n²) worst case
• JavaScript's sort() is O(n log n)

Remember that sort() compares items as strings by default, so always pass a compare function for numbers.

Interview Answer:
"Simple sorts are O(n²), while efficient sorts like merge sort and quick sort run in O(n log n)."
      `,
      code: {
        language: "javascript",
        code: `[10, 1, 5].sort();              // [1, 10, 5] ❌ string order
[10, 1, 5].sort((a, b) => a - b); // [1, 5, 10] ✅ ascending
[10, 1, 5].sort((a, b) => b - a); // [10, 5, 1] descending

const users = [{ age: 30 }, { age: 22 }];
users.sort((a, b) => a.age - b.age); // sort objects`,
      },
    },

    {
      title: "Bubble Sort",
      content: `
Bubble sort repeatedly swaps neighbouring items that are in the wrong order.

• After each pass, the largest remaining item "bubbles" to the end
• Time complexity is O(n²)
• Easy to understand, but too slow for large data

Interview Answer:
"Bubble sort compares neighbours and swaps them until the array is sorted. It is simple but O(n²)."
      `,
      code: {
        language: "javascript",
        code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

bubbleSort([5, 2, 9, 1]); // [1, 2, 5, 9]`,
      },
    },

    {
      title: "Merge Sort",
      content: `
Merge sort uses divide and conquer.

• Split the array in half until each part has one item
• Merge the halves back together in sorted order
• Always O(n log n), even in the worst case
• Needs O(n) extra memory for merging

Interview Answer:
"Merge sort splits the array into halves, sorts them recursively and merges them, giving a guaranteed O(n log n)."
      `,
      code: {
        language: "javascript",
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
      },
    },

    {
      title: "Quick Sort",
      content: `
Quick sort picks a pivot and puts smaller items on one side and bigger items on the other.

• Recursively sorts the left and right parts
• O(n log n) on average
• O(n²) worst case when the pivot is always the smallest or largest
• Usually very fast in practice

Interview Answer:
"Quick sort partitions the array around a pivot and sorts each side recursively. It averages O(n log n)."
      `,
      code: {
        language: "javascript",
        code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const [pivot, ...rest] = arr;
  const smaller = rest.filter((n) => n < pivot);
  const bigger = rest.filter((n) => n >= pivot);

  return [...quickSort(smaller), pivot, ...quickSort(bigger)];
}

quickSort([3, 6, 1, 8, 2]); // [1, 2, 3, 6, 8]`,
      },
    },

    {
      title: "Binary Search",
      content: `
Binary search finds an item in a sorted array by cutting the search space in half each step.

• Only works on sorted data
• Compare with the middle item, then search the left or right half
• Time complexity is O(log n)

Interview Answer:
"Binary search repeatedly halves a sorted array to find a target in O(log n) time."
      `,
      code: {
        language: "javascript",
        code: `function binarySearch(sorted, target) {
  let low = 0;
  let high = sorted.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

binarySearch([1, 3, 5, 7, 9], 7); // 3`,
      },
    },

    {
      title: "Heap",
      content: `
A heap is a complete binary tree where every parent follows an order rule with its children.

• Min heap — the parent is smaller than its children, so the smallest is on top
• Max heap — the parent is larger than its children, so the largest is on top
• Usually stored in an array
• For index i, children are at 2i + 1 and 2i + 2, and the parent is at (i - 1) / 2 rounded down

Complexity:
• Get min or max — O(1)
• Insert or remove — O(log n)

Interview Answer:
"A heap keeps the smallest or largest element on top, giving O(1) access to it and O(log n) insert and remove."
      `,
      code: {
        language: "javascript",
        code: `// Min heap stored as an array
//        1
//      /   \\
//     3     5
//    / \\
//   4   8
const heap = [1, 3, 5, 4, 8];

const parent = (i) => Math.floor((i - 1) / 2);
const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;`,
      },
    },

    {
      title: "Min Heap Implementation",
      content: `
Two operations keep the heap in order.

• Insert — add at the end, then "bubble up" while smaller than the parent
• Remove min — move the last item to the top, then "bubble down" while bigger than a child
• JavaScript has no built-in heap, so interviewers often ask you to write one

Interview Answer:
"On insert I bubble the new item up, and on removal I move the last item to the root and bubble it down, both in O(log n)."
      `,
      code: {
        language: "javascript",
        code: `class MinHeap {
  items = [];

  push(value) {
    const a = this.items;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (a[p] <= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }

  pop() {
    const a = this.items;
    const top = a[0];
    const last = a.pop();
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2;
        let small = i;
        if (l < a.length && a[l] < a[small]) small = l;
        if (r < a.length && a[r] < a[small]) small = r;
        if (small === i) break;
        [a[small], a[i]] = [a[i], a[small]];
        i = small;
      }
    }
    return top;
  }
}`,
      },
    },

    {
      title: "Priority Queue & Top K",
      content: `
A priority queue always gives back the highest priority item first, and it is usually built with a heap.

Common Uses:
• Find the K largest or K smallest items
• Task scheduling
• Dijkstra's shortest path algorithm

To find the K largest items, keep a min heap of size K and drop the smallest whenever it grows too big.

Interview Answer:
"A priority queue is a heap-backed queue that returns the highest priority item first, which is ideal for top K problems."
      `,
      code: {
        language: "javascript",
        code: `// K largest numbers using the MinHeap class
function kLargest(nums, k) {
  const heap = new MinHeap();
  for (const n of nums) {
    heap.push(n);
    if (heap.items.length > k) heap.pop();
  }
  return heap.items;
}

kLargest([3, 1, 5, 12, 2, 11], 3); // [5, 11, 12] (heap order)`,
      },
    },

    {
      title: "Tree",
      content: `
A tree is a hierarchical structure made of nodes connected by edges, with one root at the top.

Key Terms:
• Root — the top node
• Parent and child — connected nodes one level apart
• Leaf — a node with no children
• Height — the longest path from the root to a leaf

A binary tree is a tree where each node has at most two children, left and right.

Interview Answer:
"A tree is a hierarchy of nodes starting from a root, where each node can have children and there are no cycles."
      `,
      code: {
        language: "javascript",
        code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//      1
//     / \\
//    2   3
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);`,
      },
    },

    {
      title: "Tree Traversals",
      content: `
Traversal means visiting every node in a tree.

Depth-First (DFS):
• Preorder — node, left, right
• Inorder — left, node, right, which gives sorted order in a BST
• Postorder — left, right, node

Breadth-First (BFS):
• Level order — visit nodes level by level using a queue

Interview Answer:
"DFS goes deep first using recursion or a stack, while BFS visits level by level using a queue."
      `,
      code: {
        language: "javascript",
        code: `function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  return result;
}

function levelOrder(root) {
  const result = [];
  const queue = root ? [root] : [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
      },
    },

    {
      title: "Binary Search Tree",
      content: `
A Binary Search Tree (BST) is a binary tree with an ordering rule.

• Every value in the left subtree is smaller than the node
• Every value in the right subtree is larger than the node
• Search, insert and delete are O(log n) when the tree is balanced
• They become O(n) if the tree is unbalanced, like a straight line

Interview Answer:
"A BST keeps smaller values on the left and larger on the right, so searching takes O(log n) when it is balanced."
      `,
      code: {
        language: "javascript",
        code: `function insert(node, value) {
  if (!node) return new TreeNode(value);
  if (value < node.value) node.left = insert(node.left, value);
  else node.right = insert(node.right, value);
  return node;
}

function search(node, value) {
  if (!node) return false;
  if (value === node.value) return true;
  return value < node.value
    ? search(node.left, value)
    : search(node.right, value);
}`,
      },
    },

    {
      title: "Tree Depth",
      content: `
Finding the maximum depth of a tree is one of the most common tree questions.

• The depth of an empty tree is 0
• Otherwise, it is 1 plus the larger depth of the left and right subtrees
• Most tree problems follow this same recursive pattern

Interview Answer:
"I solve most tree problems recursively: handle the empty node, solve for left and right, then combine the results."
      `,
      code: {
        language: "javascript",
        code: `function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

//      1
//     / \\
//    2   3
//   /
//  4
maxDepth(root); // 3`,
      },
    },

    {
      title: "Graph",
      content: `
A graph is a set of nodes, called vertices, connected by edges.

Types:
• Directed — edges have a direction, like following someone
• Undirected — edges go both ways, like a friendship
• Weighted — edges have a cost, like distance on a map
• Cyclic or acyclic — whether you can loop back to a node

A tree is a special kind of graph with no cycles.

Interview Answer:
"A graph is a collection of nodes connected by edges, and it can be directed or undirected, weighted or unweighted."
      `,
    },

    {
      title: "Graph Representation",
      content: `
There are two common ways to store a graph.

• Adjacency list — each node keeps a list of its neighbours, memory efficient and most common
• Adjacency matrix — a 2D grid where matrix[a][b] says if an edge exists, fast lookups but uses O(V²) memory

Interview Answer:
"I usually use an adjacency list because it saves memory for sparse graphs, and switch to a matrix when I need quick edge checks."
      `,
      code: {
        language: "javascript",
        code: `// Adjacency list
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};

// Build from an edge list (undirected)
function buildGraph(edges) {
  const g = new Map();
  for (const [a, b] of edges) {
    if (!g.has(a)) g.set(a, []);
    if (!g.has(b)) g.set(b, []);
    g.get(a).push(b);
    g.get(b).push(a);
  }
  return g;
}`,
      },
    },

    {
      title: "Graph BFS",
      content: `
Breadth-First Search explores a graph level by level using a queue.

• Start from a node and visit all its neighbours first
• Keep a visited set so you never process a node twice
• Finds the shortest path in an unweighted graph
• Time complexity is O(V + E), vertices plus edges

Interview Answer:
"BFS uses a queue and a visited set to explore neighbours level by level, which gives the shortest path in unweighted graphs."
      `,
      code: {
        language: "javascript",
        code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}

bfs(graph, "A"); // ["A", "B", "C", "D"]`,
      },
    },

    {
      title: "Graph DFS",
      content: `
Depth-First Search goes as deep as possible along one path before backtracking.

• Uses recursion or a stack
• Also needs a visited set to avoid infinite loops in cycles
• Useful for detecting cycles, finding connected components and path finding
• Time complexity is O(V + E)

Interview Answer:
"DFS explores one path fully before backtracking, using recursion or a stack, and runs in O(V + E)."
      `,
      code: {
        language: "javascript",
        code: `function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return visited;
  visited.add(node);

  for (const next of graph[node]) {
    dfs(graph, next, visited);
  }
  return visited;
}

[...dfs(graph, "A")]; // ["A", "B", "D", "C"]`,
      },
    },

    {
      title: "DSA Interview Checklist",
      content:
        "Before the interview, make sure you can explain Big O, arrays, two pointers, hash maps, sets and frequency counts, the two sum pattern, sorting algorithms and their complexities, binary search, heaps and priority queues, trees and binary search trees, tree traversals, graphs and their representations, and BFS and DFS.",
    },
  ],
};
