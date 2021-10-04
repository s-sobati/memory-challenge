import styled from 'styled-components'
import { ColorPalette } from '../constants/colors'

export default styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${ColorPalette.ANTIQUE_WHITE};
  border: 2px solid ${ColorPalette.LIGHT_SALMON};
  backface-visibility: hidden;
`
