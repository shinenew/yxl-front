const BuildTree = (data) => {
    let start = new Date().getTime();
    let dataChildList = data.filter((item) => item.pId);
    let dataRootList = [];
    for (let i = 0; i < data.length; i++) {
        data[i].children = [];
        if (!data[i].pId) {
            //根节点
            dataRootList.push(data[i]);
        }
    }
    let tree = loopChildData(dataRootList, dataChildList);
    let end = new Date().getTime();
    //console.log((end - start) / 1000)
    return tree;
}
const loopChildData = (parent, children, insert = false) => {
    for (let i = 0; i < parent.length; i++) {
        for (let x = 0; x < children.length; x++) {
            if (parent[i].id === children[x].pId) {
                parent[i].children.push(children[x])
            }
        }
        if (parent[i].children.length > 0) {
            //如果父节点下有子节点，那么循环执行函数继续找这个子节点是否有下级节点
            loopChildData(parent[i].children, children, true);
        }
    }
    if (insert) {
        return
    } else {
        return parent;
    }
}
export { BuildTree }