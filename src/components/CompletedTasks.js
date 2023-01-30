import React from 'react';
import { useQuery } from 'react-query';

const CompletedTasks = () => {
    const { data, isLoading } = useQuery(['tasks'], () => fetch('https://task-manager-server-sw6c.onrender.com/checked-tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }
    return (
        <div className='mx-4 md:mx-auto w-12/12 md:w-6/12'>
            <h1 className='mt-4 text-2xl font-semibold'>Completed Task</h1>
            {
                data.map(task => <div
                    key={task._id}
                    className='bg-gradient-to-r from-primary to-secondary my-2 text-left p-6 rounded-lg'
                ><span className='flex' style={{ textDecoration: task?.checked ? "line-through" : "none" }}><input type="checkbox" checked={task?.checked} className="checkbox mr-2" />{task.task} </span></div>)
            }
        </div>
    );
};

export default CompletedTasks;