import jwt from "jsonwebtoken"
import config from "config"


const privateKey = config.get<string>("privateKey")
const publicKey = config.get<string>("publicKey")

export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
        // pour accepter les paires de clés publiques et privées
    })
}
// web token pour verifier la session utilisateur en utilisant un token
export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        }

    }
}