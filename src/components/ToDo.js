import React from 'react';
import { useQuery } from 'react-query';

const ToDo = () => {
    const { data, isLoading, refetch } = useQuery(['tasks'], () => fetch('http://localhost:5000/tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }

    const handleCheck = _id => {
        fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'PATCH',
            // headers: {
            //     'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            // },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }
    return (
        <div>
            <h1>here will be the todo list</h1>
            {
                data.map(task => <p style={{textDecoration: task?.checked ? "line-through" : "none" }}>{task.task} <input type="checkbox" checked={task?.checked} onClick={()=>handleCheck(task._id)} class="checkbox" /></p>)
            }
        </div>
    );
};

export default ToDo;