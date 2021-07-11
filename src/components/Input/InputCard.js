import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const useStyle = makeStyles((theme)=>
(
    {    
        card: {
            width: '280px',
            margin: theme.spacing(0, 1, 1, 1),
            paddingBottom: theme.spacing(4),
        },
        input: {
            marginTop: theme.spacing(1,1,1,1)
        },
        btnConfirm: {
            background: '#5AAC44',
            color: '#fff',
            '&:hover': {
              background: fade('#5AAC44', 0.5),
            },
            marginLeft: theme.spacing(1)
        },
        btnClear: {
            background: '#F21004'
        }
    }
)
);


export default function InputCard({setOpen}) {
    const classes = useStyle();
    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase multiline fullWidth className={classes.input} onBlur={()=>{setOpen(false)}}/>
                </Paper>
            </div>
            <div>
                <Button className={classes.btnConfirm}>Add Card</Button>
                <IconButton onClick={()=>{setOpen(false)}}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}