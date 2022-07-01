import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calendar = () => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div className=' mx-auto'>
            <h1 className='mt-4 text-2xl font-semibold'>Calendar</h1>
            <DayPicker 
            className='bg-gradient-to-r from-primary to-secondary inline-block my-6 p-4 rounded-lg'
            selected={selected}
            />
        </div>
    );
};

export default Calendar;