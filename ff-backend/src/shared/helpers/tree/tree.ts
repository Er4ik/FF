class ItemNode {
  data;
  children = [];

  constructor(data) {
    this.data = data;
    this.children = [];
  }

  add(node) {
    this.children.push(node);
  }

  remove(node) {
    this.children = this.children.filter((child) => child !== node);
  }
}

export function buildTree(data) {
  const nodes = {};
  data.forEach((item) => {
    nodes[item.id] = new ItemNode(item);
  });

  data.forEach((item) => {
    if (item.parentId && item.parentId?.id) {
      nodes[item.parentId.id].add(nodes[item.id]);
    }
  });

  return Object.values(nodes).filter((node: any) => !node.data.parentId?.id);
}
