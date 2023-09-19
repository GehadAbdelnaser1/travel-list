import './index.css';
import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: true },
// ];
export default function App() {

  const [items, setItems] =useState([]);

  function handelAddNewItems (item){
    setItems((items) => [...items, item])

  }

  function handelDelete (id){
    setItems((items)=> items.filter((item)=> item.id !== id))
  };

  function handelToggle(id){
    console.log(id)
    setItems((items)=>
    items.map((item) =>
    item.id === id ? {...item , packed: !item.packed}: item))
  }


  function handelClear(){
    const confirmed = window.confirm('Are you sure you wont to delete the list'); //alert to delete the list
    if (confirmed){setItems([])} // how to clear a list
  }

  return (
    <div className="app">
      <Logo />
      <Form onlAddNewItems={handelAddNewItems}/>
      <PackingList items={items}  onDelete={handelDelete} onToggle={handelToggle} onClear={handelClear}/>
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <>
      <h1>🌴 far Away🌏 </h1>
    </>
  );
}

function Form({onlAddNewItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handleSubmit(e) {
    e.preventDefault(); // prevent page refresh on form submission
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() }; //add a new Item to the array initialItems
    console.log(newItem);

    setDescription(""); //after submitting a newItem make description empty
    setQuantity(1); //after submitting a newItem make Quantity to 1
    onlAddNewItems(newItem) //culling the function when we click on submit
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your🥰 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          console.log(e.target.value); //to see what is e.target.value
          setDescription(e.target.value); //on any chang that happen on the input it add to the State as the value
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDelete, onToggle ,onClear}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDelete={onDelete} onToggle={onToggle} key={item.id} />
        ))}
      </ul>
      <button className='action' onClick={onClear}>clear list </button>
    </div>
  );
}
function Item({ item , onDelete ,onToggle}) {
  return (
    <li>
      <input
      type ="checkbox"
      value={item.packed}
      onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=>onDelete(item.id)}>❌</button>
      
    </li>
    
  );
}

function Stats({items}) {

  if(!items.length)
  return(
    <p className="stats">
      Start packing Now ✨
    </p>
  )
    
  

  const numItems= items.length
  const packedItems=  items.filter((item)=> item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100)


  return (


    <footer className="stats">

      {/* {!items.length &&  <p>Start packing Now</p>} */}
      {percentage === 100 ? <em>
        all done 🛫 ({percentage}%)</em> 
        : <em>😎 you have {numItems} items on your list, and you already packed {packedItems} ({percentage}%)</em>}
      
      
    </footer>
  );
}
