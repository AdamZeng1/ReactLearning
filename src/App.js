import React, {useState} from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import {v4 as uuid} from 'uuid';
import InputContainer from './components/Input/InputContainer'
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme)=>
(
{    
    root : {
        width: '300px',
        display: 'flex'   
    }
}
)
);

export default function App() {
    const classes = useStyle();
    const [data, setData] = useState(store);
    const addMoreCard = (title, listId) => {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title
        };

        const list = data.lists[listId];
        list.cards = [...list.cards, newCard];
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list
            }
        }
        setData(newState);
    };

    const addMoreList = (title) => {
        const newListId = uuid();
        const newList = {
            id: newListId,
            title,
            cards:[]
        }
        const newState = {
            listIds:[
                ...data.listIds,
                newListId
            ],
            lists: {
                ...data.lists,
                [newListId]:newList
            }
        }
        setData(newState);
        console.log(title);
    };

    const updateListTitle = (title, listId) => {
        const list = data.lists[listId];
        list.title = title;
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list
            }
        }
        setData(newState);
    }

    return (
        <StoreApi.Provider value={{addMoreCard, addMoreList, updateListTitle}}>
            <div className={classes.root}>
                {
                    data.listIds.map((listId, index) => {
                        const list = data.lists[listId];
                        return (
                            <List key={listId} list={list} index={index} />
                        )
                    })
                }
                <InputContainer type="list"/>
            </div>
        </StoreApi.Provider>
    )
}