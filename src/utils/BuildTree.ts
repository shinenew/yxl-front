const loopChildData = (parent, children, insert = false) => {
    for (let i = 0; i < parent.length; i++) {
        for (let x = 0; x < children.length; x++) {
            if (parent[i].id === children[x].pId) {
                if (!parent[i].children) {
                    parent[i].children=[];
                }
                parent[i].children.push(children[x]);
            }
        }
        if (parent[i].children&&parent[i].children.length > 0) {
            //如果父节点下有子节点，那么循环执行函数继续找这个子节点是否有下级节点
            loopChildData(parent[i].children, children, true);
        }
    }
    if (insert) {
        return null;
    } else {
        return parent;
    }
};
const BuildTree = (data) => {
    let dataChildList = data.filter((item) => item.pId);
    let dataRootList = [];
    for (let i = 0; i < data.length; i++) {
        //data[i].children = [];
        if (!data[i].pId) {
            //根节点
            dataRootList.push(data[i]);
        }
    }
    let tree = loopChildData(dataRootList, dataChildList);
    return tree;
};

export default BuildTree;