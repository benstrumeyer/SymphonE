import {AuthWorker} from "../workers/AuthWorker";
import {authorize, login, register} from "../middlewares/Authorize";
import {JsonController, Post, Req, Res, UseBefore, Get} from "routing-controllers";
import {AuthHelper} from "../helpers/AuthHelper";

@JsonController("/auth")
export class AuthController
{
    @Post("/register")
    @UseBefore(register())
    public async register(@Req() request)
    {
        // request.user should be available here
        return {
            success: true,
            data: {
                user: request.user,
                token: request.token
            }
        };
    }

    @Post("/login")
    @UseBefore(login())
    public async login(@Req() request)
    {
        // request.user should be available here
        return {
            success: true,
            data: {
                user: request.user,
                token: request.token
            }
        };
    }

    @Post("/logout")
    @UseBefore(authorize())
    public async logout(@Req() request, @Res() response)
    {
        request.logout();

        AuthHelper.clearAuthCookie(response);

        return {
            success: true
        };
    }

    @Get("/me")
    public async me(@Req() request)
    {
        return {
            success: true,
            data: request.user
        };
    }
}
