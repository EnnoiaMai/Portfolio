/*
Thuc Nguyen
Date Created: December 2017
*/

var submenuToggled = false;
$(document).ready(function() {
    setListeners()
});

function setListeners(){

    $('#submenu img').on('click', toggleSubMenu);
    $('#sidebar a').on('click', updateMenu);
    initializeMenu();
}
function toggleSubMenu() {
    $('#submenu_links').children("ul").toggle();
    if (!submenuToggled) {
        $(this).attr("src", "../images/close_submenu.png");
        submenuToggled = true;
    } else {
        $(this).attr("src", "../images/open_submenu.png");
        submenuToggled = false;
    }
}
function initializeMenu() {
    $("#sidebar a").addClass("normal_link");
}
function updateMenu() {
    $('#sidebar a.highlighted_link').removeClass("highlighted_link");
    $(this).addClass("highlighted_link");
}
