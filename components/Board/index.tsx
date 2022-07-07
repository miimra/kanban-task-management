import { IColumn, ICard } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardContainer } from './styles';

const Board = ({ data }: { data: IColumn[] }) => {
    const Column = dynamic(import("../Column"));
    const [winReady, setwinReady] = useState(false);
    const [columns, setColumns] = useState(data);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const sourceColumn: IColumn = columns.find(column => column.id === source.droppableId) as IColumn;
        const destinationColumn: IColumn = columns.find(column => column.id === destination.droppableId) as IColumn;
        const movingCard: ICard | undefined = columns.reduce((cards, column) => [...cards, ...column.cards], [] as Array<ICard>)
            .find(x => x.id == draggableId);

        if (movingCard) {
            sourceColumn.cards.splice(source.index, 1)
            destinationColumn.cards.splice(destination.index, 0, movingCard);
            setColumns([...columns])
        }

    }

    useEffect(() => {
        setwinReady(true);
    }, []);

    return (
        <BoardContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                {winReady ?
                    data.map((column: IColumn) => <Column key={column.id} column={column} />) : null
                }
            </DragDropContext>
        </BoardContainer>
    )
}

export default Board; 