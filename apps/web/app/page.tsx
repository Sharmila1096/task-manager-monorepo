"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import confetti from "canvas-confetti";

type Priority = "LOW" | "MEDIUM" | "HIGH";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate?: string | null;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      if (!res.ok) return;
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (error){console.error(error);}
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, dueDate }),
    });

    setTitle("");
    setDueDate("");
    showToast("Task added 🚀");
    fetchTasks();
  };

  const toggleDone = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, { method: "PUT" });

    if (!task.done) {
      confetti({ particleCount: 80, spread: 70 });
    }

    showToast("Updated ✅");
    fetchTasks();
  };
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    showToast("Deleted 🗑️");
    fetchTasks();
  };
  const saveEdit = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        priority: task.priority,
        dueDate: task.dueDate,
      }),
    });

    setEditingId(null);
    showToast("Saved ✨");
    fetchTasks();
  };

  const onReorder = (newOrder: Task[]) => {
    setTasks(newOrder);
  };

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const priorityColor: Record<Priority, string> = {
    LOW: "#22c55e",
    MEDIUM: "#f59e0b",
    HIGH: "#ef4444",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 20,
      fontFamily: "system-ui",
    } as React.CSSProperties,

    card: {
      width: "100%",
      maxWidth: 700,
      background: "#ffffffee",
      backdropFilter: "blur(10px)",
      borderRadius: 24,
      padding: 24,
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    } as React.CSSProperties,

    input: {
      flex: 1,
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid #ddd",
      fontSize: 14,
    } as React.CSSProperties,

    button: {
      background: "#7c3aed",
      color: "white",
      border: "none",
      padding: "12px 16px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 600,
    } as React.CSSProperties,

    task: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 14,
      borderRadius: 14,
      background: "#f8fafc",
      marginTop: 10,
    } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          🚀 Task Manager
        </h1>

        {/* progress */}
        <div
          style={{
            height: 8,
            background: "#eee",
            borderRadius: 999,
            margin: "14px 0 20px",
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            style={{
              height: "100%",
              background: "#7c3aed",
              borderRadius: 999,
            }}
          />
        </div>

        {/* add row */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            style={styles.input}
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            style={styles.input}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <input
            type="date"
            style={styles.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button style={styles.button} onClick={addTask}>
            Add
          </button>
        </div>

        {/* list */}
        <Reorder.Group
          axis="y"
          values={tasks}
          onReorder={onReorder}
          as="ul"
          style={{ listStyle: "none", padding: 0, marginTop: 10 }}
        >
          <AnimatePresence>
            {tasks.map((task) => (
              <Reorder.Item
                key={task.id}
                value={task}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={styles.task}
              >
                {/* priority dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: priorityColor[task.priority],
                  }}
                />

                {/* title */}
                <input
                  style={{
                    ...styles.input,
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                  value={task.title}
                  disabled={editingId !== task.id}
                  onChange={(e) =>
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id
                          ? { ...t, title: e.target.value }
                          : t
                      )
                    )
                  }
                />

                {/* buttons */}
                <button
                  style={styles.button}
                  onClick={() => toggleDone(task)}
                >
                  ✓
                </button>

                <button
                  style={styles.button}
                  onClick={() =>
                    editingId === task.id
                      ? saveEdit(task.id)
                      : setEditingId(task.id)
                  }
                >
                  ✏️
                </button>

                <button
                  style={{ ...styles.button, background: "#ef4444" }}
                  onClick={() => deleteTask(task.id)}
                >
                  🗑️
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {/* empty */}
        {!tasks.length && (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            No tasks yet. Add one 🚀
          </p>
        )}
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#111",
              color: "white",
              padding: "10px 18px",
              borderRadius: 999,
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}