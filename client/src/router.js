import Vue from 'vue';
// import store from './store';
import Router from 'vue-router';
import Landing from './views/Landing.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';
import CreateProfile from './views/CreateProfile.vue';
import EditProfile from './views/EditProfile.vue';
import AddExperience from './views/AddExperience.vue';
import AddEducation from './views/AddEducation.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: CreateProfile
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: EditProfile
    },
    {
      path: '/add-experience',
      name: 'add-experience',
      component: AddExperience
    },
    {
      path: '/add-education',
      name: 'add-education',
      component: AddEducation
    },
   
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;