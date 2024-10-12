export default function listToTree(list, key = '_id', maxDepth = 6) {
  let trees = {};
  let roots = {};
  let depths = {};

  for (const item of list) {
    if (!depths[item[key]]) {
      depths[item[key]] = 0;
    }


    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    if (item.parent?.[key]) {
      const parentExists = list.some(parentItem => parentItem[key] === item.parent[key]);

      if (parentExists) {
        if (!trees[item.parent[key]]) {
          trees[item.parent[key]] = { children: [] };
        }
        if (depths[item.parent[key]] < maxDepth - 1) {
          trees[item.parent[key]].children.push(trees[item[key]]);
          depths[item[key]] = depths[item.parent[key]] + 1;
          if (roots[item[key]]) {
            delete roots[item[key]];
          }
        }
      }
    }
  }
  return Object.values(roots);
}
