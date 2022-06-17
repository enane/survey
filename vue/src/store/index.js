import {createStore} from "vuex";
import axiosClient from "../axios";


const store = createStore({
    getters: {},
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox'],
        surveys: [],
        currentSurvey: {
            data: {},
        },
    },
    actions: {
        register({commit}, user) {
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
        login({commit}, user) {
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
                .then(res => {
                    commit('logout');
                    return res;
                })
        },
        getSurveys({ commit }) {
            return axiosClient.get("/survey").then((res) => {
                commit("setSurveys", res.data);
                return res;
            });
        },
        getSurvey({ commit }, id) {
            return axiosClient.get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    return res;
                });
        },
        saveSurvey({ commit }, survey) {
            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data)
                        return res;
                    });
            } else {
                response = axiosClient.post("/survey", survey).then((res) => {
                    commit('setCurrentSurvey', res.data)
                    return res;
                });
            }
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`)
                // .then((res) => {
                // dispatch('getSurveys')
                // return res;
            // });
        },
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

        },
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, survey.data];
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map((s) => {
                if(s.id === survey.data.id) {
                    return survey.data;
                }
                return s;
            })
        },
        setSurveys: (state, surveys) => {
            state.surveys = [...surveys.data];
        },
    },
    modules: {}
});

export default store;
