import React from "react";
import './styles/CalculatorUI.css';
import { useState,useRef,useEffect } from "react";
import history from './assets/hi.png'
import { useNavigate } from "react-router-dom";

const CalculatorUI = () => {

    const navigate = useNavigate();
    const timerRef = useRef(null)
    const [seq,setSeq] = useState([])
    const [input, setInput] = useState("")
    const operators = ['+', '-', '*', '/', '%']
    const [status, setStatus] = useState("");


    function getLocationAndTriggerSOS(){
        if(!navigator.geolocation){
            console.log("Geolocation not supported")
            return
        }
        navigator.geolocation.getCurrentPosition(async (position)=>{
            const location = {lat:position.coords.latitude,lng: position.coords.longitude}
            const user_email = localStorage.getItem("user_email");
            // console.log("Location captured: ",location)
            // console.log(`Location latitude and longitude: ${location.lat}, ${location.lng}`)
            await fetch("http://localhost:8082/sos",{
                "method":"POST",
                "headers":{"Content-Type":"application/json"},
                "body":JSON.stringify({user_email,location})
            })
        },(error)=>{
              console.log("Location access denied", error);

        })
    }

    function alertSOS(value) {
        const newSeq = [...seq,value]; //updating the sequence to include the newly clicked button
        const last4 = newSeq.slice(-4) //extracting the last 4 characters to check the pattern
        setSeq(last4)  //removing all the other characters and keeping just the last 4 characters 
        if(last4[0]=== 'C' && last4[1]=== 'C'&& last4[2]==='=' && last4[3] ==='='){
            if(status!== ""){
                return; //this helps to send message only once even if hte code is pressed multiple times
            }
            getLocationAndTriggerSOS();
            setStatus("123") //this code shows the user that the sos is sent successfully
            setSeq([])

              setTimeout(() => {
        setStatus("");
    }, 2000);


        }  //checking if the sequence is correct calling alert if correct
        if(timerRef.current){
            clearTimeout(timerRef.current)   //clearing timeout after each click to restart the timer
        }
        timerRef.current = setTimeout(() => {
            setSeq([]);
            
        }, 5000);    //waiting for 5 seconds before resetting the sequence

    }



    useEffect(() => {
    if (input === "err") {
        const timer = setTimeout(() => setInput(""), 1000);
        return () => clearTimeout(timer);
    }
}, [input]);

    function handleClick(value) {
        alertSOS(value)

        // if(input.length!=0 && )
        if (input==="" && operators.includes(value) && value !== '-') {
            return;
        }
        if(input!== ""){
        if (operators.includes(input[input.length - 1]) && operators.includes(value)) {
            setInput("err")
            return;


        }
    }
        setInput(input + value) //adding the newly clicked value to the input

    }

    function handleEqual(value) {
        alertSOS(value)
        try {
            setInput(eval(input))//evaluation of the input
        }
        catch (e) {
            setInput("err")
        }
    }

    function handleClear(value) {
        alertSOS(value)
        setInput(""); //clearing the entire input
    }

    function handleBack(value) {   //removing a single character
        alertSOS(value);

        if (input.length > 0)

            setInput(input.slice(0, -1))
    }


    return (
       <div className="calculator-wrapper">

        <div className="calculator">

            <div className="display" >
            <div className="history"><button onClick  = {()=>navigate("/history")}><img src ={history} className = "imag"></img></button></div>
            {status? status:(input||0)}
            </div>

            <div className="buttons">

                <div className="button" onClick={() => handleClear("C")}>C</div>
                <div className="button" onClick={() => handleClick("%")}>%</div>
                <div className="button operator" onClick={() => handleClick("/")}>÷</div>
                <div className="button" onClick={() => handleBack("B")}>⌫</div>


                <div className="button" onClick={() => handleClick("7")}>7</div>
                <div className="button" onClick={() => handleClick("8")}>8</div>
                <div className="button" onClick={() => handleClick("9")}>9</div>
                <div className="button operator" onClick={() => handleClick("*")}>×</div>

                <div className="button" onClick={() => handleClick("4")}>4</div>
                <div className="button" onClick={() => handleClick("5")}>5</div>
                <div className="button" onClick={() => handleClick("6")}>6</div>
                <div className="button operator" onClick={() => handleClick("-")}>-</div>

                <div className="button" onClick={() => handleClick("1")}>1</div>
                <div className="button" onClick={() => handleClick("2")}>2</div>
                <div className="button" onClick={() => handleClick("3")}>3</div>
                <div className="button operator" onClick={() => handleClick("+")}>+</div>

                <div className="button" onClick={() => handleClick("(")}>()</div>
                <div className="button" onClick={() => handleClick("0")}>0</div>
                <div className="button" onClick={() => handleClick(".")}>.</div>
                <div className="button equal" onClick={() => handleEqual("=")}>=</div>



            </div>

        </div>
       </div>   
    );
};

export default CalculatorUI;