import React,{useState, useEffect} from "react";
import TodoItem from "./TodoItem"; 
import InputArea from "./InputArea";

const App = () => {

  const [items, setItems] = useState([{
    _id: "",
    itemName: ""
  }]);

  const getTodoList = async () => {
    try{
      const res = await fetch("http://localhost:5000/getTodoList", {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json();
      //console.log(data);
      setItems(data);
      
    } catch(error){
      console.log(error);
    }
  }

  const addItem = async (inputText) => {
    try{
      const itemName = inputText;
      const res = await fetch("http://localhost:5000/insertItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                itemName
            })
        });

      const data = await res.json();
     //console.log(data);
      setItems(prevValue => {
        return [...prevValue,{
          itemName: inputText,
          id: data._id
        }];
      })
    } catch(error){
      console.log(error);
    }
      
  }

  const deleteItem = async (id) => {
    try{
      const _id = id;
      const res = await fetch("http://localhost:5000/deleteItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          _id
        })
      })

      setItems(prevValue => {
        return prevValue.filter((item) => {
          return item._id !== id;
        })
      })

    } catch(error){
      console.log(error);
    }
    
  }

  
  
  useEffect(() =>{
    getTodoList();
  },[]);


  return ( 
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {
            items.map((todoItem, index) => (
              <TodoItem 
                key = {index}
                id = {todoItem._id}
                text = {todoItem.itemName}
                onChecked = {deleteItem}
              />
              
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
