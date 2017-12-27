/*
Thuc Nguyen
Date Created: December 2017
*/

var linkSaver = new link_saver('enn');
var submenuToggled = false;
$(document).ready(function() {
    setListeners()
    var currentLinkID = "#" + (linkSaver.getCurrentLink());
    updateMenu(currentLinkID);
});

function setListeners(){

    $('#submenu img').on('click', toggleSubMenu);
    // $('#sidebar a').on('click', updateMenu);
    $('#sidebar a').on('click', saveLink);
    initializeMenu();
}

function toggleSubMenu() {
    $('#submenu_links').children("ul").toggle();
    if (!submenuToggled) {
        $(this).attr("src", "images/close_submenu.png");
        submenuToggled = true;
    } else {
        $(this).attr("src", "images/open_submenu.png");
        submenuToggled = false;
    }
}

function initializeMenu() {
    $("#sidebar a").addClass("normal_link");
}
function updateMenu(selector) {
    $('#sidebar a.highlighted_link').removeClass("highlighted_link");
    $(selector).addClass("highlighted_link");
}

function saveLink() {
    var id = this.id;
    linkSaver.setCurrentLink(id);
}

// function changePage(event) {
//     // event.preventDefault();
//     alert("Event id is = " + this.id);
//
// }
