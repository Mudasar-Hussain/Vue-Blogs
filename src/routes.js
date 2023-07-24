import Home from './components/Home'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'
const routes = [
    {
        path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/post-detail/:id',
        name:'PostDetail',
        component: PostDetail
    },
    {
        path:'/post-form/:id?',
        name:'PostForm',
        component: PostForm
    }
];
export default routes;