import localStorage from 'localStorage'
import _ from "lodash";

export const trim = function (str, char, type) {
    if (char) {
        if (type === 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '')
        } else if (type === 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '')
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
    }
    return str.replace(/^\s+|\s+$/g, '')
}

// 配置获取
export const config = function (key) {
    return process.env['VUE_APP_' + key]
}

export const token = function () {
    return localStorage.getItem(config('ADMIN_TOKEN_NAME'))
}

export const serverUrl = function (data = {}) {
    let query = []
    Object.keys(data).forEach((item) => {
        query.push(item + '=' + encodeURIComponent(data[item]))
    })
    return config('API_URL_PREFIX') + (query.length > 0 ? ('?' + query.join('&')) : '')
}

export const actionUrl = function (action) {
    let data = {}
    data[config('API_ACTION_NAME')] = action
    if (token()) {
        data[config('API_TOKEN_NAME')] = token()
    }
    return serverUrl(data)
}

// 菜单排序
export const menuSort = function (menus) {
    let m = _.cloneDeep(menus)
    m.sort((item1, item2) => {
        if (item1.sort < item2.sort) {
            return -1
        }
        if (item1.sort === item2.sort) {
            return item1.id < item2.id ? -1 : 1
        }
        return 1
    })
    return m;
}