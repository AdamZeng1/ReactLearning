import React, {useState} from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import {v4 as uuid} from 'uuid';
import InputContainer from './components/Input/InputContainer'
import {makeStyles} from "@material-ui/core/styles";
import { DragDropContext } from 'react-beautiful-dnd';

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

    const onDragEnd = (result) => {
        console.log(result);
        const {draggableId, source, destination} = result;
        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId &&
            destination.index === source.index) {
                return;
        }
        if(destination.droppableId === source.droppableId &&
            destination.index != source.index) {
                const list = data.lists[destination.droppableId];
                const cards = Array.from(list.cards);
                const removed = cards.splice(source.index, 1);
                cards.splice(destination.index, 0, ...removed);
                const newState = {
                    ...data,
                    lists: {
                        ...data.lists,
                        [destination.droppableId]: 
                            {
                                ...list,
                                cards
                            }
                    }
                }
            setData(newState);
            return;
        }

        if(destination.droppableId != source.droppableId) {
            const destinationList = data.lists[destination.droppableId];
            const sourceList = data.lists[source.droppableId];

            const destCards = Array.from(destinationList.cards);
            const sourceCards = Array.from(sourceList.cards);
            
            const card = sourceCards.splice(source.index, 1);
            destCards.splice(destination.index, 0, ...card);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [source.droppableId]:{
                        ...sourceList,
                        cards: sourceCards
                    },
                    [destination.droppableId]:{
                        ...destinationList,
                        cards: destCards
                    }
                }
            }
            setData(newState);
            return;
        }
    }

    return (
        <StoreApi.Provider value={{addMoreCard, addMoreList, updateListTitle}}>
        <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>

                {
                    data.listIds.map((listId, index) => {
                        const list = data.lists[listId];
                        return (
                            <List key={listId} list={list} index={index} />
                        )
                    })
                }
                <InputContainer type="list"/>
        </DragDropContext>
        </div>

        </StoreApi.Provider>
    )
}