const sql = require("./db.js");

// constructor
const Card = function(card) {
    // this.id = card.i;
    this.title = card.title;
    this.description = card.description;
    this.listID = 1;
};
  

Card.create = (newCard, result) => {
    sql.query("INSERT INTO Card SET ?", newCard, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created card: ", { id: res.insertId, ...newCard });
          result(null, { id: res.insertId, ...newCard });
    })
}

Card.updateById = (id, updatedCard, result) => {
    sql.query(
        "UPDATE Card SET title = ?, description = ?, listID = ? WHERE cardId = ?",
        [updatedCard.title, updatedCard.description, updatedCard.listID, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated card: ", { id: id, ...updatedCard });
          result(null, { id: id, ...updatedCard });
        }
    );
};

module.exports = Card;