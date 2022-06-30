import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
// next()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            // next()
            const hasGetUserInfo = store.getters.name || Cookies.get('sys_username')
            if (hasGetUserInfo) {
                next()
            } else {
                // 有token  无用户信息
                removeToken();
                //跳转到登录页
                next(`/login?redirect=${to.path}`)
                NProgress.done()
                    // try {
                    //   // get user info
                    //   await store.dispatch('user/getInfo')

                //   next()
                // } catch (error) {
                //   // remove token and go to login page to re-login
                //   await store.dispatch('user/resetToken')
                //   Message.error(error || 'Has Error')
                //   next(`/login?redirect=${to.path}`)
                //   NProgress.done()
                // }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})