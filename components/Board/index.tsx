import { IColumn, ICard } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardContainer } from './styles';

const Board = ({ data, cardMoved }: { data: IColumn[] | undefined, cardMoved: any }) => {
    const Column = dynamic(import("../Column"));
    const [winReady, setwinReady] = useState(false);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        const eventData = {
            sourceColumnId: source.droppableId,
            destinationColumnId: destination?.droppableId,
            cardId: draggableId,
            destinationCardIndex: destination?.index,
            sourceCardIndex: source.index,
        }
        cardMoved(eventData);
    }

    useEffect(() => {
        setwinReady(true);
    }, []);

    return (
        <BoardContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                {winReady ?
                    data?.map((column: IColumn) => <Column key={column.id} column={column} />) : null
                }
            </DragDropContext>
        </BoardContainer>
    )
}

export default Board; 