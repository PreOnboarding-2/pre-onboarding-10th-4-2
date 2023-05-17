import { ITodoRepository } from "../domain/ITodoRepository";
import { TodoDto, TodoSearchDto } from "./TodoDto";
import apiRequest from "../lib/AxiosIntance";

const RESOURCE = "/todos";
const SEARCH = "/search";

class TodoRepository implements ITodoRepository {
  async getTodoList(): Promise<TodoDto[]> {
    try {
      const response = await apiRequest.get(`${RESOURCE}`);
      return response.data;
    } catch (error) {
      throw new Error("API getTodoList error");
    }
  }

  async createTodo(title: string): Promise<TodoDto> {
    try {
      const response = await apiRequest.post(`${RESOURCE}`, { title: title });
      return response.data;
    } catch (error) {
      throw new Error("API createTodo error");
    }
  }

  async deleteTodo(id: string): Promise<TodoDto> {
    try {
      const response = await apiRequest.delete(`${RESOURCE}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("API deleteTodo error");
    }
  }

  async getTodoSearchList(query: string, page: number, limit: number): Promise<TodoSearchDto> {
    try {
      const response = await apiRequest.get(`${SEARCH}`, {
        params: {
          q: query,
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("API getTodoSearch error");
    }
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
