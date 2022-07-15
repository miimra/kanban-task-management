/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import type { NextPage } from 'next';
import { useQuery, useMutation } from 'react-query'
import styles from '../styles/Home.module.css';
import { darkTheme, lightTheme } from '../styles/themes';
import Board from "../components/Board";
import Switch from '../components/Switch';
import { jsx, ThemeProvider } from '@emotion/react';
import { supabase } from '../utils/supabaseClient';
import { IColumn, ICard } from '../interfaces/interfaces';


interface IBoardData {
  columns: IColumn[];
}

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);

  const fetchBoardData = async () => {
    const { data, error } = await supabase
      .from('boards')
      .select('data')
      .eq("id", 1)
      .limit(1)

    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    return data[0].data as IBoardData;
  }

  const { data: boardData } = useQuery('board-data', () => fetchBoardData())

  const updateBoard = useMutation(async (boardData) => {
    await supabase
      .from('boards')
      .update({ data: boardData })
      .match({ id: 1 })
  })

  function toggleTheme(): void {
    setChecked(!checked);
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
      updateBoard.mutate(boardData);
    }
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
          <Board data={boardData?.columns} cardMoved={cardMovedHandler} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Home