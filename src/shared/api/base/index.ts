import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import crypto from 'crypto-js'

export class ApiBase {
	private client: AxiosInstance

	constructor() {
		this.client = axios.create({
			baseURL: `http://api.valantis.store:40000`,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})

		// Adding token to each request
		this.client.interceptors.request.use((req) => {
			const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

			const authString = crypto.MD5(`Valantis_${timestamp}`).toString()

			req.headers['X-Auth'] = authString

			return req
		})

		this.client.interceptors.response.use(
			// Here we can update token using response. Need to validate with backend
			(response) => {
				return response
			},
			// Handling 498 error
			async (error) => {
				// Handling 401 error
				if (error instanceof AxiosError && error.response?.status === 401) {
					localStorage.clear()
					window.location.replace('/')
				}

				return Promise.reject(error)
			},
		)
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.get<T>(url, config)
		return response?.data
	}

	public async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.client.post<T>(url, data, config)
		return response.data
	}

	public async put<T>(url: string, data?: unknown): Promise<T> {
		const response = await this.client.put<T>(url, data)
		return response.data
	}

	public async delete<T>(url: string, data?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.delete<T>(url, data)
		return response.data
	}
}

export const apiService = new ApiBase()
