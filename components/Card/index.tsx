/** @jsxRuntime classic */
/** @jsx jsx */
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from "../../interfaces/interfaces";
import { CardContainer } from './styles';
import { jsx, useTheme } from '@emotion/react'

const Card = ({ card, index }: { card: ICard, index: number }) => {
  const theme : any = useTheme();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided: any) => (
        <CardContainer
          css={{
            backgroundColor: theme.color.paleGray,
            borderColor: theme.color.paleGray
          }}
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