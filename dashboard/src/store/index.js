import {createStore} from 'vuex'
import Auth from "@/api/Auth";
import Company from "@/api/Company";
import Stat from "@/api/Stat";
import {Metric} from "@/api/Metric";


export default createStore({
    state:{
        token: localStorage.getItem('token') || null,
        groups: [],
        selectedGroup: {},
        screen: 'main',
        metricLabels: {}
    },
    getters: {
        groups(state) {
            return state.groups;
        },
        selectedGroup(state) {
            return state.selectedGroup;
        },
        selectedGroupMetrics(state) {
            return state.selectedGroup.metricsToWeek;
        },
    },
    actions: {
        async auth({ commit, state, dispatch }, { email, password }) {
            if (state.token) {
                await dispatch('getGroups')
                return true;
            }

            const api = new Auth();
            return await api.auth(email, password).then(async token => {
                commit('setToken', token);
                await dispatch('getGroups')
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
        async selectGroup({ state, commit }, groupIndex) {
            const groupId = state.groups[groupIndex].id;

            const stat = new Stat();
            const groupStat = await stat.getGroupStat(groupId).then(async res => {
                return res;
            });

            const metric = new Metric();
            const metrics = await metric.getAll();

            const metricsLabels = {};
            metrics.forEach(el => {
                metricsLabels[el.id] = el.name;
            });

            groupStat.metricsToWeek = Object.keys(groupStat.metricsToWeek).map(el => {
                return {
                    label: metricsLabels[el],
                    values: [...groupStat.metricsToWeek[el]]
                }
            });

            commit('setMetricLabels', metricsLabels);
            commit('setSelectedGroup', groupStat);

            return groupStat;
        },
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
        },
        setMetricLabels(state, metrics) {
            state.metricLabels = metrics;
        }
    }

})
