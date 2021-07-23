import React, {useState, useEffect} from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import {v4 as uuid} from 'uuid';
import InputContainer from './components/Input/InputContainer'
import {makeStyles} from "@material-ui/core/styles";
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

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

    useEffect(()=> {
        async function fetchBoard() {
            const request = await axios.get("http://localhost:3000/boards/1");
            setData(request.data);
        }
        fetchBoard();
    }, []);


    const addMoreCard = (title, listId) => {

        async function createCard() {
            try {
                const request = await axios.post("http://localhost:3000/cards", {title: title, description: "", listId: listId});
                const newCard = {
                    id: request.data.id.toString(),
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
            } catch(error) {
                console.log("error", error);
            }
        }
        createCard();

    };

    const addMoreList = (title) => {
        async function createList() {
            try {
                const request = await axios.post("http://localhost:3000/lists", {name: title, boardId: 1});
                const newList = {
                    id: request.data.id.toString(),
                    title,
                    cards:[]
                }
                const newState = {
                    listIds:[
                        ...data.listIds,
                        request.data.id.toString()
                    ],
                    lists: {
                        ...data.lists,
                        [request.data.id.toString()]:newList
                    }
                }
                setData(newState);
            } catch(error) {
                console.log("error", error);
            }
        }
        createList();
    };

    const updateListTitle = (title, listId) => {
        async function updateList() {
            try {
                const request = await axios.put(`http://localhost:3000/lists/${listId}`, {name: title, boardId: 1});
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
            } catch(error) {
                console.log("error", error);
            }
        }
        updateList();
    }

    const updateCardTitle = (title, cardId, listId) => {
        async function updateCard() {
            try {
                const list = data.lists[listId];
                const cards = Array.from(list.cards);
                let description = "";
                for (const element of cards) {
                    if(element.id === cardId) {
                        element.title = title;
                        description = element.description;
                    }
                }
                list.cards = cards;
                const newState = {
                    ...data,
                    lists: {
                        ...data.lists,
                        [listId]: list
                    }
                }
                const request = await axios.put(`http://localhost:3000/cards/${cardId}`, {title: title, description: description, listId: listId});
                setData(newState);
            } catch(error) {
                console.log("error", error);
            }
        }
        updateCard();
    }

    const updateCardDescription = (description, cardId, listId) => {
        async function updateCard() {
            try {
                const list = data.lists[listId];
                const cards = Array.from(list.cards);
                let title;
                for (const element of cards) {
                    if(element.id === cardId) {
                        element.description = description;
                        title = element.title;
                    }
                }
                list.cards = cards;
                const newState = {
                    ...data,
                    lists: {
                        ...data.lists,
                        [listId]: list
                    }
                }
                const request = await axios.put(`http://localhost:3000/cards/${cardId}`, {title: title, description: description, listId: listId});
                setData(newState);
            } catch(error) {
                console.log("error", error);
            }
        }
        updateCard();
    }

    const removeCard = (cardId, listId) => {
      
        async function removeCard() {
            try {
                const list = data.lists[listId];
                const cards = Array.from(list.cards);
                for(let i = 0; i < cards.length; i++){ 
                    if (cards[i].id === cardId) { 
                        cards.splice(i, 1); 
                    }
                }
                list.cards = cards;
                const newState = {
                    ...data,
                    lists: {
                        ...data.lists,
                        [listId]: list
                    }
                }
                const request = await axios.delete(`http://localhost:3000/cards/${cardId}`);
                setData(newState);
            } catch(error) {
                console.log("error", error);
            }
        }
        removeCard();
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
            async function updateCard() {
                try {
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
                    const request = await axios.put(`http://localhost:3000/cards/${card[0].id}`, {title: card[0].title, description: card[0].description, listId: destinationList.id});
                    setData(newState);
                } catch(error) {
                    console.log("error", error);
                }
            }
            updateCard();
            return;
        }
    }

    return (
        <StoreApi.Provider value={{addMoreCard, addMoreList, updateListTitle, updateCardTitle, updateCardDescription, removeCard}}>
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