const taskScheduler = require('./index');

describe("Task Scheduler Tests", ()=>{
    test("task [] and dependencies [] >>>> []",()=>{
        let taskList = [];
        let dependencies = [];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual([]);
    });

    test("task ['a','b'] and dependencies [] >>>> ['a','b']",()=>{
        let taskList = ['a','b'];
        let dependencies = [];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['a','b']);
    });

    test("task ['a','b'] and dependencies [a=>b] >>>> ['b','a']",()=>{
        let taskList = ['a','b'];
        let dependencies = [
            {'a':'b'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['b','a']);
    });

    test("task ['a','b','c','d'] and dependencies [a=>b, c=>d] >>>> ['b','a','d','c']",()=>{
        let taskList = ['a','b','c','d'];
        let dependencies = [
            {'a':'b'},
            {'c':'d'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['b','a','d','c']);
    });

    test("task ['a','b','c'] and dependencies [a=>b, b=>c] >>>> ['c','b','a']",()=>{
        let taskList = ['a','b','c'];
        let dependencies = [
            {'a':'b'},
            {'b':'c'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect(result).toStrictEqual(['c','b','a']);
    });

    test("task ['a','b','c','d'] and dependencies [a=>b, b=>c, c=>a] >>>> Cyclic Dependency",()=>{
        let taskList = ['a','b','c','d'];
        let dependencies = [
            {'a':'b'},
            {'b':'c'},
            {'c':'a'}
        ];
        var result = taskScheduler(taskList, dependencies)
        expect("This is a cyclic dependency");
    });
})