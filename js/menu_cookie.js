/*
Thuc Nguyen
Date Created: December 2017
*/

/*
    Method Prototypes:
    var link = new selected_link("enn");

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
        alert("getting current link, which is " + this.currentLink);
        return this.currentLink;
    }

    this.setCurrentLink = function(link) {
        this.currentLink = link;
        alert("setting current link, which is " + this.currentLink);
        this.writeCookie();
    }
}
