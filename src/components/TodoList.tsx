"use client";

import { useState, useMemo } from "react";
import { useTodos } from "@/hooks/useTodos";
import type { FilterType } from "@/lib/types";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import { Loader2 } from "lucide-react";

export default function TodoList() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: todos = [], isLoading, error } = useTodos(filter);

  // 전체 투두 개수 계산을 위한 별도 쿼리
  const { data: allTodos = [] } = useTodos("all");

  const todoCounts = useMemo(() => {
    const all = allTodos.length;
    const completed = allTodos.filter((todo) => todo.completed).length;
    const active = all - completed;

    return { all, active, completed };
  }, [allTodos]);

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

  return (
    <div>
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        todoCounts={todoCounts}
      />

      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {filter === "all" &&
            "아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!"}
          {filter === "active" && "진행 중인 할 일이 없습니다."}
          {filter === "completed" && "완료된 할 일이 없습니다."}
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
