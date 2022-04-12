import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    signUp(user: User): Promise<User>;
    signIn(user: User, jwt: JwtService): Promise<any>;
}
