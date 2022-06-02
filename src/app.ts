import express from 'express';
import config from 'config'
import log from './utils/logger'
import openRoutes from './routes/public/openRoutes'
import connect from './database/mongodb';


const app = express()
const port = config.get<number>('port')

app.use(express.json())

try {
    app.listen(port, async () => {
        log.info(`Server is running at http://localhost:${port}`)
        await connect()
        openRoutes(app)
    })
} catch (error) {
    log.info(`Server is not running at http://localhost:${port}`)
    log.error(error)
}