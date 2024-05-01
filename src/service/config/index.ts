let BASE_URL = ''
//MODE  PROD  DEV SSR
if (import.meta.env.PROD) {
  // 生产环境
  // BASE_URL = 'http://localhost:8888'
  BASE_URL = 'http://120.26.240.157:8888'
} else {
  // 开发环境
  // BASE_URL = 'http://localhost:8888'
  BASE_URL = 'http://120.26.240.157:8888'
}

export const TIME_OUT = 10000
export { BASE_URL }
