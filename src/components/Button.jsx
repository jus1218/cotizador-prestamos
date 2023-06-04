import React, { Component } from "react";

const Button = (props) => {
  const metodos = () => {
    //console.log(props);
    //props.operador == "+" ? console.log("Sumando") : console.log("Restando");

    props.metodo();
    //handleChangeIncremento()
  };

  return (
    <>
      <button
        type="button"
        className="h-10 w-10 flex items-center justify-center 
    font-bold bg-lime-500 rounded-full hover:outline-none hover:ring-2 
    hover:ring-offset-2 hover:ring-line-lime-500 text-white text-2xl"
        onClick={metodos}
      >
        {props.operador}
      </button>
    </>
  );
};

Button.defaultProps = {
  operador: "+",
};
export default Button;
