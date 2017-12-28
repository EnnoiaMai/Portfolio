/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    fromIndex = true;
    // Only difference between this main page and the rest of the pages is that the home menu is clicked first,
    // and thus should be highlighted coming onto the website
    linkSaver.setCurrentLink('link_home');
    initializeSidebar();
});
