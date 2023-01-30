import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Home = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isTask, setTask] = useState('');
    const [ids, setIds] = useState('');
    // adding new task 
    const handleAdd = tasks => {
        const task = tasks.target.value;
        if (task) {
            const newTask = { task };
            console.log(newTask);

            const url = 'https://task-manager-server-sw6c.onrender.com/tasks';
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
                .then(res => res.json())
                .then(result => {
                    refetch();
                    console.log(result);
                })
                tasks.target.value = "";
        }

    }
    const handleEditBtn = (id, task) => {
        // console.log(id, task);
        setTask(task);
        setIds(id);
        setIsEdit(true);
    }
    //handle update form
    const handleUpdate = (event) => {
        event.preventDefault();
        const task = event.target.name.value;
        const updatedTask = { task }
        const url = `https://task-manager-server-sw6c.onrender.com/tasks/${ids}`;
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



    // enter button submit 
    useEffect(() => {
        const keyDownHandler = event => {
            //   console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                event.preventDefault();
                handleAdd(event)
                // handleAdd(event)
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    // fetching tasks 
    const { data, isLoading, refetch } = useQuery(['tasks'], () => fetch('https://task-manager-server-sw6c.onrender.com/tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }



    const handleCheck = _id => {
        fetch(`https://task-manager-server-sw6c.onrender.com/tasks/${_id}`, {
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
        <div className='md:mx-6'>
            <p className='text-3xl font-semibold my-4'>Task Master</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <div className='p-4 shadow-lg'>
                    {
                        <form onSubmit={handleAdd} className='flex flex-col'>
                            <label className="label mx-auto">
                                <span className="label-text text-2xl">New Task</span>
                            </label>
                            <input type="text" placeholder='Press enter to add a new task' className="input input-bordered bg-[#F7F5F2] mb-[15px]" />

                        </form>
                    }
                    
                </div>
                <div className='shadow-lg p-4'>
                    <p className=' text-left'>Recently added</p>
                    {
                        data.slice(-5)
                        .reverse()
                        .map(task => <div
                            key={task._id}
                            className='bg-gradient-to-r from-primary to-secondary my-2 text-left p-6 rounded-lg flex justify-between'
                        ><span
                            className='flex'
                            style={{ textDecoration: task?.checked ? "line-through" : "none" }}>
                                <input type="checkbox" checked={task?.checked}
                                    onClick={() => handleCheck(task._id)} className="checkbox mr-2" />{task.task}
                            </span>
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
                </div>
            </div>
        </div>
    );
};

export default Home;