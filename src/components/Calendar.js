import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calendar = () => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div>
            <h1>Calendar</h1>
            <DayPicker 
            selected={selected}
            />
        </div>
    );
};

export default Calendar;