import React, { useState } from 'react';

let todayDay = 0;

export default function DayButton({ setActualDay }: { setActualDay: (day: number) => void }) {
    const dayOfWeek = () => {
        let data = new Date();
        let dia = data.getDay();
        if (dia <= 1 || dia >= 6) {
            return [true, false, false, false, false];
        } else {
            let state = [];
            for (let i = 0; i < 5; i++) {
                if (i === dia - 1) {
                    todayDay = i;
                    state[i] = true;
                } else {
                    state[i] = false;
                }
            }
            return state;
        }
    };

    const [checked, setChecked] = useState<boolean[]>(dayOfWeek());
    const days = ["SEG", "TER", "QUA", "QUI", "SEX"];
    const style = {
        backgroundColor: '#FFFFFF',
        color: '#060153',
        border: "none",
        borderRadius: '40px',
        fontSize: '1.25rem',
        transition: 'ease-in 0.3s',
    };
    const styleSelected = {
        backgroundColor: '#060153',
        color: '#FFF',
        border: '3px solid #FFF',
        borderRadius: '45px',
        fontSize: '1.25rem',
        transition: 'ease-in 0.3s',
    };

    const setDay = (day: number) => {
        let data = [];
        for (let i = 0; i < 5; i++) {
            data[i] = i === day;
        }
        todayDay = day;
        setActualDay(day); // Call the prop function to update the day
        return data;
    };

    return (
        <div className="flex md:col-6 md:justify-content-between col-12 justify-content-around gap-2">
            {days.map((day, index) => (
                <button
                    key={index}
                    style={checked[index] ? styleSelected : style}
                    className="h-3rem md:w-5rem w-full font-semibold text-center flex align-items-center justify-content-center"
                    onClick={() => setChecked(setDay(index))}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}

export { todayDay };
