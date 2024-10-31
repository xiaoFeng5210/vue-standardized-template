import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }

export class Http {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 设置超时时间为10秒
    })
  }

  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'data' | 'url' | 'method'>) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }

  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }

  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

const currentUrl = `${window.location.protocol}//${window.location.host}/action`
// const authBaseUrl = `${window.location.protocol}//${window.location.host}/auth`
const BASE_URL = import.meta.env ? '/action' : currentUrl
// const API_BASE_URL = 'https://shop.lebai.ltd/api/robotapi'
// const AUTH_BASE_URL = import.meta.env ? '/auth' : authBaseUrl

export const http = new Http(BASE_URL)

http.instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) { /* empty */ }
  }
  throw error
})
