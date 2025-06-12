"use client";

import { useTodos } from "@/hooks/useTodos";
import { Loader2 } from "lucide-react";

export default function TodoList() {
  const { data: todos = [], isLoading, error } = useTodos("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">
          투두를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.completed && "✓"}</div>

          <div className="flex-1">
            <span>{todo.title}</span>
          </div>

          <div>{new Date(todo.createdAt).toLocaleDateString("ko-KR")}</div>
        </div>
      ))}
    </div>
  );
}
