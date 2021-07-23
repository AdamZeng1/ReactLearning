import React, {useState} from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

import CardDialog from '../modal/CardDialog'

const useStyle = makeStyles((theme)=>
(
    {    
        card : {
            padding: theme.spacing(1, 1, 1, 2),
            margin: theme.spacing(1)
        },

        clearIcon: {
            display: 'flex'
        },

        button: {
            background: '#5AAC44',
            color: '#fff',
            '&:hover': {
            },
            marginLeft: theme.spacing(1),
            display: 'flex'
        },

        container: {
            margin: theme.spacing(1),
            display:  "flex",
        },

        title: {
            flexGrow: "100"
        }

    }
)
);

export default function Card({card, index, listId}) {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided)=>{
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Paper className={classes.card} onClick={handleOpen} >{card.title}</Paper>
                        <CardDialog openStatus={open} handleClose={handleClose} card={card} listId={listId}/>
                    </div>
                    
                )
            }}

        </Draggable>

    )
}