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

• Used to build both frontend and backend apps
• Runs in browsers and in Node.js
• Executes code on a single thread (one thing at a time)
• Can still handle async work like timers and API calls without blocking

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
• When declared globally, it becomes a property on the global object (window in browsers)

let
• Block scoped
• Cannot be redeclared in the same scope
• Can be reassigned

const
• Block scoped
• Cannot be redeclared
• Cannot be reassigned (but the contents of an object or array it points to can still change)

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
Scope decides where in your code a variable can be used.

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
Hoisting means JavaScript moves declarations to the top of their scope before running the code.

var:
• Hoisted
• Set to undefined until the line where it's assigned

let and const:
• Hoisted
• Not usable until their declaration line
• Stay in the Temporal Dead Zone until then

function declarations:
• Hoisted completely, body included — so they can be called before they appear in the file

Interview Answer:
"var is hoisted and set to undefined, while let and const are hoisted too but stay in the Temporal Dead Zone until they're declared."
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
The Temporal Dead Zone (TDZ) is the time between entering a scope and the line where a let or const variable is actually declared.

Trying to use the variable during this time throws a ReferenceError.

Remember:
let and const are hoisted, but you can't touch them before their declaration line.
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
Primitive values are copied by value — each variable gets its own independent copy.

Examples:
• string
• number
• boolean
• null
• undefined
• bigint
• symbol

Primitives are also immutable. You can't change a string or number in place, only reassign the variable to a new value.

Objects, arrays and functions are reference types. The variable stores a reference (like an address) to the value, not the value itself.

Copying a reference just copies the address, so both variables end up pointing to the same object.
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
== compares values after converting them to the same type (type coercion).

=== compares both the value and the type, with no conversion.

Gotcha:
null == undefined is true, but null === undefined is false.

Best Practice:
Prefer === because the result is more predictable.
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
A variable has been declared but hasn't been given a value yet. JavaScript sets this automatically.

null:
The value is empty on purpose — a developer set it that way.

Gotcha:
typeof null returns "object". This is a well-known bug in JavaScript that was never fixed, to avoid breaking old code.

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

Function declarations are fully hoisted, so they can be called before they appear in the code.

Function expressions and arrow functions behave like variables — they aren't usable before the line that defines them.
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
• Gets its own this, based on how it's called
• Can be used as a constructor with new
• Has access to the arguments object

Arrow Function:
• Does not get its own this
• Uses this from the surrounding (lexical) scope
• Cannot be used as a constructor
• Has no arguments object

Interview Tip:
The biggest difference interviewers ask about is how this behaves.
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
};

user.regular(); // "Nihal"
user.arrow();   // undefined (this isn't "user" here)`,
      },
    },

    {
      title: "this Keyword",
      content: `
this refers to whatever object is "in control" when a regular function runs — it depends on how the function was called, not where it was written.

In an object method:
this usually refers to the object before the dot.

Arrow functions don't get their own this.
They use this from the scope they were written in.

Interview Answer:
"The value of this in a regular function depends on how the function is called, while arrow functions inherit this from their surrounding scope."
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
      title: "call, apply and bind",
      content: `
call, apply and bind all let you control what this points to inside a function.

call(thisArg, arg1, arg2, ...)
• Runs the function right away
• Arguments are passed one at a time

apply(thisArg, [arg1, arg2, ...])
• Runs the function right away
• Arguments are passed as an array

bind(thisArg, arg1, ...)
• Does NOT run the function
• Returns a new function with this permanently set, to call later

Interview Answer:
"call and apply run the function immediately with a given this — they only differ in how arguments are passed. bind returns a new function for later use."
      `,
      code: {
        language: "javascript",
        code: `const user = { name: "Nihal" };

function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

greet.call(user, "Hi");     // Hi, Nihal
greet.apply(user, ["Hi"]);  // Hi, Nihal

const boundGreet = greet.bind(user);
boundGreet("Hello");        // Hello, Nihal`,
      },
    },

    {
      title: "Prototypes & Inheritance",
      content: `
Every JavaScript object has a hidden link to another object, called its prototype.

If a property isn't found directly on an object, JavaScript looks up the prototype chain until it finds it (or reaches null).

This is how objects "inherit" behavior — for example, array.map() actually lives on Array.prototype, not on the array itself.

class syntax:
Modern JavaScript classes are mostly a cleaner way to write this same prototype-based inheritance.

Interview Answer:
"JavaScript uses prototypal inheritance. Every object has a hidden link to another object, and property lookups walk up this prototype chain until they find a match."
      `,
      code: {
        language: "javascript",
        code: `const animal = {
  speak() {
    console.log(this.name + " makes a sound");
  }
};

const dog = Object.create(animal);
dog.name = "Rex";

dog.speak();
// Rex makes a sound (speak is found on the prototype)`,
      },
    },

    {
      title: "Closure",
      content: `
A closure happens when a function "remembers" the variables from the scope it was created in, even after that outer function has already finished running.

Common Uses:
• Keeping data private
• Counters
• Factory functions
• Callbacks

Interview Answer:
"A closure lets a function remember variables from its outer scope, even after that outer function has already returned."
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
A callback is a function you pass into another function, so it can be run later.

The function that receives it decides when — or if — to run it.

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
A higher-order function is a function that does at least one of these:

• Takes another function as an argument
• Returns a function

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
map() runs a function on every element and returns a new array with the results.

Use it when:
You need the same number of elements, just transformed.

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
filter() returns a new array with only the elements that pass a test (a function that returns true or false).

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
reduce() goes through an array and boils it down to a single value.

That value could be:
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
The spread operator (...) unpacks values from an array or object.

Common Uses:
• Copy arrays
• Copy objects
• Merge objects
• Pass array items as function arguments

Important:
Spread only makes a shallow copy — nested objects are still shared with the original.
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
Rest also uses the ... syntax, but it does the opposite of spread.

Instead of unpacking values, it gathers multiple values into one array.

Spread → unpacks
Rest → gathers
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
Destructuring pulls values out of arrays or objects and puts them straight into variables.

It makes code shorter and easier to read.

You can also rename variables and give them default values while destructuring.
      `,
      code: {
        language: "javascript",
        code: `const user = {
  name: "Nihal",
  age: 24
};

const { name, age } = user;

const { name: userName = "Guest" } = user;
// userName is "Nihal"

const numbers = [10, 20];

const [first, second] = numbers;`,
      },
    },

    {
      title: "Shallow vs Deep Copy",
      content: `
Shallow Copy:
Copies only the top level of an object.

Any nested objects inside are still shared with the original.

Deep Copy:
Makes a fully independent copy, including everything nested inside.

Modern JavaScript has structuredClone() built in for most deep-cloning needs.
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
Code runs one line at a time, in order. Each line waits for the one before it to finish.

Asynchronous:
An operation can start now and finish later, without blocking the rest of the code.

Common Async Operations:
• API requests
• Timers
• Database operations
• File operations

JavaScript uses the event loop to manage this async work.
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
A Promise represents a value that isn't ready yet but will be at some point — like the result of an API call.

Three States:
• Pending — still waiting
• Fulfilled — succeeded
• Rejected — failed

.then() runs when the promise succeeds.
.catch() runs when it fails.
.finally() runs either way, once the promise has settled.

You can also create your own promise with new Promise((resolve, reject) => { ... }).
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
async/await is a cleaner way to write code that uses Promises.

async:
Marks a function so it always returns a Promise.

await:
Pauses that function until the Promise settles, then continues with the result.

Important:
await only pauses the async function it's inside — it does not block the rest of the JavaScript thread.
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
Promise.all() runs multiple promises at the same time and waits for all of them to finish.

Best when:
The operations don't depend on each other, and you need every result.

Important:
If even one promise rejects, Promise.all() immediately rejects too.

Interview Answer:
"I use Promise.all when independent async operations can run at the same time and all of them need to succeed."
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
Promise.allSettled() waits for every promise to finish, whether it succeeds or fails.

It never rejects early — you always get a result back for each promise.

Each result tells you whether it was:
• fulfilled
• rejected

Remember:
all → stops early if one fails
allSettled → always waits for every result
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
The Call Stack keeps track of which function is currently running.

When a function is called:
It gets pushed onto the stack.

When it finishes:
It gets popped off the stack.

JavaScript runs synchronous code through this stack, one function at a time.

If functions keep calling each other too deeply (like infinite recursion), the stack runs out of room and throws a "Maximum call stack size exceeded" error — a stack overflow.

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
The Event Loop is what lets JavaScript handle async work even though it only has one call stack.

Simple Flow:

1. Synchronous code runs first, on the Call Stack
2. Async work (timers, network requests, etc.) is handled outside the Call Stack, by the browser or Node.js
3. When that async work finishes, its callback is placed in a queue
4. The Event Loop waits until the Call Stack is empty
5. Then it takes callbacks from the queue and runs them on the Call Stack

Interview Answer:
"JavaScript runs on a single call stack. Async operations are handled outside that stack by the runtime. Once they finish, their callbacks go into a queue, and the event loop moves them onto the call stack once it's empty."
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
Not all async callbacks have the same priority.

Microtasks include:
• Promise callbacks (.then, .catch, .finally)
• queueMicrotask()

Tasks (sometimes called macrotasks) include:
• setTimeout()
• setInterval()

After the current synchronous code finishes, JavaScript runs ALL pending microtasks before it moves on to the next task.

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
setTimeout(fn, 0) does NOT run the function immediately.

It just means the callback is ready to run as soon as possible, after the minimum delay.

It still has to wait for:
• The current synchronous code to finish
• All pending microtasks to run
• The event loop to reach it in the queue
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
try/catch is used to handle errors so your program doesn't crash.

With async/await, wrap your awaited code in try/catch to handle a rejected promise right where it happens.

finally always runs, whether the code succeeded or threw an error.
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
Optional chaining (?.) safely reads a nested property without crashing.

If the value before ?. is null or undefined, JavaScript stops right there and returns undefined instead of throwing an error.

It also works for calling functions that might not exist, like user.greet?.()
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
The ?? operator gives you a fallback value, but only when the original value is null or undefined.

This is different from ||, which also treats 0, false, and "" (empty string) as falsy and replaces them too.
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
Debouncing waits until repeated activity stops for a moment, then runs the function once.

Common Example:
A search input box.

Instead of calling an API on every single keystroke, wait until the user stops typing.

Common Uses:
• Search
• Form validation
• Autocomplete

Remember:
Debounce → wait until things go quiet
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
Throttling limits how often a function can run, no matter how many times it's triggered.

Even if an event fires constantly, the function only runs at set intervals.

Common Uses:
• Scroll
• Resize
• Mouse movement

Remember:
Debounce → wait until activity stops
Throttle → limit how often it runs
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
• call / apply / bind
• Prototypes & Inheritance

Interview Rule:

Don't give a long answer.

Use:
1. Definition
2. How it works
3. Small example

Aim for a clear 20–30 second explanation.
      `,
    },
  ],
};
