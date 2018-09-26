// 配置项
// 线上地址
const online = 'https://www.sieia.org/index'
// 本地地址
// const local = 'http://10.18.204.142:8000'
const host = online
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  addbook: `${host}/weapp/addbook`
}
export default config
