
import { Express, Request, Response } from 'express'
import validateResource from '../../middleware/validateResource'
import { createUserHandler } from '../../controller/user.controller'
import { createUserSchema } from '../../schema/user.schema'
import { createUserSessionHandler } from '../../controller/session.controller'
import { createSessionSchema } from '../../schema/session.schema'

const openRoutes = (app: Express) => {

    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).send({ 'message': '✅' })
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
    // Need to validate user request before posting
}
export default openRoutes