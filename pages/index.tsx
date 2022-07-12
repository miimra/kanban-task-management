/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Board from "../components/Board";
import Switch from '../components/Switch';
import { jsx, ThemeProvider } from '@emotion/react';
import { supabase } from '../utils/supabaseClient';
import { IColumn, ICard } from '../interfaces/interfaces';


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

interface IBoardData {
  columns: IColumn[];
}

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);
  const [boardData, setBoardData] = useState<IBoardData | undefined>(undefined);

  async function getData() {
    try {
      let { data, error } = await supabase
        .from('boards')
        .select('data')
        .eq("id", 1)
        .limit(1)

      if (error) {
        throw error
      }

      if (data) {
        setBoardData(data[0].data as IBoardData)
      }
    } catch (error: any) {
      console.log(error.message)
    } finally {
    }
  }

  function toggleTheme(): void {
    setChecked(!checked);
  }

  const updateBoard = async () => {
    const { data, error } = await supabase
      .from('boards')
      .update({ data: boardData })
      .match({ id: 1 })

  }

  const cardMovedHandler = (eventData: any) => {
    const { sourceColumnId,
      destinationColumnId,
      cardId,
      destinationCardIndex,
      sourceCardIndex } = eventData;

    if (!destinationColumnId) return;

    if (
      destinationColumnId === sourceColumnId &&
      sourceCardIndex === destinationCardIndex
    ) return;

    const sourceColumn: IColumn = boardData?.columns?.find(column => column.id === sourceColumnId) as IColumn;
    const destinationColumn: IColumn = boardData?.columns?.find(column => column.id === destinationColumnId) as IColumn;
    const movingCard: ICard | undefined = boardData?.columns?.reduce((cards, column) => [...cards, ...column.cards], [] as Array<ICard>)
      .find(x => x.id == cardId);

    if (movingCard) {
      sourceColumn.cards.splice(sourceCardIndex, 1)
      destinationColumn.cards.splice(destinationCardIndex, 0, movingCard);
      setBoardData({ columns: boardData!.columns });
      updateBoard();
    }
  }

  useEffect(() => {
    getData();
  }, [])

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
          <Board data={boardData?.columns} cardMoved={cardMovedHandler} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Home