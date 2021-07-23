const sql = require("./db.js");

// constructor
const Board = function(card) {
    this.title = card.title;
    this.description = card.description;
    this.listID = card.listId;
};

const reformatData = (cardlist) => {
    const data = {};
    const listIds = new Set();
    for(const card of cardlist) {
      data[card.ListID] = {
        id: card.ListID,
        title: card.NAME,
        cards : []
      };
      listIds.add(card.ListID);
      // console.log(listIds);
    }
    for(const card of cardlist) {
        data[card.ListID].cards.push(card);
    }
    return {lists: data, listIds: Array.from(listIds)};
}
  

Board.findById = (boardId, result) => {
  sql.query(`SELECT Card.CardID, Card.Title, Card.Description, temp_list.ListID, temp_list.Name FROM 
  (SELECT ListID, NAME FROM List WHERE BoardID = ${boardId}) temp_list
  JOIN Card ON Card.ListID = temp_list.ListID`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      reformatData(res);
      console.log("found lists: ", res);
      result(null, reformatData(res));
      
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);

  });
};



module.exports = Board;