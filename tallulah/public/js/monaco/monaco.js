var decorations = [];
var issocket = false;
var users = {};
var contentWidgets = {};
var decorations = {};

function insertCSS(id, color) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML += '.' + id + ' { background-color:' + color + '; }\n';
    style.innerHTML += `
    .${id}one {
        background: ${color};
        width:2px !important;
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);
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
                this.domNode.style.opacity = 0.7;
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
require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/vs'
    }
});

window.MonacoEnvironment = {
    getWorkerUrl: function(workerId, label) {
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min'
        };
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/vs/base/worker/workerMain.js');`
      )}`;
    }
  };

require(['vs/editor/editor.main'], function () {
    var jsCode = [
        'function hello() {',
        '   alert(\'Hello world!\');',
        '}'
    ].join('\n');


    var editor = monaco.editor.create(document.getElementById("monacoeditor"), {
        value: jsCode,
        language: "javascript",
        fontSize: 15,
        fontFamily:"Nanum Gothic Coding",
        theme: "vs",
    });
    var socket = io('/main');
    socket.on('connected', function(data){
        users[data.name] = data.color;
        insertCSS(data.name, data.color);
        insertWidget(data);
        decorations[data.name] = [];
    });
    socket.on('userdata', function(data){
    
        for(var i of data){
            users[i.name] = i.color;
            insertCSS(i.name, i.color);
            insertWidget(i);
            decorations[i.name] = [];
        }
    });

    function changeSeleciton(e) {
        var selectionArray = [];
        if (e.selection.startColumn == e.selection.endColumn && e.selection.startLineNumber == e.selection.endLineNumber) {
            e.selection.endColumn++;
            selectionArray.push({
                range: e.selection,
                options: {
                    className: `${e.user}one`,
                    hoverMessage: {
                        value: e.user
                    }
                }
            });

        } else {
            selectionArray.push({
                range: e.selection,
                options: {
                    className: e.user,
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
                        className: `${e.user}one`,
                        hoverMessage: {
                            value: e.user
                        }
                    }
                });
            } else
                selectionArray.push({
                    range: data,
                    options: {
                        className: e.user,
                        hoverMessage: {
                            value: e.user
                        }
                    }
                });
        }
        //    console.log(selectionArray);
        decorations[e.user] = editor.deltaDecorations(decorations[e.user], selectionArray);
    }
    function changeWidgetPosition(e) {
        contentWidgets[e.user].position.lineNumber = e.selection.endLineNumber;
        contentWidgets[e.user].position.column = e.selection.endColumn;

        editor.removeContentWidget(contentWidgets[e.user]);
        editor.addContentWidget(contentWidgets[e.user]);
    }

    function changeText(e) {
        editor.getModel().applyEdits(e.changes);

    }
    
    editor.onDidChangeModelContent(function (e) {
        if (issocket == false) {
      //      console.log(e);
            socket.emit('key', e);

        } else
            issocket = false;

    });
    $(window).resize(
        function (){
            editor.layout();
        }
    );
    /*editor.onDidChangeCursorPosition(function (e) {
        console.log(e);
        socket.emit('keydata', e);
        //    console.log(e.position.toString());
    });*/
    editor.onDidChangeCursorSelection(function (e) {
       // console.log(e);
        socket.emit('selection', e);
    });
    socket.on('selection', function (data) {
        // data = data.match(/\[(\d{1,10}),(\d{1,10}) -> (\d{1,10}),(\d{1,10})\]/);
        // editor.setSelection(new monaco.Range(parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4])));
        //   console.log(data);
        changeSeleciton(data);
        changeWidgetPosition(data);
    });
    socket.on('exit', function (data) {
        editor.removeContentWidget(contentWidgets[data]);
        editor.deltaDecorations(decorations[data], []);
        delete decorations[data];
        delete contentWidgets[data];
        

    });
    socket.on('disconnect', function (data) {
        location.reload();
    });


    socket.on('key', function (data) {
        issocket = true;
    //    console.log(data);
        changeText(data);
    });


});

