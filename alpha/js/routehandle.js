let routes = {
    '/:id': {
        on: (id) => {
            $.get(atob(id), context => {
                let title = context.split(/\[[A-Z]+\]:/)[1]
                $("#cbody").animateCss('fadeIn');
                $("title").text(`${filterXSS(title)} - Labrusca's Blog`)
                let templ = `
                <div class="row container">
                    <div class="col s12 m5">
                      <div class="card-panel teal">
                        <span class="card-title">${ filterXSS(title) }</span>
                        <span class="white-text">${ marked(context) }</span>
                      </div>
                    </div>
                  </div>
                `
                $("main").html(templ)
                //console.log($("#arl-list").html())
                $("#side").append(`<hr><p class="copyleft"><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />一切<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">作品</span>由<a xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/" property="cc:attributionName" rel="cc:attributionURL">labrusca</a>采用<a rel="license" class="text-info" href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。<br />本许可协议授权之外的使用权限可以从 <a class="text-info" xmlns:cc="http://creativecommons.org/ns#" href="https://labrusca.net/contact" rel="cc:morePermissions">contact页面</a> 处获得。`)
                $(".copyleft").animateCss('fadeInRight');
                $("#nav-add").append(`<a href="#" class="breadcrumb">${ filterXSS(title) }</a>`)
                const image = new Image();
                image.src = '../img/logo.png';
                const canvas = qrcanvas.qrcanvas({
                    cellSize: 6,
                    correctLevel: 'H',
                    data: `https://labrusca.net/blog/#/${year}/${month}/${day}/${time}`,
                    logo: {
                        image,
                    },
                });
                $("#side").append(canvas)
            }) //load main.html
        }
    }
};

const router = Router(routes);
router.init();