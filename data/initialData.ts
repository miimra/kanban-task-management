import { IColumn } from "../interfaces/interfaces";

export const initialData: IColumn[] = [
  {
    id: '0',
    index: '0',
    title: 'Backlog',
    cards: [{
      id: '0',
      title: 'Reset password button not working',
      description: 'The button does not contain any feedback, when you click on it, it does nothing',
    },
    {
      id: '1',
      title: 'Create clear filters button',
      description: 'The user can select the filters but they should also be able to clear them without having to reload the page',
    }],
  },
  {
    id: '1',
    index: '1',
    title: 'To Do',
    cards: [{
      id: '2',
      title: 'Set up the staging environment',
      description: '',
    },]
  },
  {
    id: '2',
    index: '2',
    title: 'Doing',
    cards: [{
      id: '3',
      title: 'Send first deploy to prod',
      description: '',
    },]
  },
  {
    id: '3',
    index: '3',
    title: 'In Review',
    cards: [{
      id: '4',
      title: 'Create landing page',
      description: '',
    },
    {
      id: '5',
      title: 'Make the onDragEnd function more efficient',
      description: '',
    },]
  },
  {
    id: '4',
    index: '4',
    title: 'Done',
    cards: [{
      id: '6',
      title: 'Send first deploy to develop environment',
      description: '',
    },
    {
      id: '7',
      title: 'Create light and dark theme switch',
      description: '',
    },]
  }
]
