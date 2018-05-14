function getHTMLrender (htmlfile) {
    $("#cbody").load(htmlfile)
}
$().ready(() => {
    getHTMLrender("main.html")
    jQuery.getFeed({
        url: 'rss.xml',
        success: (feed) => {
            //console.log(feed);
            const router = Router(routes);
            router.init();
            const tmpl = $.templates("#arl-tpl");
            const rsl = tmpl.render(feed);
            $("#arl-list").html(rsl);
            const tmpl2 = $.templates("#rent-tpl");
            const rsl2 = tmpl2.render(feed);
            $("#rent-list").html(rsl2);
        }
    })
})

const renderAbout = () => {
    getHTMLrender("about.html")
}

const renderContact = () => {
    getHTMLrender("contact.html")
}


let routes = {
    '/about' : renderAbout,
    '/contact' : renderContact,
    '/blog' : {
        '/:year' : {
            '/:month' : {
                '/:day' : {
                    '/:time' : {
                        on: (year,month,day,time) => {
                            let MDfilename = filterXSS(`${year}-${month}-${day}-${time}.md`)
                            $.get(`articles/${MDfilename}`,context => {
                                $("#cbody").html(`<div class="container">
                                                    <div class="row">
                                                        <main id="arl-list" class="col-md-12">
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

    }
};

