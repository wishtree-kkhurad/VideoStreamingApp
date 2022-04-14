import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { AuthService } from './auth.service';;
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private jwtService: JwtService 
    ){}

    @Post('/signup')
    async signUp(@Res() response, @Body() user: User){
        console.log('AuthController at signUp')
        const newUser =  await this.authService.signUp(user);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }

    @Post('/signin')
    async signIn(@Res() response, @Body() user: User) {
        const token = await this.authService.signIn(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token);
    }
}