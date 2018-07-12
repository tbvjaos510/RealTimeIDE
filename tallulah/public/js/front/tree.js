var tree = new orangeTree("#container");

tree.addBranch({
  folder: true,
  title: "folder1"
});
tree.addBranch({
  path: "1"
});
tree.addBranch({
  path: "1",
  folder: true
});
tree.addBranch({
  path: "1/3"
});
