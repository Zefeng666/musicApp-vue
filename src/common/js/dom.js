// 封装添加类名方法
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

// 封装获取类名方法
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

// 获取DOM自义定属性方法
export function getData(el, name, val) {
    const prefix = 'data-'
    name = prefix + name
    // 如果有val就是set，没有就是get
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name)
    }
}

