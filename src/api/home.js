import request from '@/utils/request'

export function getHomeData() {
    return request({
        url: '/api/data/',
        method: 'get',
    })
}
export function getChandaoData() {
    return request({
        url: '/chandao/data/count/',
        method: 'get',
    })
}