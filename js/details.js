/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    currentPath = sidebarImagePath.PROJECT;
    initializeSidebar();

    mediaQueryList.addListener(changeIframe);
});

function changeIframe() {
    if (mediaQueryList.matches) {
        // MOBILE
        $("#youtube_selenium_console").replaceWith("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MztRBVEaBXs\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen id=\"youtube_selenium_console\"></iframe>");
        $("#youtube_selenium_file").replaceWith("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/_k8ZxoDWr6s\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen id=\"youtube_selenium_file\"></iframe>");
    } else {
        // DESKTOP
        $("#youtube_selenium_console").replaceWith("<iframe width=\"971\" height=\"547\" src=\"https://www.youtube.com/embed/MztRBVEaBXs\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen id=\"youtube_selenium_console\"></iframe>");
        $("#youtube_selenium_file").replaceWith("<iframe width=\"971\" height=\"547\" src=\"https://www.youtube.com/embed/_k8ZxoDWr6s\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen id=\"youtube_selenium_file\"></iframe>");
    }
}
