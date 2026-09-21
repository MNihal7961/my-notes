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
        "Next.js is a React framework for building full-stack web apps. It adds things React alone doesn't have, like routing, server-side rendering, API endpoints, caching, and performance tools.",

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
        "React only handles the UI layer. Next.js builds on top of it with file-based routing, Server Components, server-side rendering, API routes, image optimization, and SEO support.",

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
        "The App Router uses the app folder for routing. Each folder is a URL segment, and a page.tsx file inside a folder is what actually makes that segment visitable as a route.",

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
        "Next.js builds your routes from the file and folder structure inside app. There's no separate routes config file to maintain by hand.",

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
        "A folder name in square brackets, like [id], creates a dynamic route. Next.js matches whatever value shows up in that part of the URL and passes it to the page as a route parameter.",

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
        "Nesting folders inside app creates nested URL paths. Each level of nesting can have its own page.tsx and its own layout.tsx.",

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
        "layout.tsx defines UI that stays the same across multiple pages, like a navbar or sidebar. Layouts wrap their child pages automatically and keep their own state when the user navigates between pages inside them. Every app needs a root layout that includes the html and body tags.",

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
        "In the App Router, every component is a Server Component by default. They run only on the server, so they can fetch data directly and keep extra JavaScript out of the browser bundle.",

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
        "A Client Component is needed when a component uses state, effects, event handlers, or browser-only APIs. You opt in by adding the 'use client' directive at the top of the file.",

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
        "Add 'use client' only when a component actually needs client-side features. Everything that component imports also becomes part of the client bundle, so it's best to push the 'use client' boundary as far down the tree as you can.",

      code: {
        language: "tsx",
        code: `"use client";

import { useState } from "react";

export default function Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <button onClick={() => setOpen(!open)}>
      {open ? "Hide" : "Show"}
    </button>
  );
}`,
      },
    },

    {
      title: "Data Fetching",
      content:
        "Server Components can fetch data directly during rendering, on the server, by using async/await inside the component. The browser never has to make a separate API call to get that data.",

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
        "When data changes often and you need a fresh value on every request, pass cache: \"no-store\" to fetch. This skips the cache and makes that request run again for every visit.",

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
        "Next.js can cache fetch results and rendered pages so the same work isn't repeated on every request. You control this with options on fetch, such as cache and revalidate; the exact defaults have changed across versions, so it's safest to set them explicitly rather than rely on them.",

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
        "Static rendering builds a page's HTML ahead of time, usually at build time, and reuses that same HTML for every visitor. It's a good fit for pages whose content doesn't need to change on every request.",

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
        "Dynamic rendering renders a page on the server for every incoming request. Next.js switches a route to dynamic rendering automatically when it reads things like cookies, headers, or searchParams, or makes an uncached fetch call.",

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
        "Incremental Static Regeneration (ISR) lets a statically generated page be refreshed after it goes stale, without rebuilding the whole site. You can set a time-based revalidate period, or trigger an update on demand after data changes.",

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
      title: "generateStaticParams",
      content:
        "generateStaticParams runs at build time to tell Next.js which values of a dynamic segment to pre-render, similar to getStaticPaths in the older Pages Router. Any value it doesn't list is rendered the first time it's requested.",

      code: {
        language: "tsx",
        code: `export async function generateStaticParams() {
  const jobs = await getJobs();

  return jobs.map((job) => ({
    id: job.id,
  }));
}`,
      },
    },

    {
      title: "Route Handlers",
      content:
        "Route Handlers let you build backend HTTP endpoints inside the app directory, using a route.ts file. They use the standard Web Request and Response APIs.",

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
        "A single route.ts file can export a separate function for each HTTP method it supports, such as GET, POST, PUT, PATCH, and DELETE. Next.js calls whichever function matches the incoming request's method.",

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
        "Middleware code, defined in a middleware.ts file at the project root, runs before a request reaches a route. It's commonly used for auth checks, redirects, rewrites, and reading or setting cookies and headers. A matcher config controls which paths it runs on.",

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
        "Authentication is usually built with cookies, sessions, JWTs, or a library such as NextAuth/Auth.js. Always verify the user on the server before returning protected data or rendering a protected page, since client-side checks alone can be bypassed.",

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
        "Cookies can store session information and are sent automatically with matching requests. HttpOnly cookies can't be read by client-side JavaScript, which helps keep session values safer from XSS attacks.",

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
        "A loading.tsx file automatically wraps its route segment in a React Suspense boundary and shows fallback UI while that segment's data is loading.",

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
        "error.tsx defines the error UI for a route segment, and it must be a Client Component. It receives the thrown error and a reset function you can call to try rendering that segment again.",

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
        "not-found.tsx shows a custom 404 UI. Next.js renders it automatically for unmatched routes, or you can trigger it yourself by calling the notFound() function from a Server Component.",

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
        "generateMetadata builds metadata dynamically from route data, such as params or a fetched resource. Like a page's params prop, the params argument here is a promise, so it needs to be awaited.",

      code: {
        language: "tsx",
        code: `export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJob(id);

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
        "The Link component provides client-side navigation between routes and automatically prefetches linked pages in the background, which makes navigating between them feel faster.",

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
        "The redirect function stops rendering and sends the user to a new route. It works inside Server Components, Route Handlers, and Server Actions.",

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
        "Parallel Routes let you render two or more pages in the same layout at once, using named slots like @analytics and @jobs, which are passed to the layout as props. Each slot can load, error, and navigate on its own.",

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
        "Intercepting Routes let you open a route inside the current layout, like a modal, while keeping the real URL for that route. Folder names like (.) and (..) control how many segments up the interception looks, and this pattern is often combined with Parallel Routes.",

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
        "Server Actions are async functions marked with 'use server' that run only on the server. You can call them from a form's action prop or from a client-side event handler, without writing a separate API route for every action.",

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
      title: "App Router vs Pages Router",
      content:
        "Next.js has two routing systems. The older Pages Router uses a pages folder with data methods like getStaticProps and getServerSideProps. The newer App Router uses an app folder, Server Components by default, and async/await for data fetching. The App Router is the current recommended approach, but the Pages Router is still supported.",

      code: {
        language: "text",
        code: `Pages Router
 └── pages/
      └── jobs.tsx

App Router
 └── app/
      └── jobs/
           └── page.tsx`,
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
        "Make sure you can explain the App Router vs Pages Router, file-based routing, dynamic routes, layouts, Server Components, Client Components, use client, data fetching, caching, static and dynamic rendering, ISR, generateStaticParams, Route Handlers, middleware, authentication, metadata, loading, error handling, and performance.",
    },
  ],
};