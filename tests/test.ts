import {arrayToTree} from '../src';

test('parentKey is not object', () => {
    const data = [
        {id: 1, name: 'Node 1', parentId: null},
        {id: 2, name: 'Node 2', parentId: 1},
        {id: 3, name: 'Node 3', parentId: 1},
        {id: 4, name: 'Node 4', parentId: 2},
        {id: 5, name: 'Node 5', parentId: null},
    ];
    const tree = arrayToTree(data, {
        idKey: 'id',
        parentKey: 'parentId',
        childrenKey: 'children',
    });
    expect(tree.length).toBe(2)
})

test('parentKey is object or nul or undefined', () => {
    const data = [
        {id: 1, name: 'Node 1'},
        {id: 4, name: 'Node 4', parent: {id: 2}},
        {id: 2, name: 'Node 2', parent: {id: 1}},
        {id: 3, name: 'Node 3', parent: {id: 1}},
        {id: 5, name: 'Node 5', parent: null},
    ];
    const tree = arrayToTree(data, {
        idKey: 'id',
        parentKey: 'parent',
        childrenKey: 'children',
    });
    expect(tree.length).toBe(2)
})

test('find node by id', () => {
    const data = [
        {id: 1, name: 'Node 1', ordinal: 2},
        {id: 4, name: 'Node 4', parent: {id: 2}},
        {id: 2, name: 'Node 2', ordinal: 2, parent: {id: 1}},
        {id: 3, name: 'Node 3', ordinal: 1, parent: {id: 1}},
        {id: 5, name: 'Node 5', ordinal: 1, parent: null},
    ];
    const tree = arrayToTree(data, {
        idKey: 'id',
        parentKey: 'parent',
        childrenKey: 'children',
        sortKey: 'ordinal',
    });
    expect(tree.findNodeById(5).name).toBe('Node 5')
})

test('sort children', () => {
    const data = [
        {id: 1, name: 'Node 1', ordinal: 2},
        {id: 4, name: 'Node 4', ordinal: 1, parent: {id: 2}},
        {id: 2, name: 'Node 2', ordinal: 2, parent: {id: 1}},
        {id: 3, name: 'Node 3', ordinal: 1, parent: {id: 1}},
        {id: 5, name: 'Node 5', ordinal: 1, parent: null},
    ];
    const tree = arrayToTree(data, {
        idKey: 'id',
        parentKey: 'parent',
        childrenKey: 'children',
        sortKey: 'ordinal',
    });
    expect(tree.map(node => node.id)).toStrictEqual([5, 1])
    expect(tree.find(node => node.id === 1).children.map((node: any) => node.id)).toStrictEqual([3, 2])

})
