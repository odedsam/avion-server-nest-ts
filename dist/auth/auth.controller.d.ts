import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        access_token: string;
    }>;
    signIn(signInDto: LoginDto): Promise<Error | {
        access_token: string;
    }>;
}
