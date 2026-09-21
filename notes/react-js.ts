import type { NoteData } from "@/lib/types";

export const reactNotes: NoteData = {
  title: "React.js Interview Notes",
  description:
    "A focused revision deck covering React fundamentals, hooks, rendering behaviour and performance patterns for frontend interviews.",
  coverImage: "/images/react-logo.svg",
  accent: "#61dafb",

  topics: [
    "React Basics",
    "Components",
    "Props & State",
    "Hooks",
    "Rendering",
    "Events",
    "Forms",
    "API Calls",
    "Performance",
    "State Management",
  ],

  slides: [
    {
      title: "What is React?",
      content:
        "React is a JavaScript library for building user interfaces. It uses components to create reusable UI pieces.",

      code: {
        language: "tsx",
        code: `function App() {
  return <h1>Hello React</h1>;
}`,
      },
    },

    {
      title: "What is a Component?",
      content:
        "A component is a reusable piece of UI. A component usually receives data through props and returns JSX.",

      code: {
        language: "tsx",
        code: `function UserCard() {
  return (
    <div>
      <h2>Nihal</h2>
      <p>Full Stack Developer</p>
    </div>
  );
}`,
      },
    },

    {
      title: "Functional Components",
      content:
        "Modern React mainly uses functional components. They are JavaScript functions that return JSX.",

      code: {
        language: "tsx",
        code: `const Welcome = () => {
  return <h1>Welcome</h1>;
};`,
      },
    },

    {
      title: "JSX",
      content:
        "JSX lets you write HTML-like syntax inside JavaScript. A build tool like Babel converts JSX into plain JavaScript before it runs in the browser.",

      code: {
        language: "tsx",
        code: `const name = "Nihal";

const element = <h1>Hello {name}</h1>;`,
      },
    },

    {
      title: "Props",
      content:
        "Props are used to pass data from a parent component to a child component. Props are read-only.",

      code: {
        language: "tsx",
        code: `function User({ name }: { name: string }) {
  return <h2>{name}</h2>;
}

<User name="Nihal" />`,
      },
    },

    {
      title: "State",
      content:
        "State stores data that can change inside a component. Updating state causes React to render the component again.",

      code: {
        language: "tsx",
        code: `const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  {count}
</button>`,
      },
    },

    {
      title: "Props vs State",
      content:
        "Props come from the parent and are read-only. State is managed by the component and can be updated.",

      code: {
        language: "text",
        code: `Props → Parent → Child
State → Managed inside component`,
      },
    },

    {
      title: "useState",
      content:
        "useState is a Hook that adds state to a function component. Calling its setter function updates the state and tells React to re-render the component.",

      code: {
        language: "tsx",
        code: `const [name, setName] = useState("");

setName("Nihal");`,
      },
    },

    {
      title: "useEffect",
      content:
        "useEffect is used for side effects such as API calls, subscriptions, timers, and interacting with external systems.",

      code: {
        language: "tsx",
        code: `useEffect(() => {
  fetchUsers();
}, []);`,
      },
    },

    {
      title: "useEffect Dependency Array",
      content: "The dependency array controls when the effect runs.",

      code: {
        language: "tsx",
        code: `// Every render
useEffect(() => {});

// Once after mount
useEffect(() => {}, []);

// When userId changes
useEffect(() => {}, [userId]);`,
      },
    },

    {
      title: "useEffect Cleanup",
      content:
        "Cleanup is used to remove subscriptions, timers, event listeners, or other resources when the component unmounts or before the effect runs again.",

      code: {
        language: "tsx",
        code: `useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);`,
      },
    },

    {
      title: "React Strict Mode",
      content:
        "StrictMode is a wrapper that helps find bugs during development. It does not render any visible UI. In development only, it can run things like render functions and effects twice on purpose, so you notice side effects that are not clean. It has no effect on the production build.",

      code: {
        language: "tsx",
        code: `<React.StrictMode>
  <App />
</React.StrictMode>`,
      },
    },

    {
      title: "useRef",
      content:
        "useRef stores a value that persists between renders without causing a re-render when changed. It is also commonly used to access DOM elements.",

      code: {
        language: "tsx",
        code: `const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();`,
      },
    },

    {
      title: "useMemo",
      content:
        "useMemo caches the result of an expensive calculation and recalculates it when its dependencies change.",

      code: {
        language: "tsx",
        code: `const filteredUsers = useMemo(() => {
  return users.filter(user =>
    user.name.includes(search)
  );
}, [users, search]);`,
      },
    },

    {
      title: "useCallback",
      content:
        "useCallback caches a function reference. It is useful when passing functions to memoized child components or when function identity matters.",

      code: {
        language: "tsx",
        code: `const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);`,
      },
    },

    {
      title: "useMemo vs useCallback",
      content:
        "useMemo memoizes a calculated value. useCallback memoizes a function reference.",

      code: {
        language: "text",
        code: `useMemo      → caches value
useCallback  → caches function`,
      },
    },

    {
      title: "Conditional Rendering",
      content:
        "React can show different UI based on a condition. A ternary (condition ? A : B) picks between two options, and the && operator shows something only when a condition is true.",

      code: {
        language: "tsx",
        code: `{isLoggedIn ? (
  <Dashboard />
) : (
  <Login />
)}`,
      },
    },

    {
      title: "Rendering Lists",
      content:
        "map() is commonly used to render a list of components. Each item should have a stable key.",

      code: {
        language: "tsx",
        code: `{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
  />
))}`,
      },
    },

    {
      title: "Why is key important?",
      content:
        "The key prop helps React match list items between renders, so it knows which ones changed, were added, or removed. Keys should be stable and unique among siblings. Using the array index as a key can cause bugs if the list is reordered or items are inserted or removed.",

      code: {
        language: "tsx",
        code: `users.map(user => (
  <User key={user.id} />
))`,
      },
    },

    {
      title: "Event Handling",
      content:
        "React handles browser events using event props such as onClick, onChange, and onSubmit. The event object passed to the handler is a SyntheticEvent, which wraps the native browser event so it works the same way across browsers.",

      code: {
        language: "tsx",
        code: `<button onClick={handleClick}>
  Click Me
</button>`,
      },
    },

    {
      title: "Controlled Components",
      content:
        "In a controlled input, React state controls the input's value, and every keystroke updates state through onChange. In an uncontrolled input, the DOM keeps the value itself and you read it with a ref instead of state.",

      code: {
        language: "tsx",
        code: `const [email, setEmail] = useState("");

<input
  value={email}
  onChange={e => setEmail(e.target.value)}
/>`,
      },
    },

    {
      title: "Forms",
      content:
        "React forms usually store input values in state and handle submission using an onSubmit function.",

      code: {
        language: "tsx",
        code: `const handleSubmit = (e) => {
  e.preventDefault();
  console.log(email);
};

<form onSubmit={handleSubmit}>
  <input />
  <button type="submit">
    Submit
  </button>
</form>`,
      },
    },

    {
      title: "Lifting State Up",
      content:
        "When multiple components need the same data, move the state to their common parent and pass it through props.",

      code: {
        language: "text",
        code: `Child A ──┐
          ↓
       Parent State
          ↑
Child B ──┘`,
      },
    },

    {
      title: "Component Communication",
      content:
        "Parent to child communication usually happens through props. Child to parent communication can happen by passing a callback function.",

      code: {
        language: "tsx",
        code: `function Parent() {
  const handleUser = (user) => {
    console.log(user);
  };

  return <Child onUser={handleUser} />;
}`,
      },
    },

    {
      title: "Context API",
      content:
        "Context allows data to be shared across components without passing props through every level.",

      code: {
        language: "tsx",
        code: `const ThemeContext = createContext("light");

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>`,
      },
    },

    {
      title: "useContext",
      content: "useContext is used to read a value from a React Context.",

      code: {
        language: "tsx",
        code: `const theme = useContext(ThemeContext);

console.log(theme);`,
      },
    },

    {
      title: "Custom Hooks",
      content:
        "A custom hook is just a function whose name starts with use and that can call other hooks inside it. It lets you pull reusable logic, like fetching data or tracking window size, out of a component so other components can reuse it too.",

      code: {
        language: "tsx",
        code: `function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}`,
      },
    },

    {
      title: "API Calls in React",
      content:
        "API calls can be made using fetch, Axios, or libraries such as TanStack Query.",

      code: {
        language: "tsx",
        code: `useEffect(() => {
  const loadUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();

    setUsers(data);
  };

  loadUsers();
}, []);`,
      },
    },

    {
      title: "React Rendering",
      content:
        "When state or props change, React renders the component again to get the new UI description. React then compares it with the previous version and updates only the parts of the actual DOM that changed.",

      code: {
        language: "text",
        code: `State / Props change
        ↓
Component renders
        ↓
React compares changes
        ↓
DOM is updated`,
      },
    },

    {
      title: "Virtual DOM",
      content:
        "The Virtual DOM is an in-memory representation of the UI. React uses it to figure out what changed compared to the last version, and this comparison process is called reconciliation.",

      code: {
        language: "text",
        code: `State change
     ↓
New UI representation
     ↓
Compare
     ↓
Update required DOM`,
      },
    },

    {
      title: "React.memo",
      content:
        "React.memo can prevent a component from rendering again when its props have not changed.",

      code: {
        language: "tsx",
        code: `const UserCard = React.memo(
  ({ user }) => {
    return <div>{user.name}</div>;
  }
);`,
      },
    },

    {
      title: "React.memo vs useMemo",
      content:
        "React.memo memoizes a component based on props. useMemo memoizes a calculated value inside a component.",

      code: {
        language: "text",
        code: `React.memo → Component
useMemo     → Value`,
      },
    },

    {
      title: "Lazy Loading",
      content:
        "Lazy loading allows a component to be loaded only when it is needed. This can reduce the initial JavaScript bundle.",

      code: {
        language: "tsx",
        code: `const Dashboard = lazy(
  () => import("./Dashboard")
);

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>`,
      },
    },

    {
      title: "React Router",
      content:
        "React Router is a separate library, not part of core React, that is commonly used to add client-side routing to React applications.",

      code: {
        language: "tsx",
        code: `<Route
  path="/job-posts"
  element={<JobPosts />}
/>

<Route
  path="/job-posts/:id"
  element={<JobDetails />}
/>`,
      },
    },

    {
      title: "Error Boundaries",
      content:
        "Error boundaries catch rendering errors in their child components and show fallback UI instead of crashing the whole app. They only work as class components, using componentDidCatch or static getDerivedStateFromError. There is no hook version, so function components usually rely on a library like react-error-boundary.",

      code: {
        language: "tsx",
        code: `<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>`,
      },
    },

    {
      title: "State Management",
      content:
        "For simple state, useState and Context may be enough. For larger applications, libraries such as Redux Toolkit or Zustand can manage shared state.",

      code: {
        language: "text",
        code: `Local state → useState
Shared state → Context
Complex global state → Redux / Zustand`,
      },
    },

    {
      title: "React Performance",
      content:
        "Common ways to improve performance include avoiding unnecessary renders, memoization when useful, code splitting, pagination, virtualization, and efficient API calls.",

      code: {
        language: "text",
        code: `React.memo
useMemo
useCallback
Lazy loading
Pagination
Virtualization`,
      },
    },

    {
      title: "Debouncing Search",
      content:
        "Debouncing delays an action until the user stops typing for a specific amount of time. It is useful for search APIs.",

      code: {
        language: "javascript",
        code: `const timer = setTimeout(() => {
  searchUsers(query);
}, 500);

return () => clearTimeout(timer);`,
      },
    },

    {
      title: "Server Pagination",
      content:
        "For large datasets, do not load thousands of records into React at once. Request only the required page from the backend.",

      code: {
        language: "text",
        code: `GET /users?page=1&limit=20

Frontend → Request 20 users
Backend  → Return 20 users`,
      },
    },

    {
      title: "React Interview Checklist",
      content:
        "Before the interview, make sure you can explain components, JSX, props, state, useState, useEffect, useRef, useMemo, useCallback, custom hooks, Context, controlled vs uncontrolled components, lifting state, rendering, keys, API calls, React.memo, error boundaries, performance, routing, and state management.",
    },
  ],
};
