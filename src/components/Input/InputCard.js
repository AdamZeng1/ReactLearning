import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme)=>
(
    {    
        card: {
            width: '280px',
            margin: theme.spacing(0, 1, 1, 1),
            paddingBottom: theme.spacing(4),
        },
        input: {
            margin: theme.spacing(1,1,1,1)
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


export default function InputCard({setOpen, listId}) {
    const classes = useStyle();
    const {addMoreCard} = useContext(storeApi);
    const [cardTitle, setCardTitle] = useState('');
    const handleOnChange = (e) => {
        setCardTitle(e.target.value);
    };
    const handleBtnConfirm = () => {
        addMoreCard(cardTitle, listId);
        setOpen(false);
    }
    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase 
                    onChange={handleOnChange}
                    multiline 
                    fullWidth 
                    onBlur={()=>{setOpen(false)}}
                    value={cardTitle}
                    placeholder="Enter a title"
                    inputProps={{
                        className: classes.input
                    }} 
                    />
                </Paper>
            </div>
            <div>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>Add Card</Button>
                <IconButton onClick={()=>{setOpen(false)}}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}