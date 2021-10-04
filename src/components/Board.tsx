import styled from 'styled-components'

export default styled.div`
  width: 80vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (orientation: portrait) {
    width: 80vw;
    height: 80vw;
  }
`
