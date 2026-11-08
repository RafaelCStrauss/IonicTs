import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { supabase } from '@/services/supabase.js';
import HomePage from '../views/HomePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroPage.vue'),
  },
  {
    path: '/tarefas',
    name: 'tarefas',
    component: () => import('../views/TarefasPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 1. Verifica se a rota para qual o usuário quer ir exige autenticação
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 2. Pula a sessão atual do Supabase
  const { data: { session } } = await supabase.auth.getSession();

  // 3. Regra de decisão:
  if (requiresAuth && !session) {
    // Se a rota exige login, mas o usuário NÃO tem sessão, manda pro /login
    next('/login');
  } else if (!requiresAuth && session && to.path === '/login') {
    // (Opcional) Se ele já está logado e tenta ir pro login, joga direto pra home
    next('/home');
  } else {
    // Caso contrário, deixa o usuário seguir viagem
    next();
  }
});

export default router;
