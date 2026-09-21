import type { NoteData } from "@/lib/types";

export const mongodbNotes: NoteData = {
  title: "MongoDB Interview Notes",
  description:
    "A revision deck covering MongoDB documents, CRUD, indexes, aggregation, schema design and how it's used from Node.js — the questions that come up most in backend interviews.",
  coverImage: "/images/mongodb-logo.svg",
  accent: "#47a248",

  topics: [
    "MongoDB Basics",
    "Documents & Collections",
    "CRUD Operations",
    "Query Operators",
    "Indexes",
    "Aggregation",
    "Relationships",
    "Transactions",
    "Replication & Sharding",
    "Schema Design",
    "Performance",
    "MongoDB with Node.js",
  ],

  slides: [
    {
      title: "What is MongoDB?",
      content:
        "MongoDB is a NoSQL document database. Instead of storing data in rows and tables like SQL, it stores each record as a BSON document inside a collection.",

      code: {
        language: "json",
        code: `{
  "_id": "123",
  "name": "Nihal",
  "role": "Developer"
}`,
      },
    },

    {
      title: "Database, Collection & Document",
      content:
        "A database contains collections. A collection contains documents. A document is similar to a row in a relational database.",

      code: {
        language: "text",
        code: `Database
  ↓
Collection
  ↓
Document`,
      },
    },

    {
      title: "MongoDB Document",
      content:
        "MongoDB documents are JSON-like objects made of key-value pairs. MongoDB stores them internally as BSON, so a document can hold nested objects and arrays, and different documents in the same collection don't need to have the same fields.",

      code: {
        language: "json",
        code: `{
  "_id": "user123",
  "name": "Nihal",
  "age": 24,
  "skills": [
    "React",
    "Node.js",
    "MongoDB"
  ]
}`,
      },
    },

    {
      title: "BSON",
      content:
        "BSON stands for Binary JSON. It's a binary-encoded format, so MongoDB can scan and parse it faster than plain text JSON. It also supports extra data types that JSON doesn't have, like Date and ObjectId.",

      code: {
        language: "text",
        code: `JSON → Data format
BSON → Binary representation used by MongoDB`,
      },
    },

    {
      title: "CRUD Operations",
      content:
        "CRUD means Create, Read, Update, and Delete. These are the basic database operations.",

      code: {
        language: "javascript",
        code: `// Create
db.users.insertOne({ name: "Nihal" });

// Read
db.users.find({ name: "Nihal" });

// Update
db.users.updateOne(
  { name: "Nihal" },
  { $set: { age: 24 } }
);

// Delete
db.users.deleteOne({ name: "Nihal" });`,
      },
    },

    {
      title: "find()",
      content:
        "find() returns all documents that match a condition, as a cursor. You can chain methods like sort(), skip(), and limit() onto the result.",

      code: {
        language: "javascript",
        code: `db.users.find({
  age: { $gt: 20 }
});`,
      },
    },

    {
      title: "findOne()",
      content:
        "findOne() returns the first document that matches a condition, or null if nothing matches.",

      code: {
        language: "javascript",
        code: `db.users.findOne({
  email: "nihal@example.com"
});`,
      },
    },

    {
      title: "Insert Documents",
      content:
        "insertOne() adds one document. insertMany() adds multiple documents.",

      code: {
        language: "javascript",
        code: `db.users.insertOne({
  name: "Nihal",
  role: "Developer"
});

db.users.insertMany([
  { name: "A" },
  { name: "B" }
]);`,
      },
    },

    {
      title: "Update Documents",
      content:
        "updateOne() updates the first matching document. updateMany() updates all matching documents. Both need an update operator like $set — without one, MongoDB would try to replace the whole document.",

      code: {
        language: "javascript",
        code: `db.users.updateOne(
  { _id: userId },
  {
    $set: {
      role: "Senior Developer"
    }
  }
);`,
      },
    },

    {
      title: "Delete Documents",
      content:
        "deleteOne() removes one matching document. deleteMany() removes multiple matching documents.",

      code: {
        language: "javascript",
        code: `db.users.deleteOne({
  _id: userId
});`,
      },
    },

    {
      title: "Query Operators",
      content:
        "MongoDB provides comparison operators for filtering documents: $eq, $ne, $gt, $gte, $lt, $lte for comparisons, and $in / $nin to match against a list of values.",

      code: {
        language: "javascript",
        code: `db.users.find({
  age: { $gte: 18, $lte: 30 },
  role: { $in: ["admin", "manager"] },
  status: { $ne: "banned" }
});`,
      },
    },

    {
      title: "Logical Operators",
      content:
        "Logical operators combine multiple conditions in a query. The main ones are $and, $or, $not, and $nor.",

      code: {
        language: "javascript",
        code: `db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { active: true }
  ]
});

db.users.find({
  $or: [
    { role: "admin" },
    { role: "manager" }
  ]
});`,
      },
    },

    {
      title: "Projection",
      content:
        "Projection lets you choose which fields to return instead of the whole document. Use 1 to include a field and 0 to exclude it — the _id field is returned by default unless you explicitly set it to 0.",

      code: {
        language: "javascript",
        code: `db.users.find(
  { active: true },
  {
    name: 1,
    email: 1,
    _id: 0
  }
);`,
      },
    },

    {
      title: "Sorting",
      content:
        "sort() is used to sort query results. 1 means ascending and -1 means descending.",

      code: {
        language: "javascript",
        code: `db.users
  .find()
  .sort({ createdAt: -1 });`,
      },
    },

    {
      title: "Pagination",
      content:
        "Pagination avoids returning a large number of documents at once. skip() and limit() work fine for basic pagination, but skip() gets slow on large offsets because MongoDB still has to walk past every skipped document. For big collections, cursor-based pagination using a field like _id is faster.",

      code: {
        language: "javascript",
        code: `db.users
  .find()
  .skip(20)
  .limit(20);`,
      },
    },

    {
      title: "What is an Index?",
      content:
        "An index helps MongoDB find documents faster without scanning the entire collection. Every collection already has a default index on _id, and you can create more with createIndex().",

      code: {
        language: "javascript",
        code: `db.users.createIndex({
  email: 1
});`,
      },
    },

    {
      title: "Why are Indexes Important?",
      content:
        "Without the right index, MongoDB has to scan every document in the collection to find matches, which is slow. Indexes make reads much faster, but they add overhead to writes since MongoDB has to update the index too — so don't create more indexes than you actually need.",

      code: {
        language: "text",
        code: `Without index
Query → Scan many documents

With index
Query → Index → Matching documents`,
      },
    },

    {
      title: "Compound Index",
      content:
        "A compound index covers multiple fields in one index. Field order matters — put fields used for exact matches first, then fields used for sorting or ranges — so queries that filter and sort using those fields together can use the index efficiently.",

      code: {
        language: "javascript",
        code: `db.jobs.createIndex({
  organizationId: 1,
  createdAt: -1
});`,
      },
    },

    {
      title: "Unique Index",
      content:
        "A unique index prevents duplicate values for a field.",

      code: {
        language: "javascript",
        code: `db.users.createIndex(
  { email: 1 },
  { unique: true }
);`,
      },
    },

    {
      title: "explain()",
      content:
        "explain() helps understand how MongoDB executes a query and whether an index is being used.",

      code: {
        language: "javascript",
        code: `db.users
  .find({ email: "test@example.com" })
  .explain("executionStats");`,
      },
    },

    {
      title: "COLLSCAN vs IXSCAN",
      content:
        "COLLSCAN means MongoDB scans the collection. IXSCAN means MongoDB uses an index.",

      code: {
        language: "text",
        code: `COLLSCAN → Collection scan
IXSCAN    → Index scan`,
      },
    },

    {
      title: "Aggregation",
      content:
        "The aggregation pipeline processes documents through a sequence of stages, where each stage's output feeds into the next stage — for example, $match to filter documents, then $group to summarize them.",

      code: {
        language: "javascript",
        code: `db.orders.aggregate([
  {
    $match: {
      status: "completed"
    }
  }
]);`,
      },
    },

    {
      title: "$match",
      content:
        "$match filters documents in an aggregation pipeline, similar to find(). Put it early in the pipeline so later stages have fewer documents to process.",

      code: {
        language: "javascript",
        code: `{
  $match: {
    status: "active"
  }
}`,
      },
    },

    {
      title: "$group",
      content:
        "$group groups documents by whatever field you put in _id, and can calculate values per group using accumulators like $sum for totals or counts, $avg for averages, and $max or $min for extremes.",

      code: {
        language: "javascript",
        code: `{
  $group: {
    _id: "$department",
    count: { $sum: 1 }
  }
}`,
      },
    },

    {
      title: "$lookup",
      content:
        "$lookup is used to combine data from another collection, similar to a join in SQL.",

      code: {
        language: "javascript",
        code: `{
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
  }
}`,
      },
    },

    {
      title: "Embedded vs Referenced Data",
      content:
        "Related data can be embedded inside a document or stored separately and referenced using an ID.",

      code: {
        language: "text",
        code: `Embedded
User
 └── Address

Referenced
User → addressId → Address`,
      },
    },

    {
      title: "When to Embed?",
      content:
        "Embedding is useful when related data is usually accessed together and does not grow without control.",

      code: {
        language: "json",
        code: `{
  "name": "Nihal",
  "address": {
    "city": "Bangalore",
    "country": "India"
  }
}`,
      },
    },

    {
      title: "When to Reference?",
      content:
        "References are useful when data is large, shared by many documents, or needs to be updated independently.",

      code: {
        language: "json",
        code: `{
  "candidateId": "123",
  "jobId": "456"
}`,
      },
    },

    {
      title: "MongoDB Relationships",
      content:
        "MongoDB does not require traditional SQL joins. Relationships can be handled using references, embedding, or aggregation with $lookup.",

      code: {
        language: "text",
        code: `JobApplication
 ├── candidateId
 └── jobId`,
      },
    },

    {
      title: "Schema Design",
      content:
        "MongoDB has a flexible schema, but applications should still have a clear data model. Design the schema based on how the application reads and writes data.",

      code: {
        language: "text",
        code: `Design based on:
• Query patterns
• Data relationships
• Read/write frequency
• Document size`,
      },
    },

    {
      title: "MongoDB Transactions",
      content:
        "Transactions let multiple operations succeed or fail together, so your data stays consistent if one step fails partway through. They only work on a replica set or sharded cluster (not on a single standalone server), and they're slower than normal writes, so use them only when you really need atomicity across multiple documents.",

      code: {
        language: "javascript",
        code: `const session = await mongoose.startSession();

try {
  session.startTransaction();

  await Order.create([{ userId, total }], { session });
  await Stock.updateOne(
    { productId },
    { $inc: { qty: -1 } },
    { session }
  );

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}`,
      },
    },

    {
      title: "Replica Sets",
      content:
        "A replica set is a group of MongoDB servers that keep the same data in sync. One server is the primary and handles all writes, while the others are secondaries that replicate data from it. If the primary goes down, the replica set automatically elects a new primary, so the database stays available.",

      code: {
        language: "text",
        code: `Primary    → accepts writes
Secondary  → replicates from primary
Secondary  → replicates from primary

Primary goes down → automatic election → new primary`,
      },
    },

    {
      title: "Sharding",
      content:
        "Sharding splits a large collection across multiple servers, called shards, based on a shard key. Each shard holds part of the data, so reads and writes spread across machines instead of hitting one server. This is how MongoDB scales horizontally for very large datasets.",

      code: {
        language: "text",
        code: `Collection
 ├── Shard 1 (shard key range A)
 ├── Shard 2 (shard key range B)
 └── Shard 3 (shard key range C)`,
      },
    },

    {
      title: "MongoDB with Node.js",
      content:
        "Node.js applications can communicate with MongoDB using the MongoDB driver or ODMs such as Mongoose.",

      code: {
        language: "javascript",
        code: `import mongoose from "mongoose";

await mongoose.connect(
  process.env.MONGO_URI
);`,
      },
    },

    {
      title: "Mongoose",
      content:
        "Mongoose is an ODM for MongoDB. It provides schemas, models, validation, middleware, and other useful features.",

      code: {
        language: "javascript",
        code: `const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model(
  "User",
  UserSchema
);`,
      },
    },

    {
      title: "Mongoose Schema vs Model",
      content:
        "A schema defines the shape of documents — field types, defaults, and validation rules. A model is built from that schema and is what you actually use to create, query, and update documents in the collection.",

      code: {
        language: "javascript",
        code: `const UserSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model(
  "User",
  UserSchema
);`,
      },
    },

    {
      title: "MongoDB Performance",
      content:
        "For better performance, use proper indexes, return only required fields, paginate large results, optimize aggregation pipelines, and avoid unnecessary database queries.",

      code: {
        language: "text",
        code: `Indexes
Projection
Pagination
Aggregation optimization
Query optimization
Caching`,
      },
    },

    {
      title: "Large Collection Query",
      content:
        "For millions of documents, identify the query pattern and create an appropriate index. Use explain() to verify the query plan.",

      code: {
        language: "javascript",
        code: `db.users
  .find({ email: "test@example.com" })
  .explain("executionStats");`,
      },
    },

    {
      title: "MongoDB Interview Example",
      content:
        "If asked how you would search 10 million users by email, create an index on email and verify that MongoDB uses the index.",

      code: {
        language: "javascript",
        code: `db.users.createIndex({
  email: 1
});

db.users.findOne({
  email: "test@example.com"
});`,
      },
    },

    {
      title: "ObjectId",
      content:
        "ObjectId is the default type for a document's _id. It's 12 bytes, built from a timestamp, a random value, and a counter, so ObjectIds are roughly sortable by creation time. MongoDB generates one automatically if you don't provide an _id yourself.",

      code: {
        language: "javascript",
        code: `{
  _id: ObjectId("...")
}`,
      },
    },

    {
      title: "MongoDB Interview Checklist",
      content:
        "Make sure you can explain documents, collections, CRUD, queries, operators, indexes, compound indexes, explain(), aggregation, $match, $group, $lookup, embedding vs referencing, transactions, replica sets, sharding, Mongoose, pagination, and performance optimization.",
    },
  ],
};