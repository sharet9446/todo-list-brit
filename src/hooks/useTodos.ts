import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/lib/api";
import type {
  CreateTodoRequest,
  UpdateTodoRequest,
  FilterType,
} from "@/lib/types";

const QUERY_KEYS = {
  todos: ["todos"] as const,
  todosByFilter: (filter: FilterType) => ["todos", filter] as const,
};

export const useTodos = (filter: FilterType = "all") => {
  return useQuery({
    queryKey: QUERY_KEYS.todosByFilter(filter),
    queryFn: () => {
      if (filter === "all") {
        return todoApi.getTodos();
      }
      return todoApi.getTodosByFilter(filter);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodoRequest) => todoApi.createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTodoRequest }) =>
      todoApi.updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
