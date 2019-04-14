$().ready(() => {
    syncHTMLgeter("template/main.html","#cbody")
    jQuery.get({
        url: 'feed.json',
        success: (feed) => {
            //console.log(feed);
            $('#pagination').twbsPagination({
                totalPages: Math.ceil(feed.items.length/7),
                visiblePages: 5,
                //paginationClass: "pagination btn-group", 
                //anchorClass: "btn btn-default", 
                onPageClick: function (event, page) {
                    getHTMLrender("template/list.html", feed.items.slice((page-1)*7,page*7), "#arl-list", "fadeIn")
                }
            });

            $("#timeline").animateCss('fadeInRight');
            $("#tag").animateCss('fadeInRight');
            getHTMLrender("template/recent.html", feed, "#recent-list", "fadeInRight")
        }
    })
})