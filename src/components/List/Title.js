import React, {useState, useContext} from 'react';
import {Paper, Typography, CssBaseline} from '@material-ui/core'
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import storeApi from '../../utils/storeApi';


const useStyle = makeStyles((theme)=>
(
    {    
        editableTitleContainer : {
            margin: theme.spacing(1),
            display:  "flex",
        },
        editableTitle : {
            flexGrow: "1",
            fontSize: "1.2rem",
            fontWeight: "bold"
        },
        input: {
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: theme.spacing(1),
            "&:focus": {
                background : "#ddd"
            }
        }
    }
)
);

export default function Title({title, listId}) {
    const [open, setOpen] = useState();
    const [newTitle, setNewTitle] = useState(title);
    const classes = useStyle();
    const {updateListTitle} = useContext(storeApi);
    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleOnBlur = (e) => {
        setOpen(!open);
        updateListTitle(newTitle, listId);
    };
    return (
        <div>
            {open ? 
                (            
                <div>
                    <InputBase 
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        autoFocus="true"
                        value={newTitle}
                        inputProps={{
                            className: classes.input
                        }}
                        fullWidth
                    />
                </div>
                )
                :
                (
                <div className={classes.editableTitleContainer}>
                    <Typography onClick={()=>setOpen(!open)} className={classes.editableTitle}>
                        {title}
                    </Typography>
                    <MoreHorizIcon />
                </div>
                )
            }

        </div>
    )
}