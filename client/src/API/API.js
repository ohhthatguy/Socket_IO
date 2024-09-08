import axios from 'axios'

const API_URl = {
    sendMsg: {method: 'post', url: '/send-msg'}
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

const API = {}

for(const [key,value] of Object.entries(API_URl) ){

    API[key] = (data)=>{


        return axiosInstance({ 
            method: value.method,
            url: value.url,
            data: value.method=='get' ? '': data
        })
    }

}

export {API}