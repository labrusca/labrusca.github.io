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
        async: false,
        success: source => {
            $(id).html(source);
        }
    })
}

Handlebars.registerHelper('rent', function(context, options) {
    var ret = "<ul>";
  
    for(var i=0; i<3; i++) {
      ret = ret + `<li><a href="${context[i].link}" title="${context[i].updated}">${context[i].title}</a></li>`;
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

$().ready(() => {
    syncHTMLgeter("template/main.html","#cbody")
    jQuery.getFeed({
        url: 'rss.xml',
        success: (feed) => {
            //console.log(feed);
            const router = Router(routes);
            router.init();
            $('#pagination').twbsPagination({
                totalPages: Math.ceil(feed.items.length/5),
                visiblePages: 5,
                onPageClick: function (event, page) {
                    getHTMLrender("template/list.html", feed.items.slice((page-1)*5,page*5), "#arl-list", "fadeIn")
                }
            });

            getHTMLrender("template/recent.html", feed, "#recent-list", "fadeInRight")
            $("#timeline").animateCss('fadeInRight');
            $("#tag").animateCss('fadeInRight');
        }
    })
})

const renderAbout = () => {
    syncHTMLgeter("template/about.html","#cbody")
    $("#cbody").animateCss('fadeIn');
}

const renderContact = () => {
    syncHTMLgeter("template/contact.html","#cbody")
    $("#cbody").animateCss('bounceIn');
}


let routes = {
    '/about': renderAbout,
    '/contact': renderContact,
    '/blog': {
        '/:year': {
            '/:month': {
                '/:day': {
                    '/:time': {
                        on: (year, month, day, time) => {
                            let MDfilename = filterXSS(`${year}-${month}-${day}-${time}.md`)
                            $.get(`articles/${MDfilename}`, context => {
                                let title = context.split(/\[[A-Z]+\]:/)[1]
                                $("#cbody").animateCss('fadeIn');
                                $("title").text(`${filterXSS(title)} - Labrusca's Blog`)
                                $("#arl-list").html(`
                                                            <div><h1 class="text-center">${filterXSS(title)}</h3></div>
                                                            <hr>
                                                            ${marked(context)}`)
                                $("#asidemain").append(`<p class="copyleft"><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />一切<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">作品</span>由<a xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/" property="cc:attributionName" rel="cc:attributionURL">labrusca</a>采用<a rel="license" class="text-info" href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。<br />本许可协议授权之外的使用权限可以从 <a class="text-info" xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/#/contact" rel="cc:morePermissions">contact页面</a> 处获得。`)
                                $(".copyleft").animateCss('fadeInRight');
                                $("#pagination").html(`<button id="return" type="button" onClick="location.href='/'" class="btn btn-default btn-lg btn-block">返回</button>`)
                            })
                        }
                    }
                }
            }
        },
    },
    '/admin': () => {
        alert('FckU')
    },
    '/timeline': () => {
        alert('No finish yet!')
    },
    '/xss': {
            '/:XSSstring': {
                on : (XSSstring) => {
                    alert(XSSstring)
                }

            }
    }
};