function getHTMLrender(htmlfile) {
    $.get(htmlfile, function(result){
        $("#cbody").html(result)
    })
}

function rendertmpl(id,data) {
    const source = $(id).html();
    const tmpl = Handlebars.compile(source);
    return tmpl(data);
}

$.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
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
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
  });

$().ready(() => {
    getHTMLrender("template/main.html")
    jQuery.getFeed({
        url: 'rss.xml',
        success: (feed) => {
            //console.log(feed);
            const router = Router(routes);
            router.init();
            const rsl = rendertmpl("#arl-tpl",feed);
            $("#arl-list").animateCss('fadeIn');
            $("#arl-list").html(rsl);
            const rsl2 = rendertmpl("#rent-tpl",feed);
            $("#rent-list").animateCss('fadeInRight');
            $("#timeline").animateCss('fadeInRight');
            $("#tag").animateCss('fadeInRight');
            $("#rent-list").html(rsl2);
        }
    })
})

const renderAbout = () => {
    $("#cbody").animateCss('fadeIn');
    getHTMLrender("template/about.html")
}

const renderContact = () => {
    $("#cbody").animateCss('bounceIn');
    getHTMLrender("template/contact.html")
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
                                $("#cbody").html(`<div class="container">
                                                    <div class="row">
                                                        <main id="arl-list" class="col-md-12">
                                                            <div><h1 class="text-center">${filterXSS(title)}</h3></div>
                                                            <hr>
                                                            ${marked(context)}
                                                        </main>
                                                        <button id="return" type="button" onClick="location.href='/'" class="btn btn-default btn-lg btn-block">返回</button>
                                                    </div>
                                                  </div>`)
                            })
                        }
                    }
                }
            }
        }

    },
    '/admin': () => {alert('FckU')}
};