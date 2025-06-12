import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">투두 리스트</p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
