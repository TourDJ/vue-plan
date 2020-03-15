let baseUrl, routerMode

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://localhost:8020'
	routerMode = 'history'
} else {
	baseUrl = 'http://192.168.0.105:8020'
	routerMode = 'history'
}

export {
	baseUrl,
	routerMode
}