let baseUrl 
let routerMode

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://localhost:8020'
	routerMode = 'history'
} else {
	baseUrl = 'https://192.168.0.105:8020'
	routerMode = 'history'
}

export {
	baseUrl,
	routerMode
}