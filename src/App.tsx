import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`
interface Item {
  id: ItemId
  timestamp: number
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Hola'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Chao'
  }
]

function App() {
  const [items, setItems ] = useState(INITIAL_ITEMS)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null ) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }
    console.log(newItem)

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
    <main>
      <aside>
        <h1>Todo-App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Que quieres hacer?
            <input
              name='item'
              required
              type='text'
              placeholder='Que quieres hacer?'
              >
            </input>
          </label>
          <button>Agregar Tarea a la lista</button>
        </form>
      </aside>
      <section>
        <h2>Lista de Tareas:</h2>
        <ul>
          {
            items.map(item => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleRemoveItem(item.id)}>
                    X
                  </button>
                </li>
              )
            })
          }
        </ul>
      </section>
  
    </main>
  )
}

export default App
