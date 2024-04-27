import { coordinateData } from './coordinate-data'
//根据城市拿到经纬度
export function convertData(data: any) {
  const res: any = []
  for (let i = 0; i < data.length; i++) {
    //根据城市名字拿出经纬度数据
    const geoCoord = coordinateData[data[i].name]
    //如果拿出来了
    if (geoCoord) {
      //放进去
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  return res
}
