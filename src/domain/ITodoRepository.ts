import { TodoDto, TodoSearchDto } from "../infrastructure/TodoDto";

export interface ITodoRepository {
  getTodoList(): Promise<TodoDto[]>;
  createTodo(title: string): Promise<TodoDto>;
  deleteTodo(id: string): Promise<TodoDto>;
  getTodoSearchList(query: string, page: number, limit: number): Promise<TodoSearchDto>;
}
