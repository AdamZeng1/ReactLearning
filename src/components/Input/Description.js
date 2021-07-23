import React, {useState, useContext} from 'react';
import {Paper, Typography, CssBaseline} from '@material-ui/core'
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import storeApi from '../../utils/storeApi';
import ReactMarkdown from 'react-markdown';

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
        },
        input: {
            fontSize: "1.2rem",
            margin: theme.spacing(1),
            "&:focus": {
                background : "#ddd"
            },
            width: "500px",
            minHeight: "300px"
        },
        inputArea: {
            width: "500px",
            minHeight: "300px",
            background : "#ddd"
        },
        markdown:{
            width: "500px",
            minHeight: "300px",
            background : "#ddd"
        }
    }
)
);

export default function Description({description, cardId, listId, type}) {
    const [open, setOpen] = useState();
    const [newDescription, setNewDescription] = useState(description);
    const classes = useStyle();
    const {updateCardDescription} = useContext(storeApi);
    const handleOnChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleOnBlur = (e) => {
        setOpen(!open);
        updateCardDescription(newDescription, cardId, listId);
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
                        value={newDescription}
                        inputProps={{
                            className: classes.input
                        }}
                        placeholder="Enter a description"
                        multiline 
                    />
                </div>
                )
                :
                (
                <div className={classes.editableTitleContainer}>
                    <div onClick={()=>setOpen(!open)}>
                        {
                            description? 
                            (<ReactMarkdown className={classes.markdown}>{newDescription}</ReactMarkdown>)
                        :
                            (<div className={classes.inputArea}></div>)
                        }
                    </div>
                </div>
                )
            }

        </div>
    )
}