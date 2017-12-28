/*
Thuc Nguyen
Date Created: December 2017
*/

/*
    Method Prototypes:
    // Creates a new link_saver object
    var link = new selected_link("enn");

    // Returns the current link's id by getting the value of the cookie
    link.getCurrentLink();

    // Sets the clicked link as the new current link anr writes it to the cookie
    link.setCurrentLink(link);
*/


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

var linkSaver = new link_saver('enn');
var submenuToggled = false;
var fromIndex = false;
// Methods used for sidebar and submenu selection
function initializeSidebar() {
    $('#submenu img').on('click', toggleSubMenu);
    $('#sidebar a').on('click', saveLink);

    $("#sidebar a").addClass("normal_link");
    $('#sidebar a.highlighted_link').removeClass("highlighted_link");
    var currentLinkID = "#" + (linkSaver.getCurrentLink());
    if (currentLinkID != "#") {
        $(currentLinkID).addClass("highlighted_link");
    } else {
        alert("sidebar.js - couldn't highlight current link");
    }
}

function toggleSubMenu() {
    $('#submenu_links').children("ul").toggle();
    if (!submenuToggled) {
        var path;
        if (fromIndex) {
            path = "images/close_submenu.png";
        } else {
            path = "../images/close_submenu.png";
        }
        $(this).attr("src", path);
        submenuToggled = true;
    } else {
        var path;
        if (fromIndex) {
            path = "images/open_submenu.png";
        } else {
            path = "../images/open_submenu.png";
        }
        $(this).attr("src", path);
        submenuToggled = false;
    }
}

function saveLink() {
    var id = this.id;
    linkSaver.setCurrentLink(id);
}
