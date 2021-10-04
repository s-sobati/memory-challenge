import { useEffect, useState } from 'react'
import Board from './Board'
import Card from './Card'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getImageIdsRequestAsync } from '../store/images/asyncActions'
import { addRevealedId, ImagesData, selectData } from '../store/images'

interface Props {
  gridSize?: number
}

function Game({ gridSize = 5 }: Props) {
  const dispatch = useAppDispatch()
  const cards: ImagesData[] = useAppSelector(selectData)
  const [selectedCardIds, setSelectedCardIds] = useState<ImagesData[]>([])

  useEffect(() => {
    dispatch(getImageIdsRequestAsync(gridSize))
  }, [dispatch, gridSize])

  useEffect(() => {
    if (selectedCardIds.length === 2) setTimeout((): void => setSelectedCardIds([]), 800)
  }, [selectedCardIds])

  const cardToggled = (data: ImagesData): void => {
    const [firstSelected] = selectedCardIds
    if (firstSelected?.uniqueId !== data.uniqueId) {
      if (selectedCardIds.length === 1 && firstSelected.id === data.id) {
        dispatch(addRevealedId([data, firstSelected]))
      }
      setSelectedCardIds([...selectedCardIds, data])
    }
  }

  return (
    <Board>
      {cards.map((data: ImagesData) => (
        <Card
          key={data.uniqueId}
          gridSize={gridSize}
          data={data}
          selectedCards={selectedCardIds}
          toggled={cardToggled}
        />
      ))}
    </Board>
  )
}

export default Game
