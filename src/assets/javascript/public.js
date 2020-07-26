/* echarts字体适配方法
   入参：设计图中字体大小
*/
export const setRem = px => {
  // 当前页面宽度相对于 设计图 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面字体大小
  return (px * Math.min(scale, 2))
}
/* 文件下载
   data: ArrayBuffer
   fileName: 文件名称
*/
export const download = (data, fileName) => {
  const url = window.URL.createObjectURL(new Blob([data], {
    type: 'application/msword'
  }))
  const links = document.createElement('a')
  links.style.display = 'none'
  links.href = url
  const newDate = getDateTimeNowUtil()
  links.setAttribute('download', newDate + fileName)
  document.body.appendChild(links)
  links.click()
}
