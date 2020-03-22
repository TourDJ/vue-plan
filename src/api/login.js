import loginApi from './index'
import axios from '@/utils/http'

export function login (param) {
	return axios({
		url: loginApi.login,
		method: 'post',
		data: param
	})
}

export function getSmsCaptcha (param) {
  return axios({
    url: loginApi.SendSms,
    method: 'post',
    data: param
  })
}
