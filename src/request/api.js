import { get, post } from './http'

export const getUser = id => get('/user/' + id)