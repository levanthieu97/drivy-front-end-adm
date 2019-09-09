export default [
  {
    path: '/pd',
    meta: {
      group: 'products',
      title: 'Sản Phẩm'
    },
    name: 'ProductsMater',
    redirect: {
      path: '/pd/products'
    }
  },
  {
    path: '/pd/products',
    meta: {
      requiresAuth: true,
      group: 'products',
      title: 'Sản Phẩm'
    },
    name: 'Products',
    component: () => import('modules/supplier/products')
  },

  {
    path: '/pd/request-products',
    meta: {
      requiresAuth: true,
      group: 'products',
      title: 'Tìm kiếm sản phẩm'
    },
    name: 'RequestProducts',
    component: () => import('modules/supplier/request-products')
  },
  {
    path: '/manage-product',
    meta: {
      requiresAuth: true,
      group: 'products',
      title: 'Duyệt sản phẩm'
    },
    name: 'ManageProduct',
    component: () => import('modules/manage-product')
  },
  {
    path: '/new-product',
    meta: {
      requiresAuth: true,
      title: 'Tạo sản phẩm mới'
    },
    name: 'NewProduct',
    component: () => import('modules/supplier/new-product')
  },
  {
    path: '/od',
    meta: {
      group: 'orders',
      title: 'Sản Phẩm'
    },
    name: 'OrdersMater',
    redirect: {
      path: '/od/orders'
    }
  },
  {
    path: '/od/orders',
    meta: {
      requiresAuth: true,
      group: 'orders',
      title: 'Đơn hàng'
    },
    name: 'Orders',
    component: () => import('modules/supplier/orders')
  }
];
