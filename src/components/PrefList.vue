<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LineChart from './LineChart.vue'
import PrefApi from '../repositories/prefApiRepository'
import type { ChartData } from 'chart.js'

type prefPerYearResult = {
  label: string
  data: prefPerYearResultData[]
}

type prefPerYearResultData = {
  year: number
  value: number
}

// 都道府県一覧を作成
const prefAll = ref([] as {
  prefCode: number
  prefName: string
}[])

const getAllPref = async () => {
  try {
    const res = await PrefApi.getPref()
    prefAll.value = [...res.data.result]
  } catch(error) {
    console.log(error)
  }
}

// 都道府県別人口数グラフを作成
const count = ref<number>(0)
const dataList = ref<string[]>([])
const chartData = ref<{
  prefName: string
  prefPerList: number[]
  borderColor: string
}[]>([])

const borderColorList= [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

const getPrefPerYear = async (id:string, name:string) => {
  try {
    const checkedName = prefAll.value.find(_ => _.prefCode === Number(id))?.prefName

    if(chartData.value.find(_ => _.prefName === checkedName)) {
      chartData.value = chartData.value.filter(_ => _.prefName !== checkedName )
    } else {
      if(count.value > 5) {
        count.value -= 6
      }
      count.value++
      const res = (await PrefApi.getPerYear({prefCode: id, cityCode: "-"})).data.result
      const resResult:prefPerYearResult[] = [...res.data]
      const prefPerYear = resResult.find(_ => _.label === '総人口')?.data // 総人口データ

      if(prefPerYear) {
        dataList.value = prefPerYear.map(_ => {
          return String(_.year)
        })

        const list:number[] = prefPerYear.map(_ => {
          return _.value
        })

        const borderColor:string = borderColorList[count.value-1]

        chartData.value.push({
          prefName: name,
          prefPerList: list,
          borderColor: borderColor,
        })

      }
    }
  } catch(error) {
    console.log(error)
  }
}

const data:ChartData<'line'> = computed(() => {
  const dataset = chartData.value.map(_ => {
    return {
      label: _.prefName,
      data: _.prefPerList,
      borderColor: _.borderColor,
    }
  })
  return {
    labels: dataList.value,
    datasets: dataset,
  }
})

onMounted(() => {
  getAllPref()
})

</script>

<template>
  <div class="pref-list">
    <template v-for="item in prefAll" >
      <div class="item">
        <input
          type="checkbox"
          :id="String(item.prefCode)"
          :value="String(item.prefCode)"
          @change="getPrefPerYear(String(item.prefCode), item.prefName)"
        >
        <label :for="String(item.prefCode)">{{item.prefName}}</label>
      </div>
    </template>
  </div>
  <div>
    <LineChart :data="data" />
  </div>
</template>

<style scoped lang="scss">
.pref-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  .item {
    padding: 5px 10px;
  }

}
</style>
