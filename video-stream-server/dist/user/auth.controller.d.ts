import { User } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    signUp(response: any, user: User): Promise<any>;
    signIn(response: any, user: User): Promise<any>;
}
