export default {
    path: '/dash-board',
    name: 'AdminHome',
    component: () =>
        import ( /* webpackChunkName: "AdminHome" */ '../../views/AdminHome.vue'),
    meta: { AdminAuth: true, typeRequired: 'admin' },
    children: [{
            path: '/dash-board',
            name: 'DashBoard',
            component: () =>
                import ( /* webpackChunkName: "DashBoard" */ '../../views/admin/DashBoard.vue'),
        },
        {
            path: '/role-medel',
            name: 'RoleModel',
            component: () =>
                import ( /* webpackChunkName: "RoleModel" */ '../../views/admin/RoleModel.vue'),
        },
        {
            path: '/mentor',
            name: 'MentorPage',
            component: () =>
                import ( /* webpackChunkName: "MentorPage" */ '../../views/admin/MentorPage.vue'),
        },
        {
            path: '/blog',
            name: 'BlogPage',
            component: () =>
                import ( /* webpackChunkName: "BlogPage" */ '../../views/admin/BlogPage.vue'),
        },
        {
            path: '/user',
            name: 'UserPage',
            component: () =>
                import ( /* webpackChunkName: "User" */ '../../views/admin/UserPage.vue'),
        },
        {
            path: '/field',
            name: 'FieldPage',
            component: () =>
                import ( /* webpackChunkName: "Field" */ '../../views/admin/FieldPage.vue'),
        },
        {
            path: '/setting',
            name: 'SettingPage',
            component: () =>
                import ( /* webpackChunkName: "Setting" */ '../../views/admin/SettingPage.vue'),
        },
        {
            path: '/writer',
            name: 'WriterPage',
            component: () =>
                import ( /* webpackChunkName: "WriterPage" */ '../../views/admin/WriterPage.vue'),
        },
        {
            path: '/newrole-model',
            name: 'NewRoleModel',
            component: () =>
                import ( /* webpackChunkName: "NewRoleModel" */ '../../views/admin/RolemodelPost.vue'),
        },
        {
            path: '/rolemodel-detail/:roleModelId',
            name: 'RoleModelDetail',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "RoleModelDetail" */ '../../views/admin/RoleModelDetail.vue'),
        },
        {
            path: '/blog-detail/:blogId',
            name: 'BlogDetail',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "BlogDetail" */ '../../views/admin/BlogDetail.vue'),
        },
        {
            path: '/post-blog',
            name: 'PostBlog',
            component: () =>
                import ( /* webpackChunkName: "PostBlog" */ '../../views/admin/PostBlog.vue'),
        },
    ]
}