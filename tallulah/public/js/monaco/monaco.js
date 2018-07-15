var issocket = false;
var users = {};
var contentWidgets = {};
var decorations = {};
var fileid = 0;
var iswrite = false;
var isking = false;
var editor;
var socket;

function insertCSS(id, color) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML += '.' + id + ' { background-color:' + color + ';}\n';
    style.innerHTML += `
    .${id}one {
        background: ${color};
        width:2px !important; 
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);
}
function removeAllWidget(){
    var widgets = Object.values(contentWidgets);
    for(var w in widgets){
        editor.removeContentWidget(w);
    }
    contentWidgets = {};

}
function changeFile() {
    var fid = $(this).attr("file_ident");
    console.log("fid: ");
    console.log(fid);
    $.ajax({
        method: "POST",
        url: "file/getFile",
        data: {
            fident: fid
        },
        success: function (data) {
            console.log(data);
            if (data.success == true) {
                socket.disconnect();
                issocket = true;
                editor.setValue(data.data.file_content);
                socket = io.connect('/room' + fid,{query : {name:(username !== 'none' ? username : 'anonymous')}});
                //데이터 초기화
                users = {};
                decorations = [];
                contentWidgets = [];
                
                socketListener(socket);
                fileid = fid;
            }
        }
    })
}

function insertWidget(e) {
    contentWidgets[e.name] = {
        domNode: null,
        position: {
            lineNumber: 0,
            column: 0
        },
        getId: function () {
            return 'content.' + e.name;
        },
        getDomNode: function () {
            if (!this.domNode) {
                this.domNode = document.createElement('div');
                this.domNode.innerHTML = e.name;
                this.domNode.style.background = e.color;
                this.domNode.style.color = 'black';
                this.domNode.style.opacity = 0.8;
                this.domNode.style.width = 'max-content';
            }
            return this.domNode;
        },
        getPosition: function () {
            return {
                position: this.position,
                preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE, monaco.editor.ContentWidgetPositionPreference.BELOW]
            };
        }
    };
}


function changeWidgetPosition(e) {
    contentWidgets[e.user].position.lineNumber = e.selection.endLineNumber;
    contentWidgets[e.user].position.column = e.selection.endColumn;

    editor.removeContentWidget(contentWidgets[e.user]);
    editor.addContentWidget(contentWidgets[e.user]);
}

function changeSeleciton(e) {
    var selectionArray = [];
    if (e.selection.startColumn == e.selection.endColumn && e.selection.startLineNumber == e.selection.endLineNumber) {
        e.selection.endColumn++;
        selectionArray.push({
            range: e.selection,
            options: {
                className: `${e.ename}one`,
                hoverMessage: {
                    value: e.user
                }
            }
        });

    } else {
        selectionArray.push({
            range: e.selection,
            options: {
                className: e.ename,
                hoverMessage: {
                    value: e.user
                }
            }
        });
    }
    for (let data of e.secondarySelections) {
        if (data.startColumn == data.endColumn && data.startLineNumber == data.endLineNumber) {
            selectionArray.push({
                range: data,
                options: {
                    className: `${e.ename}one`,
                    hoverMessage: {
                        value: e.user
                    }
                }
            });
        } else
            selectionArray.push({
                range: data,
                options: {
                    className: e.ename,
                    hoverMessage: {
                        value: e.user
                    }
                }
            });
    }
    decorations[e.user] = editor.deltaDecorations(decorations[e.user], selectionArray);
}

function changeText(e) {
    editor.getModel().applyEdits(e.changes);

}


function fileSave(){
    if (fileid != 0)
    $.ajax({
        method: "POST",
        url: "file/updateContent",
        data: {
            ident : fileid,
            content : editor.getValue()
        },
        success: function (data) {
            alert(data.message);
        }
    })  
    else
    alert("메인 파일은 저장할 수 없습니다.");
}

function socketListener(socket){
    socket.on('connected', function (data) {
        users[data.name] = data.color;
        console.log('connect', data);

        insertCSS(data.ename, data.color);
        insertWidget(data);
        decorations[data.name] = [];
        if (isking === true) {
            console.log('senddata');
            iswrite = true;
            socket.emit("filedata", editor.getValue());
        }
    });
    socket.on('userdata', function (data) {
        if (data.length == 1)
            isking = true;
        for (var i of data) {
            users[i.name] = i.color;
            insertCSS(i.ename, i.color);
            insertWidget(i);
            decorations[i.name] = [];
        }
    });
    socket.on('resetdata', function (data) {

        editor.setValue(data);
        iswrite = true;
    });
    socket.on('youking', function (data) {
        console.log('file' + fileid + '\'s king');
        isking = true;
        iswrite = true;
    });
    socket.on('selection', function (data) {
        // data = data.match(/\[(\d{1,10}),(\d{1,10}) -> (\d{1,10}),(\d{1,10})\]/);
        // editor.setSelection(new monaco.Range(parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4])));
        //   console.log(data);
        console.log('select '+data.user);
        changeSeleciton(data);
        changeWidgetPosition(data);
    });
    socket.on('exit', function (data) {
        editor.removeContentWidget(contentWidgets[data]);
        editor.deltaDecorations(decorations[data], []);
        delete decorations[data];
        delete contentWidgets[data];


    });
    
    socket.on('key', function (data) {
        console.log('key ' + data.user);
        issocket = true;
        console.log(data);
        changeText(data);
    });

}
require.config({ paths: { 'vs': 'js/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], function () {
    var jsCode = `<!DOCTYPE HTML>
    <!-- 
        Comments are overrated
    -->
    <html>
    <head>
        <title>HTML Sample</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style type="text/css">
            h1 {
                color: #CCA3A3;
            }
        </style>
        <script type="text/javascript">
            window.alert("I am a sample...");
        </script>
    </head>
    <body>
        <h1>Heading No.1</h1>
        <input disabled type="button" value="Click me" />
    </body>
    </html>`;

    socket = io.connect('/main', {query : {name:(username !== 'none' ? username : 'anonymous')}});
    editor = monaco.editor.create(document.getElementById("monacoeditor"), {
        value: jsCode,
        language: "html",
        fontSize: 15,
        fontFamily: "Nanum Gothic Coding",
        theme: "vs-dark",
    });
    socketListener(socket);


    editor.onDidChangeModelContent(function (e) {

        if (issocket == false) {
            //      console.log(e);
            if (iswrite)
                socket.emit('key', e);

        } else
            issocket = false;

    });
    $(window).resize(
        function () {
            editor.layout();
        }
    );
    /*editor.onDidChangeCursorPosition(function (e) {
        console.log(e);
        socket.emit('keydata', e);
        //    console.log(e.position.toString());
    });*/
    editor.onDidChangeCursorSelection(function (e) {
        console.log(iswrite);
        // console.log(e);
        if (iswrite)
            socket.emit('selection', e);
    });
  
    // socket.on('disconnect', function (data) {
    //     location.reload();
    // });

    //저장 키 바인딩
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        fileSave();
    });

});
