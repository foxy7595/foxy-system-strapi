import { request } from "@strapi/helper-plugin";

const todoRequests = {
  getAllTodos: async () => {
    return await request("/chatgpt-suggestion/find", {
      method: "GET",
    });
  },

  addTodo: async (data) => {
    return await request(`/chatgpt-suggestion/create`, {
      method: "POST",
      body: { data: data },
    });
  },

  toggleTodo: async (id) => {
    return await request(`/chatgpt-suggestion/toggle/${id}`, {
      method: "PUT",
    });
  },

  editTodo: async (id, data) => {
    return await request(`/chatgpt-suggestion/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deleteTodo: async (id) => {
    return await request(`/chatgpt-suggestion/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default todoRequests;
