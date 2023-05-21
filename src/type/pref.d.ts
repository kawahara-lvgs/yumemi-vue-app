declare interface Pref {
  data: {
    message: null,
    result: {
      prefCode: number,
      prefName: string
    }[]
  }
}

declare interface PerYear {
  data: {
    message: null,
    result: {
      boundaryYear: number,
      data: {
        label: string,
        data: {
          value: number,
          year: number,
        }[]
      }[]
    }
  }
}
