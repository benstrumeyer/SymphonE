import * as validator from "validator";
import * as passport from "passport";

import {AuthHelper, IPassportUser} from "../helpers/AuthHelper";
import {IPayload} from "../interfaces/IPayload";
import {DatabaseContainer} from "../database/DatabaseContainer";
import {CryptoHelper} from "../helpers/CryptoHelper";

export class AuthWorker
{
    public static async doLogin(request, response, next)
    {
        // Do authentication against passport
        passport.authenticate("local", function (err, passportUser, info): any
        {
            // If internal error occured
            if (err)
                return next(err);

            // If authentication error occured
            if (!passportUser)
            {
                // TODO: Maybe make this agnostic to response type, let the controller handle it?
                return response.json({
                    success: false,
                    message: info.message
                });
            }

            // Set user to session
            AuthHelper.registerUserToSession(passportUser, request, response, next);

        })(request, response, next);
    };

    public static async doRegister(request, response, next)
    {
        var input = request.body;

        // Let's check if the user input was valid
        var validateUser = await AuthWorker.validateNewUser(input);
        if (validateUser.error)
        {
            // TODO: Maybe make this agnostic to response type, let the controller handle it?
            return response.json({
                success: false,
                message: validateUser.error
            });
        }

        var context = await DatabaseContainer.getContext();

        // User input was valid, so let's create an account for them
        var newUser = await context.users.save({
            username: input.username || input.email,
            email: input.email,
            createdAt: new Date(),
            roles: ["User"]
        });

        // Make new passport for the new user
        await context.passports.save({
            protocol: "local",
            password: CryptoHelper.hashPassword(input.password),
            accessToken: CryptoHelper.generateAccessToken(),
            userId: newUser._key
        });

        // Auto login and set user to session
        AuthHelper.registerUserToSession(newUser, request, response, next);
    }

    // Login Validator
    public static async validateLogin(email, password): Promise<IPayload<IPassportUser>>
    {
        // Check for empty email and password
        if (!email || !password)
            return {error: "Email and Password must be specified."};

        var context = await DatabaseContainer.getContext();

        // Check if user exists
        var dbUser = await context.users.find({email: email});

        if (!dbUser)
            return {error: "Email or Password is not valid."};

        // Now check password if it matches the user's associated Passport
        var dbPassport = await context.passports
            .find({userId: dbUser._key, protocol: "local"});

        if (!dbPassport)
            return {error: "Password has not been set for this account."};

        var isPasswordValid = CryptoHelper.validatePassword(password, dbPassport.password);

        if (!isPasswordValid)
            return {error: "Email or Password is not valid."};

        // All checks passed
        return {
            data: AuthHelper.getUserForSession(dbUser)
        };
    };

    // New User validation on Register
    public static async validateNewUser(input): Promise<IPayload<null>>
    {
        // Check for empty email and password
        if (!input.email || !input.password)
            return {error: "Email and Password must be specified."};

        // Validate email address
        if (!validator.isEmail(input.email))
            return {error: "Entered email is not a valid email address."};

        // Validate password constraints
        var passwordMinLength = 8;

        if (input.password.length < passwordMinLength)
            return {error: "Password must be at least " + passwordMinLength + " characters long."};

        var context = await DatabaseContainer.getContext();

        // Check if user already exists
        var user = await context.users.find({email: input.email});

        if (user)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {};
    }
}