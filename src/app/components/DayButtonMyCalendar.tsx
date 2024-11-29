import React, { useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { hook } from '../minhaagenda/page';

let todayDay = 0;
export default function DayButton() {
    const dayOfWeek = () => {
        let data = new Date();
        let dia = data.getDay();
        if (dia <= 1 || dia >= 6) {
            return [true, false, false, false, false]
        }
        else {
            let state = []
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
    }
    const [checked, setChecked] = useState<boolean[]>(dayOfWeek());
    const days = ["SEG", "TER", "QUA", "QUI", "SEX"]
    const style = {
        backgroundColor: '#FFFFFF',
        color: '#060153',
        borderColor: '',
        border: "none",
        borderRadius: '40px',
        fontSize: '1.25rem',
        transition: 'ease-in 0.3s',
    }
    const styleSelected = {
        backgroundColor: '#060153',
        color: '#FFF',
        borderColor: '#060153',
        border: '3px solid #FFF',
        borderRadius: '45px',
        fontSize: '1.25rem',
        transition: 'ease-in 0.3s',
    }
    const setDay = (day: number) => {
        let data = []
        for (let i = 0; i < 5; i++) {
            if (i === day) {
                todayDay = i;
                data[i] = true;
            } else {
                data[i] = false;
            }
        }
        hook(day);
        return data;
    }
    return (
        <>
            <div className="flex md:col-6 md:justify-content-between md:gap=0 col-12 justify-content-around gap-2" >
            {
                days.map((day, indice) =>
                (<button
                    key={indice}
                    style={checked[indice] ? styleSelected : style}
                    className={"h-3rem md:w-5rem w-full font-semibold text-center flex align-items-center justify-content-center"}
                    onClick={() => {setChecked(setDay(indice))}}
                >
                    {day}
                </button>))
            }
            </div>
        </>
    );
}

export { todayDay };