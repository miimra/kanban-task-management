import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Board from "../components/Board";
import { initialData } from '../data/initialData'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Kanban Board
      </header>
      <main className={styles.main}>
        <Board data={initialData} />
      </main>
    </div>
  )
}

export default Home