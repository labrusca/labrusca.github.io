function getHTMLrender(htmlfile) {
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
                                $("#cbody").html(`<div class="container">
                                                    <div class="row">
                                                        <main id="arl-list" class="col-md-12">
                                                            ${marked(context)}
                                                        </main>
                                                        <br />
                                                        <a rel="license" class="text-center" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />本<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">作品</span>由<a xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/" property="cc:attributionName" rel="cc:attributionURL">labrusca</a>采用<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/#/contact" rel="cc:morePermissions">https://labrusca.net/#/contact</a> 处获得。
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