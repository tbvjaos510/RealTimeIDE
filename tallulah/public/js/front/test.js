$(function() {
    $.contextMenu({
        selector: '.context-menu-one', 
        callback: function(key) {
            var value = prompt();
            var _this = $(this);
            var li = $("<li />");
            if(value!=null && value != ''){
                var className = _this.attr('class');
            }

        },
        items: {
            "Directory": {name: "Directory"},
            "File": {name: "File"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function(){
                return 'context-menu-icon context-menu-icon-quit';
            }}
        }
    });

    $('.context-menu-one').on('click', function(e){
        console.log('clicked', this);
    })    
});