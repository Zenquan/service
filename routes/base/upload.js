const KoaRouter = require('koa-router')
const router = new KoaRouter()
const {upload} = require('../../controller')

router.post('/upload', upload)

module.exports = router