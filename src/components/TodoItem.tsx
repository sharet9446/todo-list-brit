"use client";

import { useState } from "react";
import type { Todo } from "@/lib/types";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import { Check, Edit2, Trash2, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  // 완료 상태 토글
  const handleToggleComplete = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      updates: { completed: !todo.completed },
    });
  };

  // 편집 모드 시작
  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  // 편집 저장
  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      updateTodoMutation.mutate(
        {
          id: todo.id,
          updates: { title: editTitle.trim() },
        },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    } else {
      setIsEditing(false);
    }
  };

  // 편집 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  // 투두 삭제
  const handleDelete = () => {
    if (confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      deleteTodoMutation.mutate(todo.id);
    }
  };

  // 키보드 이벤트 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white rounded-lg border ${
        todo.completed ? "border-green-200 bg-green-50" : "border-gray-200"
      } hover:shadow-md transition-shadow`}
    >
      {/* 완료 체크박스 */}
      <button
        onClick={handleToggleComplete}
        disabled={updateTodoMutation.isPending}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {todo.completed && <Check className="w-3 h-3" />}
      </button>

      {/* 제목 (편집 모드에 따라 다르게 표시) */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSaveEdit}
            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* 생성 날짜 */}
      <div className="text-xs text-gray-400">
        {new Date(todo.createdAt).toLocaleDateString("ko-KR")}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
              title="저장"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
              title="취소"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
              title="수정"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteTodoMutation.isPending}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
