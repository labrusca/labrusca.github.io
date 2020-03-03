let routes = {
    '/:id': {
        on: (id) => {
            $.get(atob(id), context => {
                let title = context.split(/\[[A-Z]+\]:/)[1]
                $("main").animateCss('fadeIn');
                $("title").text(`${filterXSS(title)} - Labrusca's Blog`)
                let templ = `
                <div class="row container indigo lighten-5 z-depth-5">
                    <div class="col s12" style="widht:100%;height:100%;word-wrap: break-word">
                        <!-- <h3 class="card-title center-align">${ filterXSS(title) }</h3> -->
                        <span class="text-darken-2">${ filterXSS(marked(context)) }</span>
                    </div>
                </div>
                `
                $(".breadcrumb").after(`<a href="/blog/#${id}" class="breadcrumb">${ filterXSS(title) }</a>`)
                $("main").html(templ)
                $("main").after(`<p class="copyleft center-align"><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />一切<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">作品</span>由<a xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/" property="cc:attributionName" rel="cc:attributionURL">labrusca</a>采用<a rel="license" class="text-info" href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。<br />本许可协议授权之外的使用权限可以从 <a class="text-info" xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/contact" rel="cc:morePermissions">contact页面</a> 处获得。</p>`)
                $(".copyleft").animateCss('fadeInRight');
                const image = new Image();
                image.src = '../../img/logo.png';
                const canvas = qrcanvas.qrcanvas({
                    cellSize: 5,
                    correctLevel: 'H',
                    data: `${window.location.href}`,
                    logo: {
                        image,
                    },
                });
                $(".tap-target-content").html(canvas)
                //$("canvas").addClass("center-align")
            }) 
        }
    }
};

const router = Router(routes);
router.init();