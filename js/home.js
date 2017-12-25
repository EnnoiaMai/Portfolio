/*
Thuc Nguyen
Date Created: December 2017
*/

$(document).ready(function() {
    // alert("document ready");
    updateGridContainer();
});

function updateGridContainer() {
    var widthOfGridRep = $('#grid_rep').width();
    var newHeight = widthOfGridRep * 0.75;
    $('.grid_container div:nth-child(n + 2)').css("min-height", newHeight);
}
