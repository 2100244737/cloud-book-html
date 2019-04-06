import axios from 'axios'

const fetch = axios.create({
  baseURL: process.env.BASE_URL
})

fetch.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})
fetch.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
    return config
  } else {
    return config
  }
}, err => Promise.reject(err))
export {fetch}
