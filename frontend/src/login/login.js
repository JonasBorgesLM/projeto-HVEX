import React, { useState } from "react";
import { Button, Form, Modal, Card } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validado, setValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);

  function check(event) {
    event.preventDefault();
    setValidado(true);

    if (event.currentTarget.checkValidity() === true) {
      // obtem o usuario

      // verifica usuario

      setExibirModal(true);
    }
  }

  function handleTxtEmail(event) {
    setEmail(event.target.value);
  }

  function handleTxtPassword(event) {
    setPassword(event.target.value);
  }

  function handleFecharModal() {
    navigate("/");
  }

  return (
    <Card
      border="primary"
      className="card light position-absolute top-50 start-50 translate-middle shadow p-3 rounded-1"
    >
      <Card.Header className="h1 fw-normal text-center text-primary">
        Login
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-center text-info mb-4">
          Entre com seus dados corretamente para acessar o sistema.
        </Card.Text>
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
          <Form.Group>
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
          <Form.Group className="text-center">
            <Button
              variant="primary"
              type="submit"
              data-testid="btn-enter"
              className="m-3 btn-lg"
            >
              Entrar
            </Button>
          </Form.Group>
        </Form>
        <Card.Footer className="text-center">
          <A href="/register">
            Registrar
          </A>
        </Card.Footer>
        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>E-mail ou senha inválidos!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Voltar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default LoginUser;