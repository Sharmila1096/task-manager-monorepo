export default function Page() {
  return (
    <main style={{ padding: "40px", fontFamily: "system-ui" }}>
      <h1>Task Manager Documentation</h1>

      <p>This page contains documentation for the Task Manager project.</p>

      <h2>Features</h2>
      <ul>
        <li>Create tasks</li>
        <li>Update task status</li>
        <li>Delete tasks</li>
        <li>Reorder tasks</li>
      </ul>

      <h2>Tech Stack</h2>
      <ul>
        <li>Next.js</li>
        <li>Prisma</li>
        <li>Supabase</li>
        <li>TurboRepo</li>
      </ul>
    </main>
  );
}