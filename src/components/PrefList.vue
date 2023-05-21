<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PrefApi from '../repositories/prefApiRepository'

const prefAll = ref([] as {
  prefCode: number
  prefName: string
}[])

type prefPerYearResult = {
  label: string
  data: prefPerYearResultData[]
}

type prefPerYearResultData = {
  year: number
  value: number
}

const checkedPrefs = ref([])

const getAllPref = async () => {
  try {
    const res = await PrefApi.getPref()
    prefAll.value = [...res.data.result]
  } catch(error) {
    console.log(error)
  }
}

const getPrefPerYear = async (id:string) => {
  try {
    const res = (await PrefApi.getPerYear({prefCode: id, cityCode: "-"})).data.result
    const resResult:prefPerYearResult[] = [...res.data]
    const prefPerYear = resResult.find(_ => _.label === '総人口')?.data
    console.log(prefPerYear)
  } catch(error) {
    console.log(error)
  }
}

onMounted(() => {

  getAllPref()
  // getPrefPerYear()
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
          v-model="checkedPrefs"
          @click="getPrefPerYear(String(item.prefCode))"
        >
        <label :for="String(item.prefCode)">{{item.prefName}}</label>
      </div>
    </template>
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
