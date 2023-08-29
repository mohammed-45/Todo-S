import React, { useState, useEffect } from "react";
import "../App.css";
import { Tab, ListGroup, Button } from "react-bootstrap";
const Todo = ({ menuActive, reload, setReload, deleteTodo, todo }) => {
  const [teste, setTeste] = useState(todo.checked);

  function handleCheckbox(e) {
    setTeste(e.target.checked);
    todo.checked = e.target.checked;
    setReload(!reload);
  }

  useEffect(() => {}, [teste, todo.checked]);

  return (
    <div>
      <Tab.Content>
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            className=" d-flex align-items-center border-0 mb-2 rounded"
            style={{ backgroundColor: "#f4f6f7" }}
          >
            <input
              type="checkbox"
              name="checkbox"
              id={todo.id}
              onChange={handleCheckbox}
              checked={todo.checked}
              style={{ width: "16px", height: "16px" }}
            />
            <label htmlFor={todo.id} className="ms-3 fs-5">
              {todo.text}
            </label>
            {menuActive === "completed" ? (
              <div className="d-flex justify-content-end ms-auto">
                <Button onClick={() => deleteTodo(todo.id)}>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                    alt="filled-trash"
                  />
                </Button>
              </div>
            ) : null}
          </ListGroup.Item>
        </ListGroup>
      </Tab.Content>
    </div>
  );
};

export default Todo;
