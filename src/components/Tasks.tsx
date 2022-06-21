import { useState, FormEvent } from 'react';
import styles from './Tasks.module.css'
import { CheckCircle, Circle, ClipboardText, PlusCircle, Trash } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string,
    text: string,
    done: boolean
}


export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const NewTask: Task = {
            id: uuidv4(),
            text: newTask,
            done: false
        }

        setTasks([...tasks, NewTask]);
        setNewTask('');
    }

    function handleDeleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function handleDoneTask(id: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.done = !task.done;
            }
            return task;
        }
        ));

        console.log(tasks);

    }

    const isNewTaskEmpty = newTask.length===0;

    const tasksDone = tasks.filter(task => task.done).length;

    return (

        <section className={styles.main}>

<form onSubmit={handleCreateNewTask} className={styles.container}>
        <input 
        type="text" 
        placeholder="Adicione uma nova tarefa" 
        className={styles.input} 
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        required
        />
        <button 
        type="submit"
        className={styles.button} 
        disabled={isNewTaskEmpty}
        >
        Criar <PlusCircle size={56} />
        </button>
        </form>

        <div className={styles.count}>
            <div className={styles.countCreated}>Tarefas criadas <span>{tasks.length}</span></div>
            <div className={styles.countConcluded}>Concluídas <span>{tasksDone} de {tasks.length}</span></div>
        </div>

        {tasks.length === 0 ? (
        <div className={styles.empty}>
            <ClipboardText size={56} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
        ):(
        <ul className={styles.tasklist}>
            {tasks.map(task => (
       <li key={task.id} className={styles.item}>
        
        { task.done ? (
            <button className={styles.btnCheckCircle} onClick={() => handleDoneTask(task.id)}><CheckCircle size={24} /></button>
        ) : (
            <button className={styles.btnCircle} onClick={() => handleDoneTask(task.id)}><Circle size={24} /></button>
        )}
        <span className={task.done ? styles.taskDone : styles.taskText}>{task.text}</span>
        <button className={styles.btnTrash} onClick={() => handleDeleteTask(task.id)}><Trash size={24} /></button>
       </li>
            ))}
        </ul>
)}
        </section>
    )
}