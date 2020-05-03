import { todoApi } from './index'
import axios from '@/utils/http'
import { baseUrl } from '@/config/env'

export function saveTodo (param) {
	return axios({
		url: `${baseUrl}${todoApi.saveTodo}`,
		method: 'post',
		data: param
	})
}

export function todoInfo(user, date) {
	return axios({
		url: `${baseUrl}${todoApi.todoInfo}?user=${user}&date=${date}`,
		method: 'get',
	})
}