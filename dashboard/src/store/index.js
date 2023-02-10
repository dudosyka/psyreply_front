import {createStore} from 'vuex'
import Auth from "@/api/Auth";
import Company from "@/api/Company";
import Stat from "@/api/Stat";
import {Metric} from "@/api/Metric";
import router from '@/router'

export default createStore({
    state:{
        token: localStorage.getItem('token') || null,
        groups: null,
        selectedGroup: null,
        screen: 'main',
        metricLabels: {},
        companyName: null,
        companyLogo: null,
        selectedMetric: false,
    },
    getters: {
        groups(state) {
            if (state.groups)
                return state.groups;
            return false;
        },
        selectedGroup(state) {
            return state.selectedGroup;
        },
        selectedGroupMetrics(state) {
            if (state.selectedGroup)
                return state.selectedGroup.metricsToWeek;
            return false;
        },
        selectedMetric(state) {
            console.log("selected")
            return state.selectedMetric;
        },
        companyName(state){
            return state.companyName
        },
        companyLogo(state){
            return state.companyLogo
        }
    },
    actions: {
        async loadApplication({dispatch}) {
            dispatch("auth", {email: null, password: null}).catch(() => {
                return false;
            });
            await dispatch('getGroups')
            await dispatch("getMetricsLabels")
            await dispatch("selectGroup", 0);
            await dispatch("company");
            return true;
        },
        async company({commit}){
            const company = new Company();
            return await company.getCompanyName().then(res => {
                commit('setCompanyName', res.name);
                commit('setCompanyLogo', res.logo);
                return res;
            });
        },
        async exit({commit}){
            router.push('/')
            localStorage.removeItem('token')
            commit('clearToken')

        },
        async auth({ commit, state }, { email, password }) {
            const api = new Auth();
            if (state.token) {
                return true;
            }
            return await api.auth(email, password).then(async token => {
                commit('setToken', token);
            }).catch(err => {
               throw err;
            });
        },
        async getGroups({ commit }) {
            const company = new Company();
            return await company.getGroups().then(res => {
                commit('setGroups', res);
                return res;
            });
        },
        async getMetricsLabels({commit}) {
            const metric = new Metric();
            const metrics = await metric.getAll();

            const metricsLabels = {};
            metrics.forEach(el => {
                metricsLabels[el.id] = el.name;
            });
            commit('setMetricLabels', metricsLabels);
        },
        async selectGroup({ state, commit }, groupIndex) {
            const groupId = state.groups[groupIndex].id;

            const stat = new Stat();
            const groupStat = await stat.getGroupStat(groupId).then(async res => {
                return res;
            });

            groupStat.metricsToWeek = Object.keys(groupStat.metricsToWeek).map(el => {
                return {
                    label: state.metricLabels[el],
                    values: [...groupStat.metricsToWeek[el]]
                }
            });

            commit('setSelectedGroup', groupStat);

            return groupStat;
        },
        selectMetric({state, commit}, metricIndex) {
            state.isMetricSelected = true;
            commit('selectMetric', metricIndex);
        }
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token);
            state.token = token;
        },
        setGroups(state, groups) {
            state.groups = groups;
        },
        setSelectedGroup(state, group) {
            state.selectedGroup = group;
            state.selectedMetric = false;
        },
        setMetricLabels(state, metrics) {
            state.metricLabels = metrics;
        },
        clearToken(state){
            state.token = null
        },
        setCompanyName(state, name){
            state.companyName = name;
        },
        setCompanyLogo(state,logo){
            state.companyLogo = logo;
        },
        selectMetric(state, metricIndex) {
            console.log(state.selectedGroup.metricsToWeek[metricIndex]);
            state.selectedMetric = state.selectedGroup.metricsToWeek[metricIndex];
            console.log('set')
        },
        removeMetricSelection(state) {
            state.selectedMetric = null;
        },
    }

})
