import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styles from './SecretClose.module.scss';
import {ipcRenderer} from 'electron';

export default function SecretClose(){
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState();

    useEffect(() => {
        setInput(null);
    }, [isOpen]);

    useEffect(() => {
        if(input === '5967'){
        }
    }, [input]);

    const onInput = (inp) => {
        if(inp === "ExitApp"){
            if(input === '5967'){
                console.log('CLOSE');
                ipcRenderer.emit('close-me');
            }
            setInput(null);
        } else if(inp === "Cancel") {
            setIsOpen(false);
        }
    }

    return <>
        <div className={styles.button} onClick={() => setIsOpen(true)} />
        {isOpen && <div className={styles.popup}>
            <div className={styles.wrapper}>
                <Keyboard 
                layout={{
                    'default': [
                        '1 2 3',
                        '4 5 6',
                        '7 8 9',
                        'Exit\sApp Cancel'
                    ]
                }} 
                onKeyPress={onInput}
                onChange={inp => setInput(inp)} />
            </div>
        </div>} 
    </>
}