import https from '../utils/https'

var getUser = () => https('GET', '/user/1');

export {
	getUser
}