/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    // alert("document ready syntax.js");
    fromIndex = false;
    initializeSidebar();

    createIDForSections();
    createDirectoryOfContents();
});

function createIDForSections() {
    $('#content h2').each(function() {
        $(this).attr('id', $(this).text());
    });
}

function createDirectoryOfContents() {
    // alert("createDirectoryOfContents");
    var directoryString = "<ul>";
    $('#content h2').each(function() {
        var headerText = $(this).text();
        directoryString += "<li><a href=\"#" + headerText + "\">" + headerText;
        directoryString += "</a></li>";
    });
    directoryString += "</ul>";

    var handler = document.getElementById('directory');
    handler.innerHTML = directoryString;
}
