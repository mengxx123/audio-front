let debug = process.env.NODE_ENV !== 'production'

let imgDomain
let apiDomain
let domain
if (process.env.NODE_ENV === 'production') {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'https://nodeapi.yunser.com'
    domain = {
        api: 'http://java.api.yunser.com/',
        api2: 'https://nodeapi2.yunser.net'
    }
} else {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'https://nodeapi.yunser.com'
    // apiDomain = 'http://localhost:1026'
    // apiDomain = 'http://localhost:1028'
    domain = {
        api: 'http://localhost:1026',
        // api2: 'http://localhost:1028',
        api2: 'https://nodeapi2.yunser.net'
        // api: 'http://java.api.yunser.com/',
    }
}

module.exports = {
    imgDomain,
    apiDomain,
    debug,
    domain
}
