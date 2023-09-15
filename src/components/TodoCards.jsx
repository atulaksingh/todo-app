import React, { useEffect } from "react";
import { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTooltip,
} from "mdb-react-ui-kit";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputArray, setInputArray] = useState(() => {
    let localList = localStorage.getItem("toList");
    localList = JSON.parse(localList);
    if (localList && localList.length) return localList;
    return [];
  });
  const handleInputChnge = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("toList", JSON.stringify(inputArray));
  }, [inputArray]);

  const handlesubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setInputArray([...inputArray, inputValue]); // Add current input value to the array
      setInputValue(""); /// clear input field
      console.log(inputArray);
    }
    // console.log("ghhj", event);
  };

  const closeHandle = (id) => {
    const newList = inputArray.filter((item, index) => {
      return index !== id;
    });

    // delete newList[id];
    setInputArray(newList);
    console.log("hello", id);
  };
  // console.log("hhh", inputArray);

  return (
    <section className="vh-100" style={{ backgroundColor: "#e2d5de" }}>
      <MDBContainer className="py-6 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol xl="10">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-5">
                <h6 className="mb-3">Awesome Todo List</h6>
                {/* <form> */}
                <div className="w-100">
                  <div className="d-flex justify-content-center align-items-center mb-4 ">
                    <MDBTextArea
                      label="What do you need to do today?"
                      id="textAreaExample"
                      rows={4}
                      // wrapperClass="flex-fill"
                      value={inputValue}
                      onChange={handleInputChnge}
                    />
                    <MDBBtn
                      type="submit"
                      size="sm"
                      className="ms-2 w-25 p-3 "
                      onClick={handlesubmit}
                    >
                      Add
                    </MDBBtn>
                    {/* <MDBBtn>Add</MDBBtn> */}
                  </div>
                </div>
                {/* </form> */}
                <MDBListGroup className="mb-0">
                  {inputArray.map((item, index) => (
                    <MDBListGroupItem
                      key={index}
                      className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                    >
                      <div className="d-flex align-items-center">{item}</div>
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Remove item"
                      >
                        <MDBIcon
                          onClick={() => closeHandle(index)}
                          fas
                          icon="times"
                          color="primary"
                        />
                      </MDBTooltip>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
