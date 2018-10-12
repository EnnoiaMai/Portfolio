/*
Thuc Nguyen
Date Created: December 2017
*/

var isHeaderSticky = false;
var directoryOpened = false;
$(document).ready(function() {
    currentPath = sidebarImagePath.SYNTAX;
    initializeSidebar();

    // Initially toggle the submenu to show the syntax pages
    // if (!submenuToggled) {
    //     toggleSubMenu();
    // }

    // Dynamically create the id for all the h2 tags and populate it in the directory div
    createIDForSections();
    createDirectoryOfContents();

    // Fade out the list and the title initially
    $("#directory ul").fadeOut(0);
    $("#directory h3").fadeOut(0);
    $("#directory ul a").on("click", function(event) {
        event.preventDefault();

        var headerText = $(this).text();
        var headerId = headerText.replace(/\s/g, "_");
        var offset = $("#" + headerId).offset().top;
        var offsetWithHeader = offset - 380;
        $('html, body').stop().animate({
            scrollTop: offsetWithHeader
        }, 300);
    });

    // Click event listener to scroll to top of page
    $('#scroll_to_top_arrow').on('click', scrollToTop);
    $('#toc_drop_down').on('click', displayDirectory);

    $(window).on("scroll", function() {
        // Make title of page visible
        if ( $(this).scrollTop() < 200 && isHeaderSticky) {
            isHeaderSticky = false;
            $("#navigation_header h1").css({
                "opacity": "0.0",
                "-webkit-transition": "opacity 500ms",
                "transition": "opacity 500ms"
            });
        }
        // Hide title of page
        else if ( $(this).scrollTop() >= 200 && !isHeaderSticky ) {
            isHeaderSticky = true;
            $("#navigation_header h1").css({
                "opacity": "1.0",
                "-webkit-transition": "opacity 500ms",
                "transition": "opacity 500ms"
            });
        }
    });
});

function createIDForSections() {
    $('#content h2').each(function() {
        var headerText = $(this).text();
        var headerId = headerText.replace(/\s/g, "_");
        $(this).prop('id', headerId);
    });
}

function createDirectoryOfContents() {
    // var directoryString = "<h3>Contents</h3><div><ul>";
    var directoryString = "<div><ul>";
    var numberOfHeaders = $("#content h2").length;
    $('#content h2').each(function(index) {
        if (index == Math.ceil(numberOfHeaders / 2)) {
            directoryString += "</ul></div><div><ul>";
        }
        var headerText = $(this).text();
        directoryString += "<li><a href=\"#\">" + headerText;
        directoryString += "</a></li>";
    });
    directoryString += "</ul></div>";

    var handler = document.getElementById('directory');
    handler.innerHTML = directoryString;
}

function displayDirectory() {
    // Set to opposite value, toggle the directory
    directoryOpened = !directoryOpened;

    if (directoryOpened) {
        // Open the directory
        $("#directory").css({
            "height": "300px",
            "-webkit-transition": "height 500ms",
            "transition": "height 500ms"
        });
        $('#directory').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
            if (directoryOpened) {
                $("#directory h3").fadeIn("fast");
                $("#directory ul").fadeIn("fast");
            }
        });
    }
    else {
        // Close the directory
        $("#directory ul, #directory h3").fadeOut("fast", function() {
            $("#directory").css({
                "height": "0",
                "-webkit-transition": "height 500ms",
                "transition": "height 500ms"
            });
        });
    }
}

function scrollToTop() {
    // $(window).scrollTop(0);
    $('html, body').stop().animate({
        scrollTop: 0
    }, 200);
}
