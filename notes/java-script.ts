import type { NoteData } from "@/lib/types";

export const javascriptNotes: NoteData = {
  title: "JavaScript Interview Prep",
  description:
    "A complete revision deck covering the JavaScript fundamentals interviewers actually ask about — from scoping and closures to the event loop and async patterns.",
  coverImage: "/images/javascript-logo.png",
  accent: "#f7df1e",
  topics: [
    "Core JavaScript",
    "Execution Model",
    "Asynchronous JavaScript",
    "Functions",
    "Objects",
    "Arrays",
    "ES6+",
  ],

  slides: [
    {
      title: "What is JavaScript?",
      content: `
JavaScript is a high-level, dynamically typed programming language.

• Used for frontend and backend development
• Runs in browsers and Node.js
• Single-threaded JavaScript execution
• Supports asynchronous and non-blocking operations

Interview Answer:
"JavaScript is a high-level programming language mainly used for web development. It runs in browsers and also on the backend using Node.js."
      `,
    },

    {
      title: "var, let and const",
      content: `
var
• Function scoped
• Can be redeclared
• Can be reassigned

let
• Block scoped
• Cannot be redeclared in the same scope
• Can be reassigned

const
• Block scoped
• Cannot be redeclared
• Cannot be reassigned

Best Practice:
Use const by default and let when the value needs to change.
      `,
      code: {
        language: "javascript",
        code: `var name = "Nihal";

let age = 24;
age = 25;

const role = "Developer";
// role = "Designer"; // Error`,
      },
    },

    {
      title: "Scope",
      content: `
Scope determines where variables can be accessed.

Main Types:
• Global Scope
• Function Scope
• Block Scope

var is function scoped.
let and const are block scoped.

Interview Answer:
"Scope defines where a variable is accessible in the program."
      `,
      code: {
        language: "javascript",
        code: `{
  let name = "Nihal";
  const role = "Developer";
}

console.log(name); // ReferenceError`,
      },
    },

    {
      title: "Hoisting",
      content: `
Hoisting means JavaScript processes declarations before executing the code.

var:
• Hoisted
• Initialized with undefined

let and const:
• Hoisted
• Not initialized immediately
• Stay in the Temporal Dead Zone until declaration

Interview Answer:
"var is hoisted and initialized with undefined, while let and const remain in the Temporal Dead Zone until initialization."
      `,
      code: {
        language: "javascript",
        code: `console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;`,
      },
    },

    {
      title: "Temporal Dead Zone",
      content: `
The Temporal Dead Zone (TDZ) is the period between entering a scope and initializing a let or const variable.

Accessing the variable during this period throws a ReferenceError.

Remember:
let and const are hoisted, but cannot be accessed before initialization.
      `,
      code: {
        language: "javascript",
        code: `console.log(name);
// ReferenceError

let name = "Nihal";`,
      },
    },

    {
      title: "Primitive vs Reference Types",
      content: `
Primitive values are copied by value.

Examples:
• string
• number
• boolean
• null
• undefined
• bigint
• symbol

Objects, arrays and functions behave as reference values.

Changing a referenced object can affect another variable pointing to the same object.
      `,
      code: {
        language: "javascript",
        code: `let a = 10;
let b = a;

b = 20;

console.log(a); // 10

const user1 = { name: "Nihal" };
const user2 = user1;

user2.name = "John";

console.log(user1.name); // John`,
      },
    },

    {
      title: "== vs ===",
      content: `
== compares values after type coercion.

=== compares both value and type without type coercion.

Best Practice:
Prefer === because the comparison is more predictable.
      `,
      code: {
        language: "javascript",
        code: `5 == "5";   // true

5 === "5";  // false`,
      },
    },

    {
      title: "null vs undefined",
      content: `
undefined:
Usually means a value has not been assigned.

null:
Usually represents an intentionally empty value.

Remember:
undefined → missing / not assigned
null → intentionally empty
      `,
      code: {
        language: "javascript",
        code: `let user;

console.log(user);
// undefined

const selectedUser = null;

console.log(selectedUser);
// null`,
      },
    },

    {
      title: "Functions",
      content: `
Functions are reusable blocks of code.

Common Types:
• Function declaration
• Function expression
• Arrow function

Function declarations are fully hoisted.

Arrow functions have different this behavior compared with regular functions.
      `,
      code: {
        language: "javascript",
        code: `function add(a, b) {
  return a + b;
}

const subtract = function (a, b) {
  return a - b;
};

const multiply = (a, b) => a * b;`,
      },
    },

    {
      title: "Arrow vs Regular Functions",
      content: `
Regular Function:
• Has its own this depending on how it is called
• Can be used as a constructor with new
• Has arguments object

Arrow Function:
• Does not create its own this
• Uses this from surrounding lexical scope
• Cannot be used as a constructor

Interview Tip:
The biggest difference commonly asked is how this behaves.
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",

  regular() {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this.name);
  }
};`,
      },
    },

    {
      title: "this Keyword",
      content: `
this refers to a context determined by how a regular function is called.

In an object method:
this usually refers to the object before the dot.

Arrow functions do not create their own this.
They inherit it from the surrounding scope.

Interview Answer:
"The value of this in a regular function depends on how the function is called, while arrow functions inherit this lexically."
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",

  getName() {
    return this.name;
  }
};

console.log(user.getName());
// Nihal`,
      },
    },

    {
      title: "Closure",
      content: `
A closure happens when a function retains access to variables from its outer lexical scope.

The variables remain accessible even after the outer function has completed.

Common Uses:
• Data privacy
• Counters
• Factory functions
• Callbacks

Interview Answer:
"A closure allows a function to remember variables from its outer scope even after the outer function has finished executing."
      `,
      code: {
        language: "javascript",
        code: `function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

counter(); // 1
counter(); // 2`,
      },
    },

    {
      title: "Callback Function",
      content: `
A callback is a function passed to another function.

The receiving function can execute the callback when needed.

Callbacks are commonly used with:
• Events
• Timers
• Array methods
• Asynchronous operations
      `,
      code: {
        language: "javascript",
        code: `function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Nihal", () => {
  console.log("Finished");
});`,
      },
    },

    {
      title: "Higher-Order Functions",
      content: `
A higher-order function is a function that:

• Accepts another function as an argument
OR
• Returns another function

Common examples:
• map()
• filter()
• reduce()
      `,
      code: {
        language: "javascript",
        code: `const numbers = [1, 2, 3];

const doubled = numbers.map(
  number => number * 2
);`,
      },
    },

    {
      title: "map()",
      content: `
map() transforms every element and returns a new array.

Use it when:
You want the same number of elements but with transformed values.

Remember:
map → transform
      `,
      code: {
        language: "javascript",
        code: `const numbers = [1, 2, 3];

const doubled = numbers.map(
  number => number * 2
);

console.log(doubled);
// [2, 4, 6]`,
      },
    },

    {
      title: "filter()",
      content: `
filter() returns a new array containing only elements that pass a condition.

Remember:
filter → select
      `,
      code: {
        language: "javascript",
        code: `const users = [
  { name: "A", active: true },
  { name: "B", active: false }
];

const activeUsers = users.filter(
  user => user.active
);`,
      },
    },

    {
      title: "reduce()",
      content: `
reduce() processes an array and produces one accumulated result.

The result could be:
• Number
• Object
• Array
• Any other value

Remember:
reduce → accumulate
      `,
      code: {
        language: "javascript",
        code: `const numbers = [1, 2, 3, 4];

const total = numbers.reduce(
  (sum, number) => sum + number,
  0
);

console.log(total);
// 10`,
      },
    },

    {
      title: "Spread Operator",
      content: `
The spread operator (...) expands values from arrays or objects.

Common Uses:
• Copy arrays
• Copy objects
• Merge objects
• Pass function arguments

Important:
Spread creates only a shallow copy.
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",
  age: 24
};

const updatedUser = {
  ...user,
  age: 25
};`,
      },
    },

    {
      title: "Rest Operator",
      content: `
Rest also uses ...

Instead of expanding values, rest collects multiple values together.

Spread → expands
Rest → collects
      `,
      code: {
        language: "javascript",
        code: `function sum(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}

sum(1, 2, 3);
// 6`,
      },
    },

    {
      title: "Destructuring",
      content: `
Destructuring extracts values from arrays or objects into variables.

It makes code shorter and easier to read.
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",
  age: 24
};

const { name, age } = user;

const numbers = [10, 20];

const [first, second] = numbers;`,
      },
    },

    {
      title: "Shallow vs Deep Copy",
      content: `
Shallow Copy:
Copies only the first level.

Nested objects can still share references.

Deep Copy:
Creates independent copies of nested values.

Modern JavaScript provides structuredClone() for many deep-cloning cases.
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",
  address: {
    city: "Bangalore"
  }
};

// Shallow
const copy = { ...user };

// Deep
const deepCopy = structuredClone(user);`,
      },
    },

    {
      title: "Synchronous vs Asynchronous",
      content: `
Synchronous:
Code executes one operation at a time in sequence.

Asynchronous:
An operation can start and complete later without blocking other work.

Common Async Operations:
• API requests
• Timers
• Database operations
• File operations

JavaScript uses the event loop to coordinate asynchronous work.
      `,
      code: {
        language: "javascript",
        code: `console.log("Start");

setTimeout(() => {
  console.log("Async");
}, 1000);

console.log("End");

// Start
// End
// Async`,
      },
    },

    {
      title: "Promise",
      content: `
A Promise represents the eventual result of an asynchronous operation.

Three States:
• Pending
• Fulfilled
• Rejected

.then() handles fulfillment.
.catch() handles rejection.
.finally() runs after settlement.
      `,
      code: {
        language: "javascript",
        code: `fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));`,
      },
    },

    {
      title: "async / await",
      content: `
async/await provides cleaner syntax for working with Promises.

async:
Makes a function return a Promise.

await:
Waits inside an async function for a Promise to settle before continuing that function.

Important:
await does not block the entire JavaScript thread.
      `,
      code: {
        language: "javascript",
        code: `async function getUsers() {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();

    return users;
  } catch (error) {
    console.error(error);
  }
}`,
      },
    },

    {
      title: "Promise.all()",
      content: `
Promise.all() waits for multiple Promises together.

Best when:
Operations are independent and all results are required.

Important:
If any Promise rejects, Promise.all() rejects.

Interview Answer:
"I use Promise.all when independent async operations can run concurrently and all of them must succeed."
      `,
      code: {
        language: "javascript",
        code: `const [users, jobs] = await Promise.all([
  getUsers(),
  getJobs()
]);`,
      },
    },

    {
      title: "Promise.allSettled()",
      content: `
Promise.allSettled() waits until every Promise has settled.

It does not fail immediately when one Promise rejects.

Each result tells whether it was:
• fulfilled
• rejected

Remember:
all → all must succeed
allSettled → wait for all results
      `,
      code: {
        language: "javascript",
        code: `const results = await Promise.allSettled([
  getUsers(),
  getJobs(),
  getApplications()
]);`,
      },
    },

    {
      title: "Call Stack",
      content: `
The Call Stack keeps track of functions currently being executed.

When a function is called:
It is pushed onto the stack.

When it finishes:
It is removed from the stack.

JavaScript executes synchronous code through the call stack.

Remember:
LIFO → Last In, First Out
      `,
      code: {
        language: "javascript",
        code: `function second() {
  console.log("Second");
}

function first() {
  second();
}

first();

// Stack:
// first()
// second()`,
      },
    },

    {
      title: "Event Loop ⭐",
      content: `
The Event Loop coordinates asynchronous work with JavaScript's execution.

Simple Flow:

1. Synchronous JavaScript runs on the Call Stack
2. Async work is handled outside the Call Stack by the host/runtime
3. When async work completes, its callback/task becomes ready in a queue
4. The Event Loop checks when the Call Stack can continue with queued work
5. Ready callbacks are eventually executed on the Call Stack

Interview Answer:
"JavaScript executes code on a single call stack. Async operations are handled by the runtime. When they complete, their callbacks are queued, and the event loop coordinates when that queued work can execute on the call stack."
      `,
      code: {
        language: "javascript",
        code: `console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");

// Start
// End
// Timer`,
      },
    },

    {
      title: "Microtask vs Task Queue",
      content: `
Async callbacks do not all have the same priority.

Microtasks include:
• Promise callbacks
• queueMicrotask()

Tasks include:
• setTimeout()
• setInterval()

After current synchronous code completes, microtasks are processed before the next task.

Common Interview Question:
Why does a Promise callback run before setTimeout(..., 0)?
      `,
      code: {
        language: "javascript",
        code: `console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Start
// End
// Promise
// Timer`,
      },
    },

    {
      title: "setTimeout(..., 0)",
      content: `
setTimeout(fn, 0) does NOT mean the function executes immediately.

It means the callback becomes eligible to run after the minimum delay.

It still waits until:
• Current synchronous code finishes
• Higher-priority queued work is handled
• The event loop can process the task
      `,
      code: {
        language: "javascript",
        code: `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

// A
// C
// B`,
      },
    },

    {
      title: "Error Handling",
      content: `
try/catch is used to handle errors.

With async/await, place awaited operations inside try/catch when you want to handle rejection locally.

finally executes whether the operation succeeds or fails.
      `,
      code: {
        language: "javascript",
        code: `async function getData() {
  try {
    const response = await fetch("/api/data");
    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Completed");
  }
}`,
      },
    },

    {
      title: "Optional Chaining",
      content: `
Optional chaining ?. safely accesses nested properties.

If the value before ?. is null or undefined, JavaScript returns undefined instead of throwing an error.
      `,
      code: {
        language: "javascript",
        code: `const user = {};

console.log(
  user.address?.city
);

// undefined`,
      },
    },

    {
      title: "Nullish Coalescing",
      content: `
The ?? operator provides a fallback only when the value is null or undefined.

This differs from ||, which also treats values like 0, false and "" as falsy.
      `,
      code: {
        language: "javascript",
        code: `const count = 0;

console.log(count || 10);
// 10

console.log(count ?? 10);
// 0`,
      },
    },

    {
      title: "Debouncing",
      content: `
Debouncing waits until repeated activity stops before executing a function.

Common Example:
Search input

Instead of calling an API for every keystroke, wait until the user stops typing.

Common Uses:
• Search
• Form validation
• Autocomplete

Remember:
Debounce → wait until activity stops
      `,
      code: {
        language: "javascript",
        code: `function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}`,
      },
    },

    {
      title: "Throttling",
      content: `
Throttling limits how frequently a function can execute.

Even if an event fires many times, the function runs only at controlled intervals.

Common Uses:
• Scroll
• Resize
• Mouse movement

Remember:
Debounce → wait until activity stops
Throttle → limit execution frequency
      `,
      code: {
        language: "javascript",
        code: `function throttle(fn, delay) {
  let waiting = false;

  return (...args) => {
    if (waiting) return;

    fn(...args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}`,
      },
    },

    {
      title: "JavaScript Interview Checklist",
      content: `
🔥 MUST KNOW

• Event Loop
• Call Stack
• Microtasks vs Tasks
• Promise
• async / await
• Promise.all vs Promise.allSettled
• Closure
• Scope
• Hoisting
• var / let / const
• this
• Arrow vs Regular Functions
• map / filter / reduce

⭐ ALSO REVISE

• Primitive vs Reference
• == vs ===
• Spread / Rest
• Destructuring
• Shallow vs Deep Copy
• Optional Chaining
• Nullish Coalescing
• Debounce / Throttle

Interview Rule:

Don't try to give a long answer.

Use:
1. Definition
2. How it works
3. Small example

Aim for a clear 20–30 second explanation.
      `,
    },
  ],
};
