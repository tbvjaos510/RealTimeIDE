
function Popup(selector, title)
{
	this.selector = selector;
	this.title = title;
	
	var this1 = this;
	$(".popup .buttons .btn_close").on("click", function() {
		this1.close();
	});
}

Popup.prototype.open = function() 
{
	console.log($(this.selector));
	
	var width = $(this.selector).width();
	var height = $(this.selector).height();
	
	$(".popup").show();
	$(".popup .title").html(this.title);
	
	//$(".popup .content").empty();
	$(".popup .content").append($(this.selector));
	$(this.selector).show();
	
	$(".popup").width(width + 20);
	$(".popup").height(height + 30);
	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	width = $(".popup").width();
	height = $(".popup").width();

	if (width < 100)
	{
		width = 100;
	}
	
	$(".popup").css("left", (windowWidth / 2 - width / 2));
	$(".popup").css("top", (windowHeight / 2 - height / 2));
	
	this._disableBackground();
};

Popup.prototype.close = function() 
{
	this.cover.hide();
	$(this.selector).hide();
	$(".popup").hide();
};

Popup.prototype._disableBackground = function() 
{
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
};

