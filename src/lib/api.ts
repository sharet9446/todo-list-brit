import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "./types";

const API_BASE_URL = "http://localhost:3000";

export const todoApi = {
  // 모든 투두 조회
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("투두 목록을 가져오지 못했습니다.");
    }
    return response.json();
  },

  // 필터된 투두 조회
  getTodosByFilter: async (filter: "active" | "completed"): Promise<Todo[]> => {
    const completed = filter === "completed";
    const response = await fetch(
      `${API_BASE_URL}/todos?completed=${completed}`
    );
    if (!response.ok) {
      throw new Error("필터링된 투두를 가져오는 데 실패했습니다");
    }
    return response.json();
  },

  // 투두 생성
  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        ...todo,
        id: Date.now().toString(),
        completed: todo.completed || false,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error("투두를 생성하지 못했습니다");
    }
    return response.json();
  },

  // 투두 수정
  updateTodo: async (id: string, updates: UpdateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("투두 업데이트에 실패했습니다");
    }
    return response.json();
  },

  // 투두 삭제
  deleteTodo: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("투두 삭제에 실패했습니다");
    }
  },
};
