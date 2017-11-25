import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
    // 将data拼接到url上，如果没有？先拼接？；如果有拼接&
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err) {
                resolve(data)
            }else{
                reject(err)
            }
        })
    })

}

function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    //返回值去掉第一个 &
    return url ? url.substring(1) : ''
}