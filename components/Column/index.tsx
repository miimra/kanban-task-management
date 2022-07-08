import Card from "../Card";
import { ColumnContainer, InnerColumn } from './styles';
import { Droppable } from 'react-beautiful-dnd';
import { IColumn, ICard } from "../../interfaces/interfaces";


export default function Column({ column }: { column: IColumn }) {

  return (
    <ColumnContainer>
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided: any) => (
          <InnerColumn ref={provided.innerRef} {...provided.droppableProps}>
            {
              column.cards.map((card: ICard, index) =>
                <Card key={card.id} card={card} index={index} />
              )
            }
            {provided.placeholder}
          </InnerColumn>
        )}
      </Droppable>
    </ColumnContainer>
  )
}