const taskScheduler = function(tasks, depTasks){
    let scheduledTasks = tasks.map(task=>{
        return checkDependency(task, depTasks);
    });
    return [...new Set(scheduledTasks.flat())];
}

const checkDependency = function(task, dependencies, temp=[]){
    let arr = dependencies.filter(dep => dep[task] !== undefined);

    if(temp.indexOf(task) > -1){
        temp = [];
        throw new Error("This is a cyclic dependency");
    };
    temp.push(task);
    if(arr && arr.length){
        return checkDependency(arr[0][task], dependencies, temp);
    }
    return temp.reverse();
}

module.exports = taskScheduler;
