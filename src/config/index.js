export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: '校君宝|校君宝培训学校管理系统|培训机构管理系统|培训机构管理软件|培训班管理系统|培训班管理软件|教务管理系统|教培管理系统|培训|培训学校财务收费管理软件|培训系统|微信小程序|抖音小程序|微信营销招生系统',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: true,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
        dev: 'http://localhost:8100/',
        pro: 'http://localhost:8100/',
        // dev: 'https://www3.xw3q.com/',
        // pro: 'https://www3.xw3q.com/'
    },
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',
    /**
     * @description 需要加载的插件
     */
    plugin: {
        'error-store': {
            showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    }
}