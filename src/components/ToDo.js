import React, { useState } from 'react';
import { useQuery } from 'react-query';

const ToDo = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isTask, setTask] = useState('');
    const [ids, setIds] = useState('');
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

    const handleEditBtn = (id, task) => {
        console.log(id, task);
        setTask(task);
        setIds(id);
        setIsEdit(true);
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const task = event.target.name.value;
        const updatedTask = { task }
        const url = `http://localhost:5000/tasks/${ids}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
        console.log(event.target.name.value);
        setIsEdit(false);
    }

    return (
        <div className='mx-4 md:mx-auto w-12/12 md:w-6/12'>
            <h1 className='mt-4 text-2xl font-semibold'>All Task</h1>
            {
                data.map(task => <div
                    key={task._id}
                    className='bg-gradient-to-r from-primary to-secondary my-2 text-left p-6 rounded-lg flex justify-between'
                >
                    <span
                        className='flex'
                        style={{ textDecoration: task?.checked ? "line-through" : "none" }}
                    >
                        <input
                            type="checkbox" checked={task?.checked}
                            onClick={() => handleCheck(task._id)}
                            className="checkbox mr-2" />{task.task} </span>
                    {
                        !task.checked ?
                            <label htmlFor="my-modal"  className="btn btn-xs" onClick={() => handleEditBtn(task._id, task.task)}>edit</label>
                            :
                            ''
                    }
                </div>)
            }

            {/* modal  */}
            <input type="checkbox" id="my-modal"  className="modal-toggle" />
            <label htmlFor="my-modal"  className="modal cursor-pointer">
                <label  className="modal-box relative" htmlFor="">
                <form onSubmit={handleUpdate} className='flex flex-col'>
                        <label className="label mx-auto">
                            <span className="label-text text-2xl">Edit Task</span>
                        </label>
                        <input type="text" name='name' className="input input-bordered mb-[15px]" defaultValue={isTask} />
                        <input type="submit" value="update" className='btn' />
                    </form>
                </label>
            </label>


            {/* <input type="checkbox" id="my-modal"  className="modal-toggle" />
            <div  className="modal">
                <div  className="modal-box">
                    <form onSubmit={handleUpdate} className='flex flex-col'>
                        <label className="label mx-auto">
                            <span className="label-text text-2xl">Edit Task</span>
                        </label>
                        <input type="text" name='name' className="input input-bordered mb-[15px]" defaultValue={isTask} />

                        <div  className="modal-action">
                            <input type="submit" value="update" className='btn' />
                            <label htmlFor="my-modal"  className="btn">Yay!</label>
                        </div>
                    </form>
                </div>
            </div> */}
        </div>
    );
};

export default ToDo;