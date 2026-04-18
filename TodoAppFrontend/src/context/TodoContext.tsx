import { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { mineProof } from "../utils/mineProof";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  previousHash: string;
  hash: string;
  nonce: number;
  proof: string;
};

type TodoContextType = {
  todos: Todo[];
  isChainValid: boolean;
  verifyChain: () => Promise<void>;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  toggleTodo: (todo: Todo) => Promise<boolean>;
  updateTodo: (id: string, title: string) => Promise<boolean>;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChainValid, setIsChainValid] = useState(true);

  const ghostTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const API_BASE = "http://localhost:5154/api/todos";

  const verifyChain = async () => {
    try {
      const res = await fetch(`${API_BASE}/verify`);
      setIsChainValid(res.ok);
    } catch {
      setIsChainValid(false);
    }
  };

  const fetchTodos = async () => {
    const res = await fetch(API_BASE);

    if (res.ok) {
      const data: Todo[] = await res.json();
      setTodos(data);
    }

    await verifyChain();
  };

  const addTodo = async (title: string) => {
    const mined = await mineProof(title);

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        completed: false,
        nonce: mined.nonce,
        proof: mined.proof,
      }),
    });

    if (!res.ok) return false;

    const newTodo: Todo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    await verifyChain();
    return true;
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return false;

    const existingTimer = ghostTimers.current.get(id);
    if (existingTimer) {
      clearTimeout(existingTimer);
      ghostTimers.current.delete(id);
    }

    setTodos((prev) => prev.filter((t) => t.id !== id));
    await verifyChain();
    return true;
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await fetch(`${API_BASE}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
        nonce: todo.nonce,
        proof: todo.proof,
      }),
    });

    if (!res.ok) return false;

    const updated: Todo = await res.json();

    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

    const existingTimer = ghostTimers.current.get(updated.id);
    if (existingTimer) {
      clearTimeout(existingTimer);
      ghostTimers.current.delete(updated.id);
    }

    if (updated.completed) {
      const timer = setTimeout(async () => {
        await deleteTodo(updated.id);
        ghostTimers.current.delete(updated.id);
      }, 15000);

      ghostTimers.current.set(updated.id, timer);
    }

    await verifyChain();
    return true;
  };

const updateTodo = async (id: string, title: string) => {
  const existing = todos.find((t) => t.id === id);
  if (!existing) return false;

  // 🚫 Block editing if completed
  if (existing.completed) {
    console.warn("Cannot edit a completed task. Undo it first.");
    return false;
  }

  const mined = await mineProof(title);

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      completed: existing.completed,
      nonce: mined.nonce,
      proof: mined.proof,
    }),
  });

  if (!res.ok) return false;

  const updated: Todo = await res.json();
  setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  await verifyChain();
  return true;
};

  useEffect(() => {
    fetchTodos();

    return () => {
      ghostTimers.current.forEach((timer) => clearTimeout(timer));
      ghostTimers.current.clear();
    };
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        isChainValid,
        verifyChain,
        fetchTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};