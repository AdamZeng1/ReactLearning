import React, {useState, useContext} from 'react';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { Paper, MenuItem, FormControl, InputLabel, Input, Chip, Select, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import Title from '../List/Title';
import Description from '../Input/Description';
import storeApi from '../../utils/storeApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

const useStyle = makeStyles((theme)=>
(
    {    
        card : {
            padding: theme.spacing(1, 1, 1, 2),
            margin: theme.spacing(1)
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
            height:"1000px"
        },

        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },

        dialogPaper: {
            height: '1000px',
            width: '800px',
            backgroundColor: '#EBECF0',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        btnConfirm: {
            background: '#F70041',
            color: '#fff',
            '&:hover': {
              background: fade('#F70041', 0.5),
            },
            marginLeft: theme.spacing(1),
            width: "20px"
        },
    }
)
);

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export default function CardDialog ({openStatus, handleClose, card, listId}) {
    const classes = useStyle();
    const [personName, setPersonName] = useState([]);
    const theme = useTheme();
    const {removeCard} = useContext(storeApi);

    const onClose = () => {
        handleClose(false);
    }

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleDelete = () => {
        removeCard(card.id, listId);
    }
    
    return (
        <Dialog open={openStatus} onClose={onClose} classes={{paper: classes.dialogPaper}}>
        <div className={classes.container}>
            <Title title={card.title} cardId={card.id} listId={listId} type="card" className={classes.title}/>
            <IconButton onClick={handleClose} className={classes.clearIcon}>
                <ClearIcon />
            </IconButton>
        </div>
        <FormControl className={classes.formControl}>
            <InputLabel>Members</InputLabel>
            <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Typography  variant="h8" component="h2">
            Description
        </Typography>
        <Description description={card.description} cardId={card.id} listId={listId} type="card"/>
        <Button className={classes.btnConfirm} onClick={handleDelete}>Delete</Button>
        </Dialog>
    )

}