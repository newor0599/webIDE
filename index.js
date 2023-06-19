const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const output = document.getElementById("output");
const createDoc = document.getElementById("newDoc")


var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}
/*
if (localStorage.html_code != undefined){
    html.value = localStorage.html_code;
}

if (localStorage.css_code != undefined){
    css.value = localStorage.css_code;
}

if (localStorage.js_code != undefined){
    js.value = localStorage.js_code;
}
*/


load()
run();

function getRemainingLocalStorageSpace() {
    var totalSpace = 5 * 1024 * 1024;
    var usedSpace = 0;
  
    for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        usedSpace += localStorage[key].length + key.length;
      }
    }
  
    var remainingSpace = totalSpace - usedSpace;
    remainingSpace = (remainingSpace/1024/1024).toFixed(3);
    return remainingSpace;
}

html.onkeyup = () => run();
css.onkeyup = () => run();
js.onkeyup = () => run();

function jsAutoComplete(){
    //Javascript auto-complete
    js.addEventListener('keyup', function(e) {
        if (e.key == "("){
            at = e.target.selectionStart;
            const currentValue = js.value;
            const updatedValue = currentValue.slice(0, at) + ")" + currentValue.slice(at);
            js.value = updatedValue;
            js.setSelectionRange(at,at);
        }
        if(e.key == '"'){
            at = e.target.selectionStart;
            const currentValue = js.value;
            const updatedValue = currentValue.slice(0, at) + '"' + currentValue.slice(at);
            js.value = updatedValue;
            js.setSelectionRange(at,at);
        }
        if(e.key == "'"){
            at = e.target.selectionStart;
            const currentValue = js.value;
            const updatedValue = currentValue.slice(0, at) + "'" + currentValue.slice(at);
            js.value = updatedValue;
            js.setSelectionRange(at,at);
        }
        if(e.key == '['){
            at = e.target.selectionStart;
            const currentValue = js.value;
            const updatedValue = currentValue.slice(0, at) + ']' + currentValue.slice(at);
            js.value = updatedValue;
            js.setSelectionRange(at,at);
        }
        if(e.key == '{'){
            at = e.target.selectionStart;
            const currentValue = js.value;
            const updatedValue = currentValue.slice(0, at) + '}' + currentValue.slice(at);
            js.value = updatedValue;
            js.setSelectionRange(at,at);
        }
    });
}

function cssAutoComplete(){
    //Css auto-complete
    css.addEventListener('keyup',function(e){
        if (e.key=="{"){
            at = e.target.selectionStart;
            const currentValue = css.value;
            const updatedValue = currentValue.slice(0, at) + '}' + currentValue.slice(at);
            css.value = updatedValue;
            css.setSelectionRange(at,at);
        }
        if (e.key=="("){
            at = e.target.selectionStart;
            const currentValue = css.value;
            const updatedValue = currentValue.slice(0, at) + ')' + currentValue.slice(at);
            css.value = updatedValue;
            css.setSelectionRange(at,at);
        }
    })
}

function htmlAutoComplete(){
    //html auto-complete
    html.addEventListener('keyup',function(e){
        at = e.target.selectionStart;
        if (e.key == ">"){
            scan = at-1
            open = ''
            while (html.value[scan] != "<"){
                open += html.value[scan];
                scan--;
                if (html.value[scan] == undefined){
                    open = ''
                    break
                }
                if (html.value[scan] == ">"){
                    open= ''
                    break
                }
            }
            open += "<"
            if (open.indexOf(" ") == -1){
                open = reverseString(open);
                close = open.slice(0,1) + "/" + open.slice(1);
            }else{
                //clearing id,class,placeholder and stuff
                scan = 0
                close = ''
                open = reverseString(open)
                while (open[scan]!=" "){
                    scan++
                    close += open[scan];
                }
                close = close.slice(0,close.length-1)
                close += ">";
                close = close.slice(0,0) + "<" + close.slice(0,close.length);
            }
            const currentValue = html.value;
            const updatedValue = currentValue.slice(0, at) + close + currentValue.slice(at);
            html.value = updatedValue;
            html.setSelectionRange(at,at);
        }
        if(e.key == '"'){
            const currentValue = html.value;
                const updatedValue = currentValue.slice(0, at) + '"' + currentValue.slice(at);
                html.value = updatedValue;
                html.setSelectionRange(at,at);
        }

    })
}

function runAutocompletes(){
    htmlAutoComplete();
    cssAutoComplete();
    jsAutoComplete();
}



setInterval(runAutocompletes(),0)



function reverseString(string){
    let splitString = string.split("");
    let reversedArray = splitString.reverse();
    let joinArray = reversedArray.join("");
    return joinArray;
}

function run(){
    output.contentDocument.body.innerHTML = html.value + "<style>"  + css.value + "</style>";
    output.contentWindow.eval(js.value);
    console.log("saving progress...")
    store();
};

function store(){
    myArray = {}
    docs = [] myArray.name = "doc"
    myArray.html = html.value
    myArray.css = css.value
    myArray.js = js.value
    docs.push(myArray)
    localStorage.setItem('docs', JSON.stringify(docs))
}
function load(){
    var docs = [];
    for (i = 0;i<=docs.length;i++){
        tempButton = document.createElement("button")
        tempButton.id = i
        tempButton.innerHTML = `doc ${i+1}`
        document.getElementById("buttons").appendChild(tempButton)
    }
    if (localStorage.getItem("docs") != undefined){
        docs = JSON.parse(localStorage.getItem("docs"))
        console.log(docs)
        html.value = docs[0].html
        css.value = docs[0].css
        js.value = docs[0].js
    }else{
        localStorage.setItem("docs",JSON.stringify(docs))
        html.value = ""
        css.value = ""
        js.value = ""
    }
}

createDoc.onclick = function(){
    tempNewDoc = {}
    tempNewDoc.name = `doc${docs.length}`
    tempNewDoc.html = ""
    tempNewDoc.css = ""
    tempNewDoc.js = ""
    docs.push(tempNewDoc)
    document.getElementById("buttons").innerHTML = '<button id="newDoc">New document</button>'
    for (i = 0;i<=docs.length;i++){
        tempButton = document.createElement("button")
        tempButton.id = i
        tempButton.innerHTML = `doc ${i+1}`
        document.getElementById("buttons").appendChild(tempButton)
    }
}
