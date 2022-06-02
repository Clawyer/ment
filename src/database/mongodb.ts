import mongoose from 'mongoose';
import config from 'config'
import log from '../utils/logger'


// mongodb connection
const connect = () => {
    const dbUri = config.get<string>('dbUri')
    return mongoose
        .connect(dbUri)
        .then(() => {
            log.info('Connected to database')
        })
        .catch((error) => {
            log.info(error.message)
            log.error('Connection failed')
            process.exit(1)
        })
}

export default connect