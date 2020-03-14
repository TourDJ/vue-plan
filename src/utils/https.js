import { baseUrl } from '../config/env'

export default async(type = 'GET', api = '', options = {}, xhr = false) => {
	const method = type.toUpperCase();
	const url = baseUrl + api;

	if (method == 'GET') {
		let params = ''; //数据拼接字符串
		Object.keys(options).forEach(key => {
			params += key + '=' + options[key] + '&';
		})

		if (params !== '') {
			params = params.substr(0, params.lastIndexOf('&'));
			url = url + '?' + params;
		}
	}

	if (window.fetch && !xhr) {
		let requestConfig = {
			credentials: 'include',
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (method == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(options)
			})
		}
		
		try {
			var response = await fetch(url, requestConfig);
			var responseJson = await response.json();
		} catch (error) {
			throw new Error(error)
		}
		return responseJson
	} else {
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject;
		}

		let sendData = '';
		if (method == 'POST') {
			sendData = JSON.stringify(options);
		}

		requestObj.open(method, url, true);
		requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		requestObj.send(sendData);

		requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					return obj
				} else {
					throw new Error(requestObj)
				}
			}
		}
	}
}