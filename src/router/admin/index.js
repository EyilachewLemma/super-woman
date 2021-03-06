export default {
    path: '/dash-board',
    name: 'AdminHome',
    component: () =>
        import ( /* webpackChunkName: "AdminHome" */ '../../views/AdminHome.vue'),
    meta: { adminAuth: true, typeRequired: 'admin' },
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
        {
            path: '/edit-role-model/:entity/:roleModelId',
            name: 'EditRoleModel',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "EditRoleModel" */ '../../views/admin/EditingPage.vue'),
        },
        {
            path: '/translate-rolemodel/:roleModelId',
            name: 'TranslateRolemodel',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "TranslateRolemodel" */ '../../views/admin/TranslationForm.vue'),
        },
        {
            path: '/translate-blog/:blogId',
            name: 'TranslateBlog',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "TranslateBlog" */ '../../views/admin/TranslationForm.vue'),
        },
        {
            path: '/edit-blog/:entity/:blogId',
            name: 'EditBlog',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "EditBlog" */ '../../views/admin/EditingPage.vue'),
        },
        {
            path: '/language',
            name: 'Language',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "Language" */ '../../views/admin/AddLanguage.vue'),
        },

    ]
}