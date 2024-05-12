type TreeNodes = any[] & { findNodeById: (id: any) => any }

export function arrayToTree(
    nodes: any[],
    option: {
        idKey: string
        parentKey: string
        childrenKey: string
        sortKey?: string
    },
): TreeNodes {
    const {idKey, parentKey, childrenKey, sortKey} = option
    const roots: any = []

    if (sortKey) {
        nodes.sort((a: any, b: any) => a[sortKey] - b[sortKey])
    }


    for (const node of nodes) {

        let parentId = node[parentKey];

        if (parentId && typeof parentId === 'object') {
            parentId = parentId[idKey]
        }

        if (!parentId) {
            roots.push(node)
        } else {
            const parent = nodes.find((item) => item[idKey] === parentId)
            if (parent) {
                if (parent[childrenKey] === undefined) {
                    parent[childrenKey] = []
                }
                parent[childrenKey].push(node)
            }
        }
    }

    function findNodeById(id: any, nodes?: any[]): any {
        if (nodes) {
            for (const node of nodes) {
                if (node[idKey] === id) {
                    return node
                }
                const foundNode = findNodeById(id, node[childrenKey])
                if (foundNode) {
                    return foundNode
                }
            }
        }
        return null
    }

    // Add the findNodeById method to the result
    roots.findNodeById = (id: any) => findNodeById(id, roots)

    return roots
}

