import {AngularApp} from "../../../AngularApp";
import {APP_META} from "../../../core/helpers/MetaHelper";
import {AuthService} from "../../../core/services/auth/Auth.service";
import {IStateService} from "angular-ui-router";

class NavbarController
{
    public appMeta = APP_META;

    constructor(public AuthService: AuthService, private $state: IStateService, public toastr)
    {
    }

    public logout()
    {
        this.AuthService.logoutUser();

        this.toastr.info("You have been logged out!");

        // Redirect to home page
        this.$state.go("homeState");
    }
}

AngularApp.component("navbarComponent", {
    controller: NavbarController,
    template: require("./Navbar.template.html")
});