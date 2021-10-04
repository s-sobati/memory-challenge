import CardWrapper from './CardWrapper'
import CardImage from './CardImage'
import CardBack from './CardBack'
import { useAppSelector } from '../store/hooks'
import { ImagesData, selectRevealed } from '../store/images'
import { imageBaseUrl } from '../constants'

interface Props {
  gridSize: number
  data: ImagesData
  selectedCards: ImagesData[]
  toggled: (data: ImagesData) => void
}

export default function Card({ gridSize, data, selectedCards, toggled }: Props) {
  const revealed: ImagesData[] = useAppSelector(selectRevealed)
  const isFlipped: boolean =
    !!revealed.find(item => item.uniqueId === data.uniqueId) ||
    !!selectedCards.find(item => item.uniqueId === data.uniqueId)

  return (
    <CardWrapper gridSize={gridSize} isFlipped={isFlipped} onClick={(): void => toggled(data)}>
      <CardBack />
      <CardImage src={`${imageBaseUrl}/id/${data.id}/600`} alt={`${data.uniqueId}`} />
    </CardWrapper>
  )
}
