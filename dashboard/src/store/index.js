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
        selectedGroupId: null,
        screen: 'main',
        metricLabels: {},
        companyName: null,
        companyLogo: null,
        selectedMetric: false,
        showInfoModal: false,
        showInfoModalData: null,
        showAnimation: false,
        shareToken: null,
    },
    getters: {
        groups(state) {
            if (state.groups)
                return state.groups;
            return false;
        },
        selectedGroupId(state){
            return state.selectedGroupId
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
        },
        showedInfoModal(state){
            return state.showInfoModal
        },
        showedInfoModalData(state){
            return state.showInfoModalData
        },
        showedAnimations(state){
            return state.showAnimation
        },
        shareToken(state){
          return state.shareToken
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
        async createShareToken({commit,state}){
            const company = new Company()
            return await company.getShare([state.selectedGroupId]).then(res =>{
                commit('setShareToken', res)
                return res
            })
        },
        async exit({commit}){
            router.push('/')
            localStorage.removeItem('token')
            commit('clearToken')
        },
        async closeInfoModal({commit}){
          commit('closeShowInfoModal')
        },
        async openInfoModal({state,commit},metric){
            state.showInfoModal = true
            commit('setInfoModalData',state.metricLabels[metric])
            console.log()
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
                console.log(res[0])
                res.unshift({
                    id: null,
                    name: "Общее"
                });
                commit('setGroups', res);
                return res;
            });
        },
        async getMetricsLabels({commit}) {
            const metric = new Metric();
            const metrics = await metric.getAll();

            const metricsLabels = {};
            metrics.forEach(el => {
                metricsLabels[el.id] = {
                    name: el.name,
                    description: el.description
                };
            });
            commit('setMetricLabels', metricsLabels);
        },
        async processGroupStat({commit, state}, groupStat) {
            groupStat.metricsToWeek = Object.keys(groupStat.metricsToWeek).map(el => {
                const values = groupStat.metricsToWeek[el];
                if (values.length <= 1) {
                    values.unshift({
                        zero: true,
                        week: values[0].week,
                        value: 0,
                        date: values[0].date,
                    });
                }
                return {
                    label: state.metricLabels[el],
                    values: [...values],
                    metricId: parseInt(el)
                }
            });

            commit('setSelectedGroup', groupStat);

            return groupStat;
        },
        async selectGroup({ state, dispatch }, groupIndex) {
            const groupId = state.groups[groupIndex].id;

            const stat = new Stat();
            const groupStat = await stat.getGroupStat(groupId).then(async res => {
                return res;
            });

            state.selectedGroupId = groupId;

            return await dispatch('processGroupStat', groupStat);
        },
        async selectGroupOld({ state, dispatch }) {
            const stat = new Stat();
            const groupStat = await stat.getGroupStatOld(state.selectedGroupId).then(async res => {
                return res;
            });

            return await dispatch('processGroupStat', groupStat);
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
            console.log(groups)
            state.groups = groups;
        },
        setSelectedGroup(state, group) {
            console.log(group)
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
        setInfoModalData(state,data){
            state.showInfoModalData = data;
        },
        openShowInfoModal(state){
          state.showInfoModal = true;
        },
        closeShowInfoModal(state){
            state.showInfoModal = false;
        },
        showAnimationTrue(state){
          state.showAnimation = true;
        },
        showAnimationFalse(state){
            state.showAnimation = false;
        },
        setShareToken(state, token){
            state.shareToken = token;
        }
    }

})
