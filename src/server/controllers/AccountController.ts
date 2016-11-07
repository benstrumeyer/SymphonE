import {DatabaseContainer} from "../database/DatabaseContainer";
import {JsonController, Get, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {authorize} from "../middlewares/Authorize";

@JsonController("/account")
@UseBefore(authorize())
export class AccountController
{
    @Get("/:userId")
    public async getUserById(@Res() response, @Param("userId") userId: string)
    {
        // Get the requested user from the db
        var context = await DatabaseContainer.getContext();
        var user = await context.users.findById(userId);

        if (!user)
            return response.sendStatus(404);

        return {
            success: true,
            data: user
        };
    }

    @Patch("/:userId")
    public async updateUser(@Req() request, @Res() response, @Param("userId") userId: string)
    {
        // If the user requested is not the current user, send 401
        if (userId !== request.user._key)
            return response.sendStatus(401);

        // User checked out, let's update the user's data
        var context = await DatabaseContainer.getContext();
        var updatedUser = await context.users.update(userId, request.body);

        return {
            success: true,
            data: updatedUser
        };
    }
}