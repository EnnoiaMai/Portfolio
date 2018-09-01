/*
Thuc Nguyen
Date Created: December 2017
*/

/*==============================================================================
Method Prototypes:
// Creates a new link_saver object
var link = new selected_link("enn");

// Returns the current link's id by getting the value of the cookie
link.getCurrentLink();

// Sets the clicked link as the new current link anr writes it to the cookie
link.setCurrentLink(link);
==============================================================================*/

function link_saver(key) {
    this.key = $.trim(key);
    this.currentLink = "";

    ////////////////////////////////////////////////////////////////////////////////
    // Do not use the following two methods;  they are private to this class
    this.getCookieValue = function() {  // PRIVATE METHOD
        // Grab the cookie first and split each individual cookie
        var rawString = document.cookie;
        // alert("rawString = " + rawString);
        if(rawString == undefined) {
            return;
        }
        var cookiesArray = rawString.split(";");

        // Find the cookie with the specific key
        var cookie = null;
        for (i = 0; i < cookiesArray.length; i++) {
            if (cookiesArray[i].indexOf(this.key) != -1) {
                cookie = cookiesArray[i].split("=");
            }
        }
        if (!cookie) {
            return;
        }

        var cookieValue = cookie[1];
        this.currentLink = cookieValue;
    }

    this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.key + "=" + this.currentLink + "; path=/";
        document.cookie = toWrite;
    }
    ////////////////////////////////////////////////////////////////////////////////

    this.getCurrentLink = function() {
        this.getCookieValue();
        // alert("getting current link, which is " + this.currentLink);
        return this.currentLink;
    }

    this.setCurrentLink = function(link) {
        this.currentLink = link;
        // alert("setting current link, which is " + this.currentLink);
        this.writeCookie();
    }
}

/*============================================================================*/

var linkSaver = new link_saver('enn');
var hamburgerToggled = true;
var submenuToggled = false;
var sidebarImagePath = {
    INDEX: "pathIndex",
    SYNTAX: "syntax",
    PROJECT: "project"
};
var currentPath = sidebarImagePath.INDEX;

var screenType = {
    DESKTOP: "desktop",
    MOBILE: "mobile"
}
var currentScreenType;
var mediaQueryList;

// Methods used for sidebar and submenu selection
function initializeSidebar() {
    // Hamburger menu
    // $('#menu_icon img').on('click', toggleMenu);
    // Mousing over and out, and clicking, of hamburger icon
    $('#menu_icon').on('mouseenter', toggleOverMenuAnimation);
    $('#menu_icon').on('mouseleave', toggleOutMenuAnimation)
    $('#menu_icon').on('click', toggleMenu);

    // Submenu
    $('#submenu img').on('click', function() {
        toggleSubMenu(this);
    });

    // Sidebar and links
    $('#sidebar a').on('click', saveLink);
    $("#sidebar a").addClass("normal_link");
    $('#sidebar a.highlighted_link').removeClass("highlighted_link");
    var currentLinkID = "#" + (linkSaver.getCurrentLink());
    if (currentLinkID != "#") {
        $(currentLinkID).addClass("highlighted_link");
    }

    // Listeners for when the screen changes size from desktop to mobile
    mediaQueryList = window.matchMedia("(max-width:640px)");
    mediaQueryList.addListener(changeScreenType);
    changeScreenType();
}

function changeScreenType() {
    if (mediaQueryList.matches) {
        currentScreenType = screenType.MOBILE;
        hamburgerToggled = false;
        onChangeScreenType();
        if (submenuToggled) {
            toggleSubMenu("#submenu img");
        }
    } else {
        currentScreenType = screenType.DESKTOP;
        // hamburgerToggled = false;
        onChangeScreenType();
    }
}

function onChangeScreenType() {
    switch (currentScreenType) {
        case screenType.MOBILE:
            // Regardless of whether or not hambuger toggled, change CSS of the sidebar
            $("#sidebar").css({
                "width": "100%",
                "height": "auto",
                "min-height": "50px"
            });
            // $('#submenu div').css("flex", "0 0 8%");
            $('#content').css({
                'margin-left': '0%',
                "margin-top": "50px"
            });

            // $('#submenu_links').css({
            //     "overflow": "scroll"
            // });

            // Show or display menu depending on whether menu is toggled or not
            if (hamburgerToggled) {
                $("#sidebar > ul").css("display", "block");
            } else {
                $("#sidebar > ul").css("display", "none");
            }

            if (!hamburgerToggled) {
                $('body').css("overflow", "auto");
                $('#submenu_links').css("overflow", "auto");
            } else if (hamburgerToggled && submenuToggled) {
                $('body').css("overflow", "hidden");
                $('#submenu_links').css("overflow", "scroll");
                $("#sidebar").css({
                    "height": "100%"
                });
            }
            break;

        case screenType.DESKTOP:
            // Set appropriate CSS depending on whether menu is toggled or not
            if (hamburgerToggled) {
                $("#sidebar").css({
                    "width": "200px",
                    "height": "100%",
                    "-webkit-transition": "width 300ms",
                    "-moz-transition": "width 300ms",
                    "transition": "width 300ms"
                });
                $('#content').css({
                    'margin-left': '200px',
                    "margin-top": "0px",
                    "-webkit-transition": "margin-left 300ms",
                    "-moz-transition": "margin-left 300ms",
                    "transition": "margin-left 300ms"
                });
                $("#sidebar > ul").css("display", "block");

                // $('#submenu_links').css({
                //     "overflow": "auto"
                // });
                $('body').css("overflow", "auto");

                $('#menu_icon img:nth-child(1)').css("z-index", "0");
                $('#menu_icon img:nth-child(2)').css("z-index", "10");
            }
            else {
                $("#sidebar").css({
                    "width": "82px",
                    "height": "100%",
                    "-webkit-transition": "width 300ms",
                    "-moz-transition": "width 300ms",
                    "transition": "width 300ms"
                });
                $('#content').css({
                    'margin-left': '82px',
                    "margin-top": "0px",
                    "-webkit-transition": "margin-left 300ms",
                    "-moz-transition": "margin-left 300ms",
                    "transition": "margin-left 300ms"
                });
                $("#sidebar > ul").css("display", "none");

                // $('#submenu_links').css({
                //     "overflow": "auto"
                // });
                $('body').css("overflow", "auto");

                $('#menu_icon img:nth-child(1)').css("z-index", "10");
                $('#menu_icon img:nth-child(2)').css("z-index", "0");
            }

            $('body').css("overflow", "auto");
            $('#submenu_links').css("overflow", "auto");

            break;
        default:
            break;
    }
}

function toggleMenu() {
    hamburgerToggled = !hamburgerToggled;
    onChangeScreenType();
}

/*
    On mouse enter and mouse leave over the div, smoothly animate
    the top image's opacity.
*/
function toggleOverMenuAnimation() {
    if (!hamburgerToggled) {
        $('#menu_icon img:nth-child(1)').stop().animate({
            opacity: 0.0
        }, 300);
        $('#menu_icon img:nth-child(2)').stop().animate({
            opacity: 1.0
        }, 300);
    }
}
function toggleOutMenuAnimation() {
    if (!hamburgerToggled) {
        $('#menu_icon img:nth-child(1)').stop().animate({
            opacity: 1.0
        }, 300);
        $('#menu_icon img:nth-child(2)').stop().animate({
            opacity: 0.0
        }, 300);
    }
}

function toggleSubMenu(clickedObject) {
    submenuToggled = !submenuToggled;

    if (submenuToggled) {
        // $('#submenu_links').children("ul").css("display", "block");
        // $("#submenu_links > ul").css("display", "block");
        $("#submenu_links > ul").toggle(true);

        if (currentScreenType == screenType.MOBILE) {
            $('body').css("overflow", "hidden");
            $('#submenu_links').css("overflow", "scroll");
            $("#sidebar").css({
                "height": "100%"
            });
        }

        // Change icon to arrow drop up
        var path;
        if (currentPath == sidebarImagePath.INDEX) {
            path = "images/ic_arrow_drop_up_white_36dp_1x.png";
        } else if (currentPath == sidebarImagePath.SYNTAX) {
            path = "../images/ic_arrow_drop_up_white_36dp_1x.png";
        } else if (currentPath == sidebarImagePath.PROJECT) {
            path = "../../images/ic_arrow_drop_up_white_36dp_1x.png";
        }
        // $(this).attr("src", path);
        $(clickedObject).attr("src", path);
    }
    else {
        // $('#submenu_links').children("ul").css("display", "none");
        // $("#submenu_links > ul").css("display", "none");
        $("#submenu_links > ul").toggle(false);

        $('body').css("overflow", "auto");
        $('#submenu_links').css("overflow", "auto");

        if (currentScreenType == screenType.MOBILE) {
            $("#sidebar").css({
                "height": "auto"
            });
        } else {
            $("#sidebar").css({
                "height": "100%"
            });
        }

        // Change icon to arrow drop down
        var path;
        if (currentPath == sidebarImagePath.INDEX) {
            path = "images/ic_arrow_drop_down_white_36dp_1x.png";
        } else if (currentPath == sidebarImagePath.SYNTAX) {
            path = "../images/ic_arrow_drop_down_white_36dp_1x.png";
        } else if (currentPath == sidebarImagePath.PROJECT) {
            path = "../../images/ic_arrow_drop_down_white_36dp_1x.png";
        }
        // $(this).attr("src", path);
        $(clickedObject).attr("src", path);
    }
}

function saveLink() {
    var id = this.id;
    linkSaver.setCurrentLink(id);
}

// Done in languages.js file whenever a link under the div with class list is clicked
function manuallySaveLink(id) {
    linkSaver.setCurrentLink(id);
}
