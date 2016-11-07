import {AngularApp} from "../../AngularApp";

// HTTP Configuration, like cookie, JWT and error handling
AngularApp.config(function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;
});

// Toastr configuration
AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});