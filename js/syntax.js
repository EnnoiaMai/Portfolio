/*
Thuc Nguyen
Date Created: December 2017
*/

var directoryOpened = false;
$(document).ready(function() {
    currentPath = sidebarImagePath.SYNTAX;
    initializeSidebar();

    // Initially toggle the submenu to show the syntax pages
    if (!submenuToggled) {
        toggleSubMenu();
    }

    // Dynamically create the id for all the h2 tags and populate it in the directory div
    createIDForSections();
    createDirectoryOfContents();

    // Click event listener to display the directory and anon function for handler when transition ends
    $('#directory_menu').on('click', displayDirectory);
    $('#directory').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        // if (!directoryOpened) {
        //     $(this).css("visibility", "hidden");
        // }
    });

    // Click event listener to scroll to top of page
    $('#directory_top_arrow').on('click', scrollToTop);

    // Initially hide the directory menu button and then fade it in
    $('#directory_menu').css("visibility", "visible").hide().fadeIn(500);
    // $('#directory_top_arrow').hide();
});

function createIDForSections() {
    $('#content h2').each(function() {
        $(this).attr('id', $(this).text());
    });
}

function createDirectoryOfContents() {
    var directoryString = "<h3>Contents</h3><ul>";
    $('#content h2').each(function() {
        var headerText = $(this).text();
        directoryString += "<li><a href=\"#" + headerText + "\">" + headerText;
        directoryString += "</a></li>";
    });
    directoryString += "</ul>";

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
        $('#directory_top_arrow').fadeOut(500, function() {
            $(this).css("visibility", "hidden");
        });
    }
    else {
        // Open the directory
        directoryOpened = true;
        // directory.style.visibility = "visible";
        directory.style.transform = "translate(0%, 0%)";
        $('#directory_top_arrow').css("visibility", "visible").hide().fadeIn(500);
    }
}

function scrollToTop() {
    // $(window).scrollTop(0);
    $('html, body').stop().animate({
        scrollTop: 0
    }, 200);
}
