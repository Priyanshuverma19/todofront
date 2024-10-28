import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <div className='flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2'>
      <div className='flex items-center flex-1 mr-4 min-w-0'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className='mr-2 flex-shrink-0'
        />
        <span className={`${todo.completed ? 'text-gray-500' : ''} truncate`}>
          {todo.text}
        </span>
      </div>
      <div className='flex space-x-2 flex-shrink-0'>
        <button
          onClick={() => onEdit(todo)}
          className='text-blue-500 hover:text-blue-700'
        >
          <PencilIcon className='h-5 w-5' />
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className='text-red-500 hover:text-red-700'
        >
          <TrashIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
