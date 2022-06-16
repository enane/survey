import {createStore} from "vuex";
import axiosClient from "../axios";

const surveys = [

];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [
            {
                id: 1,
                title: "Laravel 8",
                slug: "laravel-8",
                status: "draft",
                image: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
                description: `Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.`,
                created_at: "2021-12-20 18:00:00",
                updated_at: "2021-12-20 18:00:00",
                expire_date: "2021-12-31 18:00:00",
            },
            {
                id: 2,
                title: "Vue 3",
                slug: "vue-3",
                status: "active",
                image: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
                description: `Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.`,
                created_at: "2021-12-21 17:00:00",
                updated_at: "2021-12-21 17:00:00",
                expire_date: "2021-12-31 00:00:00",
            },
            {
                id: 3,
                title: "Tailwind 3",
                slug: "tailwind-3",
                status: "active",
                image: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
                description: `A utility-first CSS framework packed with classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code> and <code>rotate-90</code> that can be composed to build any design, directly in your markup.`,
                created_at: "2021-12-21 14:00:00",
                updated_at: "2021-12-21 14:00:00",
                expire_date: "2021-12-31 00:00:00",
            },
        ],
    },
    getters: {},
    actions: {
        register({ commit }, user){
            // return fetch('http://localhost:8000/api/register', {
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json"
            //     },
            //     method: "POST",
            //     body: JSON.stringify(user)
            // })
            //     .then((res)=>res.json())
            //     .then((res)=>{
            //         commit("setUser", res);
            //         return res;
            //     });
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        //     return fetch('http://localhost:8000/api/register', {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json"
        //         },
        //         method: "POST",
        //         body: JSON.stringify(user)
        //     })
        //         .then((res)=>res.json())
        //         .then((res)=>{
        //             commit("setUser", res);
        //             return res;
        //         });
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(res=>{
                    commit('logout');
                    return res;
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);

        }
    },
    modules: {}
});

export default store;
