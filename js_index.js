
$(document).ready(function() {

    setListeners()
})

function setListeners(){

    $("#languages_anchor").click(toggleSubMenu);
    $("#projects_anchor").click(toggleSubMenu);
}

function toggleSubMenu() {
    //$(this).parent().find("ul").toggle();
    $(this).siblings("ul").toggle();
}
