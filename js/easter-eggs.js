let today = new Date()
const month = today.getMonth()
const day = today.getDate()

function whatsfestival(){
    if ((month==11 && day>=24) || (month==0 && day<=6)){return "Christmas"}
    if (month==3 && day==1){return "Aprilfool"}
    if ((month==3 && day==4) || (month==5 && day==5)|| (month==11 && day==13)){return "SadDay"}
}

function Christmas(){
    let snowEffectInterval = jQuery.fn.snow({
        // min size of element (default: 20)
        minSize: 10,

        // max size of element (default: 50)
        maxSize: 50,

        // flake fall time multiplier (default: 20)
        fallTimeMultiplier: 20,

        // flake fall time difference (default: 10000)
        fallTimeDifference: 10000,

        // interval (miliseconds) between new element spawns (default: 500)
        spawnInterval: 500,

        // jQuery element to apply snow effect on (should work on any block element) (default: body)
        target: $("body"),

        //elements to use in generating snow effect
        elements: [

            // Element #1
            {
                // html element to be spawned for this element
                html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#E6E6FA'
            },

            // Element #2
            {
                // html element to be spawned for this element
                html: '<i class="fa fa-bell-o" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#ed9b40'
            },

            // Element #3
            {
                // html element to be spawned for this element
                html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#E6E6FA'
            },

            // Element #4
            {
                // html element to be spawned for this element
                html: '<i class="fa fa-music" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#cc2037'
            },

            // Element #5
            {
                // html element to be spawned for this element
                html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#E6E6FA'
            },

            {
                // html element to be spawned for this element
                html: '<i class="fa fa-gift" aria-hidden="true"></i>',
                // hex color for this element - works only for font based icons
                color: '#FF6A6A'
            },
        ]
    });
}

function Aprilfool(){
    self.location = '404.html'
    alert("今日网站不开门。何不关注下COVID-19疫情呢？")
    //self.location = "http://bmfw.www.gov.cn/yqfxdjcx/risk.html"
}

switch(whatsfestival()){
    case "Christmas":
        console.log("Christmas")
        Christmas()
        break
    case "Aprilfool":
        console.log("Aprilfool")
        Aprilfool()
        break
    case "SadDay":
        Sad()
        break
    default:
        console.log(`${month+1}月${day}日`)
}
//遇到特殊纪念悼念日时全站变黑白
function Sad(){
    $("html").css("-webkit-filter", "grayscale(100%)")
}