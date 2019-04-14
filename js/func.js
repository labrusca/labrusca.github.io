function getHTMLrender(htmlfile, data, id, animate) {
    $.ajax({
        url: htmlfile,
        type: "GET",
        dataType: "html",
        async: false,
        success: source => {
            const tmpl = Handlebars.compile(source);
            $(id).html(tmpl(data));
            $(id).animateCss(animate);

        }
    })
}

function syncHTMLgeter(htmlfile, id) {
    $.ajax({
        url: htmlfile,
        type: "GET",
        dataType: "html",
        async: true,
        success: source => {
            $(id).html(source);
        }
    })
}

function syncHTMLadder(htmlfile, id) {
    $.ajax({
        url: htmlfile,
        type: "GET",
        dataType: "html",
        async: true,
        success: source => {
            $(id).append(source);
        }
    })
}

Handlebars.registerHelper('rent', function(context, options) {
    var ret = "<ul>";
  
    for(var i=0; i<3; i++) {
      ret = ret + `<li><a href="${context[i].url}" title="${context[i].date_published}">${context[i].title}</a></li>`;
    }
  
    return ret + "</ul>";
  });

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});


const renderAbout = () => {
    $("#cbody").animateCss('fadeIn');
    syncHTMLgeter("../template/about.html","#cbody")
}

const renderContact = () => {
    $("#cbody").animateCss('bounceIn');
    syncHTMLgeter("../template/contact.html","#cbody")
}

