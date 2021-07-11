import React, {useState} from 'react';
import {Paper, Typography, CssBaseline, Collapse} from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles';
import InputCard from './InputCard'

const useStyle = makeStyles((theme)=>
(
    {    
        root: {
            width: '300px',
            marginTop: theme.spacing(1),
        },
        addCard: {
            padding: theme.spacing(1, 1, 1, 2),
            margin: theme.spacing(0, 1, 1, 1),
            background: '#EBECF0',
            '&:hover': {
              backgroundColor: fade('#000', 0.25),
            },
        },
    }
)
);


export default function InputContainer() {
    const classes = useStyle();
    const [open, setOpen] = useState();
    return (<div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} onClick={()=>{setOpen(!open)}} elevation={0}>
                    + Add a Card
                </Paper>
            </Collapse>
        </div>);
}