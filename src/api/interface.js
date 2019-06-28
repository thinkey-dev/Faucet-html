import request from '@/utils/request'

/*获取主页货币市值信息*/
export function getalltokeninfo() {
  return request({
    url: 'token/tokeninfo/action/getalltokeninfo/',
    method: 'get',
    params: {}
  })
}
export function test(e) {
  return request({
    url: 'test/',
    method: 'post',
    data:e
  })
}
