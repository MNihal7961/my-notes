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
        "Node.js is a JavaScript runtime that lets you run JavaScript outside the browser, for example on a server. It is built on Google's V8 engine and is mainly used to build backend APIs and server-side apps.",

      code: {
        language: "javascript",
        code: `console.log("Hello from Node.js");`,
      },
    },

    {
      title: "Node.js Architecture",
      content:
        "Node.js runs JavaScript using the V8 engine, the same engine Chrome uses. It also uses a library called libuv, which handles the event loop and async work like file access and network calls.",

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
        "Node.js is a good fit for apps that handle many requests at once, like APIs and real-time apps. It uses non-blocking I/O, so a slow operation, like a database call, does not stop other requests from being handled.",

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
        "The event loop lets Node.js handle many things at once without blocking the main thread. When an async task, like a timer or a file read, finishes, its callback is queued up and runs once the currently running code is done.",

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
      title: "Microtasks vs Macrotasks",
      content:
        "Promises (and queueMicrotask) go into the microtask queue. Timers like setTimeout go into the macrotask queue. Node.js always finishes all pending microtasks before moving on to the next macrotask, so a resolved Promise usually runs before a setTimeout callback, even one with a 0ms delay.",

      code: {
        language: "javascript",
        code: `console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output:
// 1
// 4
// 3
// 2`,
      },
    },

    {
      title: "Blocking vs Non-Blocking",
      content:
        "Blocking code stops everything until an operation finishes. Non-blocking code starts the operation and lets Node.js keep doing other work while it waits.",

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
        "A callback is a function you pass into another function, to be run later, usually after an async operation finishes. This works fine for one or two calls, but nesting many callbacks inside each other gets hard to read, a problem often called callback hell.",

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
        "A Promise stands in for a value that isn't ready yet. It starts out pending, and then settles as either fulfilled (success) or rejected (failure).",

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
        "async/await is a cleaner way to write Promise-based code. Inside an async function, await pauses that function until the Promise resolves or rejects, without blocking the rest of the app.",

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
        "Promise.all() runs multiple independent Promises at the same time and waits for all of them. It resolves only when every Promise succeeds. If even one fails, the whole Promise.all() rejects right away.",

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
        "Promise.allSettled() also runs multiple Promises together, but it waits for all of them to finish no matter what. It gives you the status and result (or error) of each one, instead of stopping at the first failure.",

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
        "Modules let you split your code into separate files and reuse pieces of it. Node.js supports two module systems: CommonJS, the original one, and ES Modules, the modern JavaScript standard.",

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
        "CommonJS uses require() to import and module.exports to export. ES Modules use the import and export keywords. To use ES Modules in Node.js, you usually set \"type\": \"module\" in package.json.",

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
        "npm (Node Package Manager) is the tool most people use to install and manage packages in a Node.js project. It comes bundled with Node.js and also lets you run scripts and publish your own packages.",

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
        "package.json holds information about your project: its name, version, dependencies, and scripts you can run. Almost every Node.js project has one at its root folder.",

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
        "Environment variables store config values outside your code, like database URLs, API keys, and secrets. Node.js reads them from process.env, and a package like dotenv can load them from a .env file during development.",

      code: {
        language: "javascript",
        code: `const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;`,
      },
    },

    {
      title: "Express.js",
      content:
        "Express.js is the most popular Node.js framework for building web servers and REST APIs. It takes care of routing, requests, and responses so you don't have to handle raw HTTP yourself.",

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
        "Middleware is a function that runs between the incoming request and the final response. It's used for things like authentication, logging, and validating input. Middleware must call next() to pass control on, otherwise the request just hangs.",

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
        "req holds information about the incoming request, like params, query, and body. res is used to send data back to the client, for example with res.json() or res.status().",

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
        "A REST API lets the frontend and backend talk over HTTP. Each resource gets its own URL, and you use HTTP methods like GET, POST, PUT/PATCH, and DELETE to read, create, update, and delete data.",

      code: {
        language: "http",
        code: `GET    /users
POST   /users
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id`,
      },
    },

    {
      title: "HTTP Status Codes",
      content:
        "Status codes tell the client what happened with a request. As a rule of thumb: 2xx means success, 4xx means the client made a mistake, and 5xx means something went wrong on the server.",

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
        "JWT (JSON Web Token) is commonly used for stateless authentication. After login, the server signs a token and sends it to the client. The client sends that token with future requests, and the server verifies it instead of looking up a session in a database.",

      code: {
        language: "javascript",
        code: `const token = jwt.sign(
  { sub: user.id },
  process.env.JWT_SECRET
);

const payload = jwt.verify(
  token,
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
        "Never store passwords as plain text. Use a library like bcrypt to hash the password before saving it, and compare hashes at login instead of comparing raw passwords.",

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
        "Handle errors properly so your API can send back a clear response instead of crashing. Wrap risky code in try/catch, and always send a proper status code with a useful error message.",

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
        "In Express, you can add one error-handling middleware at the end of your file to catch errors from any route in one place. It takes four arguments, (err, req, res, next), which is how Express knows it's an error handler and not regular middleware.",

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
        "Node.js apps commonly connect to databases like MongoDB, PostgreSQL, or MySQL, using a database driver or an ORM/ODM such as Mongoose or Prisma.",

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
        "An index helps the database find data faster, instead of scanning every row or document. Indexes speed up reads, but they take up extra storage and slow down writes a little, since each index has to be updated too.",

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
        "Redis is an in-memory data store, often used as a cache. It can store frequently requested data in memory so you don't have to hit the main database every time, which speeds up response times.",

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
        "A Node.js process runs your JavaScript on a single thread. To use more CPU cores, you can run multiple processes with the cluster module, or use worker threads for CPU-heavy tasks so they don't block the main thread.",

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
      title: "Cluster vs Worker Threads",
      content:
        "The cluster module forks multiple copies of your whole Node.js process, each with its own event loop, so you can handle more incoming requests across CPU cores. Worker threads run JavaScript in a separate thread inside the same process and can share memory, which makes them better suited for CPU-heavy work like image processing or big calculations.",

      code: {
        language: "javascript",
        code: `import { Worker } from "node:worker_threads";

const worker = new Worker("./heavy-task.js");

worker.on("message", (result) => {
  console.log(result);
});`,
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
        "Buffer is used to work with raw binary data in Node.js, such as files, images, and network data. It's like a fixed-size array of bytes that lives outside the regular JavaScript heap.",

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
        "Always validate and sanitize user input. Hash passwords before storing them, and keep secrets like API keys out of your code by using environment variables. Use HTTPS in production, add rate limiting to prevent abuse, and never trust data coming from the client.",

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
        "Before the interview, make sure you can clearly explain: the Node.js runtime and event loop, non-blocking I/O, callbacks, Promises, and async/await. Also review Express, middleware, REST APIs, JWT auth, error handling, databases, Redis caching, streams, and scaling with cluster and worker threads.",
    },
  ],
};