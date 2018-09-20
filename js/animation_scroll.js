var $scrollAnimationElements;
var $window;

$(document).ready(function() {
    $scrollAnimationElements = $('.scrollAnimationElement');
    $window = $(window);

    $window.on('scroll resize', checkScrollElementInView);
    $window.trigger('scroll');
});

function checkScrollElementInView() {
    var windowHeight = $window.height();
    var windowPosTop = $window.scrollTop();
    var windowPosBot = (windowPosTop + windowHeight);

    $.each($scrollAnimationElements, function() {
        var $element = $(this);
        var elementHeight = $element.outerHeight();
        var elementPosTop = $element.offset().top;
        var elementPosBot = (elementPosTop + elementHeight);

        // check if element is within viewport
        if ((elementPosBot >= windowPosTop) && (elementPosTop <= windowPosBot)) {
            $element.addClass('inView');
        }
        else {
            // Can remove class inView here but won't
        }
    });
}
