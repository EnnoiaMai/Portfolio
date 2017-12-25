
$(document).ready(function() {
    setListeners()
})

function setListeners(){
    $("#languages_anchor").click(toggleSubMenu);
    $("#projects_anchor").click(toggleSubMenu);

    // $('#link_syntax_html').on('click', changePage);
    // $('#link_syntax_css').on('click', changePage);


    initializePageContainer();
}

function toggleSubMenu() {
    //$(this).parent().find("ul").toggle();
    $(this).siblings("ul").toggle();
}

function initializePageContainer() {
    updatePageContainer();
}

function updatePageContainer() {
    var widthOfBrowserWindow = $(window).width();
    var widthOfPageContainer = widthOfBrowserWindow - 200;
    alert("width or browser window is: " + widthOfBrowserWindow + " and width of page container is " + widthOfPageContainer);
    $('iframe').css({
        "width": widthOfPageContainer + "px",
        "height": "100%"
    });
}

// function changePage(event) {
//     // event.preventDefault();
//     alert("Event id is = " + this.id);
//
// }
