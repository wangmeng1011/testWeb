import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // baseURL: 'http://17322nb794.iok.la:80:80', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60*1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'JWT ' + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (response.status >= 300) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // 退出到登录页
        if (error.response.status == 403) {
            if(error.response.data.status == 0){
                removeToken();
                router.push({ path: "/login" })
            }
            Message({
                message: error.response.data.msg || error.response.data.detail || error.response.data.non_field_errors[0],
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(error)
        }
        console.log(error)
        if (error.response.status == 400) {
            Message({
                message: error.response.data.msg || error.response.data.non_field_errors[0],
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(error)
        }
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
