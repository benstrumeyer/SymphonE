import {Strategy} from "passport-local";
import {AuthWorker} from "../../workers/AuthWorker";

async function strategyHandler(identifier, password, next)
{
    // Let's check if the user input was valid
    var loginResult = await AuthWorker.validateLogin(identifier, password);
    if (loginResult.error)
    {
        return next(null, null, {message: loginResult.error});
    }

    var passportResult = loginResult.data;

    // Login the user and give them a session
    return next(null, passportResult);
}

export const LOCAL_STRATEGY = new Strategy({usernameField: "email", passwordField: "password"}, strategyHandler);