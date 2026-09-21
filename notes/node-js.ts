import type { NoteData } from "@/lib/types";

export const nodejsNotes: NoteData = {
  title: "Node.js Interview Notes",
  description:
    "A practical revision deck covering the Node.js runtime, the event loop, Express, REST APIs, auth, databases and the topics that come up most in backend interviews.",
  coverImage: "/images/nodejs-logo.svg",
  accent: "#5fa04e",

  topics: [
    "Node.js Basics",
    "Event Loop",
    "Async Programming",
    "Modules",
    "Express.js",
    "REST APIs",
    "Authentication",
    "Database",
    "Error Handling",
    "Performance",
    "Security",
  ],

  slides: [
    {
      title: "What is Node.js?",
      content:
        "Node.js is a JavaScript runtime that allows us to run JavaScript outside the browser. It is mainly used for building backend APIs and server-side applications.",

      code: {
        language: "javascript",
        code: `console.log("Hello from Node.js");`,
      },
    },

    {
      title: "Node.js Architecture",
      content:
        "Node.js uses the V8 engine to execute JavaScript. It uses libuv to handle asynchronous operations and the event loop.",

      code: {
        language: "text",
        code: `JavaScript
   ↓
V8 Engine
   ↓
Node.js
   ↓
libuv + Event Loop
   ↓
Async I/O`,
      },
    },

    {
      title: "Why Node.js?",
      content:
        "Node.js is useful for applications that handle many concurrent requests, especially APIs and real-time applications. It uses non-blocking I/O, so one slow operation does not block other requests.",

      code: {
        language: "javascript",
        code: `app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});`,
      },
    },

    {
      title: "Node.js Event Loop",
      content:
        "The event loop allows Node.js to handle asynchronous operations without blocking the main JavaScript thread. When an async operation completes, its callback is executed when the call stack is available.",

      code: {
        language: "javascript",
        code: `console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Output:
// 1
// 3
// 2`,
      },
    },

    {
      title: "Blocking vs Non-Blocking",
      content:
        "Blocking code waits until an operation finishes. Non-blocking code starts the operation and allows Node.js to continue executing other work.",

      code: {
        language: "javascript",
        code: `// Non-blocking
fs.readFile("file.txt", (err, data) => {
  console.log(data);
});

console.log("Continue");`,
      },
    },

    {
      title: "Callbacks",
      content:
        "A callback is a function passed to another function and executed later, usually after an asynchronous operation completes.",

      code: {
        language: "javascript",
        code: `fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data.toString());
});`,
      },
    },

    {
      title: "Promises in Node.js",
      content:
        "A Promise represents the future result of an asynchronous operation. It can be pending, fulfilled, or rejected.",

      code: {
        language: "javascript",
        code: `const result = fetchData();

result
  .then(data => console.log(data))
  .catch(error => console.log(error));`,
      },
    },

    {
      title: "Async / Await",
      content:
        "async/await makes Promise-based code easier to read. await pauses that async function until the Promise is resolved or rejected.",

      code: {
        language: "javascript",
        code: `async function getUser() {
  try {
    const user = await getUserFromDB();
    return user;
  } catch (error) {
    console.log(error);
  }
}`,
      },
    },

    {
      title: "Promise.all()",
      content:
        "Promise.all() runs multiple independent Promises together. It succeeds only when all Promises succeed. If one fails, the whole Promise.all() rejects.",

      code: {
        language: "javascript",
        code: `const [users, jobs] = await Promise.all([
  getUsers(),
  getJobs(),
]);`,
      },
    },

    {
      title: "Promise.allSettled()",
      content:
        "Promise.allSettled() waits for every Promise, even if some fail. It gives the status and result of each operation.",

      code: {
        language: "javascript",
        code: `const results = await Promise.allSettled([
  getUsers(),
  getJobs(),
]);`,
      },
    },

    {
      title: "Node.js Modules",
      content:
        "Modules allow us to split code into separate files. Node.js supports CommonJS and ES Modules.",

      code: {
        language: "javascript",
        code: `// CommonJS
const express = require("express");

// ES Module
import express from "express";`,
      },
    },

    {
      title: "CommonJS vs ES Modules",
      content:
        "CommonJS uses require() and module.exports. ES Modules use import and export.",

      code: {
        language: "javascript",
        code: `// CommonJS
module.exports = user;
const user = require("./user");

// ES Module
export default user;
import user from "./user";`,
      },
    },

    {
      title: "npm",
      content:
        "npm is the package manager commonly used with Node.js. It is used to install, manage, and publish packages.",

      code: {
        language: "bash",
        code: `npm install express
npm install
npm run dev`,
      },
    },

    {
      title: "package.json",
      content:
        "package.json contains information about the project, dependencies, scripts, and other configuration.",

      code: {
        language: "json",
        code: `{
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  }
}`,
      },
    },

    {
      title: "Environment Variables",
      content:
        "Environment variables are used to store configuration values such as database URLs, API keys, and secrets.",

      code: {
        language: "javascript",
        code: `const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;`,
      },
    },

    {
      title: "Express.js",
      content:
        "Express.js is a popular Node.js framework used to build web servers and REST APIs.",

      code: {
        language: "javascript",
        code: `import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({ message: "Users" });
});

app.listen(3000);`,
      },
    },

    {
      title: "Middleware",
      content:
        "Middleware is a function that runs between the request and the final response. It can be used for authentication, logging, validation, and more.",

      code: {
        language: "javascript",
        code: `app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});`,
      },
    },

    {
      title: "Request and Response",
      content:
        "req contains information about the incoming request. res is used to send a response back to the client.",

      code: {
        language: "javascript",
        code: `app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({ id });
});`,
      },
    },

    {
      title: "REST API",
      content:
        "A REST API allows the frontend and backend to communicate using HTTP methods such as GET, POST, PATCH, and DELETE.",

      code: {
        language: "http",
        code: `GET    /users
POST   /users
PATCH  /users/:id
DELETE /users/:id`,
      },
    },

    {
      title: "HTTP Status Codes",
      content:
        "Status codes tell the client what happened with the request.",

      code: {
        language: "text",
        code: `200 → Success
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error`,
      },
    },

    {
      title: "JWT Authentication",
      content:
        "JWT is commonly used for authentication. After login, the server generates a token and the client sends that token with future requests.",

      code: {
        language: "javascript",
        code: `const token = jwt.sign(
  { sub: user.id },
  process.env.JWT_SECRET
);`,
      },
    },

    {
      title: "Authentication vs Authorization",
      content:
        "Authentication checks who the user is. Authorization checks what the user is allowed to do.",

      code: {
        language: "text",
        code: `Authentication → Who are you?
Authorization  → What can you access?`,
      },
    },

    {
      title: "Password Hashing",
      content:
        "Passwords should never be stored as plain text. Libraries such as bcrypt can hash passwords before storing them.",

      code: {
        language: "javascript",
        code: `const hash = await bcrypt.hash(
  password,
  10
);

const valid = await bcrypt.compare(
  password,
  hash
);`,
      },
    },

    {
      title: "Error Handling",
      content:
        "Errors should be handled properly so the API can return meaningful responses instead of crashing unexpectedly.",

      code: {
        language: "javascript",
        code: `try {
  const user = await getUser();
  return user;
} catch (error) {
  console.error(error);
  throw new Error("Failed to get user");
}`,
      },
    },

    {
      title: "Global Error Handler",
      content:
        "In Express, a global error middleware can handle errors from different routes in one place.",

      code: {
        language: "javascript",
        code: `app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});`,
      },
    },

    {
      title: "Database Connection",
      content:
        "Node.js applications commonly connect to databases such as MongoDB, PostgreSQL, or MySQL using database drivers or ORMs.",

      code: {
        language: "javascript",
        code: `await mongoose.connect(
  process.env.MONGO_URI
);`,
      },
    },

    {
      title: "Database Indexing",
      content:
        "Indexes improve query performance by allowing the database to find data faster instead of scanning every document.",

      code: {
        language: "javascript",
        code: `db.users.createIndex({
  email: 1
});`,
      },
    },

    {
      title: "Caching with Redis",
      content:
        "Redis can store frequently requested data in memory. This can reduce database calls and improve response time.",

      code: {
        language: "javascript",
        code: `const cached = await redis.get("users");

if (cached) {
  return JSON.parse(cached);
}`,
      },
    },

    {
      title: "Scaling Node.js",
      content:
        "A Node.js process mainly runs JavaScript on a single thread. For CPU-heavy workloads or multiple CPU cores, Node.js can use worker threads or multiple processes.",

      code: {
        language: "javascript",
        code: `import cluster from "node:cluster";

if (cluster.isPrimary) {
  cluster.fork();
} else {
  startServer();
}`,
      },
    },

    {
      title: "Streams",
      content:
        "Streams process data piece by piece instead of loading the entire data into memory. They are useful for large files and data transfers.",

      code: {
        language: "javascript",
        code: `const stream = fs.createReadStream(
  "large-file.txt"
);

stream.pipe(res);`,
      },
    },

    {
      title: "Buffer",
      content:
        "Buffer is used to work with binary data in Node.js, such as files, images, and network data.",

      code: {
        language: "javascript",
        code: `const buffer = Buffer.from("Hello");

console.log(buffer);`,
      },
    },

    {
      title: "EventEmitter",
      content:
        "EventEmitter allows objects to emit events and other parts of the application to listen for those events.",

      code: {
        language: "javascript",
        code: `import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

emitter.on("userCreated", () => {
  console.log("User created");
});

emitter.emit("userCreated");`,
      },
    },

    {
      title: "Node.js Security Basics",
      content:
        "Validate input, hash passwords, protect secrets, use authentication and authorization, rate-limit APIs, and avoid trusting client input.",

      code: {
        language: "text",
        code: `Validate input
Hash passwords
Protect secrets
Use HTTPS
Authentication
Authorization
Rate limiting`,
      },
    },

    {
      title: "Node.js Interview Checklist",
      content:
        "Before the interview, make sure you can explain these topics clearly: Node.js runtime, event loop, non-blocking I/O, callbacks, Promises, async/await, Express, middleware, REST APIs, JWT, error handling, databases, Redis, streams, and scaling.",
    },
  ],
};