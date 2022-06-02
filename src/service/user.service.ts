import { DocumentDefinition, FilterQuery } from 'mongoose'
import { omit } from "lodash"
import UserModel from '../models/user.model'
import { UserDocument } from "../interface/user.interface"



//document : Instance of a model
const createUser = async (input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON(), "password")
    } catch (error: any) {
        throw new Error(error)
    }
}

// Fonction pour le login
const validatePassword = async ({ email, password }: { email: string; password: string; }) => {
    try {
        // On cherche l'user avec l'email correspondante
        const user = await UserModel.findOne({ email })
        // S'il n'y a pas d'user -> False
        if (!user) {
            return false
        }
        // On compare le mot de passe avec le mot de passe de l'user dans la db
        const isValid = await user.comparePassword(password)
        return isValid ? omit(user.toJSON(), "password") : false
    } catch (error: any) {
        throw new Error(error)
    }
}

const findUser = async (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean();
}
export { createUser, validatePassword, findUser }