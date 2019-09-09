const Menu = [
  {
    title: 'Dashboard',
    group: 'dsb',
    icon: 'cast_connected',
    name: 'Dashboard'
  },

  {
    title: 'Sản phẩm',
    group: 'products',
    icon: 'card_giftcard',
    name: 'ProductsMater',
    items: [
      {
        title: 'Danh sách sản phẩm',
        component: 'Products'
      },
      {
        title: 'Tạo mới / đăng sản phẩm',
        component: 'RequestProducts'
      },
      {
        title: 'Duyệt sản phẩm',
        component: 'ManageProduct'
      }
    ]
  },
  {
    title: 'Đơn Hàng',
    group: 'orders',
    icon: 'shopping_cart',
    name: 'OrdersMater',
    items: [
      {
        title: 'Đơn đặt hàng',
        component: 'Orders'
      }
    ]
  }
];

export default Menu;
