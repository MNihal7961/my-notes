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
    "Schema Design",
    "Performance",
    "MongoDB with Node.js",
  ],

  slides: [
    {
      title: "What is MongoDB?",
      content:
        "MongoDB is a NoSQL document database. It stores data as BSON documents instead of rows and tables.",

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
        "MongoDB documents are JSON-like objects. MongoDB actually stores them internally as BSON.",

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
        "BSON means Binary JSON. MongoDB uses BSON because it supports additional data types and is efficient for storing and processing documents.",

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
        "find() is used to retrieve multiple documents that match a condition.",

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
        "findOne() returns a single matching document.",

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
        "updateOne() updates the first matching document. updateMany() updates all matching documents.",

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
        "MongoDB provides operators for filtering documents based on conditions.",

      code: {
        language: "javascript",
        code: `$eq  → Equal
$ne  → Not equal
$gt  → Greater than
$gte → Greater than or equal
$lt  → Less than
$lte → Less than or equal
$in  → Match values
$nin → Not in values`,
      },
    },

    {
      title: "Logical Operators",
      content:
        "Logical operators allow multiple conditions to be combined.",

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
        "Projection allows us to return only the fields we need instead of the complete document.",

      code: {
        language: "javascript",
        code: `db.users.find(
  { active: true },
  {
    name: 1,
    email: 1
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
        "Pagination avoids returning a large number of documents at once. skip() and limit() can be used for basic pagination.",

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
        "An index helps MongoDB find documents faster without scanning the entire collection.",

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
        "Without an appropriate index, MongoDB may scan many documents. An index can make frequently used queries much faster.",

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
        "A compound index contains multiple fields. It is useful when queries commonly filter or sort using those fields together.",

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
        "Aggregation is used to process and transform documents through multiple stages.",

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
        "$match filters documents in an aggregation pipeline.",

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
        "$group groups documents based on a field and can calculate values such as count, sum, and average.",

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
        "Transactions allow multiple database operations to succeed or fail together. They are useful when multiple changes must remain consistent.",

      code: {
        language: "javascript",
        code: `const session = await mongoose.startSession();

session.startTransaction();

try {
  await createOrder({ session });
  await updateStock({ session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}`,
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
        "A schema defines the structure and rules of the data. A model is used to interact with the MongoDB collection.",

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
        "ObjectId is the commonly used identifier type for MongoDB documents. MongoDB automatically creates an _id field if one is not provided.",

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
        "Make sure you can explain documents, collections, CRUD, queries, operators, indexes, compound indexes, explain(), aggregation, $match, $group, $lookup, embedding vs referencing, transactions, Mongoose, pagination, and performance optimization.",
    },
  ],
};