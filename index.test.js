const taskScheduler = require('./index');

describe("Calculator tests", ()=>{
    test("task [] and dependencies []",()=>{
        let taskList = [];
        let dependencies = [];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual([]);
    });

    test("task ['a','b'] and dependencies []",()=>{
        let taskList = ['a','b'];
        let dependencies = [];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['a','b']);
    });

    test("task ['a','b'] and dependencies [a=>b]",()=>{
        let taskList = ['a','b'];
        let dependencies = [
            {'a':'b'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['b','a']);
    });

    test("task ['a','b','c','d'] and dependencies [a=>b, c=>d]",()=>{
        let taskList = ['a','b','c','d'];
        let dependencies = [
            {'a':'b'},
            {'c':'d'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['b','a','d','c']);
    });

    test("task ['a','b','c'] and dependencies [a=>b, b=>c]",()=>{
        let taskList = ['a','b','c'];
        let dependencies = [
            {'a':'b'},
            {'b':'c'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['c','b','a']);
    });

    test("Should throw an error : task ['a','b','c','d'] and dependencies [a=>b, b=>c, c=>a]",()=>{
        let taskList = ['a','b','c','d'];
        let dependencies = [
            {'a':'b'},
            {'b':'c'},
            {'c':'a'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toThrow(Error);
    });
})