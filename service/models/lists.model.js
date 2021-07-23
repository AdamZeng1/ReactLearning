const sql = require("./db.js");

// constructor
const List = function(list) {
    this.name = list.name;
    this.boardId = list.boardId;
};
  

List.create = (newList, result) => {
    sql.query("INSERT INTO List SET ?", newList, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created list: ", { id: res.insertId, ...newList });
          result(null, { id: res.insertId, ...newList });
    })
}

List.updateById = (id, updatedList, result) => {
    sql.query(
        "UPDATE List SET NAME = ?, BoardID = ? WHERE ListID = ?",
        [updatedList.name, updatedList.boardId, id],
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
    
          console.log("updated card: ", { id: id, ...updatedList });
          result(null, { id: id, ...updatedList });
        }
    );
};


List.remove = (id, result) => {
    sql.query("DELETE FROM List WHERE ListID = ?", id, (err, res) => {
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
  
      console.log("deleted list with id: ", id);
      result(null, res);
    });
};



module.exports = List;