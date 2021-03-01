import { SidebarMenuItems } from "./@theme/model/sidebar-menu-items";

export const SIDEBAR_MENU_ITEM: SidebarMenuItems[] = [
    {
        title: 'Dashboard',
        translate: 'dashboard',
        icon: 'fa fa-tachometer',
        link: '/'
    },
    /* 
    // Exmaple With Children :
    {
        title: 'Products',
        id: 'products',
        translate: 'products',
        icon: 'fa fa-tags',
        children: [
            {
                title: 'All Products',
                translate: 'all-products',
                link: '/products',
            },
            {
                title: 'All Cars',
                translate: 'all-cars',
                link: '/cars',
            }
        ]
    },
    */
    
];
