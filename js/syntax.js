/*
Thuc Nguyen
Date Created: December 2017
*/

var directoryOpened = true;
$(document).ready(function() {
    // alert("document ready syntax.js");
    fromIndex = false;
    initializeSidebar();

    toggleSubMenu();
    $('#submenu img').attr('src', '../images/close_submenu.png');

    createIDForSections();
    createDirectoryOfContents();
    $('#directory_arrow').on('click', displayDirectory);
    $('#directory').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        if (!directoryOpened) {
            $(this).css("visibility", "hidden");
        }
    });
    $('#directory_top_arrow').on('click', function() {
        // $(window).scrollTop(0);
        $('html, body').stop().animate({
            scrollTop: 0
        }, 200);
    })
});

function createIDForSections() {
    $('#content h2').each(function() {
        $(this).attr('id', $(this).text());
    });
}

function createDirectoryOfContents() {
    // alert("createDirectoryOfContents");
    var directoryString = "<h3>Contents</h3><ul>";
    $('#content h2').each(function() {
        var headerText = $(this).text();
        directoryString += "<li><a href=\"#" + headerText + "\">" + headerText;
        directoryString += "</a></li>";
    });
    directoryString += "</ul>";

    // <div id=\"navigation_buttons\"><div><img src=\"../images/close_arrow.png\" alt=\"open\" id=\"directory_arrow\"></div>" +
    // "<div><img src=\"../images/close_arrow.png\" alt\"open\"></div></div>

    var handler = document.getElementById('directory');
    handler.innerHTML = directoryString;
}

function displayDirectory() {
    var directory = document.getElementById('directory');
    directory.style.transition = "transform 0.5s ease 0s";

    if (directoryOpened) {
        // Close the directory
        directoryOpened = false;
        directory.style.transform = "translate(100%, 0%)";
        // $(directory).attr("src", "../images/close_arrow.png");
        // directory.src = "../images/close_arrow.png";
        $(this).attr("src", "../images/open_arrow.png");
        $('#directory_top_arrow').fadeOut(500);
    }
    else {
        // Open the directory
        directoryOpened = true;
        directory.style.visibility = "visible";
        directory.style.transform = "translate(0%, 0%)";
        // $(directory).attr("src", "../images/open_arrow.png");
        // directory.src = "../images/open_arrow.png";
        $(this).attr("src", "../images/close_arrow.png");
        $('#directory_top_arrow').fadeIn(500);
    }
}
