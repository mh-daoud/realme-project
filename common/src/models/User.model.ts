import {Schema, model, Model} from "mongoose";
import { User, UserStatus } from "../types/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface UserWithHiddenFields extends User, Document {
    password: string
    createJwt: (jwtSecret: string, expiry?: string) => string
    comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<UserWithHiddenFields>({
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
        select: false
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
            values: Object.values(UserStatus).map((status) => status.toLowerCase()),
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

UserSchema.methods.createJwt = function (jwtSecret: string, expiry?: string) {
    const token = jwt.sign({userId: this._id, email: this.email}, jwtSecret, {
        expiresIn: expiry ?? 3600
    })

    return token
}

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(10)
    const encryptedPassword = await bcryptjs.hash(this.password, salt)
    this.password = encryptedPassword
    this
    next()
})

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
})

UserSchema.pre('find', function(next) {
    next();
});

UserSchema.methods.comparePassword = async function(password: string){
    const isCorrect =  await bcryptjs.compare(password, this.password)
    return isCorrect
}

const UserModel: Model<UserWithHiddenFields> = model<UserWithHiddenFields>('User', UserSchema)

export default UserModel