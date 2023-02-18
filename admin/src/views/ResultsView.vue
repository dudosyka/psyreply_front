<template>
  <div class="wrapper">
    <y-left-side-bar />

    <main class="main">

      <y-modal v-if="window === 'main'" class="main__modal">
        <header class="header">
          <div class="header__select">

            <h2 class="heading header__heading">Результаты</h2>
            <y-select
              font-size="1"
              :selects="blocks"
              @select="updateBlocksSelect"
            />
          </div>
          <div class="company__date__select">
            <y-date
              @update-date="setDateFilter"
            />
          </div>
        </header>
        <div class="filters" v-if="filters.block_id">
          <y-input
              class="week_input"
              font-size="1"
              v-model.trim="filters.week"
              placeholder="Номер недели"
          />
          <div class="export-block">
            <y-select
                :selects="groups"
                @select="updateGroupSelect"
            />
          </div>
          <button class="button" @click="statByWholeBlock()" v-if="filters.week != null && filters.week != ''">По всему блоку</button>
          <button class="button" @click="statByGroup()" v-if="filters.week != null && filters.week != '' && filters.group_id">По всей группе</button>
        </div>
        <y-results-list v-if="results.length > 0">
          <y-results-list-item
            v-for="result in pagineteData"
            :name="result.block_title"
            :id="result.user.jetBotId"
            :username="result.user.login"
            :week="result.week"
            :row="result"
            :valid="result.approved"
            :date="result.createdAt"
            @edit="openEditWindow(result)"
            :active="result.active"
          />
          <!--            :selectable="filters.week != null && filters.week != ''"-->
          <!--            @select="result_selected(result)"-->
          <div class="container-fluid footer-container">
            <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i class="fa-solid fa-chevron-left"></i> Назад</YButton>
            <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i class="fa-solid fa-chevron-right"></i></YButton>
          </div>
        </y-results-list>
        <p class="new__results" v-else>
          {{ answerMessage }}
        </p>
      </y-modal>
      <y-modal v-if="window === 'dashboard'">
          <y-dashboard
            :block="editBlock"
            @close="closeEditWindow"
          />
      </y-modal>

      <y-modal v-if="window === 'stat'">

      </y-modal>

    </main>
  </div>
</template>

<script>
import YSelect from "@/components/UI/YSelect";
import YDate from "@/components/UI/YDate";
import YPopup from "@/components/UI/YPopup";
import YPopupError from "@/components/UI/YPopupError";
import YResultsListItem from "@/components/UI/YResultsListItem";
import YResultsList from "@/components/Results/YResultsList";
import YDashboard from "@/components/Results/YDashboard";

import Company from '@/api/admin/Company';
import Results from '@/api/admin/Results';
import Block from '@/api/admin/Block';
import YList from "@/components/UI/YList";
import YListItem from "@/components/UI/YListItem";
import YCoolButton from "@/components/UI/YCoolButton";
import Stat from "@/api/admin/Stat";

function update(data) {
  const results = new Results()
  let options = data.filters;
  const { week, ...filters } = options;

  if (data.filters.week != "")
    filters.week = week;

  console.log(filters);

  results.getAll({ filters })
    .then(res => {
      if(res.ok) {
        res.json().then(data => data.body).then(r => {
          let results = []
          r.forEach(el => {
            const old = data.results.filter(a => a.id == el.id);
            if (old.length)
              el.active = old[0].active;
            results.push(el)
          })
          data.results = results;
        })
      } else {
        data.$store.commit('openErrorPopup', 'Не удалось загрузить результаты')
      }
    })
}

export default {
  name: "RelultsView",
  components: {
    YCoolButton,
    YListItem,
    YList,
    YResultsList,
    YResultsListItem,
    YPopupError,
    YPopup,
    YDate,
    YSelect,
    YDashboard,
  },
  created() {
    this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          if (toParams.after === '')
            this.window = 'main'
        }
    )
    this.$watch(
        () => this.filters.week,
        () => {
          update(this)
        }
    )
    const data = this;
    data.blocks = []
    const block = new Block()
    data.blocks.push({ })
    data.blocks.forEach(el => el['active'] = false)
    data.blocks[0]['name'] = 'Все блоки'
    data.blocks[0]['id'] = null
    data.blocks[0]['active'] = true
    block.getAll({ filters: {  } })
        .then(res => {
          if (res.ok) {
            res.json().then(data => data.body).then(r => {
              r.forEach(el => {
                el.active = false
                data.blocks.push(el)
              })
            })
          } else {
            this.$store.commit('openErrorPopup', 'Не удалось загрузить блоки компании')
          }
        })

    const company = new Company();
    company.getGroups().then(res => {
      data.groups = res.map(el => {
        return {
          active: false,
          name: el.name,
          id: el.id
        }
      })
      data.groups.push({
        active: true,
        name: "Группа",
        id: 0
      })
    })
    update(this)
  },
  data() {
    return {
      window: 'main',
      results: [],
      companies: [],
      groups: [],
      blocks: [],
      filters: {},
      editBlock: null,
      haveResults: false,
      onExport: [],
      pageNumber: 0,
      maxPage: 100,
      pageSize: 6,
    }
  },
  methods: {
    async statByWholeBlock() {
      const stat = new Stat();
      await stat.saveWholeBlock(this.filters.block_id, this.filters.week);
      this.$store.commit('openPopup', 'Статистика успешно выгружена!');
    },
    statByGroup() {
      const stat = new Stat();
      stat.saveGroup(this.filters.block_id, this.filters.week, this.filters.group_id);
      this.$store.commit('openPopup', 'Статистика успешно выгружена!');
    },
    nextPage(){
      if (this.showNext)
        this.pageNumber++;
    },
    previousPage(){
      if (this.showPrev)
        this.pageNumber--;
    },
    async result_selected(n) {
      if (n.active)
        n.active = false;
      else
        n.active = true;

      const filtered = this.results.filter(el => el.active);
      const results = new Results();
      if (!filtered.length)
        return {};
      const stat = await results.getStat(filtered.map(el => el.id))

      const onExport = filtered.map(res => {
        const resMetric = JSON.parse(res.data);
        let metricObject = {};
        resMetric.map(el => {
          metricObject[stat.metrics[el.metric_id].name] = el.value;
        });
        return {
          "Название блока": res.block.name,
          "Логин": res.user.login,
          "Jet Bot ID": res.user.jetBotId,
          "Дата прохождения": res.createdAt,
          "Номер недели": res.week,
          ...metricObject
        }
      });

      let statMetricObject = {}
      Object.keys(stat.metrics).map(el => {
        const metric = stat.metrics[el];
        let metricSum = 0;
        metric.values.map(el => {
          metricSum += el;
        })
        statMetricObject[metric.name] = (metricSum / metric.values.length).toFixed(2);
      })

      onExport.push({
        "Название блока": filtered[0].block.name,
        "Логин": "",
        "JetBotId": "",
        "Дата прохождения": "",
        "Номер недели": filtered[0].week,
        ...statMetricObject
      })

      this.onExport = onExport;
    },

    updateGroupSelect(n) {
      for (const element of this.groups) {
        if (element.id == n.id) {
          this.filters.group_id = n.id;
          element.active = true;
        } else {
          if (element.active)
            element.active = false;
        }
      }

      update(this);
    },

    updateBlocksSelect(n) {
      this.blocks = this.blocks.map(el => {
        el.active = el.id === n.id;
        return el;
      });

      console.log(this.blocks)

      const select = this.blocks.filter(el => el.id === n.id);

      if (select[0].id) {
        this.filters.week = "";
        this.filters.block_id = select[0].id
      } else {
        console.log(111);
        delete this.filters.block_id
      }

      update(this);
    },

    openEditWindow(obj) {
      this.$router.push('/results/edit')
      this.$store.commit('setEditBlock', obj)
      this.window = 'dashboard'
    },
    closeEditWindow() {
      this.window = 'main'
      this.$router.push('/results')
      this.$store.commit('removeEditBlock')
      update(this)
    },
    setDateFilter(n) {
      if (n) {
        this.filters.createdAt = n
      } else {
        delete this.filters.createdAt
      }
      update(this)
    }
  },
  computed: {
    pagineteData(){
      const start = this.pageNumber * this.pageSize, end = start + this.pageSize
      return this.results.slice(start,end)
    },
    showNext() {
      const start = (this.pageNumber + 1) * this.pageSize, end = start + this.pageSize
      return (this.results.slice(start,end).length > 0)
    },
    showPrev() {
      return this.pageNumber > 0;
    },
    answerMessage() {
      const filters = this.filters
      if ('createdAt' in filters && 'company_id' in filters && 'block_id' in filters) {
        const company = this.companies.filter(el => el.active)
        const block = this.blocks.filter(el => el.active)
        const date = this.filters.createdAt.split('-')

        const msg = `В компании ${company[0].name} в блоке ${block[0].name} за ${date[2]}/${date[1]}/${date[0]} ничего не найдено`
        return msg
      } else if ('block_id' in filters && 'company_id' in filters) {
        const company = this.companies.filter(el => el.active)
        const block = this.blocks.filter(el => el.active)

        const msg = `В компании ${company[0].name} в блоке ${block[0].name} ничего не найдено`
        return msg
      } else if ('createdAt' in filters && 'company_id' in filters) {
        const company = this.companies.filter(el => el.active)
        const date = this.filters.createdAt.split('-')

        const msg = `В компании ${company[0].name} за ${date[2]}/${date[1]}/${date[0]} ничего не найдено`
        return msg
      } else if ('company_id' in filters) {
        const company = this.companies.filter(el => el.active)

        const msg = `В компании ${company[0].name} ничего не найдено`
        return msg
      } else if ('createdAt' in filters) {
        const date = this.filters.createdAt.split('-')

        const msg = `За ${date[2]}/${date[1]}/${date[0]} ничего не найдено`
        return msg
      } else {
        return 'Здесь будут отображаться результаты компаний. Для начала, укажите компанию, либо дату'
      }
    }
  }
}
</script>

<style scoped>
.next {
  color: white;
}
.prev {
  color: white;
}
.button {
  font-size: 1.25rem;
  color: var(--light);
  padding: 0.3rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.16);
  white-space: nowrap;
  max-width: 13vw;
  border-radius: 0.5rem;
  transition: all .3s ease-in-out;
  cursor: pointer;
}
.button:hover {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  box-shadow: -10px 11px 20px rgba(221, 126, 255, 0.35);
  color: var(--light);
  font-weight: 500;
  transition: all .3s ease-in-out;
}
.button:focus {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  box-shadow: -10px 11px 20px rgba(221, 126, 255, 0.35);
  color: var(--light);
  font-weight: 500;
  transition: all .3s ease-in-out;
}

.wrapper {
  display: grid;
  grid-template-columns: min-content 1fr;
  width: 100%;
}

.main {
  padding: 4.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main__modal {
  display: grid;
  width: 70vw;
  grid-gap: 2.5625rem;
}

.header {
  display: flex;
  width: 95%;
  justify-content: space-between;
}
.header__select{
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: left;

}
.header__arrow__button img{
  width: 26px;
  height: 26px;
  margin-right: 20px;
  cursor: pointer;
}
.company__date__select{
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
.new__results{
  text-align: center;
  align-items: center;
  font-size: 2rem;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  padding-top: 1rem;
}
.hide-pagination {
  color: white!important;
  opacity: 0.2;
}
.filters {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.week_input {
  width: 20%;
}

.export-block {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.hide-pagination {
  color: rgb(255, 11, 56);
}
</style>
