"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState(
    {title: "",
    description: ""});

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const { error, data } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()
      .single();

    if (error){
      console.error("Error adding task:", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
    setTasks((prev) => [...prev, data]);
  };

  useEffect(() => {
    let shouldUpdate = true;

    const loadTasks = async () => {
      const supabase = createClient();
      const { error, data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error reading tasks:", error.message);
        return;
      }

      if (shouldUpdate) {
        setTasks(data);
      }
    };

    loadTasks();

    return () => {
      shouldUpdate = false;
    };
  }, []);

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = async (taskToUpdate: Task) => {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("tasks")
      .update({ description: taskToUpdate.description })
      .eq("id", taskToUpdate.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error.message);
      return;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === data.id ? data : task)),
    );
  };
  return (
    <main className="flex min-h-screen items-start justify-center bg-[#1f1f1f] px-4 py-14 text-zinc-200">
      <section className="flex w-full max-w-[380px] flex-col items-center">
        <h1 className="mb-4 text-center text-xl font-bold text-zinc-200">
          Task Manager CRUD
        </h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2">
          <input
            type="text"
            value={newTask.title}
            onChange={(e)=> setNewTask((prev) => ({...prev, title:e.target.value}))}
            placeholder="Task Title"
            className="h-8 w-full border border-zinc-500 bg-[#333333] px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-300"
          />

          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask((prev) => ({...prev, description: e.target.value}))}
            rows={2}
            className="min-h-10 w-full resize-y border border-zinc-500 bg-[#333333] px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-300"
          />

          <button
            type="submit"
            className="mt-1 rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
          >
            Add Task
          </button>
        </form>

        {tasks.map((task) => (
          <article
            key={task.id}
            className="mt-6 flex min-h-32 w-[96%] flex-col items-center justify-center border border-zinc-400 bg-transparent px-6 py-7 text-center"
          >
            <h2 className="text-base font-bold text-zinc-200">{task.title}</h2>
            <p className="mt-5 text-sm text-zinc-300">{task.description}</p>

            <div className="mt-4 flex gap-3">
              <textarea
                placeholder="Edit Description"
                value={task.description}
                onChange={(e) => setTasks((prev) => prev.map((t) => (t.id === task.id ? {...t, description: e.target.value} : t)))}
                className="min-h-10 w-full resize-y border border-zinc-500 bg-[#333333] px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-300"
              />
              <button
                onClick ={ ()=> handleEdit(task)}
                type="button"
                className="rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
