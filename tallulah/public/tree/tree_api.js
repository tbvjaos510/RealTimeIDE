

$(function() {
    $('#jstree').jstree({
        'core': {     
            'data': [{
                "id": "1.0",
                "text": "Fresh Products",
                "icon": "",
                "state": {
                    "opened": false,
                    "disabled": false,
                    "selected": false
                },
                "children": [{
                    "id": "2.010.0",
                    "text": "Seafood",
                    "icon": "",
                    "state": {
                        "opened": false,
                        "disabled": false,
                        "selected": false
                    },
                    "children": false,
                    "liAttributes": null,
                    "aAttributes": null
                }],
                "liAttributes": null,
                "aAttributes": null
            }]
        },
    });
});
