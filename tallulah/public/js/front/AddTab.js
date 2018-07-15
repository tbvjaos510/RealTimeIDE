function Tab(selector) {
    this.id = 0;
    this.selector = selector;

    this._makeArea();

    this.tabTable = {};
}

Tab.prototype.add = function(title, selector, removable = true) {
    console.log("add");
    var tabId = this._makeId();

    console.log(title + ", " + selector);
    this.tabTable[tabId] = {title: title, selector: selector};

    //타이틀 바에 탭 추가
    this._addTitle(title, removable, tabId);

    //컨텐트 영역 추가
    var content = $(selector);
    this.contentArea.append(content);

    //추가된 탭을 선택
    this.selectTab(tabId);
}

Tab.prototype.selectTab = function(tabId) {
    this.layer.find(".tab_title_item").removeClass("selected");

    var tab = this.tabTable[tabId];

    this.layer.find("#tab_" + tabId).addClass("selected");

    this.contentArea.children().hide();
    this.contentArea.find(tab.selector).show();
}

Tab.prototype.remove = function(tabId)
{
    var tab = this.tabTable[tabId];

    var flag = false;
    var removingTab = this.titleArea.find("#tab_" + tabId);
    if (removingTab.hasClass("selected"))
    {
        flag = true;
    }

    removingTab.remove();
    
    delete this.tabTable[tabId];

    if (flag)
    {
        if (this.titleArea.find("ul").children().length == 0)
        {
            this.contentArea.empty();
        }
        else
        {
            var first;
            for (var i in this.tabTable)
            {
                first = i;
    
                break;
            }
            if (first)
            {  
                this.selectTab(first);
            }
        }

    }
};

Tab.prototype._makeId = function() {
    return this.id++;
}

Tab.prototype._addTitle = function(title, removable, tabId)
{
    var li = $("<li />");
    li.addClass("tab_title_item");
    li.prop("id", "tab_" + tabId);
    
    var titleArea = $("<span />")
    titleArea.html(title);
    li.append(titleArea);

    var this1 = this;
    titleArea.on("click", function(event) {
        var id = $(event.target).parent().prop("id");
        var tabId = id.substring("tab_".length);

        this1.selectTab(tabId);
    });

    if (removable)
    {
        var closeBtn = $("<span> X</span>")
        li.append(closeBtn);

        closeBtn.on("click", function(event) {
            var id = $(event.target).parent().prop("id");
            var tabId = id.substring("tab_".length);
    
            this1.remove(tabId);
        });
    }

    this.titleArea.find("ul").append(li);
};

Tab.prototype._makeArea = function() {
    this.layer = $(this.selector);

    this.titleArea = $("<div />");
    this.titleArea.addClass("tab_title_area");
    this.titleArea.append($("<ul />"));

    this.contentArea = $("<div />");
    this.contentArea.addClass("tab_content_area");
    this.contentArea.css("height", (this.layer.height() - 30) + "px");
    this.layer.append(this.titleArea);
    this.layer.parent().children().find("#content_layer").append(this.contentArea);
}