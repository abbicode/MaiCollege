import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Draggable from 'react-draggable';
import AutoCompleteDropdown from './components/AutoCompleteDropdown';
import { Button } from "@/components/ui/button";


function App() {
  

  
  return (
    <div className="App">
      {/* First Todo List (Post-it note) */}
      <Draggable>
        <div>
         <TodoList title="To-Do List"  />
        </div>
       
      </Draggable>
    <div className="p-10">
      <Button>It works!</Button>
    </div>

      {/* Second Todo List (College To-Do List, non-draggable) */}
      <div id="fixed">
        <AutoCompleteDropdown title="College List" style="wide"/>
      </div>
    </div>
  );
}

export default App;
