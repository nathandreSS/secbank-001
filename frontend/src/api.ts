// src/api.js
import axios, { HttpStatusCode } from "axios";
import { useAuth } from "./hooks/useAuth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

// Adiciona uma função para executar as requisições que aguardavam o refresh do token
export const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback: (newToken: string) => void) =>
    callback(newToken),
  );
  refreshSubscribers = [];
};

// Adiciona uma requisição à fila de espera do token
const subscribeTokenRefresh = (callback: (newToken: string) => void) => {
  refreshSubscribers.push(callback);
};

export const setupAxiosInterceptors = (
  refresh: (onRefreshed: (newToken: string) => void) => Promise<string>,
  logout: () => void,
) => {
  api.interceptors.response.use(
    (response) => {
      // Retorna a resposta se estiver ok
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Verifica se a resposta foi 403 (Forbidden)
      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized &&
        !originalRequest._retry
      ) {
        // Evita loops infinitos
        console.log(originalRequest.url);
        if (originalRequest.url.includes("user/login")) {
          return Promise.reject(error);
        }
        if (originalRequest.url.includes("user/refresh")) {
          // Se a requisição for para o refresh token, faz o logout, pois o refresh falhou

          logout();
          return Promise.reject(error);
        }

        // Marca a requisição original para evitar loop
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            // Tenta obter o novo access_token
            await refresh(onRefreshed);
            isRefreshing = false;
            // Refaz as requisições pendentes
            return api(originalRequest);
          } catch (err) {
            isRefreshing = false;
            logout();
            return Promise.reject(err);
          }
        } else {
          // Se já estiver no processo de refresh, aguarda a renovação do token
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              // Atualiza o token no header e refaz a requisição original
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            });
          });
        }
      }

      // Se a requisição falhar com outro erro, simplesmente rejeita
      return Promise.reject(error);
    },
  );
};

export default api;
