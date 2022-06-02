
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
// Next function => Router
// Fonction anonyme

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            queryParams: req.query,
            params: req.params
        })
        next()
    } catch (error: any) {
        return res.status(400).send(error.error)
    }
}
export default validate