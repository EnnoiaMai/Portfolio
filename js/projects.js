/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    currentPath = sidebarImagePath.SYNTAX;
    initializeSidebar();

    mediaQueryList.addListener(changeExternalLinkSize);
    changeExternalLinkSize();
});

function changeExternalLinkSize() {
    if (mediaQueryList.matches) {
        // MOBILE
        $(".external_link_container img").attr("src", "../images/ic_external_link_black_24dp.png");
    } else {
        // DESKTOP
        $(".external_link_container img").attr("src", "../images/ic_external_link_black_36dp.png");
    }
}
