function loadEjs(htmlfile, data) {
    let e;
    $.ajax({
        url: htmlfile,
        type: "GET",
        dataType: "html",
        async: false,
        success: source => {
            e = ejs.render(source, data)
        }
    })
    return e
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
}
});

const darkmode =  new Darkmode();
if((darkmode.isActivated()==false) && (localStorage.darkmode =="true")) {
    //localStorage.setItem('darkmode', 'false');
    darkmode.toggle()
}