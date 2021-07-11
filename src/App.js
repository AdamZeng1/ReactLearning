import React, {useState} from 'react';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import {v4 as uuid} from 'uuid';
import data from './utils/store';

export default function App() {
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

    return (
        <StoreApi.Provider value={{addMoreCard}} >
            <div>
                {
                    data.listIds.map((listId) => {
                        const list = data.lists[listId];
                        return (
                            <List key={listId} list={list}/>
                        )
                    })
                }
            </div>
        </StoreApi.Provider>
    )
}