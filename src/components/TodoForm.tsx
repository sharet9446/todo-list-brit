"use client";

import { useState } from "react";
import { useCreateTodo } from "@/hooks/useTodos";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const createTodoMutation = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTodoMutation.mutate(
        { title: title.trim() },
        {
          onSuccess: () => {
            setTitle("");
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
          disabled={createTodoMutation.isPending}
        />
        <button
          type="submit"
          disabled={createTodoMutation.isPending || !title.trim()}
        >
          {createTodoMutation.isPending ? "추가 중..." : "추가"}
        </button>
      </div>
    </form>
  );
}
