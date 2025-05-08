import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login-dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        access_token: string;
    }>;
    signIn(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    private generateJwt;
}
