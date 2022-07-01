import React from 'react';
import { useQuery } from 'react-query';

const ToDo = () => {
    const { data, isLoading, refetch } = useQuery(['tasks'], () => fetch('https://rocky-mesa-15575.herokuapp.com/tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }

    const handleCheck = _id => {
        fetch(`https://rocky-mesa-15575.herokuapp.com/tasks/${_id}`, {
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
        <div className='mx-4 md:mx-auto w-12/12 md:w-6/12'>
            <h1 className='mt-4 text-2xl font-semibold'>All Task</h1>
            {
                data.map(task => <div
                    key={task._id}
                    className='bg-blue-300 my-2 text-left p-6 rounded-lg'
                ><span className='flex' style={{ textDecoration: task?.checked ? "line-through" : "none" }}><input type="checkbox" checked={task?.checked} onClick={() => handleCheck(task._id)} className="checkbox mr-2" />{task.task} </span></div>)
            }
        </div>
    );
};

export default ToDo;