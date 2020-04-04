import { loginApi } from './index'
import axios from '@/utils/http'
import { baseUrl } from '@/config/env'

export function login (param) {
	return axios({
		url: `${baseUrl}${loginApi.login}`,
		method: 'post',
		data: {user: param}
	})
}

export function getSmsCaptcha (param) {
  return axios({
    url: `${baseUrl}${loginApi.SendSms}`,
    method: 'post',
    data: param
  })
}

export function getInfo (token) {
  return axios({
    url: `${baseUrl}${loginApi.getInfo}?token=${token}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: loginApi.logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}