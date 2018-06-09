

$.fn.makeMenu = function(menuOptions, callback) {
	var menu = new Menu(menuOptions, callback, this);
};


function Menu(menuOptions, callback, parentLayer)
{
	this.menuOptions = menuOptions;
	this.callback = callback;
	this.parentLayer = parentLayer;
	
	this.layer = $("<div />");
	this.layer.addClass("menu");
	
	this.topMenuLayer = $("<ul />");
	this.topMenuLayer.addClass("top_menu");
	
	this.layer.append(this.topMenuLayer);
	
	this.parentLayer.append(this.layer);
	
	this.make();
}


Menu.prototype.make = function()
{
	for (var i in this.menuOptions)
	{
		this.makeTopMenu(this.menuOptions[i]);
	}
};
	
Menu.prototype.makeTopMenu = function(menuNode)
{
	//console.log(menuNode);
	
	var li = $("<li />");
	li.addClass("top_node");
	li.html(menuNode.name);
	
	this.topMenuLayer.append(li);
	
	var this1 = this;
	li.on("click", function() {
		if (this1.callback)
		{
			this1.callback(menuNode.id);
		}
	});

	var subDiv = $("<div />");
	subDiv.addClass("sub_menu");
	
	subDiv.append("<ul />");
	
	li.append(subDiv);
	
	if (menuNode.subMenu)
	{
		for (var i in menuNode.subMenu)
		{
			this.makeSubMenu(subDiv, menuNode.subMenu[i]);
		}
	}
	
	
	var this1 = this;
	li.on("mouseover", function() {
		subDiv.show();
	});
	li.on("mouseout", function() {
		subDiv.hide();
	});
};

Menu.prototype.makeSubMenu = function(layer, menuNode)
{
	var li = $("<li />");
	li.addClass("sub_menu_node");
	li.html(menuNode.name);
	
	layer.find("ul").append(li);

	var this1 = this;
	li.on("click", function(event) {
		if (this1.callback)
		{
			this1.callback(menuNode.id);

			event.stopPropagation();
		}
	});
}

