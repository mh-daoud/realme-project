import {Schema, model, Model} from "mongoose";
import { User, UserStatus } from "../types/User";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export interface UserWithHiddenFields extends User {
    password: string
}

export interface UserDecodedJWT {
    userId: string
    email: string
}


export interface UserMethods {
    createJwt: (jwtSecret: string, expiry?: string) => string
    verifyJwt: (token: string, jwtSecret: string) => UserDecodedJWT | undefined | null
    comparePassword: (password: string) => Promise<boolean>
}


type UserModel = Model<User , {}, UserMethods>;


const userSchema = new Schema<UserWithHiddenFields, UserModel, UserMethods>({
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        maxLength: [50, 'email max length is 50'],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    displayName: {
        type: String,
        required: [true, 'displayName is required'],
        trim: true,
        maxLength: [50, 'displayName max length is 50'],
        minLength: [4, 'displayName min length is 4']
    },
    avatar: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [255, 'bio max length is 255'],
    },
    nickname: {
        type: String,
        trim: true,
        maxLength: [10, 'nickname max length is 10'],
    },
    countryIso: {
        type: String,
        required:true,
        uppercase: true,
        trim: true,
        maxLength: [3, 'country iso max length is 3'],
        minLength: [3, 'country iso min length is 3'],
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: Object.values(UserStatus),
        },
        default: UserStatus.Active
    },
    isDeleted: Boolean,
    isWatchListPublic: Boolean,
    isFollowerListPublic: Boolean,
    isFolloweeListPublic: Boolean,
    followerCount: {type: Number, required:true, default: 0},
    followeeCount: {type: Number, required:true, default: 0},
    createdAt: {type: Date, required:true, default: Date.now()},
    updatedAt: {type: Date}
})

userSchema.methods.createJwt = function (jwtSecret: string, expiry?: string) {
    const token = jwt.sign({userId: this._id, email: this.email}, jwtSecret, {
        expiresIn: expiry ?? 3600
    })

    return token
}

userSchema.methods.verifyJwt = function(token: string, jwtSecret: string) {
    const decodedToken =  jwt.verify(token,jwtSecret)  
    if(!decodedToken || typeof decodedToken !== 'object' || !decodedToken?.userId) {
        return null
    }
    return decodedToken as UserDecodedJWT
}

userSchema.methods.comparePassword = async function(password: string){
    const isCorrect =  await bcrypt.compare(password, this.password)
    return isCorrect
}

const userModel = model<UserWithHiddenFields>('User', userSchema)

export default userModel