import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Home = () => {
    // checked
    // const [isChecked, setIsChecked] = useState(false);

    // enter button submit 
    useEffect(() => {
        const keyDownHandler = event => {
            //   console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                event.preventDefault();

                // 👇️ call submit function here
                handleAdd(event.target.value);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    // fetching tasks 
    const { data, isLoading, refetch } = useQuery(['tasks'], () => fetch('https://rocky-mesa-15575.herokuapp.com/tasks')
        .then(res => res.json())
    )

    if (isLoading) {
        return;
    }

    // adding new task 
    const handleAdd = task => {
        if (task) {
            const newTask = { task };
            console.log(newTask);

            const url = 'https://rocky-mesa-15575.herokuapp.com/tasks';
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
        }

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
        <div className='md:mx-6'>
            <p className='text-3xl font-semibold my-4'>Task Master</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <div className='p-4 shadow-lg'>
                    <form onSubmit={handleAdd} className='flex flex-col'>
                        <label className="label mx-auto">
                            <span className="label-text text-2xl">New Task</span>
                        </label>
                        <input type="text" className="input input-bordered mb-[15px]" />
                        {/* <label className="label">
                        <span className="label-text">Write Review</span>
                    </label>
                    <textarea type="text" name='review' placeholder="Write Review Here" className="textarea textarea-bordered h-24 mb-4" /> */}
                        {/* <input type="submit" value="submit" className="btn w-full max-w-xs mx-auto"/> */}
                    </form>
                </div>
                <div className='shadow-lg p-4'>
                    {
                        data.map(task => <div
                        key={task._id}
                        className='bg-blue-300 my-2 text-left p-6 rounded-lg'
                        ><span className='flex' style={{ textDecoration: task?.checked ? "line-through" : "none" }}><input type="checkbox" checked={task?.checked} onClick={() => handleCheck(task._id)} className="checkbox mr-2" />{task.task} </span></div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;