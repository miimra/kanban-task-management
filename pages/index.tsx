/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Board from "../components/Board";
import { initialData } from '../data/initialData'
import Switch from '../components/Switch';
import { jsx, ThemeProvider } from '@emotion/react'

export const darkTheme = {
  color: {
    primary: '#f7f7f7',
    darkIndigo: '#071530',
    paleGray: '#252525',
    background: '#1e1e1e',
    text: '#ffffff',
  },
};

export const lightTheme = {
  color: {
    primary: '#444444',
    darkIndigo: '#071530',
    paleGray: '#f2f2f2',
    background: '#fefefe',
    text: '#252525',
  },
};

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);

  function toggleTheme(): void {
    setChecked(!checked);
  }

  return (
    <ThemeProvider theme={checked ? darkTheme : lightTheme}>
      <div className={styles.container}
        css={(theme: any) => ({
          color: theme.color.primary,
          background: theme.color.background
        })}>
        <header className={styles.header}>
          Kanban Board
          <Switch onChange={toggleTheme} />
        </header>
        <main className={styles.main}>
          <Board data={initialData} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Home