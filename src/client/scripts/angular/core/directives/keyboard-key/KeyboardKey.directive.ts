import {IDirective} from "angular";
import {AngularApp} from "../../../AngularApp";

// TODO: Find better way to detect if mouse is down
var isMouseDown = false;

$(document).ready(() =>
{
    $(document).mousedown(event =>
    {
        isMouseDown = true;
    });
    $(document).mouseup(event =>
    {
        isMouseDown = false;
    });
});

function hitKey(element: JQuery)
{
    element.addClass("pressed");
}
function releaseKey(element: JQuery)
{
    element.removeClass("pressed");
}


function keyboardKeyDirective(): IDirective
{
    return {
        restrict: "A",
        scope: {
            keyboardKey: "@?"
        },
        link: function (scope, element, attrs)
        {
            element = $(element);

            element.mousedown(event =>
            {
                // Prevent default event flow
                event.preventDefault();

                hitKey(element);
            });
            element.mouseup(event =>
            {
                // Prevent default event flow
                event.preventDefault();

                releaseKey(element);
            });
            element.mouseenter(event =>
            {
                // Prevent default event flow
                event.preventDefault();

                if (isMouseDown)
                {
                    hitKey(element);
                }
            });
            element.mouseleave(event =>
            {
                // Prevent default event flow
                event.preventDefault();

                releaseKey(element);
            });
        }
    }
}

AngularApp.directive("keyboardKey", keyboardKeyDirective);