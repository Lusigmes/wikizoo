import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/Default.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'wiki',
                children: [
                    {
                        path: 'catalogo',
                        name: 'Catalogo',
                        component: () => import('@/views/wiki/CatalogoView.vue')
                    },
                    {
                        path: 'especie',
                        name: 'Especie',
                        component: () => import('@/views/especie/EspecieView.vue')
                    },
                    {
                        path: 'especie/:id',
                        name: 'EspecieDetalhes',
                        component: () => import('@/views/especie/EspecieDetalhes.vue')
                    },
                    
                    // { outra coisa
                    //     path: 'especie/:id/editar',
                    //     name: 'CatalogoForm',
                    //     component: () => import('@/views/wiki/CatalogoForm.vue')
                    // },
                    
                    
                    /* especie, especieDetalhes */
                ]
            },
         ] 
    },
    

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})
export default router;