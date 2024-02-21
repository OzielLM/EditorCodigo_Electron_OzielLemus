import Editor from '@monaco-editor/react';
import {Col, Row, Card, Container} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { saveAs } from 'file-saver'

export default function App(){

  const [myValue, setMyValue ] = useState('')

  const createFile = () => {
    const blob = new Blob([ myValue ], { type: 'text/plain;charset=utf-8' });
    saveAs( blob, 'mi-archivo.txt' );
  }

  const readFile = ( e ) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    if ( !file ) {
      return;
    }

    fileReader.onload = () => {
      setMyValue( fileReader.result );
    }

    fileReader.readAsText( file );
  }

  function ejecutar(){
    // eval(myValue)

    (function(o) {
      o.log = function(e) {
          document.getElementById('consolita').innerHTML = e;
      }
      eval(myValue);
    }(console));
  }

  function handleEditorChange(myValue) {
    setMyValue(myValue)
  }

  return (
    <>
    <Container fluid>
    <Row>
      <Card>
        <Card.Header>
          <h3>GIO Editor</h3>
            <Button variant='success'><input type='file' multiple={ false } onChange={ readFile }/></Button>
            <Button variant='primary' onClick={ createFile }>Guardar</Button>
            <Button variant='danger' onClick={ejecutar}>Compilar</Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={{span:6}} xs={{span:6}}>
              <Editor
                height='74vh'
                language='javascript'
                theme='vs-dark'
                value={ myValue }
                onChange={ handleEditorChange }
              />
            </Col>
            <Col md={{span:6}} xs={{span:6}}>            
              <textarea style={{
                width: "100%",
                height: "100px",
                backgroundColor: "black",
                color: "green",
                textAlign: "left",
                padding: "3px 6px"
              }} id='consolita'></textarea>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <h4>@2022 GIO Entertaiment</h4>
        </Card.Footer>
      </Card>
    </Row>
    </Container>
    </>
  )
}