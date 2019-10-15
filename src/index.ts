const screenshot = require('screenshot-desktop')
const cron = require('node-cron')
const winston = require('winston')
const moment = require('moment')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// 스크린샷을 촬영하고 저장합니다.
const saveScreenshot = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // ex) Screenshot 2019-10-15 19.50.00.jpg
    const format: string = 'jpg'
    const filename: string = `./out/Screenshot ${moment().format('YYYY-MM-DD HH.mm.ss')}.${format}`

    screenshot({ filename, format })
      .then((imgPath: string) => {
        logger.info(`${moment().format()} - Saved ${imgPath}`)
        resolve(imgPath)
      })
      .catch((err: string) => {
        logger.error(`${moment().format()} - Error ${err}`)
        reject(err)
      })
  })
}

const main = () => {
  // 매 분마다 실행됩니다.
  cron.schedule('* * * * *', () => {
    saveScreenshot()
  })
}

main()

export { saveScreenshot }
