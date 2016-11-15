import {IStateService} from "angular-ui-router";

import {AngularApp} from "../../../AngularApp";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import {AuthService} from "../../../core/services/auth/Auth.service";

class RegisterController
{
    public user: any;

    constructor(private AuthService:AuthService, private $state: IStateService, private toastr)
    {
        this.user = {};
    }

    public async register()
    {
        if (!this.user.email || !this.user.password)
        {
            this.toastr.error("Both email and password needs to be provided.");
            return;
        }

        var response = await this.AuthService.registerUser(this.user);

        if (!response.success)
        {
            this.toastr.error(response.message);
            return;
        }

        // Bootstrap the session user because they will be auto logged in
        await this.AuthService.bootstrapSessionUser();

        // Display toast message
        this.toastr.success(`Thanks for signing up ${this.AuthService.currentUser.email}!`);

        // Redirect to home page
        this.$state.go("homeState");
    }
}

AngularApp.component("registerComponent", {
    controller: RegisterController,
    template: require("./Register.template.html")
});

registerRoute("registerState", {
    url: "/auth/register",
    template: "<register-component></register-component>"
});