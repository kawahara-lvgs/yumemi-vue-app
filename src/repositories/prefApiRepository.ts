import apiClient from './baseApiRepository'

interface PrefRepositoryInterface {
  getPref() :Promise<Pref>
  getPerYear(params:{prefCode: string, cityCode: string}) :Promise<PerYear>
}

export const PrefApi: PrefRepositoryInterface = {
  getPref(): Promise<Pref> {
    return apiClient.get("api/v1/prefectures")
  },
  getPerYear(params:{prefCode: string, cityCode: string}): Promise<PerYear> {
    return apiClient.get("api/v1/population/composition/perYear", {params})
  }
}

export default PrefApi
