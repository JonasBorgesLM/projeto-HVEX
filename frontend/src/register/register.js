import React, { useState } from "react";
import { Button, Form, Modal, Card, Container } from "react-bootstrap";
import { navigate, A } from "hookrouter";
import User from "../models/user.model";
import axios from "axios";

// Registro de novos usuarios
function LoginUser() {
  const API_URL_REGISTER_USER = "http://localhost:3001/register-user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validado, setValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalErro, setExibirModalErro] = useState(false);
  const [exibirModalPassword, setexibirModalPassword] = useState(false);

  // Criacao de novo usuario
  async function check(event) {
    event.preventDefault();
    setValidado(true);

    if (event.currentTarget.checkValidity() === true) {
      try {
        if (password === passwordConfirm) {
          const newUser = new User(email, password);
          await axios.post(API_URL_REGISTER_USER, newUser);

          setExibirModal(true);
        } else {
          setexibirModalPassword(true);
        }
      } catch (err) {
        setExibirModalErro(true);
      }
    }
  }

  function handleTxtEmail(event) {
    setEmail(event.target.value);
  }

  function handleTxtPassword(event) {
    setPassword(event.target.value);
  }

  function handleTxtPasswordConfirm(event) {
    setPasswordConfirm(event.target.value);
  }

  function handleFecharModal() {
    navigate("/");
  }

  function handleFecharModalErro() {
    setExibirModalErro(false);
  }

  function handleFecharModalPassword() {
    setexibirModalPassword(false);
  }

  return (
    <Container className="bg">
      <Card
        border="primary"
        className="card top-50 start-50 translate-middle p-3"
      >
        <Card.Header className="h1 fw-normal text-center text-primary">
          Registrar
        </Card.Header>
        <Card.Body>
          <Form validated={validado} noValidate onSubmit={check}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o email"
                minLength="5"
                maxLength="100"
                required
                value={email}
                onChange={handleTxtEmail}
                data-testid="txt-email"
              />
              <Form.Control.Feedback type="invalid">
                O email deve conter no minimo 5 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a senha"
                minLength="8"
                maxLength="30"
                required
                value={password}
                onChange={handleTxtPassword}
                data-testid="txt-password"
              />
              <Form.Control.Feedback type="invalid">
                A senha deve conter no minimo 8 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirme a senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a senha"
                minLength="8"
                maxLength="30"
                required
                value={passwordConfirm}
                onChange={handleTxtPasswordConfirm}
                data-testid="txt-password"
              />
              <Form.Control.Feedback type="invalid">
                A senha deve conter no minimo 8 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button
                variant="primary"
                type="submit"
                data-testid="btn-register"
                className="btn-lg"
              >
                Registrar
              </Button>
              <A href="/" className="btn ms-2 btn-secondary btn-lg">
                Voltar
              </A>
            </Form.Group>
          </Form>
          <Modal
            show={exibirModal}
            onHide={handleFecharModal}
            data-testid="modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Registrado</Modal.Title>
            </Modal.Header>
            <Modal.Body>Registrado com sucesso!</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleFecharModal}>
                Voltar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
            <Modal.Header closeButton>
              <Modal.Title>Erro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Erro ao criar novo usuário, tente novamente em instantes!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleFecharModalErro}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={exibirModalPassword} onHide={handleFecharModalPassword}>
            <Modal.Header closeButton>
              <Modal.Title>Erro</Modal.Title>
            </Modal.Header>
            <Modal.Body>Campo de senhas diferentes!</Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleFecharModalPassword}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginUser;
