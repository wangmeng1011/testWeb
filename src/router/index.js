import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: '主页',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '主页', icon: 'dashboard' }
        }]
    },
  {
    path: '/datas',
    component: Layout,
    name:'datas',
    meta:{title:"数据展示", icon:"form"},
    redirect:'noRedirect',
    alwaysShow:true,
    children: [{
      path: 'api',
      name: '接口数据',
      component: () =>
        import ('@/views/datarecord/index'),
      meta: { title: '接口数据', icon: 'form' }
    },{
      path: 'chandao-data',
      name: '功能数据',
      component: () =>
        import ('@/views/datarecord/chandao'),
      meta: { title: '功能数据', icon: 'form' }
    }]
  },
    // {
    //     path: '/data',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         name: '数据统计',
    //         component: () =>
    //             import ('@/views/datarecord/index'),
    //         meta: { title: '数据统计', icon: 'form' }
    //     }]
    // },
    {
        path: '/project',
        component: Layout,
        redirect: '/project/index',
        name: '项目管理',
        meta: { title: '项目管理', icon: 'example' },
        children: [{
                path: 'index',
                name: '项目介绍',
                component: () =>
                    import ('@/views/project/project'),
                meta: { title: '项目介绍' }
            },
            {
                path: 'host',
                name: '项目HOST',
                component: () =>
                    import ('@/views/project/host'),
                meta: { title: '项目HOST' }
            },
            {
              path: 'Parameter',
              name: '参数化表达式',
              component: () =>
                import ('@/views/project/parameterization'),
              meta: { title: '参数化表达式' }
            },
            {
                path: 'api',
                name: 'API接口',
                component: () =>  import ('@/layout/view'),
                meta: { title: 'API接口' },
                children: [{
                        path: 'index',
                        name: 'api-list',
                        component: () =>
                            import ('@/views/project/api'),
                        meta: { title: 'API接口', breadcrumb: false }
                    },
                    {
                        path: 'add',
                        name: 'api-add',
                        hidden: true,
                        noCache: true,
                        component: () =>
                            import ('@/views/project/apiAdd'),
                        meta: { title: '新增', activeMenu: '/project/api/index' }
                    },
                    {
                        path: 'update/:apiId',
                        name: 'api-update',
                        hidden: true,
                        noCache: true,
                        component: () =>
                            import ('@/views/project/apiAdd'),
                        meta: { title: '修改'}
                    }
                ]
            },
            {
                path: 'case',
                name: '接口测试用例',
                redirect: '/project/case/index',
                component: () =>
                    import ('@/layout/view'),
                // component: () =>
                //     import ('@/views/project/case'),
                meta: { title: '接口测试用例' },
                children: [{
                        path: 'index',
                        name: 'case-list',
                        component: () =>
                            import ('@/views/project/case'),
                        meta: { title: '接口测试用例', breadcrumb: false }
                    },
                    {
                        path: 'add',
                        name: 'case-add',
                        hidden: true,
                        noCache: true,
                        component: () =>
                            import ('@/views/project/case-add-or-update'),
                        meta: { title: '新增' }
                    }
                ]
            },
            {
                path: 'bugs',
                name: '功能测试用例',
                redirect: '/project/bugs/index',
                component: () =>
                    import ('@/layout/view'),
                // component: () =>
                //     import ('@/views/project/bugs'),
                meta: { title: '功能测试用例' },
                // alwaysShow: true,
                children: [{
                        path: 'index',
                        name: 'chandao-index',
                        // hidden: true,
                        component: () =>
                            import ('@/views/chandao/project'),
                        meta: { title: '功能测试用例', breadcrumb: false },
                    },
                    {
                        path: 'module/list/:id',
                        name: 'chandao-module-list',
                        noCache: true,
                        hidden: true,
                        component: () =>
                            import ('@/views/chandao/module'),
                        meta: { title: '模块列表', noCache: true },
                    },
                    {
                        path: 'chandao/bugs/:id',
                        name: 'chandao-bug-list',
                        noCache: true,
                        hidden: true,
                        component: () =>
                            import ('@/views/chandao/bugs'),
                        meta: { title: 'bugs列表', noCache: true },
                    },{
                        path: 'chandao/bugs/add/:id',
                        name: 'chandao-bug-add',
                        noCache: true,
                        hidden: true,
                        component: () =>
                            import ('@/views/chandao/bugs-add-or-update'),
                        meta: { title: '创建用例', noCache: true },
                    }
                ]
            },
            // {
            //     path: 'report',
            //     name: 'report',
            //     redirect: '/project/report/index',
            //     component: () =>
            //         import ('@/layout/view'),
            //         children:[
            //             {
            //                 path: 'index',
            //                 name: 'report-list',
            //                 component: () =>
            //                 import ('@/views/project/report'),
            //                 meta: { title: '报告汇总', breadcrumb: false  }
            //             },
            //             {
            //                 path: 'details',
            //                 name: 'report-details',
            //                 noCache: true,
            //                 hidden: true,
            //                 component: () =>
            //                 import ('@/views/project/report-details'),
            //                 meta: { title: '报告详情' }
            //             }
            //         ],
            //     meta: { title: '报告汇总' }
            // },
            {
                path: 'runRecord',
                name: '运行记录',
                component: () =>
                    import ('@/views/project/run-record'),
                meta: { title: '运行记录' }
            },
            // {
            //     path: 'problem',
            //     name: '问题统计',
            //     component: () =>
            //         import ('@/views/project/problem'),
            //     meta: { title: '问题统计' }
            // }
        ]
    },
    {
        path: '/mission',
        component: Layout,
        redirect: '/mission/index',
        name: '任务管理',
        meta: { title: '任务管理', icon: 'example' },
        children: [{
            path: 'index',
            name: '定时任务',
            component: () =>
                import ('@/views/mission/interval'),
            meta: { title: '定时任务', icon: 'form' }
        },{
            path: 'test',
            name: '测试任务',
            component: () =>
                import ('@/views/mission/test'),
            meta: { title: '测试任务', icon: 'form' }
        }
        // ,{
        //     path: 'share',
        //     name: '分享',
        //     component: () =>
        //         import ('@/views/mission/share'),
        //     meta: { title: '分享', icon: 'form' }
        // }
        ]
    },
    // {
    //     path: '/form',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         name: '系统设置',
    //         component: () =>
    //             import ('@/views/form/index'),
    //         meta: { title: '系统设置', icon: 'form' }
    //     }]
    // },
   {
        path: '/stat',
        component: Layout,
        meta:{title:"问题统计", icon:"form"},
        children: [{
            path: 'mesh',
            name: '现网问题',
            component: () =>
                import ('@/views/stat/mesh'),
            meta: { title: '现网问题', icon: 'form' }
        },
          {
            path: 'system',
            name: '系统问题',
            component: () =>
                import ('@/views/stat/system'),
            meta: { title: '系统问题', icon: 'form' }
        }]
    },{
        path: '/report',
        component: Layout,
        name:'report',
        meta:{title:"报告汇总", icon:"form"},
        alwaysShow:true,
        children: [{
            path: 'api',
            name: 'report-total',
            component: () =>
                import ('@/views/project/report'),
            meta: { title: '接口报告', icon: 'form' }
        }]
    },{
        path: '/system',
        component: Layout,
        name:'system',
        meta:{title:"系统配置", icon:"form"},
        alwaysShow:true,
        children: [{
            path: 'user',
            name: '用户管理',
            component: () =>
                import ('@/views/user/user'),
            meta: { title: '用户管理', icon: 'form' }
        },

        {
            path: 'mail',
            name: '邮箱设置',
            component: () =>
                import ('@/views/user/mail'),
            meta: { title: '邮箱设置', icon: 'form' }
        }
        ]
    }
    // ,{
    //     path: '/datas',
    //     component: Layout,
    //     name:'datas',
    //     meta:{title:"数据展示", icon:"form"},
    //     redirect:'noRedirect',
    //     alwaysShow:true,
    //     children: [{
    //         path: 'api',
    //         name: '接口数据',
    //         component: () =>
    //             import ('@/views/datarecord/index'),
    //         meta: { title: '接口数据', icon: 'form' }
    //     },{
    //         path: 'chandao-data',
    //         name: '禅道数据',
    //         component: () =>
    //             import ('@/views/datarecord/chandao'),
    //         meta: { title: '禅道数据', icon: 'form' }
    //     }]
    // },
    // 404 page must be placed at the end !!!
    ,{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
