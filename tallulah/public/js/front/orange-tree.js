function orangeTree(query) {
  $(query).html("<ul class='tree'></ul>");
  this.root = $(query).find(".tree");
  this.folderIcon = "<i class=\"fa fa-folder\"></i>";
  this.fileIcon = "<i class=\"fa fa-file\"></i>";
  this.folderOpenIcon = "<i class=\"fa fa-folder-open\"></i>";
  this.loadingIcon = "<i class=\"fa fa-circle-o-notch fa-spin\"></i>";
  this.data = [];
  this.id = 0;
}

orangeTree.prototype.addBranch = function (obj) {
  //icon variables
  var folder_closed = this.folderIcon;
  var folder_open = this.folderOpenIcon;
  var loading_icon = this.loadingIcon;

  this.id++;

  var id = this.id;
  //FOLDER
  var folder = obj.folder || false; //default folder
  //TITLE
  var title = obj.title || id; //default title
  title += "";
  //PATH
  var path = obj.path || "";
  if (path === "") {
    path = id;
  } else {
    path = path + "/" + id;
  }
  //ICON
  var icon = this.fileIcon;
  if (folder === true) {
    icon = this.folderIcon;
  }
  icon = obj.icon || icon;
  //OPEN
  var open = obj.open || false;
  var display = "block";
  if (open === false) {
    display = "none";
  }

  if (open === true && folder === true) {
    icon = folder_open;
  }

  var to_push = {
    id: id,
    folder: folder,
    title: title,
    path: path,
    icon: icon,
    open: open
  };
  var base = "<li data-id=\"" + id + "\" class=\"tree-file\">" + "<span class=\"tree-icon\" data-open=\"" + open + "\">" + icon + "</span><span class=\"tree-title\">" + title + "</span></li>";
  if (folder === true) {
    base = "<li data-id=\"" + id + "\" class=\"tree-folder\">" + "<span class=\"tree-icon\" data-open=\"" + open + "\">" + icon + "</span><span class=\"tree-title\">" + title + "</span><ul style=\"display:" + display + "\"></ul></li>";
  }

  path += "";
  //if it is just in the root
  if (path === ("" + id)) {
    //add to root
    this.root.append(base);
  } else {
    var final_node = path.split("/").reverse()[1];
    this.root.find("[data-id=\"" + final_node + "\"] > ul").append(base);
  }

  //CLICK
  var click = function () {}; //onclick default
  if (obj.click) {
    if (folder === true) {
      click = function () {
        obj.click();
        $(this).parent().find("> ul").slideToggle();

        if ($(this).parent().find("> .tree-icon").attr("data-open") === "true") {
          $(this).parent().find("> .tree-icon").html(folder_closed);
          $(this).parent().find("> .tree-icon").attr("data-open", "false");
        } else {
          $(this).parent().find("> .tree-icon").html(folder_open);
          $(this).parent().find("> .tree-icon").attr("data-open", "true");
        }
      };
    } else {
      click = obj.click;
    }
  } else {
    if (folder === true) {
      click = function () {
        $(this).parent().find("> ul").slideToggle();
        if (!$(this).parent().attr("project_ident")) {
          if ($(this).parent().find("> .tree-icon").attr("data-open") === "true") {
            $(this).parent().find("> .tree-icon").html(folder_closed);
            $(this).parent().find("> .tree-icon").attr("data-open", "false");
          } else {
            $(this).parent().find("> .tree-icon").html(folder_open);
            $(this).parent().find("> .tree-icon").attr("data-open", "true");
          }
        }
      };
    }
  }

  to_push.elem = this.root.find("[data-id=\"" + id + "\"]");
  to_push.click = click;
  this.data.push(to_push);

  if (folder === true) {
    this.root.find("[data-id=\"" + id + "\"] > span").click(click);
  } else {
    this.root.find("[data-id=\"" + id + "\"]").click(click);
  }
  return to_push;
};

orangeTree.prototype.removeBranch = function (id) {
  this.root.find("[data-id=\"" + id + "\"]").remove();
}

orangeTree.prototype.openBranch = function (id) {
  this.root.find("[data-id=\"" + id + "\"] > ul").slideDown();
  this.root.find("[data-id=\"" + id + "\"]").find("> span > .tree-icon").html(this.folderOpenIcon);
}

orangeTree.prototype.closeBranch = function (id) {
  this.root.find("[data-id=\"" + id + "\"] > ul").slideUp();
  this.root.find("[data-id=\"" + id + "\"]").find("> span > .tree-icon").html(this.folderIcon);
}

orangeTree.prototype.toggleBranch = function (id) {
  this.root.find("[data-id=\"" + id + "\"] > ul").slideToggle();
  if (this.root.find("[data-id=\"" + id + "\"] > .tree-icon").html() === this.folderOpenIcon) {
    this.root.find("[data-id=\"" + id + "\"] > .tree-icon").html(this.folderIcon);
  } else {
    this.root.find("[data-id=\"" + id + "\"] > .tree-icon").html(this.folderOpenIcon);
  }
}

orangeTree.prototype.isOpen = function (id) {
  return !(this.root.find("[data-id=\"" + id + "\"] > ul").css("display") === "none");
}

orangeTree.prototype.getByTitle = function (title) {
  var ret = [];
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].title === title) {
      ret.push(this.data[i]);
    }
  }
  return ret;
}

orangeTree.prototype.rename = function (id, title) {
  this.root.find("[data-id=\"" + id + "\"]").find(".tree-title").html(title);
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].id === id) {
      this.data[i].title = title;
      return this.data[i];
    }
  }
}
