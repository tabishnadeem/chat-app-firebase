
import React, { SyntheticEvent } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function OTPModal() {
  const [visible, setVisible] = React.useState(true);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleKeyDown = (evt:any)=>{
    console.log(evt.key);
    if(isNaN(parseInt(evt.key)) && evt.key !== 'Backspace'){
        return evt.preventDefault()
    }
  }

  const handleChange = (e:any) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
  
    let fieldIntIndex = parseInt(fieldIndex, 10);
  
    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
  
      // It should not be last input field
      if (fieldIntIndex < 4) {
  
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        ) as HTMLInputElement;
  
        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  }
  return (
    <div>
      <Button auto ghost color="error" onClick={handler}>
        Open modal
      </Button>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Enter the <span> </span>
            <Text b size={18}>
               OTP Received
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
            <Row justify="space-evenly">
            <Input
            maxLength={1}
            bordered
            width="50px"
            color="primary"
            name="field-1"
            onChange={handleChange}
            size="lg"
            style={{fontWeight:'700',fontSize:'20px',textAlign:'center'}}
            onKeyDown={handleKeyDown}
          />
          <Input
            maxLength={1}
            bordered
            width="50px"
            color="primary"
            name="field-2"
            onChange={handleChange}
            style={{fontWeight:'700',fontSize:'20px',textAlign:'center'}}
            size="lg"
            onKeyDown={handleKeyDown}
          />
          <Input
            maxLength={1}
            bordered
            style={{fontWeight:'700',fontSize:'20px',textAlign:'center'}}
            width="50px"
            color="primary"
            size="lg"
            name="field-3"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            maxLength={1}
            bordered
            style={{fontWeight:'700',fontSize:'20px',textAlign:'center'}}
            width="50px"
            color="primary"
            size="lg"
            name="field-4"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
            </Row>
          
      
          {/* <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}
