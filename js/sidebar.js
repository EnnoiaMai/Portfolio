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
var submenuToggled = true;
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
    $('#sidebar > div img').on('click', toggleMenu);

    // Submenu
    $('#submenu img').on('click', toggleSubMenu);
    toggleSubMenu();

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
        hamburgerToggled = true;
        toggleMenu();
    } else {
        currentScreenType = screenType.DESKTOP;
        hamburgerToggled = false;
        toggleMenu();
    }
}

function toggleMenu() {
    switch (currentScreenType) {
        case screenType.MOBILE:
            // Since in mobile, regardless of whether or not hambuger toggled, change css of the sidebar
            $("#sidebar").css({
                "width": "100%",
                "height": "auto",
                "min-height": "50px"
            });
            $('#submenu div').css("flex", "0 0 8%");
            $('.content').css({
                'margin-left': '0%',
                "margin-top": "50px"
            });

            // If hamburger toggled, untoggle the menu
            if (hamburgerToggled) {
                hamburgerToggled = false;
                $('#sidebar > ul').toggle(false);
            }
            // Else if hambuger isn't toggled, toggle the menu
            else {
                hamburgerToggled = true;
                $('#sidebar > ul').toggle(true);
            }
            break;

        case screenType.DESKTOP:
            // If hamburger toggled, untoggle the menu
            if (hamburgerToggled) {
                hamburgerToggled = false;
                $("#sidebar").css({
                    "width": "82px",
                    "height": "100%"
                });
                $('.content').css({
                    'margin-left': '82px',
                    "margin-top": "0px"
                });
                $('#sidebar > ul').toggle(false);
            }
            // Else if hamburger isn't toggled, toggle the menu
            else {
                hamburgerToggled = true;
                $("#sidebar").css({
                    "width": "200px",
                    "height": "100%"
                });
                $('.content').css({
                    'margin-left': '200px',
                    "margin-top": "0px"
                });
                $('#sidebar > ul').toggle(true);
            }
            break;

        default:
            break;
    }
}

function toggleSubMenu() {
    // If submenu is toggled, untoggle it
    if (submenuToggled) {
        submenuToggled = false;
        $('#submenu_links').children("ul").css("display", "none");

        // Change icon to open_submenu
        var path;
        if (currentPath == sidebarImagePath.INDEX) {
            path = "images/open_submenu.png";
        } else if (currentPath == sidebarImagePath.SYNTAX) {
            path = "../images/open_submenu.png";
        } else if (currentPath == sidebarImagePath.PROJECT) {
            path = "../../images/open_submenu.png";
        }
        $(this).attr("src", path);
    }
    // Else if submenu is not toggled, toggle it
    else {
        submenuToggled = true;
        $('#submenu_links').children("ul").css("display", "block");

        // Change icon to close_submenu
        var path;
        if (currentPath == sidebarImagePath.INDEX) {
            path = "images/close_submenu.png";
        } else if (currentPath == sidebarImagePath.SYNTAX) {
            path = "../images/close_submenu.png";
        } else if (currentPath == sidebarImagePath.PROJECT) {
            path = "../../images/close_submenu.png";
        }
        $(this).attr("src", path);
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
