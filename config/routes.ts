export default [
  // 首页登录
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // 欢迎界面
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // 管理页
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  // 查询表格页
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  // 案件管理页
  {
    name: 'casemanagement',
    icon: 'folderAdd',
    path: '/case',
    component: './CaseManagement',
    routes: [],
  },
  // 客户管理页
  {
    name: 'clientmanagement',
    icon: 'team',
    path: '/client',
    component: './ClientManagement',
  },
  // 检材管理页
  {
    name: 'materialmanagement',
    icon: 'database',
    path: '/material',
    component: './MaterialManagement',
  },
  // 根目录
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
