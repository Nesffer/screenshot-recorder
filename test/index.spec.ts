import assert from 'assert'
import * as fs from 'fs'
import { saveScreenshot } from '../src/index'

describe('# 스크린샷 저장 테스트', () => {
  it('스크린샷 저장 후 파일이 존재해야 합니다.', async () => {
    const imgPath = await saveScreenshot()
    assert.strictEqual(true, fs.existsSync(imgPath))
  })
})
