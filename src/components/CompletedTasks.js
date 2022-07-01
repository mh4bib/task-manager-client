import React from 'react';
import { useQuery } from 'react-query';

const CompletedTasks = () => {
    const { data, isLoading } = useQuery(['tasks'], () => fetch('http://localhost:5000/checked-tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }
    return (
        <div>
            <h1>Completed Tasks</h1>
            {
                data.map(task => <p>{task.task} <input type="checkbox" checked={task?.checked} class="checkbox" /></p>)
            }
        </div>
    );
};

export default CompletedTasks;