/*
    The function takes task and task depencencies as input and iterate over the task items.
    As as an output, it returns the task items in order of their execution.

    Input:      tasks : Array
                taskDependencies : Array
    
    Output:     Tasks in their execution order : Array 
*/
const taskScheduler = function (tasks, taskDependencies) {
    let scheduledTasks = tasks.map(task => {
        return scheduleDependency(task, taskDependencies);
    });
    return [...new Set(scheduledTasks.flat())];
}

/*
    Checks and stores the task dependency in taskOrder until there is no more dependency found. 
    The final taskOrder is returned in reverse order. 
    If any task is already present in taskOrder, it becomes cyclic depenency and the program terminates.

    Input:      task : string
                dependencies : Array
                taskOrder : Array
    
    Output:     taskOrder|cyclic dependency : Array|String 
*/
const scheduleDependency = function (task, dependencies, tasksOrder = []) {
    let dependencyArr = dependencies.filter(dep => dep[task] !== undefined);

    if (tasksOrder.indexOf(task) > -1) {
        tasksOrder = [];
        return "This is a cyclic dependency";
    };
    tasksOrder.push(task);
    if (dependencyArr && dependencyArr.length) {
        return scheduleDependency(dependencyArr[0][task], dependencies, tasksOrder);
    }
    return tasksOrder.reverse();
}

module.exports = taskScheduler;
