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
    const { data, isLoading, refetch } = useQuery(['tasks'], () => fetch('http://localhost:5000/tasks')
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

            const url = 'http://localhost:5000/tasks';
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
            <p>This is the home</p>

            <form onSubmit={handleAdd} className='flex flex-col'>
                <label className="label">
                    <span className="label-text">Giv Rating out of 5</span>
                </label>
                <input type="text" className="input input-bordered w-5/12 mb-[15px]" />
                {/* <label className="label">
                        <span className="label-text">Write Review</span>
                    </label>
                    <textarea type="text" name='review' placeholder="Write Review Here" className="textarea textarea-bordered h-24 mb-4" /> */}
                {/* <input type="submit" value="submit" className="btn w-full max-w-xs mx-auto"/> */}
            </form>

            {
                data.map(task => <p style={{textDecoration: task?.checked ? "line-through" : "none" }}>{task.task} <input type="checkbox" checked={task?.checked} onClick={()=>handleCheck(task._id)} class="checkbox" /></p>)
            }
        </div>
    );
};

export default Home;