import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styles from './SecretClose.module.scss';
import {ipcRenderer} from 'electron';

export default function SecretClose(){
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        setInput('');
    }, [isOpen]);

    const onInput = (inp) => {
        if(inp === "{exit}"){
            if(input === '56623'){
                ipcRenderer.send('close-me');
            }
            setInput('');
        } else if(inp === "Cancel") {
            setIsOpen(false);
        } else {
            setInput(input+inp);
        }
    }

    return <>
        <div className={styles.button} onClick={() => setIsOpen(true)} />
        {isOpen && <div className={styles.popup}>
            <div className={styles.wrapper}>
                <div className={styles.display}>{input.split('').map(() => '*')}</div>
                <Keyboard 
                    display={{'{exit}': 'Exit App'}}
                    layout={{
                        'default': [
                            '1 2 3',
                            '4 5 6',
                            '7 8 9',
                            'Cancel {exit}'
                        ]
                    }} 
                    onKeyPress={onInput}
                />
            </div>
        </div>} 
    </>
}