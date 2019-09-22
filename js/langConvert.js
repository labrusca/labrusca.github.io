/*********************************************************************************************************************************
                              !!!!!------  请勿删除以下版权宣言信息  ------!!!!!
软件名称:  梦之缘免费交友中心网页繁简转换程式2009.08.2113免费版
官方网站:  http://www.i2113.com/IT/big5gb/index.html

版权所有: 属于 梦之缘香港免费交友中心 (www.i2113.com) 所有.
                  允许任何人士修改后再发佈,但必须保留此页面的所有版权宣言信息,并通知梦之缘(webmaster@i2113.com).

免责声明: 使用此程式直接或间接造成的任何损毁或损失, 一概与此程式作者 及 梦之缘香港免费交友中心
                  及 网站 (www.i2113.com) 无关, 亦无需负上任何责任. 

授权方式: 梦之缘 授权任何人仕均可免费使用, 包括商业用途, 条件如下 (二选一):
(1) 论坛网站可新增1个 "顶置" 的新帖 或 任何页面 说明繁简程式的出处, 标题和内容如下: 
              标题: 感谢梦之缘(www.i2113.com)提供繁简转换程式.
              内容: 本网站的繁简转换程式由 梦之缘免费交友中心(http://www.i2113.com) 免费提供, 
                        繁简转换程式官方网址:    http://www.i2113.com/IT/big5gb/index.html
                        (内容亦可复製此页面的所有版权宣言信息)
或 或 或 或 或 或 或 或
(2) 在贵站首页显眼地方提供 梦之缘 的超连结, 代码如下: (可交换连结)
                 <a href="http://www.i2113.com" target="_blank" title=" 梦之缘免费交友中心 http://www.i2113.com">
                     <img src="http://www.i2113.com/images/link8831gb.png" border="0"></a>
                 </a>			            
           或 文字连结:
			    <a href="http://www.i2113.com" target="_blank" title=" 梦之缘免费交友中心 http://www.i2113.com">
				     梦之缘免费交友中心
			    </a>

程式特点:	
		》 采用JS编码来进行繁简转换, 支援任何UTF8编码的网页程式, eg: PHP/JSP/ASP/ASP.net ... <br>
		》 完全支援任何论坛或CMS程式, eg: Discuz 6, Discuz 7, Discuz 7.1, phpwind, phpcms ... <br>
		》 在用户端电脑即时进行繁简转换, 完全不佔用主机的资源.  <br>
		》 完全兼容 IE8, IE7, IE6 及 Firefox 或任何支援JavaScript的浏览器. <br>
		》 完全免费下载, 简单易用, 绿色无插件, 无广告.  <br>
		》 支援通站自动转换 或 单页面手动转换.

演示网站:
		非论坛网站: 梦之缘免费交友中心 http://www.i2113.com
		论坛类网站: 中国六千 http://www.cn6k.com/
演示页面:
		官方网站演示页面:  http://www.i2113.com/IT/big5gb/test.html
		繁简中文在线转换:  http://www.i2113.com/IT/big5gb/big5gb.html

用法说明: 请参考繁简转换程式官方网址:    http://www.i2113.com/IT/big5gb/index.html
下载地址:  http://www.i2113.com/IT/big5gb/index.html
解压密码:  http://www.i2113.com/
**********************************************************************************************************************************/

	// 以下参数可自行设定: (1) 网站内容全是简体, 若只想繁体用户自动转换, 填 "big5"; (2) 网站内容全是繁体, 若只想简体用户自动转换, 填 "gb";
var convertWhenClientBrowserLang = "gb" ; 		// (3) 预设值是"both", 不理网站内容的语系,而是根据用户浏览器语系一律都做转换.


	// 将整页所有项目转换.
function convertAll(convertLang2,targetObj)
{	convertLang2 = convertLang2.toLowerCase();	
	if( typeof( targetObj ) == "object" )
		var allObjs = targetObj.childNodes;
	else 
		var allObjs = document.body.childNodes;

	for ( var i=0; i<allObjs.length; i++ )
	{	var thisObj=allObjs.item(i);

		if ( "||BR|br|HR|hr|title|".indexOf( "|" + thisObj.tagName + "|" ) > 0 )
			continue;		//  不用转换的包括BR,HR
			// 将alt,title,button和textarea上的字转换
		if( thisObj.alt != '' && thisObj.alt != null ) 
			thisObj.alt = convertText( thisObj.alt,convertLang2 );
		if( thisObj.title != '' && thisObj.title != null )		// 在IE8不支援title属性
			thisObj.title = convertText( thisObj.title,convertLang2 );
		if( "||INPUT|input|TEXTAREA|textarea|".indexOf( "|" + thisObj.tagName + "|" ) > 0  &&  thisObj.value != '' )
			thisObj.value = convertText( thisObj.value,convertLang2 );
		if( thisObj.nodeType == 3 )
			thisObj.data = convertText( thisObj.data,convertLang2 );
		else
			convertAll(convertLang2,thisObj);
	}
}

function convertText(textStr,convertLang2)
{	convertLang2 = convertLang2.toLowerCase();

	if( textStr == '' || textStr == null )
		return '';		

	var newStr = '';
	var allSC = getAllUTF8SC();
	var allTC = getAllUTF8TC();

	for ( var i = 0; i < textStr.length; i++ )
	{	var thisWord = textStr.charAt(i);	// 取出一个字符.
			// charCodeAt()返回该中文的utf8编码值, 2616个中文的utf8编码值:繁 min=17079,max=40860, 简 min=13726,max=40863
			// 故: 最小为13726, 最大为40863.
		var utf8Code = thisWord.charCodeAt(0);		// thisWord就只有一个字符.
		if ( utf8Code >= 13726 && utf8Code <= 40863 )
		{	if( convertLang2.toLowerCase() == 'gb' )	// 如该字的utf8编码值没有超出范围, 尝试看能否找出它在2616个字中的位置.
				var thisWordPosition = allTC.indexOf(thisWord);
			else
				var thisWordPosition = allSC.indexOf(thisWord);
			if ( thisWordPosition != -1 )	// 若此字在2616个字集中找得到的话, 转换为对应值.
			{	if( convertLang2.toLowerCase() == 'gb' )
					newStr += allSC.charAt(thisWordPosition);
				else
					newStr += allTC.charAt(thisWordPosition);
			}
			else 
  				newStr += thisWord;
		}
  		else		// 如该字的Unicod编码值超出2616个中文的utf8编码值范围, 则不做转换, 返回原字符.
  			newStr += thisWord;
	}
	textStr = null;	allSC = null;		allTC = null;
	return newStr;
}

	// 用法: <a  href=javascript:TSC('big5')> 繁体 </a>  <a  href=javascript:TSC('gb')> 简体 </a>
function TSC(convertLang2)
{	convertLang2 = convertLang2.toLowerCase();
	if ( convertLang2 != 'big5'  &&  convertLang2 != 'gb' )
	{	var clientLang = window.navigator.userLanguage.toLowerCase();
		if ( clientLang == 'zh-cn' )
			cookieValue = "gb";
		else
			cookieValue = "big5";
		setCookie2('TSCvalue',cookieValue,9999);		// Save Client selected Lang to cookie.
	}
	else
		setCookie2('TSCvalue',convertLang2,9999);	// Save Client selected Lang to cookie.	
	convertAll(convertLang2);
}

function getAllUTF8TC()
{	var allUTF8TC = "夢緣丟並採亂亙亞嚲來侖侶俁俠倀倆倉個們倫偉側偵偽杰傖傘備傭傳傴債傷傾僂僅僉僑僕僥僨僱價儀儂億當儈儉儐儔儕盡償優儲儷羅攢儺儻儼兇兌兒兗內兩冊塗凍凜瀆處凱憑別刪剗剄則剛剝剮剴創鏟劃劇劉劊劌劍劑勁動務勩勛勝勞勢績勱勵勸勻匭匯匱奩櫝區協卻厙廳廁厭廠厲厴參靉靆叢吳呂咼員唄唚嗊啢問啓啞銜囉嘽喚喪喬單喲嗆嗇嗎嗚嗩嗶嘆嘍嘔嘖嘗嘜嘩嘮嘯嘰嘵嘸噅噓噝噠噥噦噯噲噴噸嚀嚇嚌嚕嚙嚦嚨嚮嚳嚴嚶囀囁囅囈蘇囑國圇圍園圓圖團坰墶壋垵壩埡執堅堊堖堝階堯報場壪塊塋塏塒塢塤塵塹磚墊墜磽墮壇墳牆墾壓壘壙壚壞壟壢壯壼壺壽夠夾奐奧奪奮妝姍姦姪娛嫵婁婦婭嫿媧媯媼媽裊嫗嫻嬈嬋嬌嬙嬡嬤嬪嬰嬸懶孌孫學孿宮寢實寧審寫寬寵寶將專尋對導尷屓屆屍屜屢層屨屬岡嶨嶢峴島峽嶮崍崗崬崢崳嵐歲嶔嶁嶄嶇嶗嶠嶧嶴嶸嶺嶼巋巒巔巰巹帥師帳帶幀幃幗幘幟幣幫幬襴幹幾庫廎廂廈蔭廚廝廟廡廢廣廩廬弳張強彈彌彎彠彥彫徑從徠複徵徹恆悅悵悶悽惱惲惻愛愜愨愴愷愾態慍慘慚慟慣慪慫憖慮慳懾慶憂憊憐憒憚憤憫憮憲憶懇應懌懍懨懟懣懲懷懸懺懼歡戀戇戔戧戩戲戰戶拋掗撏挾捫掃掄掙掛揀揚換揮構撳損搖搗搶摑摜摟摯摳摶摻撈撐撓撟撣撥撫撲撻撾撿擁擄擇擊擋擔攜據擠舉擬擯擰擱擲擴擷擺擻擼擾攄攆攏攔攖攙攛攝攣攤攪攬敘敗敵數驅斂斃斕斬斷暘曨時晉晝暈暉暢暫暱曄曇曉曖曠曡曬書會朧東柵桿梔梘條梟檮棶棄棖棗棟棧棬棲椏楊楓楨業極榪榮榿盤槍槓檟槧槨槳規樁樂樅樓標樞樣樸樹樺橈橋機橢橫橰檁檉檔檜檢檣檳檸檻檾櫃櫓櫚櫛櫞櫟櫥櫧櫨櫪櫫櫬櫳櫸欞櫻欄權欏欒欖欽歐歟歸歿殘殞殤殫殮殯殲殺殼毀毆醫絨毿犛氈氌氣氫氬氳氹決沍沒沖渢濔況洩洶溮滻濜浹涇溳涼淚淥淨淩淪淵淶淺渙減渦測渾湊湞湣湧湯漊溈準溝溫濕滄滅滌滎澦滬滯滲鹵滸滾滿漁漚漢漣漬漲漵漸漿潁潑潔潛潤潯潰潷潿澀澆澇澗澠澤澩澮澱濁濃濘濟濤濫濰濱闊濺濼濾瀅瀉瀋瀏瀕瀘瀝瀟瀠瀦瀧瀨瀲瀾灃灄灑灕灘灝灣灤灧災為烏烴無煆輝煉煒煙煢煥煩煬熒熗熱熲熾燁燄燈燉燒燙燜營燦燭燴燻燼燾燿爍爐爛爭爺爾牀箋閘牘牽犖犢犧狀獮狹狽猙猶猻獁獃獄獅獎獨獪獫獰獲獵獷獸獺獻獼玀茲璵瑒玨瑲璫現璡琿瑉瑋瑣瑤瑩瑪璉璣璦環璽瓊瓏瓔瓚甌罌產畝畢畫異疇痙瘂瘮瘋瘍瘓瘞瘡瘧瘻療癆癇癉癘癟癡癢癤癥癧癩癬癭癮癰癱癲發皚皸皺藹礙襖罷頒辦絆綁鎊謗盜盞監盧蕩視矓眾睜飽鮑輩貝鋇繃筆閉邊編貶變辯辮鱉賓餅睞瞘瞞瞼矚缽鉑駁補財蠶蒼艙詫蟬饞讒纏闡顫矯硜磑礄硤硨硯磣長腸鈔車陳襯稱誠騁遲馳齒蟲躊籌綢醜鋤雛碩碭碸確碼磧磯礎觸闖錘純綽辭詞賜聰蔥躥竄錯達貸礦礪礫礬礱禕祿禍禎鄲膽誕黨禱鄧遞締顛點電釣調諜禦禪禮禰禿穠稅稈稜釘頂錠訂鬥讀賭鍍鍛緞隊頓鈍鵝額訛餓餌稟種穀穌積穎穡穢頹穩穭貳罰閥釩範販飯訪紡飛誹費紛糞豐鋒風馮縫諷鳳膚輻窩窪窮窯窶窺竅竇竊豎競輔賦負訃縛該鈣蓋趕贛鋼綱鎬鴿閣鉻給筍簹筧箏籙節龔鞏貢鉤購蠱顧關觀館貫龜閨軌詭貴輥鍋過築篋篠篤篩篳簀簍簑簞簡簣簫簷簽簾駭韓號閡鶴賀轟鴻紅後籃籐籜籟籠鑰籩籪籬籮籲粵護華話還緩黃謊賄諱誨繪葷夥貨糝模糧糲糴糶糾紀紂約紆紇紈紉紋納紐紓紕紖紗紘紙級紜紝細紱紲紳紵饑跡譏雞緝輯薊計記際繼莢頰賈鉀駕間艱緘繭薦鑒踐賤見鍵紹紺紼紿絀終組絎結絕縧絝絞絡絢絰統絲絳絹綃綆綈繡綌綏經艦餞蔣講醬膠驕鉸腳餃繳轎較誡緊錦謹進綜綞綠綣綬維綯綰網綴綸綹綺綻綾綿緄緇緋緡緒緓緔緗緙緦緬緯緱緲練緶緹荊莖鯨驚頸靜鏡舊駒鋸鵑覺訣鈞軍縕總縈縉縊縋縐縑縗縝縞縟縣縭縮縱縲纖縵縶縷縹繅繆繈繒織繕繚駿開顆課褲誇虧繞繢繩韁繯繰繹繽繾纇纈纊續纓纘纜饋蠟臘萊賴藍闌蘭讕覽鐳類離鯉麗罵羆羈羋羥羨義習翽翬隸聯蓮連鐮臉鏈輛諒遼鐐臨鄰鱗賃齡鈴靈領餾龍聾翹翺耬耮聖聞聲聳聵聶職聹聽隴蘆顱虜魯賂錄陸驢鋁輪論蘿邏鑼騾駱螞馬買麥賣邁脈饅蠻肅脅脛脫脹謾貓錨鉚貿麼鎂門錳謎覓閩鳴銘謬腎腖膕腡腦腫膁膃膩膾膿臍臏臒謀鈉難鬧餒釀鳥鑷鎳臚臢髒臠臥臯與興鋪艤鈕農諾鷗龐賠鵬艫艷艸芻苧騙飄頻貧蘋評頗譜齊騎豈訖薘莊莧釺鉛遷謙錢鉗譴薔鍬親輕頃請趨軀萇蘀萬萵葉葒葤葦藥齲顴鵲讓饒韌認軟銳閏薩鰓賽蒓蒔蓀蓧蓯蓽騷閃陝贍賞賒設蔞蔦蕁蕆蕎蕒蕓蕕蕘蕢蕪蕭蕷詩蝕識駛適釋飾試輸贖術薈薌薑薟薺藎藝藪藶雙誰順說飼頌訟誦訴雖隨鎖藺蘄蘊蘚蘞蘢蘺虛貪譚談討騰謄銻題體貼鐵蛺蛻蜆銅頭鴕馱駝襪頑蝟蝦蝨蝸螿螄蟻螢韋違謂衛鎢誣霧誤錫螻蟄蟈蟎蠨蟣蟯蟶蠅蠆蠍蠐蠑蠣襲銑轄鍁鮮鹹賢閑顯險餡鑲鄉詳響項銷衊褘袞諧謝鋅釁鏽須許軒襏褌裝褳選詢馴訓訊遜鴉鴨訝閹鹽顏閻諺驗鴦陽養褸褻襆襇雜襝襠襤覎覘覡遙謠頁銥頤遺詣議誼譯陰銀飲隱覥覦覬覯覷覲覿觴觶訁訌訐訒訕鷹贏踴詠郵鈾誘輿魚語譽訥諶訩訶診注證詁詆詎詐詒詔詖詗詘詛讋詡詬詮詰詵詼詿預馭鴛轅遠願躍閱雲鄖隕運醞韻載贊贓鑿責賊贈軋誄誅誆誑誒誚誥誶諂諄諉諍諏諑諗諛諝諞諡諢鍘齋輾賬趙轍鍺這貞針鎮陣諤諦諫諭諳諸諼謁謅謐謔謖謨謫謳鄭質鐘軸驟豬著貯鑄譎譖譙譫譸譾讎讖讜讞駐轉賺錐贅資蹤鄒鑽豶貍貟鞀靨贗賾貰貲貺貽賁賅賑賕賙賚賡賧賫贐賵賻贄贇黌鳧贔赬趲陘隉鄺鄔鄴躂踡蹌蹕蹠蹣郟鄶郤鄆酈蹺躉躋躑躒躓躕躚躡躦躪軑軔軛軤軫軲軹軺軻軼軾輅輇輈輊輒輜輞輟輦輬輳轀轂鶯驀鎣轆轔轡轢轤邇邐醱釃釅釓釔釕釗釙釤麅釧釵釷釹鈀鈁鈃鈄鈈鈐鈑鈒鈥鈦鈧鈮鈰鈳鈷鈸鈹鈺鈽鈿餳飩餼飪飫飭飴餉餑餘餛餷餿饃饈饉饊饌饢鉈鉉鉍鉕鉞鉦鉬鉭鐦鉶鉺鉿銃銍銓銖銚銛銠銣銦閂閆闈閎閔閌闥閭閫鬮閬閾閶鬩閿閽閼闃闋闔闐闕闞爿銨銩銪銫銬銱銼鎇鋃鋌鋏鋙鐲鋝鋟鋣鋥鋦鋨鋩鋮鋯鋰鋱鋶錁錆錇錈錏錒錕錙錚錛錟錡錩錮錸鎿鍀鍃鍆鍇鍈鍔鍚鍠鍤鍥鍩騫鍰鍶鎄鎔鎘鎛鎡鎦鎧鎩鎪鎰鎲鎵鐫鏃鏇鏌鏍駔駟駙騶驛駑駘驍驊駢驪騏騍騅驂騭騖驁騮騸驃驄驏驥驤糸鏐鏑鏗鏘鏜鏝鏞鏢鏤鏨鏰鏵鏷鏹鐃鐋鐒鐓鐔鐙钁鐠鐧鐨頊鐶鐸鐺鐿鑊鑌鑔鑕鑞鑠鑣鑥鑭鑱鑹鑾韙韞韜閈闍闒闓闠闤靦霽靂靄靚颮颯颶颼飆齏于鞽韃韉韍韝頇頎龕頏頜頡頦頮頲頴頷顎顒顓顙顢顥顬顰顳颭颸颻飀飣飥飿餄餎餏餕餖餚餜餶餺饁饗饜鳩鳶鴇鴆鴣鶇鸕鴝鴟鷥鴯鷙鴰鵂鸞鵓鸝鵠鵒鷳鵜鵡鶓鵪鵯鶉鶘鶚鶿鶥鶩鷂鶼鸚鷓鷚鷯鷦鷲鷸鸌鷺鸛馹駰駸騂騌騤驌驦驫鯁髏髕髖鬢鬱魎魘魛魢魨魴魷魺麩鮁鮃鮊鮋鯀鮍鮎鮐鮒鮓鮚鮜鮞鮦鮪鮫鮭鮳鮶鯷鮺鯇鯊鯒鯔鯕鯖鯗鯛醯鹺鯝鯡鯢鯤鯧鯪鯫鯰鯴鰺鯽鯿鰁鰂鰃鰈鰉鰍鰏鱷鰒鰮鰜鰟鰠鰣鰥鰨鰩鰭鰱鰲鰳鰵鰷鰹鰻齔齟齙齠齜齦齬齪齷黽黿鼉鱸鱟鱭鱘鱺鱝鰼鰾鱂鱅鱈鱒鱔鱖鱠鱣鱤鱧鱨鱯鶻黷黲鼴齇鳲鴒鴞鴬鴴鵃鵐鵮鵷鵾鶊鶖鶡鶬鶲鶹鶺鷁鷊鷖鷫鸇鸏鸘黶鼂齕齗飈邨鉅喎撝擓殨瞜筴䊷紬縳絅䋙繸䝼鳾鵁鴷鶄鶪鷈鷿俔倈剎龎叄吶壠奼弒悞戱挩搵槤梲榲熅瘲瞶禡窵篔骯虆薀誾逕酇釒鍾霢颺飠䰾䲁餘礆恥囪惡琺廄扡甕囂紮佇諮槁醃齶遝蠔秈餱雋線蒞託訢鉋眥磣鹼";
	return allUTF8TC;
}

function getAllUTF8SC()
{	var allUTF8SC = "梦缘丢并采乱亘亚亸来仑侣俣侠伥俩仓个们伦伟侧侦伪杰伧伞备佣传伛债伤倾偻仅佥侨仆侥偾雇价仪侬亿当侩俭傧俦侪尽偿优储俪罗攒傩傥俨凶兑儿兖内两册涂冻凛渎处凯凭别删刬刭则刚剥剐剀创铲划剧刘刽刿剑剂劲动务勚勋胜劳势绩劢励劝匀匦汇匮奁椟区协却厍厅厕厌厂厉厣参叆叇丛吴吕呙员呗吣唝唡问启哑衔啰啴唤丧乔单哟呛啬吗呜唢哔叹喽呕啧尝唛哗唠啸叽哓呒咴嘘咝哒哝哕嗳哙喷吨咛吓哜噜啮呖咙响喾严嘤啭嗫冁呓苏嘱国囵围园圆图团垧垯垱埯坝垭执坚垩垴埚阶尧报场塆块茔垲埘坞埙尘堑砖垫坠硗堕坛坟墙垦压垒圹垆坏垄坜壮壸壶寿够夹奂奥夺奋妆姗奸侄娱妩娄妇娅婳娲妫媪妈袅妪娴娆婵娇嫱嫒嬷嫔婴婶懒娈孙学孪宫寝实宁审写宽宠宝将专寻对导尴屃届尸屉屡层屦属冈峃峣岘岛峡崄崃岗岽峥嵛岚岁嵚嵝崭岖崂峤峄岙嵘岭屿岿峦巅巯卺帅师帐带帧帏帼帻帜币帮帱襕干几库庼厢厦荫厨厮庙庑废广廪庐弪张强弹弥弯彟彦雕径从徕复征彻恒悦怅闷凄恼恽恻爱惬悫怆恺忾态愠惨惭恸惯怄怂慭虑悭慑庆忧惫怜愦惮愤悯怃宪忆恳应怿懔恹怼懑惩怀悬忏惧欢恋戆戋戗戬戏战户抛挜挦挟扪扫抡挣挂拣扬换挥构揿损摇捣抢掴掼搂挚抠抟掺捞撑挠挢掸拨抚扑挞挝捡拥掳择击挡担携据挤举拟摈拧搁掷扩撷摆擞撸扰摅撵拢拦撄搀撺摄挛摊搅揽叙败敌数驱敛毙斓斩断旸昽时晋昼晕晖畅暂昵晔昙晓暧旷叠晒书会胧东栅杆栀枧条枭梼梾弃枨枣栋栈桊栖桠杨枫桢业极杩荣桤盘枪杠槚椠椁桨规桩乐枞楼标枢样朴树桦桡桥机椭横槔檩柽档桧检樯槟柠槛苘柜橹榈栉橼栎橱槠栌枥橥榇栊榉棂樱栏权椤栾榄钦欧欤归殁残殒殇殚殓殡歼杀壳毁殴医绒毵牦毡氇气氢氩氲凼决冱没冲沨沵况泄汹浉浐浕浃泾涢凉泪渌净凌沦渊涞浅涣减涡测浑凑浈愍涌汤溇沩准沟温湿沧灭涤荥滪沪滞渗卤浒滚满渔沤汉涟渍涨溆渐浆颍泼洁潜润浔溃滗涠涩浇涝涧渑泽泶浍淀浊浓泞济涛滥潍滨阔溅泺滤滢泻渖浏濒泸沥潇潆潴泷濑潋澜沣滠洒漓滩灏湾滦滟灾为乌烃无煅辉炼炜烟茕焕烦炀荧炝热颎炽烨焰灯炖烧烫焖营灿烛烩熏烬焘耀烁炉烂争爷尔床笺闸牍牵荦犊牺状狝狭狈狰犹狲犸呆狱狮奖独狯猃狞获猎犷兽獭献猕猡兹玙玚珏玱珰现琎珲珉玮琐瑶莹玛琏玑瑷环玺琼珑璎瓒瓯罂产亩毕画异畴痉痖瘆疯疡痪瘗疮疟瘘疗痨痫瘅疠瘪痴痒疖症疬癞癣瘿瘾痈瘫癫发皑皲皱蔼碍袄罢颁办绊绑镑谤盗盏监卢荡视眬众睁饱鲍辈贝钡绷笔闭边编贬变辩辫鳖宾饼睐眍瞒睑瞩钵铂驳补财蚕苍舱诧蝉馋谗缠阐颤矫硁硙硚硖砗砚碜长肠钞车陈衬称诚骋迟驰齿虫踌筹绸丑锄雏硕砀砜确码碛矶础触闯锤纯绰辞词赐聪葱蹿窜错达贷矿砺砾矾砻祎禄祸祯郸胆诞党祷邓递缔颠点电钓调谍御禅礼祢秃秾税秆棱钉顶锭订斗读赌镀锻缎队顿钝鹅额讹饿饵禀种谷稣积颖穑秽颓稳稆贰罚阀钒范贩饭访纺飞诽费纷粪丰锋风冯缝讽凤肤辐窝洼穷窑窭窥窍窦窃竖竞辅赋负讣缚该钙盖赶赣钢纲镐鸽阁铬给笋筜笕筝箓节龚巩贡钩购蛊顾关观馆贯龟闺轨诡贵辊锅过筑箧筱笃筛筚箦篓蓑箪简篑箫檐签帘骇韩号阂鹤贺轰鸿红后篮藤箨籁笼钥笾簖篱箩吁粤护华话还缓黄谎贿讳诲绘荤伙货糁模粮粝籴粜纠纪纣约纡纥纨纫纹纳纽纾纰纼纱纮纸级纭纴细绂绁绅纻饥迹讥鸡缉辑蓟计记际继荚颊贾钾驾间艰缄茧荐鉴践贱见键绍绀绋绐绌终组绗结绝绦绔绞络绚绖统丝绛绢绡绠绨绣绤绥经舰饯蒋讲酱胶骄铰脚饺缴轿较诫紧锦谨进综缍绿绻绶维绹绾网缀纶绺绮绽绫绵绲缁绯缗绪绬绱缃缂缌缅纬缑缈练缏缇荆茎鲸惊颈静镜旧驹锯鹃觉诀钧军缊总萦缙缢缒绉缣缞缜缟缛县缡缩纵缧纤缦絷缕缥缫缪襁缯织缮缭骏开颗课裤夸亏绕缋绳缰缳缲绎缤缱颣缬纩续缨缵缆馈蜡腊莱赖蓝阑兰谰览镭类离鲤丽骂罴羁芈羟羡义习翙翚隶联莲连镰脸链辆谅辽镣临邻鳞赁龄铃灵领馏龙聋翘翱耧耢圣闻声耸聩聂职聍听陇芦颅虏鲁赂录陆驴铝轮论萝逻锣骡骆蚂马买麦卖迈脉馒蛮肃胁胫脱胀谩猫锚铆贸么镁门锰谜觅闽鸣铭谬肾胨腘脶脑肿肷腽腻脍脓脐膑癯谋钠难闹馁酿鸟镊镍胪臜脏脔卧皋与兴铺舣钮农诺鸥庞赔鹏舻艳艹刍苎骗飘频贫苹评颇谱齐骑岂讫荙庄苋钎铅迁谦钱钳谴蔷锹亲轻顷请趋躯苌萚万莴叶荭荮苇药龋颧鹊让饶韧认软锐闰萨鳃赛莼莳荪莜苁荜骚闪陕赡赏赊设蒌茑荨蒇荞荬芸莸荛蒉芜萧蓣诗蚀识驶适释饰试输赎术荟芗姜莶荠荩艺薮苈双谁顺说饲颂讼诵诉虽随锁蔺蕲蕴藓蔹茏蓠虚贪谭谈讨腾誊锑题体贴铁蛱蜕蚬铜头鸵驮驼袜顽猬虾虱蜗螀蛳蚁萤韦违谓卫钨诬雾误锡蝼蛰蝈螨蟏虮蛲蛏蝇虿蝎蛴蝾蛎袭铣辖锨鲜咸贤闲显险馅镶乡详响项销蔑袆衮谐谢锌衅锈须许轩袯裈装裢选询驯训讯逊鸦鸭讶阉盐颜阎谚验鸯阳养褛亵幞裥杂裣裆褴觃觇觋遥谣页铱颐遗诣议谊译阴银饮隐觍觎觊觏觑觐觌觞觯讠讧讦讱讪鹰赢踊咏邮铀诱舆鱼语誉讷谌讻诃诊注证诂诋讵诈诒诏诐诇诎诅詟诩诟诠诘诜诙诖预驭鸳辕远愿跃阅云郧陨运酝韵载赞赃凿责贼赠轧诔诛诓诳诶诮诰谇谄谆诿诤诹诼谂谀谞谝谥诨铡斋辗账赵辙锗这贞针镇阵谔谛谏谕谙诸谖谒诌谧谑谡谟谪讴郑质钟轴骤猪着贮铸谲谮谯谵诪谫雠谶谠谳驻转赚锥赘资踪邹钻豮狸贠鼗靥赝赜贳赀贶贻贲赅赈赇赒赉赓赕赍赆赗赙贽赟黉凫赑赪趱陉陧邝邬邺跶蜷跄跸跖蹒郏郐郄郓郦跷趸跻踯跞踬蹰跹蹑躜躏轪轫轭轷轸轱轵轺轲轶轼辂辁辀轾辄辎辋辍辇辌辏辒毂莺蓦蓥辘辚辔轹轳迩逦酦酾酽钆钇钌钊钋钐狍钏钗钍钕钯钫钘钭钚钤钣钑钬钛钪铌铈钶钴钹铍钰钸钿饧饨饩饪饫饬饴饷饽余馄馇馊馍馐馑馓馔馕铊铉铋钷钺钲钼钽锎铏铒铪铳铚铨铢铫铦铑铷铟闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬铵铥铕铯铐铞锉镅锒铤铗铻镯锊锓铘锃锔锇铓铖锆锂铽锍锞锖锫锩铔锕锟锱铮锛锬锜锠锢铼镎锝锪钔锴锳锷钖锽锸锲锘骞锾锶锿镕镉镈镃镏铠铩锼镒镋镓镌镞镟镆镙驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟镠镝铿锵镗镘镛镖镂錾镚铧镤镪铙铴铹镦镡镫镢镨锏镄顼镮铎铛镱镬镔镲锧镴铄镳镥镧镵镩銮韪韫韬闬阇阘闿阓阛腼霁雳霭靓飑飒飓飕飙齑于鞒鞑鞯韨鞴顸颀龛颃颌颉颏颒颋颕颔颚颙颛颡颟颢颥颦颞飐飔飖飗饤饦饳饸饹饻馂饾肴馃馉馎馌飨餍鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳驲骃骎骍骔骙骕骦骉鲠髅髌髋鬓郁魉魇鱽鱾鲀鲂鱿鲄麸鲅鲆鲌鲉鲧鲏鲇鲐鲋鲊鲒鲘鲕鲖鲔鲛鲑鲓鲪鳀鲝鲩鲨鲬鲻鲯鲭鲞鲷酰鹾鲴鲱鲵鲲鲳鲮鲰鲶鲺鲹鲫鳊鳈鲗鳂鲽鳇鳅鲾鳄鳆鳁鳒鳑鳋鲥鳏鳎鳐鳍鲢鳌鳓鳘鲦鲣鳗龀龃龅龆龇龈龉龊龌黾鼋鼍鲈鲎鲚鲟鲡鲼鳛鳔鳉鳙鳕鳟鳝鳜鲙鳣鳡鳢鲿鳠鹘黩黪鼹齄鸤鸰鸮鸴鸻鸼鹀鹐鹓鹍鹒鹙鹖鸧鹟鹠鹡鹢鹝鹥鹔鹯鹲鹴黡鼌龁龂飚村钜㖞㧑㧟㱮䁖䇲䌶䌷䌸䌹䌺䍁䞍䴓䴔䴕䴖䴗䴘䴙伣俫刹厐叁呐垅姹弑悮戯捝揾梿棁榅煴疭瞆祃窎筼肮蔂蕰訚迳酂钅锺霡飏饣鲃鳚余硷耻囱恶珐厩扦瓮嚣扎伫谘藁腌腭沓蚝籼糇隽线莅讬䜣铇眦碜碱";
	return allUTF8SC;
} 

							//  ----- 以下是有关Cookie存取的程序  -----  //
function setCookie2(cookieName,cookieValue,days)
{	if (days)
	{	var date = new Date();
		date.setTime( date.getTime() + (days*24*60*60*1000) );
		var expires = "; expires=" + date.toGMTString();
	}
	else 
		var expires = "";
	document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
}

function getCookie2(cookieName)
{	var cookieValue = cookieName + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{	var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(cookieValue) == 0) 
			return c.substring(cookieValue.length,c.length);
	}
	return null;
}

	// Detect Client Browser Lang and return its value.
function detectClientBrowserLang()
{	var cookieValue = getCookie2("TSCvalue");
		// When page onload, no cookie value is set.
	if ( typeof(cookieValue) == 'undefined' ||  cookieValue == '' ||  cookieValue == null )
	{	var clientLang = "zh-cn";		// Set Default IE Lang to GB
		clientLang = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
		if ( clientLang == 'zh-hk' || clientLang == 'zh-tw' )
			cookieValue = "big5";
		else
			cookieValue = "gb";
	}
	setCookie2('TSCvalue',cookieValue,9999);		// Save Client Browser Lang to cookie.
	//alert("inside function detectClientLang()  \r\r cookieValue is set to : " + unescape(document.cookie) );		// For Test ONLY.
	return cookieValue;
}

	// 打开网页时, 自动判断用户端语言
var clientLang9 = detectClientBrowserLang();

	// Call this function at the end of your page. (eg: footer.html)
function convertWholePageAtEnd()
{	if ( convertWhenClientBrowserLang == "both" || convertWhenClientBrowserLang == clientLang9 ) {
    convertAll(clientLang9);
}
}