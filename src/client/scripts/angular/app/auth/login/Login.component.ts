import {IStateService} from "angular-ui-router";

import {AngularApp} from "../../../AngularApp";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import {AuthService} from "../../../core/services/auth/Auth.service";

class LoginController
{
    public email:string;
    public password:string;

    constructor(private AuthService:AuthService, private $state: IStateService, private toastr)
    {
    }

    public async login()
    {
        if (!this.email || !this.password)
        {
            this.toastr.error("Both email and password needs to be provided.");
            return;
        }

        var response = await this.AuthService.loginUser(this.email, this.password);

        if (!response.success)
        {
            this.toastr.error(response.message);
            return;
        }

        // Display toast message
        this.toastr.success(`Welcome back ${this.AuthService.currentUser.email}!`);

        // Redirect to home page
        this.$state.go("homeState");
    }
}

AngularApp.component("loginComponent", {
    controller: LoginController,
    template: require("./Login.template.html")
});

registerRoute("loginState", {
    url: "/auth/login",
    template: "<login-component></login-component>"
});
