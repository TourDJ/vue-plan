import { baseUrl } from '../config/env'
import axios from '../utils/http'
import qs from 'qs'

const user = {
	getUser (id) {
		return axios.get(`${baseUrl}/user/${id}`)
	}
	// ,       
 //    userDetail (id, params) {        
 //        return axios.get(`${baseUrl}/topic/${id}`, {            
 //            params: params        
 //        });    
 //    },
 //    // post提交    
 //    login (params) {        
 //        return axios.post(`${baseUrl}/accesstoken`, qs.stringify(params));    
 //    }
}

export default user
