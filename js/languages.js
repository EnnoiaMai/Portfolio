/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    currentPath = sidebarImagePath.SYNTAX;
    initializeSidebar();

    $('.list a').on('click', updateSidebar);
});


function updateSidebar() {
    var href = $(this).attr('href');
    var determinant = "";

    if (href == "syntax_java.html") {
        determinant = "java";
    }
    else if (href.includes("syntax_swift")) {
        determinant = "swift";
    }
    else if (href.includes("syntax_cpp")) {
        determinant = "cpp";
    }
    else if (href.includes("syntax_html")) {
        determinant = "html";
    }
    else if (href.includes("syntax_css")) {
        determinant = "css";
    }
    else if (href.includes("syntax_javascript")) {
        determinant = "js";
    }
    else if (href.includes("syntax_jquery")) {
        determinant = "jquery";
    }
    else if (href.includes("syntax_ajax")) {
        determinant = "ajax";
    }
    else if (href.includes("syntax_php")) {
        determinant = "php";
    }
    else if (href.includes("syntax_perl")) {
        determinant = "perl";
    }
    else if (href.includes("syntax_mysql")) {
        determinant = "mysql";
    }
    else if (href.includes("syntax_python")) {
        determinant = "python";
    }
    else if (href.includes("syntax_bash")) {
        determinant = "bash";
    }

    $('#submenu_links a').each(function() {
        var id = this.id;
        if (id.includes(determinant)) {
            // alert("languages and syntax js file - determinant found as " + determinant);
            manuallySaveLink(id);
        }
    });
}
