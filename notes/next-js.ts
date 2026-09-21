import type { NoteData } from "@/lib/types";

export const nextjsNotes: NoteData = {
  title: "Next.js Interview Notes",
  description:
    "A revision deck covering the App Router, Server and Client Components, rendering strategies, caching, route handlers, middleware and performance — built for framework-focused interviews.",
  coverImage: "/images/nextjs-logo.svg",
  accent: "#a3a3a3",

  topics: [
    "Next.js Basics",
    "App Router",
    "Routing",
    "Layouts",
    "Server Components",
    "Client Components",
    "Data Fetching",
    "Rendering",
    "Caching",
    "API Routes",
    "Middleware",
    "Authentication",
    "Performance",
    "SEO",
  ],

  slides: [
    {
      title: "What is Next.js?",
      content:
        "Next.js is a React framework for building full-stack web applications. It provides routing, server-side rendering, API handling, caching, and performance optimizations.",

      code: {
        language: "tsx",
        code: `export default function Home() {
  return <h1>Hello Next.js</h1>;
}`,
      },
    },

    {
      title: "Why Next.js?",
      content:
        "Next.js provides features on top of React such as file-based routing, Server Components, server-side rendering, API routes, image optimization, and SEO support.",

      code: {
        language: "text",
        code: `React
  +
Routing
  +
Server Rendering
  +
Backend Features
  +
Performance`,
      },
    },

    {
      title: "App Router",
      content:
        "The App Router uses the app directory for routing. Folders represent URL segments and page.tsx represents a route.",

      code: {
        language: "text",
        code: `app/
 ├── page.tsx
 ├── about/
 │    └── page.tsx
 └── jobs/
      └── page.tsx`,
      },
    },

    {
      title: "File-Based Routing",
      content:
        "Next.js creates routes based on the file and folder structure.",

      code: {
        language: "text",
        code: `app/
 ├── page.tsx          → /
 ├── about/
 │    └── page.tsx     → /about
 └── jobs/
      └── page.tsx     → /jobs`,
      },
    },

    {
      title: "Dynamic Routes",
      content:
        "Dynamic routes use square brackets to create routes based on dynamic values.",

      code: {
        language: "text",
        code: `app/
 └── jobs/
      └── [id]/
           └── page.tsx

/jobs/123
/jobs/456`,
      },
    },

    {
      title: "Nested Routes",
      content:
        "Folders can be nested to create nested URL structures.",

      code: {
        language: "text",
        code: `app/
 └── dashboard/
      └── jobs/
           └── page.tsx

/dashboard/jobs`,
      },
    },

    {
      title: "Layouts",
      content:
        "layout.tsx is used for UI that should be shared between multiple pages, such as navigation, sidebar, or dashboard layout.",

      code: {
        language: "tsx",
        code: `export default function Layout({
  children,
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}`,
      },
    },

    {
      title: "Server Components",
      content:
        "In the App Router, components are Server Components by default. They run on the server and are useful for fetching data and reducing client-side JavaScript.",

      code: {
        language: "tsx",
        code: `export default async function Jobs() {
  const jobs = await getJobs();

  return <JobList jobs={jobs} />;
}`,
      },
    },

    {
      title: "Client Components",
      content:
        "A Client Component is needed when the component uses state, effects, event handlers, or browser APIs.",

      code: {
        language: "tsx",
        code: `"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
      },
    },

    {
      title: "Server vs Client Components",
      content:
        "Server Components are useful for server-side data fetching and reducing client JavaScript. Client Components are needed for interactive UI and browser-side features.",

      code: {
        language: "text",
        code: `Server Component
→ Data fetching
→ Server logic
→ Less client JS

Client Component
→ useState
→ useEffect
→ Events
→ Browser APIs`,
      },
    },

    {
      title: "When to Use 'use client'?",
      content:
        "Use 'use client' only when the component needs client-side features such as state, effects, event handlers, or browser APIs.",

      code: {
        language: "tsx",
        code: `"use client";

import { useState } from "react";

const [open, setOpen] = useState(false);`,
      },
    },

    {
      title: "Data Fetching",
      content:
        "Next.js Server Components can fetch data directly on the server. This avoids unnecessary client-side API requests for server-rendered data.",

      code: {
        language: "tsx",
        code: `export default async function Users() {
  const response = await fetch(
    "https://api.example.com/users"
  );

  const users = await response.json();

  return <UserList users={users} />;
}`,
      },
    },

    {
      title: "Dynamic Data Fetching",
      content:
        "For frequently changing data, configure the request or use the appropriate caching/revalidation strategy.",

      code: {
        language: "tsx",
        code: `const response = await fetch(
  "https://api.example.com/jobs",
  {
    cache: "no-store",
  }
);`,
      },
    },

    {
      title: "Caching",
      content:
        "Next.js can cache data and rendered results depending on the request and configuration. Caching can reduce repeated work and improve performance.",

      code: {
        language: "tsx",
        code: `fetch(url, {
  next: {
    revalidate: 60,
  },
});`,
      },
    },

    {
      title: "Static Rendering",
      content:
        "Static rendering generates content ahead of time. It is useful for pages whose data does not need to change on every request.",

      code: {
        language: "text",
        code: `Build time
   ↓
Generate page
   ↓
Serve cached/static result`,
      },
    },

    {
      title: "Dynamic Rendering",
      content:
        "Dynamic rendering generates content when a request is made. It is useful when the response depends on request-specific or frequently changing data.",

      code: {
        language: "text",
        code: `Request
   ↓
Server executes
   ↓
Generate response`,
      },
    },

    {
      title: "ISR",
      content:
        "Incremental Static Regeneration allows statically generated content to be updated after a specific period without rebuilding the entire application.",

      code: {
        language: "tsx",
        code: `fetch(url, {
  next: {
    revalidate: 3600,
  },
});`,
      },
    },

    {
      title: "Route Handlers",
      content:
        "Route Handlers allow you to create backend HTTP endpoints inside the app directory.",

      code: {
        language: "tsx",
        code: `// app/api/users/route.ts

export async function GET() {
  return Response.json({
    users: [],
  });
}`,
      },
    },

    {
      title: "POST Route Handler",
      content:
        "Route Handlers can handle different HTTP methods such as GET, POST, PATCH, and DELETE.",

      code: {
        language: "tsx",
        code: `export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({
    message: "User created",
    data: body,
  });
}`,
      },
    },

    {
      title: "Middleware",
      content:
        "Middleware runs before a request is completed. It can be used for authentication checks, redirects, rewrites, and request processing.",

      code: {
        language: "tsx",
        code: `import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}`,
      },
    },

    {
      title: "Authentication",
      content:
        "Authentication can be implemented using cookies, sessions, JWTs, or authentication libraries. Server-side checks should protect private resources.",

      code: {
        language: "text",
        code: `Login
  ↓
Create session/token
  ↓
Store securely
  ↓
Request
  ↓
Verify authentication
  ↓
Access protected resource`,
      },
    },

    {
      title: "Cookies",
      content:
        "Cookies can store session information and are automatically sent with matching requests. HttpOnly cookies help prevent JavaScript from accessing sensitive session values.",

      code: {
        language: "tsx",
        code: `cookie: {
  httpOnly: true,
  secure: true,
  sameSite: "lax"
}`,
      },
    },

    {
      title: "Loading UI",
      content:
        "loading.tsx can provide a loading UI while a route segment is loading.",

      code: {
        language: "tsx",
        code: `// app/jobs/loading.tsx

export default function Loading() {
  return <div>Loading jobs...</div>;
}`,
      },
    },

    {
      title: "Error Handling",
      content:
        "error.tsx can provide a UI for handling errors in a route segment.",

      code: {
        language: "tsx",
        code: `"use client";

export default function Error({
  reset,
}) {
  return (
    <button onClick={() => reset()}>
      Try again
    </button>
  );
}`,
      },
    },

    {
      title: "not-found",
      content:
        "not-found.tsx is used to display a custom 404 UI for resources that cannot be found.",

      code: {
        language: "tsx",
        code: `import { notFound } from "next/navigation";

if (!job) {
  notFound();
}`,
      },
    },

    {
      title: "Metadata",
      content:
        "Next.js provides built-in support for defining page metadata such as title and description, which is useful for SEO.",

      code: {
        language: "tsx",
        code: `export const metadata = {
  title: "Jobs",
  description: "Find your next job",
};`,
      },
    },

    {
      title: "Dynamic Metadata",
      content:
        "Metadata can also be generated dynamically based on route data.",

      code: {
        language: "tsx",
        code: `export async function generateMetadata({ params }) {
  const job = await getJob(params.id);

  return {
    title: job.title,
    description: job.description,
  };
}`,
      },
    },

    {
      title: "Image Optimization",
      content:
        "Next.js provides the Image component for optimized image loading, sizing, and responsive behavior.",

      code: {
        language: "tsx",
        code: `import Image from "next/image";

<Image
  src="/profile.png"
  alt="Profile"
  width={400}
  height={400}
/>`,
      },
    },

    {
      title: "Link Component",
      content:
        "The Link component provides client-side navigation between routes and can improve navigation performance.",

      code: {
        language: "tsx",
        code: `import Link from "next/link";

<Link href="/jobs">
  View Jobs
</Link>`,
      },
    },

    {
      title: "Redirect",
      content:
        "Next.js provides redirect utilities for navigating users from the server.",

      code: {
        language: "tsx",
        code: `import { redirect } from "next/navigation";

if (!user) {
  redirect("/login");
}`,
      },
    },

    {
      title: "Parallel Routes",
      content:
        "Parallel Routes allow multiple pages or UI sections to be rendered within the same layout simultaneously.",

      code: {
        language: "text",
        code: `dashboard/
 ├── @analytics/
 ├── @jobs/
 └── layout.tsx`,
      },
    },

    {
      title: "Intercepting Routes",
      content:
        "Intercepting Routes allow a route to be displayed within the current layout, commonly used for modal-based navigation.",

      code: {
        language: "text",
        code: `Feed
 ↓
Click Post
 ↓
Open Post as Modal`,
      },
    },

    {
      title: "Server Actions",
      content:
        "Server Actions allow server-side functions to be called from forms or client interactions without manually creating a separate API endpoint for every action.",

      code: {
        language: "tsx",
        code: `"use server";

export async function createJob(formData) {
  const title = formData.get("title");

  await saveJob(title);
}`,
      },
    },

    {
      title: "Next.js Performance",
      content:
        "Common performance techniques include Server Components, code splitting, image optimization, caching, pagination, lazy loading, and reducing unnecessary client-side JavaScript.",

      code: {
        language: "text",
        code: `Server Components
Code splitting
Image optimization
Caching
Pagination
Lazy loading
Less client JS`,
      },
    },

    {
      title: "Next.js vs React",
      content:
        "React is a UI library. Next.js is a React framework that provides additional features such as routing, rendering strategies, server-side features, caching, and optimization.",

      code: {
        language: "text",
        code: `React
→ UI library

Next.js
→ React framework
→ Routing
→ Server rendering
→ Backend features
→ Optimization`,
      },
    },

    {
      title: "Next.js Interview Checklist",
      content:
        "Make sure you can explain App Router, file-based routing, dynamic routes, layouts, Server Components, Client Components, use client, data fetching, caching, static and dynamic rendering, ISR, Route Handlers, middleware, authentication, metadata, loading, error handling, and performance.",
    },
  ],
};