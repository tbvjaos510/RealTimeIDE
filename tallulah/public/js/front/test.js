$(function() {
    $.contextMenu({
        selector: '.context-menu-one', 
        callback: function(key, options) {
            var _this = $(this);
            var li = $("<li />");
            if(key=="Directory"){
                var val = prompt();
                var ul = $("<ul />");
                var li = $("<li />");
                li.html(val);
                var _this = $(this).attr('id');
                var name = "#" + _this;
                $(this).append(ul);
                $(this).children().append(li);
            } else if(key == "File"){
                var val = prompt();
                var li = $("<li />");
                li.html(val);
                $(li).css('padding-left', '25px');
                var _this = $(this).attr('id');
                var name = "#" + _this;
                $(this).append(li);
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