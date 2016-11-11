import {AngularApp} from "../../../AngularApp";
import {ApiService} from "../data/Api.service";
import {IPayload} from "../../models/IPayload";

export class AuthService
{
    public currentUser: any;
    public authToken: string;

    constructor(private ApiService: ApiService)
    {
    }

    public isAuthenticated(): boolean
    {
        return !!this.currentUser;
    }

    public async bootstrapSessionUser(): Promise<IPayload>
    {
        var response = await this.ApiService.get("/auth/me");

        if (response.data.success)
            this.currentUser = response.data.data;

        return response.data;
    }

    public async registerUser(user: any): Promise<IPayload>
    {
        var response = await this.ApiService.post("/auth/register", user);

        return response.data;
    }

    public async loginUser(email: string, password: string): Promise<IPayload>
    {
        var response = await this.ApiService.post("/auth/login", {email: email, password: password});
        var payload = response.data;

        if (payload.success && payload.data)
        {
            this.currentUser = payload.data.user;
            this.authToken = payload.data.token;
        }

        return payload;
    }

    public async logoutUser(): Promise<IPayload>
    {
        var response = await this.ApiService.post("/auth/logout", {logout: true});
        var payload = response.data;

        if (payload.success)
        {
            this.currentUser = undefined;
        }

        return payload;
    }
}

AngularApp.service("AuthService", AuthService);
