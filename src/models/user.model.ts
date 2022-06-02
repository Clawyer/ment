import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { UserDocument } from "../interface/user.interface"
// used to hash user credentials
import config from 'config'


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

// pre: middleware, control during execution of async operations

userSchema.pre("save", async function (next) {

    let user = this as UserDocument;
    // user from database

    if (!user.isModified("password")) {
        return next();
    }

    // Proteger le mot de passe
    // Salt : nombre de fois que le mot de passe est hash
    // Hash : used to hash user credentials
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;

    return next();
});
// comparePassword: compare user password with candidate password
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((error) => false);
};


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;