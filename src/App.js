import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import {
  Stack,
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";

const App = () => {
  const [menuActive, setMenuActive] = useState("all");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [reload, setReload] = useState(false);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const addTodo = (e) => {
    e.preventDefault();
    var item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false,
    };

    setTodoList((prev) => {
      return [...prev, item];
    });
    setTodo("");
  };

  const deleteTodo = (id) => {
    const remainingItems = todoList.filter((item) => {
      return item.id !== id;
    });
    setTodoList(remainingItems);
  };

  const deleteCompleted = () => {
    const remainingItems = todoList.filter((item) => {
      return item.checked !== true;
    });
    setTodoList(remainingItems);
    setMenuActive("all");
  };

  useEffect(() => {}, [reload]);

  return (
    <section className="gradient-custom vh-100">
      <Container className="h-100 py-5">
        <Row className="d-flex align-items-center justify-content-center">
          <Col xl="10">
            <Card>
              <Card.Body className="p-5">
                <Tab.Container>
                  <Col>
                    <Row className="mb-2 pb-2">
                      <Nav className="nav-tabs border-0 d-flex justify-content-evenly">
                        <Nav.Item className="nav-item">
                          <Nav.Link
                            onClick={() => setMenuActive("all")}
                            className={menuActive === "all" ? "active" : ""}
                          >
                            ALL
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setMenuActive("active")}
                            className={menuActive === "active" ? "active" : ""}
                          >
                            ACTIVE
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setMenuActive("completed")}
                            className={
                              menuActive === "completed" ? "active" : ""
                            }
                          >
                            COMPLETED
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Row>
                    {menuActive !== "completed" ? (
                      <Form onSubmit={addTodo} className="mb-3">
                        <Stack direction="horizontal" gap={3}>
                          <Form.Control
                            type="text"
                            className="me-auto shadow-none"
                            placeholder="New Task..."
                            value={todo}
                            onChange={handleChange}
                          />
                          <Button
                            type="submit"
                            variant="info"
                            className="fw-medium text-white px-3"
                            disabled={todo ? false : true}
                          >
                            ADD
                          </Button>
                        </Stack>
                      </Form>
                    ) : null}
                    <Row>
                      {todoList
                        ? todoList.map((item) => {
                            if (menuActive === "completed" && !item.checked) {
                              return;
                            } else if (
                              menuActive === "active" &&
                              item.checked
                            ) {
                              return;
                            }

                            return (
                              <Todo
                                key={item.id}
                                menuActive={menuActive}
                                todo={item}
                                reload={reload}
                                setReload={setReload}
                                deleteTodo={deleteTodo}
                              />
                            );
                          })
                        : null}

                      {menuActive === "completed" ? (
                        <div className="d-flex justify-content-end mt-2">
                          <Button onClick={deleteCompleted}>
                            <img
                              width="20"
                              height="20"
                              src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                              alt="filled-trash"
                            />
                            <span>Delete All</span>
                          </Button>
                        </div>
                      ) : null}
                    </Row>
                  </Col>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default App;
