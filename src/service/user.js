import { baseUrl } from '../config/env'
import axios from '../utils/http'
import qs from 'qs'

const user = {
	getUser (id) {
		return axios.get(`${baseUrl}/user/${id}`)
	}
}

export default user
