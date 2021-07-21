import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import storeApi from '../../utils/storeApi';
import { ContactSupportOutlined } from '@material-ui/icons';

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


export default function InputCard({setOpen, listId, type}) {
    const classes = useStyle();
    const {addMoreCard, addMoreList} = useContext(storeApi);
    const [title, setTitle] = useState('');
    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };
    const handleBtnConfirm = () => {
        if(type === "list") {
            addMoreList(title, listId);
        } else {
            addMoreCard(title, listId);
        }
        setTitle('');
        setOpen(false);
    }
    const handleBlur = () => {
        setOpen(false);
        setTitle('');
    }
    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase 
                    onChange={handleOnChange}
                    multiline 
                    fullWidth 
                    onBlur={()=>{setOpen(false);}}
                    value={title}
                    placeholder="Enter a title"
                    inputProps={{
                        className: classes.input
                    }} 
                    />
                </Paper>
            </div>
            <div>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>{type==="list"?"Add List":"Add Card"}</Button>
                <IconButton onClick={()=>{setOpen(false)}}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}