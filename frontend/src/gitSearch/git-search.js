import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  Navbar,
  Container,
  Figure,
  Col,
  Row,
} from "react-bootstrap";
import { navigate } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Pagina de pesquisa do GIT 
function LoginUser(props) {
  const API_URL_LOGIN_USER_ID = "http://localhost:3001/login-user-id/";
  const API_URL_SEARCH_EMAIL = "https://api.github.com/users/";

  const [loginGit, setLoginGit] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const [gitData, setGitData] = useState({});
  const [card, setCard] = useState(false);

  const id = parseInt(props.id);

  // Busca do nome do perfil que fez login 
  async function getName() {
    const user = (await axios.post(API_URL_LOGIN_USER_ID + id)).data[0];

    setName(user.Email);
  }

  getName();

  // Faz busca por usuario do GIT
  async function check(event) {
    event.preventDefault();
    setValidated(true);

    if (event.currentTarget.checkValidity() === true) {
      try {
        setGitData((await axios.get(API_URL_SEARCH_EMAIL + loginGit)).data);
        setCard(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleLoginGit(event) {
    setLoginGit(event.target.value.toLowerCase());
  }

  function logoutPage() {
    navigate("/");
  }

  return (
    <Container className="bg px-5">
      <Navbar>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-light">
              <b> Signed in:</b> {name}
            </Navbar.Text>
            <Button variant="primary ms-3" onClick={logoutPage}>
              Sair
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row className="mb-3">
        <Form validated={validated} noValidate onSubmit={check}>
          <Form.Group>
            <Form.Label className="text-light">
              Digite o login de usuáro do GIT:
            </Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Login Git:"
                  minLength="1"
                  maxLength="100"
                  required
                  value={loginGit}
                  onChange={handleLoginGit}
                  data-testid="txt-email"
                />
                <Form.Control.Feedback type="invalid">
                  Digite um login.
                </Form.Control.Feedback>
              </Col>
              <Col xs={1}>
                <Button
                  variant="primary"
                  type="submit"
                  data-testid="btn-enter"
                  className="offset-sm-1"
                >
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
      <Row className={card ? null :"hidden"}>
        <Card border="primary" className="p-3">
          <Row>
            <Col>
              <Figure>
                <Figure.Image src={gitData.avatar_url} className="border rounded-start border-primary"/>
                <Figure.Caption className="text-center">
                  {gitData.name}
                </Figure.Caption>
              </Figure>
            </Col>
            <Col xs={10}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>{gitData.login}</Card.Title>
                  </Col>
                  <Col>
                    <Card.Text className="d-flex justify-content-end">
                      <b>{gitData.public_repos}</b>: Repo. Publicos
                    </Card.Text>
                  </Col>
                </Row>
                <Card.Subtitle className="mb-3">
                  {gitData.email === null ? "--" : gitData.email}
                </Card.Subtitle>
                <Card.Text>
                  <b> De:</b>{" "}
                  {gitData.location === null ? "--" : gitData.location}
                </Card.Text>
                <Card.Text>
                  <b> Bio:</b> {gitData.bio === null ? "--" : gitData.bio}
                </Card.Text>
                <Card.Text>
                  <a href={gitData.html_url}>Acessar Perfil</a>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  );
}

export default LoginUser;
