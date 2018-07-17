function Popup(selector){
    this.selector = selector;
    var this1 = this;

    $(".popup #btn_close").on("click", function(){
        $("input[type='text']").val("");
        $("input[type='email']").val("");
        $("input[type='password']").val("");
        this1.close();
    }); 

    $("input[type='button']").on("click", function(){
        $("input[type='text']").val("");
        $("input[type='email']").val("");
        $("input[type='password']").val("");
        this1.close();
    })
    $(document).keydown(function(e) {
        if (e.keyCode == 27) { // esc = 27
            $("input[type='text']").val("");
            $("input[type='email']").val("");
            $("input[type='password']").val("");
            this1.close();
        }
    });
}


Popup.prototype.open = function(){
    var width = $(this.selector).width();
    var height = $(this.selector).height();
    $(".popup").show();
    $(".popup .content").append($(this.selector));
    $(this.selector).show();

    

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    width = $(".popup").width();
    height = $(".popup").height();

    if(width < 100)
        width=100;

    $(".popup").css("left", (windowWidth/2 - width/2));
    $(".popup").css("top", (windowHeight/2 - height/2));

    this._disableBackground();
}

function openLoginPopup(){
    popup = new Popup("#popup_login");
    popup.open();
    console.log("hello");
}   

function openSignPopup(){
    popup = new Popup("#popup_register");
    popup.open();
}

function projectListPopup(rooms){
    popup = new Popup("#projectlist_popup");
    $("#projectlist_popup>li").remove();
    for(var rm of rooms){
        var li = $("<li />");
        li.html(rm.project_name);
        $("#projectlist_popup").append(li);
    }
   
    popup.open();
}

function openProjectPopup(){
    popup = new Popup("#popup_project");
    popup.open();
}

function openDirectoryPopup(){
    popup = new Popup("#popup_directory");
    popup.open();
}

function openSearchPopup() {
    popup = new Popup("#popup_search");
    popup.open();
}

Popup.prototype.close = function(){
    this.cover.hide();
    $(this.selector).hide();
    $(".popup").hide();
}

Popup.prototype._disableBackground = function(){
    if (!this.cover)
	{
		this.cover = $("<div />");
		this.cover.width("100%");
		this.cover.height("100%");
		this.cover.css("background-color", "#000");
		this.cover.css("opacity", 0.5);
		
		this.cover.css("position", "fixed");
		this.cover.css("left", 0);
		this.cover.css("top", 0);
		this.cover.css("z-index", 90);
		
		$("body").append(this.cover);
    }
    this.cover.show();
}