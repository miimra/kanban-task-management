import { Draggable } from 'react-beautiful-dnd';
import { ICard } from "../../interfaces/interfaces";
import { CardContainer } from './styles';


const Card = ({ card, index }: { card: ICard, index: number }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided: any) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {card.title}
        </CardContainer>
      )}
    </Draggable>
  )
}

export default Card;