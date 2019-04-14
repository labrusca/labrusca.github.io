let Bloglist = new Array();

jQuery.get({
    url: 'feed.json',
    success: (feed) => {
        for (i in feed.items){Bloglist[i] = feed.items[i];}
    }
})

function _output(html){
    $('output').append(html);
}
const helptext = `
Commands: 
<blockquote>
    clear - 清除屏幕<br>
    echo [text] - 输出text<br>
    ls - 列出文章及其序号<br>
    read [number] - 阅读文章序号number的文章<br>
    startx - 启动Xserver<br>
    date - 查看当前日期<br>
    theme [interlaced|modern|white] - 切换终端风格<br>
    version - 显示终端版本<br>
    ...<br>
<blockquote>
`

var terminal = new Terminal('terminal', {welcome: '<h3>欢迎来到Light of Seraphim!<br>这是一个终端,输入"help"查看帮助.</h3>', prompt: 'guest@labrusca.net', separator: ' $'}, {}, {
	execute: function(cmd, args) {
		switch (cmd) {
			case 'clear':
				terminal.clear();
                return '';

            case 'date':
                return (new Date()).toLocaleString();

            case 'echo': //XSS好玩吗?
                return args[0];

            case 'exit':
                return '退出没这么容易,每个浏览器都有它自己的脾气..';

			case 'help':
                return helptext;
                
            case 'ls':
                for (i in Bloglist){
                    _output(`${i}: ${Bloglist[i].title}<br>`)
                }
                return ''

            case 'read':
                const htmltext = marked($.ajax({url:Bloglist[args[0]].id,async:false}).responseText);
                return `<h1>${Bloglist[args[0]].title}</h1><p>${htmltext}`;

            case 'reboot':
                location.reload(true);
                return '重启中...'

            case 'sudo':
                terminal.setPrompt('root@labrusca.net');
                return 'login as root.'

            case 'startx':
                self.location = 'index.html'
                return '跳转中...'
                case 'theme':
				if (args && args[0]) {
					if (args.length > 1) return 'Too many arguments';
					else if (args[0].match(/^interlaced|modern|white$/)) { terminal.setTheme(args[0]); return ''; }
					else return 'Invalid theme';
				}
                return terminal.getTheme();
            
			case 'ver':
			case 'version':
				return '0.1.0';

			default:
				// Unknown command.
				return false;
		};
	}
});